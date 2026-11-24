import { bestPapers, years, type AcceptedSubmission, type PresentationType } from './years';
import linkStatus from './link-status.json';
import linkOverrides from './link-overrides.json';

export type { AcceptedSubmission, PresentationType };

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
	acceptedDate?: string;
	abstract?: string;
	presentationType?: PresentationType;
	rolling?: boolean;
	session?: string;
	award: boolean;
	status: LinkState;
	statusSince?: string;
}

const MONTH_ABBR = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

/**
 * Format an ISO calendar date (YYYY-MM-DD or YYYY-MM) into "Mon YYYY" without
 * constructing a timezone-dependent Date instant.
 */
export function formatAcceptedDate(iso?: string): string | undefined {
	if (!iso) return undefined;
	const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(iso.trim());
	if (!match) return iso;
	const year = match[1];
	const monthIdx = Number(match[2]) - 1;
	const month = MONTH_ABBR[monthIdx];
	return month ? `${month} ${year}` : year;
}

export function sortSubmissions(list: Submission[]): Submission[] {
	return [...list].sort((a, b) => {
		if (b.year !== a.year) return b.year - a.year;
		const aDate = a.acceptedDate ?? '';
		const bDate = b.acceptedDate ?? '';
		if (aDate !== bDate) return bDate.localeCompare(aDate);
		return a.title.localeCompare(b.title);
	});
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
 * Every accepted submission across all years: rolling/accepted entries, program
 * items with a URL, plus Hall of Fame entries (deduplicated by year + URL).
 */
export function getAllSubmissions(): Submission[] {
	const byKey = new Map<string, Submission>();
	const awardKeys = new Set(
		Object.entries(bestPapers).flatMap(([year, items]) => items.map((i) => `${year}|${i.url}`))
	);

	const add = (
		item: {
			title: string;
			url?: string;
			authors: string;
			acceptedDate?: string;
			abstract?: string;
			presentationType?: PresentationType;
		},
		year: number,
		opts: { session?: string; rolling?: boolean } = {}
	) => {
		if (!item.url) return;
		const key = `${year}|${item.url}`;
		const existing = byKey.get(key);
		if (existing) {
			if (!existing.session && opts.session) existing.session = opts.session;
			if (!existing.presentationType && item.presentationType) {
				existing.presentationType = item.presentationType;
			}
			if (!existing.acceptedDate && item.acceptedDate) existing.acceptedDate = item.acceptedDate;
			if (!existing.abstract && item.abstract) existing.abstract = item.abstract;
			return;
		}
		byKey.set(key, {
			id: key,
			title: stripHtml(item.title),
			authors: item.authors,
			url: item.url,
			year,
			acceptedDate: item.acceptedDate,
			abstract: item.abstract,
			presentationType: item.presentationType,
			rolling: opts.rolling,
			session: opts.session,
			award: awardKeys.has(key),
			status: getLinkStatus(item.url),
			statusSince: getStatusSince(item.url)
		});
	};

	for (const data of Object.values(years)) {
		for (const item of data.submissions ?? []) {
			add(item, data.year, { rolling: Boolean(data.rolling) });
		}
		for (const session of data.program) {
			for (const item of session.items ?? []) {
				add(item, data.year, { session: stripHtml(session.title), rolling: Boolean(data.rolling) });
			}
		}
	}
	for (const [year, items] of Object.entries(bestPapers)) {
		for (const item of items) add(item, Number(year));
	}

	return [...byKey.values()];
}

/** Accepted submissions for a single year, sorted newest-first. */
export function getSubmissionsForYear(year: number): Submission[] {
	return sortSubmissions(getAllSubmissions().filter((s) => s.year === year));
}

export function getRollingSubmissions(year: number): AcceptedSubmission[] {
	const list = years[year]?.submissions ?? [];
	return [...list].sort((a, b) => {
		const aDate = a.acceptedDate ?? '';
		const bDate = b.acceptedDate ?? '';
		if (aDate !== bDate) return bDate.localeCompare(aDate);
		return a.title.localeCompare(b.title);
	});
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
