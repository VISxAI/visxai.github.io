<script lang="ts">
	import { onMount } from 'svelte';
	import { Charset, Document } from 'flexsearch';
	import OfflineBadge from '$lib/components/OfflineBadge.svelte';
	import {
		formatAcceptedDate,
		getAllSubmissions,
		linksUpdatedAt,
		sortSubmissions,
		type PresentationType,
		type Submission
	} from '$lib/data/submissions';

	const submissions = sortSubmissions(getAllSubmissions());
	const byId = new Map(submissions.map((s) => [s.id, s]));
	const allYears = [...new Set(submissions.map((s) => s.year))].sort((a, b) => b - a);
	const offlineCount = submissions.filter((s) => s.status === 'dead').length;
	const awardCount = submissions.filter((s) => s.award).length;

	type Doc = {
		id: string;
		title: string;
		authors: string;
		abstract: string;
		session: string;
		year: string;
	};

	const index = new Document<Doc>({
		tokenize: 'forward',
		encoder: Charset.LatinBalance,
		document: {
			id: 'id',
			index: ['title', 'authors', 'abstract', 'session', 'year']
		}
	});
	for (const s of submissions) {
		index.add({
			id: s.id,
			title: s.title,
			authors: s.authors,
			abstract: s.abstract ?? '',
			session: s.session ?? '',
			year: String(s.year)
		});
	}

	const presentationLabels: Record<PresentationType, string> = {
		talk: 'Talk',
		poster: 'Poster',
		demo: 'Demo',
		online: 'Published'
	};

	let query = $state('');
	let year = $state<'all' | number>('all');
	let awardsOnly = $state(false);
	let hideOffline = $state(false);

	let results = $derived.by(() => {
		let list: Submission[];
		const q = query.trim();
		if (q) {
			const hits = index.search(q, { limit: 500, merge: true }) as unknown as { id: string }[];
			list = hits.map((h) => byId.get(h.id)).filter((s): s is Submission => !!s);
			// Keep relevance order, but surface reachable submissions first.
			list = [
				...list.filter((s) => s.status !== 'dead'),
				...list.filter((s) => s.status === 'dead')
			];
		} else {
			list = submissions;
		}
		if (year !== 'all') list = list.filter((s) => s.year === year);
		if (awardsOnly) list = list.filter((s) => s.award);
		if (hideOffline) list = list.filter((s) => s.status !== 'dead');
		return list;
	});

	// Keep the search shareable via ?q=&year=&awards=1&live=1 (browser only; page is prerendered).
	let ready = false;
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		query = params.get('q') ?? '';
		const y = Number(params.get('year'));
		if (allYears.includes(y)) year = y;
		awardsOnly = params.get('awards') === '1';
		hideOffline = params.get('live') === '1';
		ready = true;
	});
	$effect(() => {
		// Local throwaway object used only to serialize the query string; no reactivity needed.
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const params = new URLSearchParams();
		if (query.trim()) params.set('q', query.trim());
		if (year !== 'all') params.set('year', String(year));
		if (awardsOnly) params.set('awards', '1');
		if (hideOffline) params.set('live', '1');
		if (!ready) return;
		const qs = params.toString();
		history.replaceState(history.state, '', qs ? `?${qs}` : window.location.pathname);
	});

	function yearHref(s: Submission): string {
		return s.rolling ? `/${s.year}#submissions` : `/${s.year}#program`;
	}
</script>

<section aria-label="Explainables catalog">
	<div class="flex flex-col sm:flex-row gap-3 mb-3">
		<label class="flex-1">
			<span class="sr-only">Search explainables</span>
			<input
				type="search"
				bind:value={query}
				placeholder="Search explainables by title, author, topic, or year…"
				class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				autocomplete="off"
			/>
		</label>
		<label>
			<span class="sr-only">Filter by year</span>
			<select
				bind:value={year}
				class="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="all">All years</option>
				{#each allYears as y (y)}
					<option value={y}>{y}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="flex flex-wrap items-center justify-between gap-3 mb-6 text-sm text-gray-600">
		<div class="flex flex-wrap items-center gap-4">
			<label class="inline-flex items-center gap-2 cursor-pointer">
				<input type="checkbox" bind:checked={awardsOnly} class="rounded" />
				Awards only ({awardCount})
			</label>
			<label class="inline-flex items-center gap-2 cursor-pointer">
				<input type="checkbox" bind:checked={hideOffline} class="rounded" />
				Hide offline ({offlineCount})
			</label>
		</div>
		<span aria-live="polite" class="font-mono text-xs text-gray-500">
			{results.length}
			{results.length === 1 ? 'explainable' : 'explainables'}
		</span>
	</div>

	{#if results.length === 0}
		<p class="text-gray-600 py-8 text-center">No explainables match your search.</p>
	{:else}
		<ul class="divide-y divide-gray-200 border-t border-gray-200">
			{#each results as s (s.id)}
				{@const dateLabel = formatAcceptedDate(s.acceptedDate) ?? String(s.year)}
				<li class="py-4 flex flex-col sm:flex-row sm:gap-4 gap-1">
					<a
						href={yearHref(s)}
						class="shrink-0 sm:w-20 text-xs sm:text-sm font-mono text-gray-500 hover:text-gray-900 sm:pt-0.5"
						title={s.acceptedDate
							? `Accepted ${s.acceptedDate} (VISxAI ${s.year})`
							: `VISxAI ${s.year} program`}
					>
						{dateLabel}
					</a>
					<div class="min-w-0 flex-1">
						<div>
							<a
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								class="font-bold hover:underline {s.status === 'dead'
									? 'text-gray-500'
									: 'text-blue-600'}">{s.title}</a
							>{#if s.award}<span
									class="inline-block align-middle ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200"
									title="Best Submission / Honorable Mention">Award</span
								>{/if}{#if s.presentationType && s.presentationType !== 'online'}<span
									class="inline-block align-middle ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200"
									title="VISxAI {s.year} {presentationLabels[s.presentationType]}"
									>{presentationLabels[s.presentationType]}</span
								>{/if}<OfflineBadge url={s.url} />
						</div>
						<div class="text-gray-600 text-sm">{s.authors}</div>
						{#if s.abstract}
							<p class="text-gray-700 text-sm mt-1.5 leading-relaxed">{s.abstract}</p>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}

	{#if linksUpdatedAt}
		<p class="mt-8 text-xs text-gray-400">
			Links are checked automatically; “Offline” means the link could not be reached. Status last
			changed {linksUpdatedAt}.
		</p>
	{/if}
</section>
