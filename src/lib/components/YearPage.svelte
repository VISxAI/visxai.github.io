<script lang="ts">
	import { base } from '$app/paths';
	import {
		type ImportantDate,
		type PresentationType,
		type YearData,
		bestPapers,
		years
	} from '$lib/data/years';
	import { formatAcceptedDate, getRollingSubmissions, isOffline } from '$lib/data/submissions';
	import OfflineBadge from './OfflineBadge.svelte';

	let { data }: { data: YearData } = $props();

	let visibleBestPapers = $derived(
		Object.entries(bestPapers)
			.map(([year, items]) => ({ year: parseInt(year), items }))
			.filter((entry) => entry.year <= data.year)
			.sort((a, b) => b.year - a.year)
	);
	let visibleKeynotes = $derived(data.keynotes ?? (data.keynote ? [data.keynote] : []));
	let rollingSubmissions = $derived(getRollingSubmissions(data.year));
	let callParagraphs = $derived(
		Array.isArray(data.callForParticipation)
			? data.callForParticipation
			: [data.callForParticipation]
	);
	let currentYear = Math.max(...Object.keys(years).map(Number));

	const presentationLabels: Record<PresentationType, string> = {
		talk: 'Talk',
		poster: 'Poster',
		demo: 'Demo',
		online: 'Published'
	};

	function getEditionNumber(year: number): string {
		const edition = year - 2018 + 1; // 2018 was the 1st workshop
		const suffixes = ['th', 'st', 'nd', 'rd'];
		const v = edition % 100;
		return edition + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
	}

	function isPast(item: ImportantDate): boolean {
		if (item.ongoing) return false;
		const dateStr = item.date;
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
		{data.date} at IEEE VIS{#if data.location && data.location !== 'TBD'} in {data.location}{/if}
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
			src="{base}{data.examplesImage ?? `/img/examples-${data.year}.png`}"
			alt="Examples {data.year}"
			class="mx-auto max-w-full h-auto mb-4 rounded shadow-sm"
		/>
		<div class="text-sm text-gray-600 text-left">
			Example interactive visualization articles:
			<ul class="list-none pl-0 mt-2 space-y-1">
				{#each data.examples as example, i}
			<li>
			({String.fromCharCode(97 + i)})
			<a
				href={example.url}
				target="_blank"
				class="font-bold hover:underline {isOffline(example.url) ? 'text-gray-500' : 'text-blue-600'}"
				>{example.title}</a
			><OfflineBadge url={example.url} />
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
					{#if isPast(date) || date.strikethrough}
						<span class="line-through text-gray-400">{date.date}</span>:
						<span class="text-gray-400">{date.event}</span>
					{:else}
						{#if date.previousDate}
							<span class="line-through text-gray-500">{date.previousDate}</span>{' '}
						{/if}
						<span class="font-bold">{date.date}</span>: {date.event}
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Accepted Explainables (Rolling Editions) -->
	{#if data.rolling || rollingSubmissions.length > 0}
		<section id="submissions" class="mb-12">
			<div class="flex items-baseline justify-between border-b pb-2 mb-4">
				<h2 class="text-2xl font-bold">Accepted Explainables ({data.year})</h2>
				<a href="/" class="text-sm text-blue-600 hover:underline">Browse all years →</a>
			</div>
			{#if rollingSubmissions.length > 0}
				<ul class="divide-y divide-gray-200">
					{#each rollingSubmissions as item (item.url)}
						{@const dateLabel = formatAcceptedDate(item.acceptedDate) ?? String(data.year)}
						<li class="py-4 flex flex-col sm:flex-row sm:gap-4 gap-1">
							<span class="shrink-0 sm:w-20 text-xs sm:text-sm font-mono text-gray-500 sm:pt-0.5">
								{dateLabel}
							</span>
							<div class="min-w-0 flex-1">
								<div>
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										class="font-bold hover:underline {isOffline(item.url)
											? 'text-gray-500'
											: 'text-blue-600'}"
									>
										{item.title}
									</a>{#if item.presentationType && item.presentationType !== 'online'}<span
											class="inline-block align-middle ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200"
											>{presentationLabels[item.presentationType]}</span
										>{/if}<OfflineBadge url={item.url} />
								</div>
								<div class="text-gray-600 text-sm">{item.authors}</div>
								{#if item.abstract}
									<p class="text-gray-700 text-sm mt-1.5 leading-relaxed">{item.abstract}</p>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-gray-600">
					Rolling submissions for VISxAI {data.year} are open. Accepted explainables will be
					published here and on the <a href="/" class="text-blue-600 hover:underline">main feed</a>
					as they pass review.
				</p>
			{/if}
		</section>
	{/if}

	<!-- Keynote -->
	{#if visibleKeynotes.length > 0}
		<section id="keynote" class="mb-12">
			<h2 class="text-2xl font-bold mb-4 border-b pb-2">
				{visibleKeynotes.length > 1 ? 'Keynote Speakers' : 'Keynote Speaker'}
			</h2>
			<div class="space-y-6">
				{#each visibleKeynotes as keynote (keynote.name)}
					<div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
						<div class="flex flex-col md:flex-row gap-6 items-start">
							{#if keynote.image}
								<img
									src={keynote.image}
									alt={keynote.name}
									class="w-32 h-32 rounded-full object-cover shadow-sm mx-auto md:mx-0 flex-shrink-0"
								/>
							{/if}
							<div class="flex-1 w-full">
								<div class="flex flex-wrap items-baseline gap-x-2">
									<h3 class="text-xl font-bold text-gray-900">
										{#if keynote.url}
											<a
												href={keynote.url}
												target="_blank"
												rel="noopener noreferrer"
												class="hover:text-blue-600 hover:underline"
											>
												{keynote.name}
											</a>
										{:else}
											{keynote.name}
										{/if}
									</h3>
									{#if keynote.affiliation}
										<span class="text-gray-600 text-base">({keynote.affiliation})</span>
									{/if}
								</div>

								{#if keynote.title}
									<div class="mt-4 pt-4 border-t border-gray-200">
										<span class="text-xs uppercase tracking-wider font-bold text-gray-500 block mb-1">
											Keynote Talk
										</span>
										<h4 class="text-lg font-semibold text-gray-900">
											{keynote.title}
										</h4>
										{#if keynote.videoId}
											<a
												href="https://www.youtube.com/watch?v={keynote.videoId}"
												target="_blank"
												rel="noopener noreferrer"
												class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
											>
												Watch on YouTube
												<svg
													viewBox="0 0 24 24"
													class="w-3.5 h-3.5"
													fill="none"
													stroke="currentColor"
													stroke-width="2.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													aria-hidden="true"
												>
													<path d="M7 17L17 7M8 7h9v9" />
												</svg>
											</a>
										{/if}
										{#if keynote.abstract}
											<p class="mt-2 text-gray-700 leading-relaxed text-sm md:text-base">
												{keynote.abstract}
											</p>
										{/if}
									</div>
								{/if}

								{#if keynote.bio}
									<p class="mt-3 text-sm text-gray-600 leading-relaxed">
										{keynote.bio}
									</p>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Program -->
	<section id="program" class="mb-12">
		<h2 class="text-2xl font-bold mb-4 border-b pb-2">Program Overview</h2>
		{#if data.program.length > 0}
			<p class="mb-4 text-gray-600">
				All times in {data.timezone ??
					(data.location.includes('Austria') ? 'CET (UTC +1)' : 'ET (UTC -5)')}.
				{#if data.programNote}{data.programNote}{/if}
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
										<div class="mt-1">
											{#if session.recordingUrl}
												<a
													href={session.recordingUrl}
													target="_blank"
													rel="noopener noreferrer"
													class="font-bold text-blue-600 hover:underline">{session.content}</a
												>
											{:else}
												{session.content}
											{/if}
										</div>
									{/if}
									{#if session.items}
										<div class="mt-4 space-y-4">
											{#each session.items as item}
												<div>
													{#if item.url}
														<a
															href={item.url}
															target="_blank"
															class="font-bold hover:underline {isOffline(item.url)
																? 'text-gray-500'
																: 'text-blue-600'}"
														>
															{item.title}
														</a><OfflineBadge url={item.url} />
													{:else}
														<span class="font-bold text-gray-900">{item.title}</span>
													{/if}
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
		{:else}
			<p class="text-gray-600">
				The workshop program will be announced closer to the event date.
			</p>
		{/if}
	</section>

	<!-- Call for Participation -->
	{#if data.year === currentYear}
		<section id="call" class="mb-12">
			<h2 class="text-2xl font-bold mb-4 border-b pb-2">Call for Participation</h2>
			<div class="prose max-w-none space-y-4">
				{#each callParagraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
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
						<div>
							<a
								href={item.url}
								target="_blank"
								class="font-bold hover:underline {isOffline(item.url) ? 'text-gray-500' : 'text-blue-600'}"
								>{item.title}</a
							><OfflineBadge url={item.url} />
						</div>
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
		{#if data.pc.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
				{#each data.pc as person}
					<div>{person}</div>
				{/each}
			</div>
		{:else}
			<p class="text-gray-600">
				The {data.year} Program Committee and rolling reviewer pool will be listed here soon.
			</p>
		{/if}
	</section>
</div>
