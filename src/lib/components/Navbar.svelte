<script lang="ts">
	import { page } from '$app/stores';
	import { latestYear, years } from '$lib/data/years';

	let isMenuOpen = $state(false);
	let isYearDropdownOpen = $state(false);
	let isMobileYearDropdownOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleYearDropdown() {
		isYearDropdownOpen = !isYearDropdownOpen;
	}

	function toggleMobileYearDropdown() {
		isMobileYearDropdownOpen = !isMobileYearDropdownOpen;
	}

	function handleOutsideClick(event: MouseEvent) {
		if (isYearDropdownOpen && !(event.target as Element).closest('.year-dropdown-container')) {
			isYearDropdownOpen = false;
		}
	}

	// Get available years for the dropdown/list
	const availableYears = Object.keys(years)
		.map(Number)
		.sort((a, b) => b - a);

	// Determine if we are on a page that has the sections (home or year page)
	// If not, we prepend '/' to the anchor links to go to the home page
	let isContentPage = $derived($page.url.pathname === '/' || /^\/\d{4}$/.test($page.url.pathname));
	let linkPrefix = $derived(isContentPage ? '' : '/');
</script>

<svelte:window onclick={handleOutsideClick} />

<nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<div class="flex">
				<div class="flex-shrink-0 flex items-center">
					<a href="/" class="text-xl font-bold font-mono tracking-tighter">VISxAI</a>
				</div>
			</div>
			<div class="hidden md:flex md:items-center md:space-x-4">
				<a
					href="/submit"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
					>Submit</a
				>
				<a
					href="{linkPrefix}#program"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
					>Program</a
				>
				<a
					href="{linkPrefix}#dates"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
					>Dates</a
				>
				<a
					href="{linkPrefix}#call"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">CFP</a
				>
				<a
					href="{linkPrefix}#hall-of-fame"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
					>Hall of Fame</a
				>
				<a
					href="{linkPrefix}#orga"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
					>Organizers</a
				>
				<a
					href="{linkPrefix}#pc"
					class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">PC</a
				>

				<!-- Year Dropdown -->
				<div class="relative ml-3 year-dropdown-container">
					<div>
						<button
							type="button"
							class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
							id="year-menu-button"
							aria-expanded={isYearDropdownOpen}
							aria-haspopup="true"
							onclick={toggleYearDropdown}
						>
							Past Years
							<svg
								class="-mr-1 ml-2 h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>

					{#if isYearDropdownOpen}
						<div
							class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="year-menu-button"
							tabindex="-1"
						>
							{#each availableYears as year}
								{#if year !== latestYear}
									<a
										href="/{year}"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
										tabindex="-1"
										onclick={() => (isYearDropdownOpen = false)}
									>
										{year}
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Mobile menu button -->
			<div class="flex items-center md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-controls="mobile-menu"
					aria-expanded="false"
					onclick={toggleMenu}
				>
					<span class="sr-only">Open main menu</span>
					<!-- Icon when menu is closed -->
					<svg
						class="{isMenuOpen ? 'hidden' : 'block'} h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!-- Icon when menu is open -->
					<svg
						class="{isMenuOpen ? 'block' : 'hidden'} h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="{isMenuOpen ? 'block' : 'hidden'} md:hidden" id="mobile-menu">
		<div class="px-2 pt-2 pb-3 space-y-1">
			<a
				href="/submit"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium uppercase"
				>Submit</a
			>
			<a
				href="{linkPrefix}#program"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
				>Program</a
			>
			<a
				href="{linkPrefix}#dates"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
				>Dates</a
			>
			<a
				href="{linkPrefix}#call"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
				>CFP</a
			>
			<a
				href="{linkPrefix}#hall-of-fame"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
				>Hall of Fame</a
			>
			<a
				href="{linkPrefix}#orga"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
				>Organizers</a
			>
			<a
				href="{linkPrefix}#pc"
				class="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
				>PC</a
			>
			<button
				type="button"
				class="text-gray-700 hover:text-gray-900 w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
				onclick={toggleMobileYearDropdown}
			>
				Past Years
				<svg
					class="{isMobileYearDropdownOpen
						? 'rotate-180'
						: ''} h-5 w-5 transform transition-transform duration-200"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			{#if isMobileYearDropdownOpen}
				<div class="pl-4 space-y-1">
					{#each availableYears as year}
						{#if year !== latestYear}
							<a
								href="/{year}"
								class="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
								>{year}</a
							>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</nav>
