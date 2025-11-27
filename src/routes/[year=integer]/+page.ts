import { getYearData, years } from '$lib/data/years';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(years).map((year) => ({ year }));
}

export const load = ({ params }) => {
	const year = parseInt(params.year);
	const data = getYearData(year);

	if (!data) {
		throw error(404, `Year ${year} not found`);
	}

	return {
		year,
		data
	};
};
