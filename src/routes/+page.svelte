<script>
    import YearPage from '$lib/components/YearPage.svelte';
    import { latestYear, years } from '$lib/data/years';
    
    const data = years[latestYear];
</script>

<YearPage {data} />
