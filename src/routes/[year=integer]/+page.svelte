<script lang="ts">
	import YearPage from '$lib/components/YearPage.svelte';

	let { data } = $props();
</script>

<YearPage data={data.data} />
