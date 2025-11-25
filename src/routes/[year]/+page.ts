import { years } from '$lib/data/years';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(years).map((year) => ({ year }));
}
