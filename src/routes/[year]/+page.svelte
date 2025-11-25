<script lang="ts">
	import { page } from '$app/stores';
	import YearPage from '$lib/components/YearPage.svelte';
	import { getYearData } from '$lib/data/years';
	import { error } from '@sveltejs/kit';

	// Reactive statement to get the year from the URL
	$: year = parseInt($page.params.year);
	$: data = getYearData(year);

	// If data is not found, we should probably handle 404, but for now let's just let it fail or show error
	$: if (!data) {
		throw error(404, 'Year not found');
	}
</script>

{#if data}
	<YearPage {data} />
{/if}
