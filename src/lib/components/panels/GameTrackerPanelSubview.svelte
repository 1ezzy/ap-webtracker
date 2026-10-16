<script lang="ts">
	import Search from '@lucide/svelte/icons/search';
	import type { Snippet } from 'svelte';

	let {
		badges,
		subviewTitle,
		trackerTable,
		tableFilters
	}: {
		badges: Snippet;
		subviewTitle: string;
		trackerTable: Snippet;
		tableFilters: Snippet;
	} = $props();
</script>

<div
	class="grid min-h-0 grid-rows-[min-content_min-content_minmax(0,1fr)] gap-2 overflow-hidden 2xl:gap-4"
>
	<div class="flex flex-row items-center gap-4 2xl:gap-8">
		<h2 class="text-fluid-3xl leading-tight">
			{subviewTitle} Tracker
		</h2>
		<div class="flex flex-row items-center gap-2 2xl:gap-4">
			{@render badges()}
		</div>
	</div>
	<div class="flex flex-row items-center gap-4 2xl:gap-8">
		<span class="flex input w-fit flex-row items-center gap-1 input-white">
			<Search class="icon-sm"></Search>
			<input class="" placeholder="Search..." />
		</span>
		<div class="flex flex-row items-center gap-2 2xl:gap-4">
			{@render tableFilters()}
		</div>
	</div>
	{@render trackerTable()}
</div>
