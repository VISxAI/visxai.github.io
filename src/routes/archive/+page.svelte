<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const qs = window.location.search;
		goto(qs ? `/${qs}` : '/', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Explainables – VISxAI</title>
	<meta http-equiv="refresh" content="0;url=/" />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-4xl text-center text-gray-600">
	<p>
		All VISxAI explainables now live on the <a href="/" class="text-blue-600 hover:underline"
			>homepage</a
		>.
	</p>
</div>
