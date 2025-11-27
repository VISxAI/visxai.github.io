<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Submit - VISxAI Workshop</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<div class="flex flex-col md:flex-row justify-between items-start mb-8">
		<div>
			<h1 class="text-4xl font-bold mb-2">
				8th Workshop on <br />
				<span class="text-black">Visualization for AI Explainability</span>
			</h1>
			<p class="text-xl text-gray-600">November 2, 2025 at IEEE VIS in Vienna, Austria</p>
		</div>
		<div class="mt-4 md:mt-0">
			<img src="{base}/img/logo_v2.png" alt="VISxAI Logo" class="h-20" />
		</div>
	</div>

	<h2 class="text-2xl font-bold mb-6 border-b pb-2">HOW TO submit an explainable? (in 4 steps)</h2>

	<div class="space-y-8 text-lg">
		<p>
			We use the PCS submission system to take your submissions for <strong>explainables</strong>.
		</p>

		<div>
			<p class="font-bold mb-2">Step 1</p>
			<p class="mb-4">
				Go to <a
					href="https://new.precisionconference.com"
					target="_blank"
					class="text-blue-600 hover:underline">https://new.precisionconference.com</a
				> and login or create a login:
			</p>
			<div class="text-center">
				<img
					src="{base}/img/submit00.png"
					alt="Login or create login"
					class="mx-auto max-w-full h-auto rounded shadow-sm border"
				/>
				<div class="text-sm text-gray-600 mt-2">Login or create login (red circle)</div>
			</div>
		</div>

		<div>
			<p class="font-bold mb-2">Step 2</p>
			<p class="mb-4">
				Go to the tab 'submission' and select <code class="bg-gray-100 px-1 py-0.5 rounded"
					>Society 'VGTC' -> Conference 'VIS 2025' -> Track 'VIS 2025 VISxAI Workshop Blog Posts'</code
				>:
			</p>
			<div class="text-center">
				<img
					src="{base}/img/submit01.png"
					alt="Choose VIS 2025 VISxAI Workshop Blog Posts"
					class="mx-auto max-w-full h-auto rounded shadow-sm border"
				/>
				<div class="text-sm text-gray-600 mt-2">
					Choose <strong>VIS 2025 VISxAI Workshop Blog Posts</strong> for Explainables
				</div>
			</div>
		</div>

		<div>
			<p class="font-bold mb-2">Step 3</p>
			<p class="mb-4">
				Fill in title, all authors, and abstract. If you have an online version of your submission
				please add the link to the abstract. If you have source code, PDFs, etc.. please add as
				document.
				<strong>Either the link or the document is required for a complete submission.</strong> Submitting
				both is allowed.
			</p>
			<div class="text-center">
				<img
					src="{base}/img/submit02.png"
					alt="Submission form"
					class="mx-auto max-w-full h-auto rounded shadow-sm border"
				/>
			</div>
		</div>

		<div>
			<p class="font-bold mb-2">Step 4</p>
			<p>Don't forget to hit "Record" :)</p>
		</div>
	</div>
</div>
