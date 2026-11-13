<script lang="ts">
	import { getStatusSince, isOffline } from '$lib/data/submissions';

	let { url }: { url: string | undefined } = $props();

	let offline = $derived(isOffline(url));
	let since = $derived(getStatusSince(url));
</script>

{#if offline}
	<span
		class="inline-block align-middle ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-gray-100 text-gray-500 border border-gray-200 no-underline"
		title={since
			? `This link could not be reached (offline since ${since})`
			: 'This link could not be reached'}
	>
		Offline
	</span>
{/if}
