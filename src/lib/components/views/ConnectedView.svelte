<script lang="ts">
	import ConnectionsPanel from '$lib/components/panels/ConnectionsPanel.svelte';
	import ChecksTrackerPanel from '$lib/components/panels/ChecksTrackerPanel.svelte';
	import PlayerTable from '$lib/components/tables/PlayerTable.svelte';
	import GameTrackerPanel from '$lib/components/panels/GameTrackerPanel.svelte';
	import MessagePanel from '$lib/components/panels/MessagePanel.svelte';
	import WidthResizer from '$lib/components/atomics/WidthResizer.svelte';
	import { WidthManager } from '$lib/managers/width-manager.svelte';

	let connectionsOpen = $state(false);
	let playerOpen = $state(false);
	let messageOpen = $state(true);

	let playerRow = $derived(playerOpen ? '1fr' : 'min-content');
	let messageRow = $derived(messageOpen ? '1fr' : 'min-content');

	const widthManager = new WidthManager([
		{ fr: 1, minRem: 24, maxShare: 0.2 },
		{ fr: 3, minRem: 56, maxShare: 0.5 }
	]);

	const sectionTabs = ['Session', 'Tracker'];
	let activeSection = $state(0);
</script>

<div
	class={[
		'grid h-full min-h-0 items-stretch justify-center',
		'grid-cols-1 grid-rows-[min-content_minmax(0,1fr)] gap-y-4',
		'lg:grid-cols-(--connected-view-columns) lg:grid-rows-[minmax(0,1fr)] lg:gap-y-0',
		'gap-x-4 2xl:gap-x-8',
		widthManager.isResizing && 'cursor-col-resize select-none'
	]}
	style:--connected-view-columns={widthManager.gridTemplateColumns}
	bind:clientWidth={widthManager.containerWidth}
>
	<div class="flex w-full justify-center gap-4 text-center text-fluid-base lg:hidden">
		{#each sectionTabs as tab, index (tab)}
			<button
				class={[
					'flex h-8 w-48 cursor-pointer items-center justify-center border-primary-600 px-2 py-1 leading-snug',
					index === 0 ? 'rounded-tl-md rounded-bl-md' : '',
					index === sectionTabs.length - 1 ? 'rounded-tr-md rounded-br-md' : ''
				]}
				class:bg-primary-600={activeSection === index}
				class:border-2={activeSection !== index}
				onclick={() => (activeSection = index)}
			>
				{tab}
			</button>
		{/each}
	</div>

	<section
		class={[
			activeSection === 0 ? 'grid' : 'hidden lg:grid',
			'h-full min-h-0 w-full content-start justify-items-center overflow-hidden',
			'gap-4 2xl:gap-8'
		]}
		style:grid-template-rows={`min-content ${playerRow} ${messageRow}`}
		bind:clientWidth={widthManager.measuredWidths[0]}
	>
		<ConnectionsPanel bind:open={connectionsOpen}></ConnectionsPanel>
		<PlayerTable bind:open={playerOpen}></PlayerTable>
		<MessagePanel bind:open={messageOpen}></MessagePanel>
	</section>

	<div class="hidden lg:contents">
		<WidthResizer {widthManager}></WidthResizer>
	</div>

	<section
		class={[
			activeSection === 1 ? 'grid' : 'hidden lg:grid',
			'h-full min-h-0 grid-rows-[min-content_1fr] items-center justify-items-center overflow-hidden',
			'gap-y-8 2xl:gap-y-16'
		]}
		bind:clientWidth={widthManager.measuredWidths[1]}
	>
		<ChecksTrackerPanel></ChecksTrackerPanel>
		<GameTrackerPanel></GameTrackerPanel>
	</section>
</div>
