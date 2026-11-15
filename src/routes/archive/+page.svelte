<script lang="ts">
	import { onMount } from 'svelte';
	import { Charset, Document } from 'flexsearch';
	import OfflineBadge from '$lib/components/OfflineBadge.svelte';
	import { getAllSubmissions, linksUpdatedAt, type Submission } from '$lib/data/submissions';

	const submissions = getAllSubmissions().sort(
		(a, b) => b.year - a.year || a.title.localeCompare(b.title)
	);
	const byId = new Map(submissions.map((s) => [s.id, s]));
	const allYears = [...new Set(submissions.map((s) => s.year))].sort((a, b) => b - a);
	const offlineCount = submissions.filter((s) => s.status === 'dead').length;

	type Doc = { id: string; title: string; authors: string; session: string; year: string };

	const index = new Document<Doc>({
		tokenize: 'forward',
		encoder: Charset.LatinBalance,
		document: {
			id: 'id',
			index: ['title', 'authors', 'session', 'year']
		}
	});
	for (const s of submissions) {
		index.add({
			id: s.id,
			title: s.title,
			authors: s.authors,
			session: s.session ?? '',
			year: String(s.year)
		});
	}

	let query = $state('');
	let year = $state<'all' | number>('all');
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
		if (hideOffline) list = list.filter((s) => s.status !== 'dead');
		return list;
	});

	// Keep the search shareable via ?q=&year=&live=1 (browser only; the page is prerendered).
	let ready = false;
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		query = params.get('q') ?? '';
		const y = Number(params.get('year'));
		if (allYears.includes(y)) year = y;
		hideOffline = params.get('live') === '1';
		ready = true;
	});
	$effect(() => {
		// Local throwaway object used only to serialize the query string; no reactivity needed.
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const params = new URLSearchParams();
		if (query.trim()) params.set('q', query.trim());
		if (year !== 'all') params.set('year', String(year));
		if (hideOffline) params.set('live', '1');
		if (!ready) return;
		const qs = params.toString();
		history.replaceState(history.state, '', qs ? `?${qs}` : window.location.pathname);
	});
</script>

<svelte:head>
	<title>All Submissions – VISxAI</title>
	<meta
		name="description"
		content="Search all explainables and explorables presented at the VISxAI workshop since 2018."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<h1 class="text-4xl font-bold mb-2">All Submissions</h1>
	<p class="text-lg text-gray-600 mb-8">
		Every explainable presented at VISxAI since 2018. Search by title, author, or year.
	</p>

	<div class="flex flex-col sm:flex-row gap-3 mb-3">
		<label class="flex-1">
			<span class="sr-only">Search submissions</span>
			<input
				type="search"
				bind:value={query}
				placeholder="Search e.g. transformer, attention, Hohman…"
				class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				autocomplete="off"
			/>
		</label>
		<label>
			<span class="sr-only">Year</span>
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

	<div class="flex flex-wrap items-center justify-between gap-2 mb-6 text-sm text-gray-600">
		<label class="inline-flex items-center gap-2 cursor-pointer">
			<input type="checkbox" bind:checked={hideOffline} class="rounded" />
			Hide offline submissions ({offlineCount})
		</label>
		<span aria-live="polite">
			{results.length}
			{results.length === 1 ? 'submission' : 'submissions'}
		</span>
	</div>

	{#if results.length === 0}
		<p class="text-gray-600 py-8 text-center">No submissions match your search.</p>
	{:else}
		<ul class="divide-y divide-gray-200">
			{#each results as s (s.id)}
				<li class="py-4 flex gap-4">
					<a
						href="/{s.year}#program"
						class="shrink-0 w-12 text-sm font-mono text-gray-500 hover:text-gray-900 pt-0.5"
						title="VISxAI {s.year} program">{s.year}</a
					>
					<div class="min-w-0">
						<div>
							<a
								href={s.url}
								target="_blank"
								rel="noopener"
								class="font-bold hover:underline {s.status === 'dead'
									? 'text-gray-500'
									: 'text-blue-600'}">{s.title}</a
							>{#if s.award}<span
									class="inline-block align-middle ml-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200"
									title="Best Submission / Honorable Mention">Award</span
								>{/if}<OfflineBadge url={s.url} />
						</div>
						<div class="text-gray-600 text-sm">{s.authors}</div>
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
</div>
