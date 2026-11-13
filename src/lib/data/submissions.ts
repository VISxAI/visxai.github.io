import { bestPapers, years } from './years';
import linkStatus from './link-status.json';
import linkOverrides from './link-overrides.json';

/**
 * - live: the URL responded successfully on the last check
 * - dead: the URL was unreachable or returned 404/410 on the last check
 * - unknown: the check was inconclusive (rate-limited, bot-blocked, server error)
 *   or the URL has not been checked yet. Treated like live in the UI.
 */
export type LinkState = 'live' | 'dead' | 'unknown';

export interface LinkStatusEntry {
	status: LinkState;
	code: number | null;
	/** Date (YYYY-MM-DD) the link entered its current status. */
	since: string;
	error?: string;
}

export interface LinkStatusFile {
	updatedAt: string | null;
	links: Record<string, LinkStatusEntry>;
}

export interface Submission {
	id: string;
	title: string;
	authors: string;
	url: string;
	year: number;
	session?: string;
	award: boolean;
	status: LinkState;
	statusSince?: string;
}

const statusFile = linkStatus as LinkStatusFile;
const overrides = linkOverrides as Record<string, LinkState | string>;

/** Status for a URL, with manual overrides in link-overrides.json taking precedence. */
export function getLinkStatus(url: string | undefined): LinkState {
	if (!url) return 'unknown';
	const override = overrides[url];
	if (override === 'live' || override === 'dead' || override === 'unknown') return override;
	return statusFile.links[url]?.status ?? 'unknown';
}

export function isOffline(url: string | undefined): boolean {
	return getLinkStatus(url) === 'dead';
}

export const linksUpdatedAt = statusFile.updatedAt;

export function getStatusSince(url: string | undefined): string | undefined {
	return url ? statusFile.links[url]?.since : undefined;
}

function stripHtml(s: string): string {
	return s.replace(/<[^>]*>/g, '').trim();
}

/**
 * Every accepted submission across all years: program items with a URL, plus
 * Hall of Fame entries (deduplicated by year + URL).
 */
export function getAllSubmissions(): Submission[] {
	const byKey = new Map<string, Submission>();
	const awardKeys = new Set(
		Object.entries(bestPapers).flatMap(([year, items]) => items.map((i) => `${year}|${i.url}`))
	);

	const add = (
		item: { title: string; url?: string; authors: string },
		year: number,
		session?: string
	) => {
		if (!item.url) return;
		const key = `${year}|${item.url}`;
		if (byKey.has(key)) return;
		byKey.set(key, {
			id: key,
			title: stripHtml(item.title),
			authors: item.authors,
			url: item.url,
			year,
			session,
			award: awardKeys.has(key),
			status: getLinkStatus(item.url),
			statusSince: getStatusSince(item.url)
		});
	};

	for (const data of Object.values(years)) {
		for (const session of data.program) {
			for (const item of session.items ?? []) add(item, data.year, stripHtml(session.title));
		}
	}
	for (const [year, items] of Object.entries(bestPapers)) {
		for (const item of items) add(item, Number(year));
	}

	return [...byKey.values()];
}

/** Every external URL we want to monitor: submissions, Hall of Fame, and examples. */
export function getAllCheckedUrls(): string[] {
	const urls = new Set<string>();
	for (const s of getAllSubmissions()) urls.add(s.url);
	for (const data of Object.values(years)) {
		for (const ex of data.examples) urls.add(ex.url);
	}
	return [...urls].filter((u) => /^https?:\/\//.test(u)).sort();
}
