<script lang="ts">
	import { base } from '$app/paths';
	import { type YearData, bestPapers, years } from '$lib/data/years';

	let { data }: { data: YearData } = $props();

	let visibleBestPapers = $derived(
		Object.entries(bestPapers)
			.map(([year, items]) => ({ year: parseInt(year), items }))
			.filter((entry) => entry.year <= data.year)
			.sort((a, b) => b.year - a.year)
	);
	let currentYear = Math.max(...Object.keys(years).map(Number));

	function getEditionNumber(year: number): string {
		const edition = year - 2018 + 1; // 2018 was the 1st workshop
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const v = edition % 100;
		return edition + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
	}

	function isPast(dateStr: string): boolean {
		const now = new Date();
		let clean = dateStr
			.replace(/,?\s*anywhere/i, '')
			.replace(/(\d+)(st|nd|rd|th)/g, '$1')
			.split(' at ')[0];

		const date = new Date(clean);

		if (isNaN(date.getTime())) {
			const yearMatch = dateStr.match(/\b(20\d{2})\b/);
			if (yearMatch) {
				const year = parseInt(yearMatch[1]);
				return year < now.getFullYear();
			}
			return false;
		}

		date.setHours(23, 59, 59, 999);
		return now > date;
	}
</script>

<svelte:head>
	<title>{getEditionNumber(data.year)} Workshop on Visualization for AI Explainability</title>
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@visxai" />
	<meta name="twitter:creator" content="@visxai" />
	<meta property="og:url" content="http://visxai.io" />
	<meta
		property="og:title"
		content={`${getEditionNumber(data.year)} Workshop on Visualization for AI Explainability`}
	/>
	<meta property="og:description" content={data.intro[0]} />
	<meta property="og:image" content="http://visxai.github.io/img/share.png" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<!-- Header -->
	<div class="flex flex-col md:flex-row justify-between items-start mb-8">
	<div class="order-2 md:order-1">
		<h1 class="text-4xl font-bold mb-2">
		{getEditionNumber(data.year)} Workshop on <br />
		<span class="text-black">Visualization for AI Explainability</span>
		</h1>
		<p class="text-xl text-gray-600">
		{data.date} at IEEE VIS in {data.location}
		</p>
	</div>
	<div class="mb-4 md:mt-0 order-1 md:order-2">
		<img src="{base}/img/logo_v2.png" alt="VISxAI Logo" class="h-20" />
	</div>
	</div>

	<!-- Intro -->
	<div class="mb-12 text-lg leading-relaxed space-y-4">
		{#each data.intro as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>

	<!-- Examples Image -->
	<div class="mb-12 text-center">
		<img
			src="{base}/img/examples-{data.year}.png"
			alt="Examples {data.year}"
			class="mx-auto max-w-full h-auto mb-4 rounded shadow-sm"
		/>
		<div class="text-sm text-gray-600 text-left">
			Example interactive visualization articles:
			<ul class="list-none pl-0 mt-2 space-y-1">
				{#each data.examples as example, i}
			<li>
			({String.fromCharCode(97 + i)})
			<a href={example.url} target="_blank" class="font-bold text-blue-600 hover:underline"
				>{example.title}</a
			>
			by {example.authors}
			{#if example.year}
				(<a
					href="https://visxai.io/{example.year}"
					class="text-blue-600 hover:underline">VISxAI {example.year}</a
				>)
			{/if}
			</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Important Dates -->
	<section id="dates" class="mb-12">
		<h2 class="text-2xl font-bold mb-4 border-b pb-2">Important Dates</h2>
		<div class="bg-gray-50 p-6 rounded-lg font-mono text-sm md:text-base">
			{#each data.dates as date}
				<div class="mb-2">
					{#if isPast(date.date) || date.strikethrough}
						<span class="line-through text-gray-400">{date.date}</span>:
						<span class="text-gray-400">{date.event}</span>
					{:else}
						<span class="font-bold">{date.date}</span>: {date.event}
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Program -->
	<section id="program" class="mb-12">
		<h2 class="text-2xl font-bold mb-4 border-b pb-2">Program Overview</h2>
		<p class="mb-4 text-gray-600">
			All times in {data.location.includes('Austria') ? 'CET (UTC +1)' : 'ET (UTC -5)'}.
		</p>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<tbody class="bg-white divide-y divide-gray-200">
					{#each data.program as session}
						<tr>
							<td
								class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-32 align-top"
							>
								{session.time}
							</td>
							<td class="px-6 py-4 text-sm text-gray-500 align-top">
								<div class="font-bold text-gray-900 text-base">{@html session.title}</div>
								{#if session.content}
									<div class="mt-1">{session.content}</div>
								{/if}
								{#if session.items}
									<div class="mt-4 space-y-4">
										{#each session.items as item}
											<div>
												<a
													href={item.url}
													target="_blank"
													class="font-bold text-blue-600 hover:underline block"
												>
													{item.title}
												</a>
												<div class="text-gray-600">{item.authors}</div>
											</div>
										{/each}
									</div>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<!-- Call for Participation -->
	{#if data.year === currentYear}
		<section id="call" class="mb-12">
			<h2 class="text-2xl font-bold mb-4 border-b pb-2">Call for Participation</h2>
			<div class="prose max-w-none">
				<p class="mb-4">{data.callForParticipation}</p>
				<div class="mt-6">
					<a
						href="/submit"
						class="inline-block bg-white border border-gray-800 text-gray-800 font-bold py-2 px-6 rounded hover:bg-gray-100 transition-colors"
					>
						Submission instructions
					</a>
				</div>
			</div>
		</section>
	{/if}

	<!-- Hall of Fame -->
	<section id="hall-of-fame" class="mb-12">
		<h2 class="text-2xl font-bold mb-4 border-b pb-2">Hall of Fame</h2>
		<p class="mb-6">
			Each year we award Best Submissions and Honorable Mentions. <i>Congrats to our winners!</i>
		</p>

		{#each visibleBestPapers as yearEntry}
			<div class="mb-6 flex flex-col gap-2">
				<h5 class="text-lg font-bold">VISxAI {yearEntry.year}</h5>
				{#each yearEntry.items as item}
					<div class="flex flex-col">
						<a href={item.url} target="_blank" class="font-bold text-blue-600 hover:underline"
							>{item.title}</a
						>
						<span class="text-gray-600">{item.authors}</span>
					</div>
				{/each}
			</div>
		{/each}
	</section>

	<!-- Organizers -->
	<section id="orga" class="mb-12">
		<h2 class="text-2xl font-bold mb-4 border-b pb-2">
			Organizers <span class="text-sm font-normal text-gray-500">(alphabetic)</span>
		</h2>
		<div class="mb-6">
			{#each data.organizers as person}
				<div class="mb-1">
					<span class="font-bold">{person.name}</span> - {person.affiliation}
				</div>
			{/each}
		</div>

		<h5 class="text-lg font-bold mb-2">Steering Committee</h5>
		<div>
			{#each data.steeringCommittee as person}
				<div class="mb-1">
					<span class="font-bold">{person.name}</span> - {person.affiliation}
				</div>
			{/each}
		</div>
	</section>

	<!-- PC -->
	<section id="pc" class="mb-12">
		<h2 class="text-2xl font-bold mb-4 border-b pb-2">Program Committee and Reviewers</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
			{#each data.pc as person}
				<div>{person}</div>
			{/each}
		</div>
	</section>
</div>
