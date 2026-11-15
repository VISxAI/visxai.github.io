/**
 * Checks every submission / example URL and writes src/lib/data/link-status.json.
 *
 *   bun scripts/check-links.ts
 *
 * Classification:
 *   live    - final response < 400
 *   dead    - 404 / 410, DNS failure, or connection refused (after retries)
 *   unknown - anything inconclusive: 401/403 (bot walls), 429, 5xx, timeouts
 *
 * Manual corrections (e.g. a page that loads but whose interactive parts are broken)
 * go in src/lib/data/link-overrides.json, which takes precedence in the UI.
 *
 * The file is only rewritten when at least one status changes, so the scheduled
 * workflow only opens a PR when something actually changed.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
	getAllCheckedUrls,
	type LinkState,
	type LinkStatusEntry,
	type LinkStatusFile
} from '../src/lib/data/submissions';
import previous from '../src/lib/data/link-status.json';

const OUT = fileURLToPath(new URL('../src/lib/data/link-status.json', import.meta.url));
const TIMEOUT_MS = 20_000;
const ATTEMPTS = 3;
const HOST_CONCURRENCY = 8;
const UA =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

interface Result {
	status: LinkState;
	code: number | null;
	error?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const DEAD_ERRORS = [
	'ConnectionRefused',
	'ENOTFOUND',
	'ECONNREFUSED',
	'FailedToOpenSocket',
	'ConnectionClosed'
];
const TLS_ERRORS = /CERT|SIGNATURE|SELF_SIGNED|TLS|SSL/i;

async function request(url: string, insecure = false): Promise<Result> {
	try {
		const res = await fetch(url, {
			redirect: 'follow',
			signal: AbortSignal.timeout(TIMEOUT_MS),
			headers: { 'user-agent': UA, accept: 'text/html,*/*' },
			// Bun-specific: lets us classify sites whose cert chain is incomplete by their HTTP status.
			...(insecure ? { tls: { rejectUnauthorized: false } } : {})
		} as RequestInit);
		await res.body?.cancel();
		if (res.status < 400) return { status: 'live', code: res.status };
		if (res.status === 404 || res.status === 410) return { status: 'dead', code: res.status };
		return { status: 'unknown', code: res.status };
	} catch (e) {
		const err = e as Error & { code?: string };
		const code = String(err.code ?? err.name ?? '');
		if (!insecure && TLS_ERRORS.test(code)) {
			const r = await request(url, true);
			return { ...r, error: r.error ?? `tls: ${code}` };
		}
		if (DEAD_ERRORS.some((d) => code.includes(d)))
			return { status: 'dead', code: null, error: code };
		return { status: 'unknown', code: null, error: code || err.message };
	}
}

async function check(url: string): Promise<Result> {
	let result: Result = { status: 'unknown', code: null };
	for (let i = 0; i < ATTEMPTS; i++) {
		result = await request(url);
		if (result.status === 'live') return result;
		await sleep(result.code === 429 ? 10_000 * (i + 1) : 2_000 * (i + 1));
	}
	return result;
}

// Group by host so we never hammer one server (observablehq.com rate-limits quickly).
const urls = getAllCheckedUrls();
const byHost = new Map<string, string[]>();
for (const url of urls) {
	const host = new URL(url).host;
	byHost.set(host, [...(byHost.get(host) ?? []), url]);
}

const results = new Map<string, Result>();
const queue = [...byHost.values()];
await Promise.all(
	Array.from({ length: HOST_CONCURRENCY }, async () => {
		for (let group = queue.shift(); group; group = queue.shift()) {
			for (const url of group) {
				const r = await check(url);
				results.set(url, r);
				console.log(`${r.status.padEnd(7)} ${String(r.code ?? r.error ?? '').padEnd(28)} ${url}`);
				if (group.length > 1) await sleep(1_500);
			}
		}
	})
);

const prev = previous as LinkStatusFile;
const today = new Date().toISOString().slice(0, 10);
const links: Record<string, LinkStatusEntry> = {};
let changed = Object.keys(prev.links).length !== urls.length;

for (const url of urls) {
	const r = results.get(url)!;
	const old = prev.links[url];
	const same = old && old.status === r.status;
	if (!same) changed = true;
	links[url] = {
		status: r.status,
		code: r.code,
		since: same ? old.since : today,
		...(r.error ? { error: r.error } : {})
	};
}

const counts = Object.values(links).reduce<Record<string, number>>((acc, l) => {
	acc[l.status] = (acc[l.status] ?? 0) + 1;
	return acc;
}, {});
console.log(`\n${urls.length} URLs:`, counts);

if (changed) {
	const out: LinkStatusFile = { updatedAt: today, links };
	writeFileSync(OUT, JSON.stringify(out, null, '\t') + '\n');
	console.log(`Status changed, wrote ${OUT}`);
} else {
	console.log('No status changes.');
}
