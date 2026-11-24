<script lang="ts">
	import { base } from '$app/paths';
	import { latestYear, years } from '$lib/data/years';

	const latest = years[latestYear];

	function getEditionNumber(year: number): string {
		const edition = year - 2018 + 1;
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const v = edition % 100;
		return edition + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
	}
</script>

<svelte:head>
	<title>Submit - VISxAI</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<div class="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
		<div>
			<h1 class="text-4xl font-bold mb-2">
				Submit an Explainable
			</h1>
			<p class="text-xl text-gray-600">
				{getEditionNumber(latest.year)} Workshop on Visualization for AI Explainability ({latest.date}
				at IEEE VIS{#if latest.location && latest.location !== 'TBD'} in {latest.location}{/if})
			</p>
		</div>
		<div class="shrink-0">
			<img src="{base}/img/logo_v2.png" alt="VISxAI Logo" class="h-20" />
		</div>
	</div>

	<div class="space-y-8 text-lg leading-relaxed">
		<section>
			<h2 class="text-2xl font-bold mb-3 border-b pb-2">How Rolling Submissions Work</h2>
			<div class="space-y-4 text-gray-700">
				<p>
					VISxAI accepts <strong>interactive visual explainables, explorables, and notebook-style articles</strong>
					on a rolling basis throughout the year. We aim for a high editorial bar focused on clear,
					insightful visual explanations of AI techniques and models.
				</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Year-round publication:</strong> Submissions are peer-reviewed as they arrive and
						published directly on <a href="/" class="text-blue-600 hover:underline">visxai.io</a> once
						accepted.
					</li>
					<li>
						<strong>Annual IEEE VIS workshop:</strong> Each year we select the top accepted explainables
						for presentation slots at the workshop, alongside keynotes and open discussion. Additional
						accepted works may be invited to present as a poster or interactive demo.
					</li>
					<li>
						<strong>In-person presentations:</strong> Conference presentation slots at IEEE VIS are
						<strong>in-person only</strong>.
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h2 class="text-2xl font-bold mb-3 border-b pb-2">What to Prepare</h2>
			<p class="text-gray-700 mb-3">
				To make a complete submission, please prepare:
			</p>
			<ul class="list-disc pl-6 space-y-2 text-gray-700">
				<li><strong>Title, author list, and a short abstract</strong> (1–2 sentences summarizing what your explainable teaches).</li>
				<li>
					<strong>A live URL</strong> hosting your interactive article/explorable, and/or
					<strong>source code / notebook / PDF</strong>. At least one of a live link or document is required;
					submitting both is encouraged.
				</li>
			</ul>
		</section>

		<section class="rounded-lg border border-amber-200 bg-amber-50 p-6">
			<h2 class="text-xl font-bold text-amber-900 mb-2">
				VISxAI {latest.year} Submission Portal — Details Coming Soon
			</h2>
			<p class="text-base text-amber-900/90 leading-relaxed">
				We are finalizing our year-round submission and review portal for VISxAI {latest.year}. Once
				live, step-by-step instructions and the submission link will be posted right here. In the
				meantime, you can browse <a href="/" class="underline font-semibold">published explainables</a>
				or check the <a href="/workshop" class="underline font-semibold">VISxAI {latest.year} workshop page</a>
				for updates.
			</p>
		</section>
	</div>
</div>
