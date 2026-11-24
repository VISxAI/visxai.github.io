<script lang="ts">
	import { base } from '$app/paths';
	import ExplainablesStream from '$lib/components/ExplainablesStream.svelte';
	import { latestYear, years } from '$lib/data/years';

	const latest = years[latestYear];
</script>

<svelte:head>
	<title>VISxAI — Visualization for AI Explainability</title>
	<meta
		name="description"
		content="Open, peer-reviewed visual explainables and explorables of AI systems, paired with the annual VISxAI workshop at IEEE VIS."
	/>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@visxai" />
	<meta name="twitter:creator" content="@visxai" />
	<meta property="og:url" content="https://visxai.io" />
	<meta property="og:title" content="VISxAI — Visualization for AI Explainability" />
	<meta
		property="og:description"
		content="Open, peer-reviewed visual explainables and explorables of AI systems, paired with the annual VISxAI workshop at IEEE VIS."
	/>
	<meta property="og:image" content="https://visxai.io/img/share.png" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Header -->
	<header class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
		<div class="order-2 md:order-1">
			<h1 class="text-4xl font-bold mb-2">Visualization for AI Explainability</h1>
			<p class="text-lg text-gray-600 leading-relaxed max-w-2xl">
				Interactive visual explainables and explorables that illuminate how AI systems work—published
				on a rolling basis and celebrated each year at IEEE VIS.
			</p>
		</div>
		<div class="order-1 md:order-2 shrink-0">
			<img src="{base}/img/logo_v2.png" alt="VISxAI Logo" class="h-16 md:h-20" />
		</div>
	</header>

	<!-- Rolling Submissions & Annual Workshop Callout -->
	<div
		class="mb-8 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
	>
		<div class="text-sm text-gray-700 leading-relaxed">
			<span class="font-bold text-gray-900">VISxAI {latest.year} — Rolling Submissions Open.</span>
			Accepted explainables are published here year-round; top selections are invited to present in
			person at IEEE VIS ({latest.date}).
		</div>
		<div class="flex flex-wrap items-center gap-2 shrink-0">
			<a
				href="/submit"
				class="inline-block bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-gray-700 transition-colors"
			>
				Submit
			</a>
			<a
				href="/workshop"
				class="inline-block bg-white border border-gray-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors"
			>
				Workshop Details
			</a>
		</div>
	</div>

	<!-- Searchable Editorial Stream -->
	<ExplainablesStream />
</div>
