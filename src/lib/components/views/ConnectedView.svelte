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
		{ fr: 1, minWidth: 384 },
		{ fr: 3, minWidth: 896 }
	]);
</script>

<div
	class={[
		'grid h-full min-h-0 items-stretch justify-center',
		'gap-x-4 2xl:gap-x-8',
		widthManager.isResizing && 'cursor-col-resize select-none'
	]}
	style:grid-template-columns={widthManager.gridTemplateColumns}
>
	<section
		class={[
			'grid h-full min-h-0 w-full content-start justify-items-center overflow-hidden',
			'gap-4 2xl:gap-8'
		]}
		style:grid-template-rows={`min-content ${playerRow} ${messageRow}`}
		bind:clientWidth={widthManager.measuredWidths[0]}
	>
		<ConnectionsPanel bind:open={connectionsOpen}></ConnectionsPanel>
		<PlayerTable bind:open={playerOpen}></PlayerTable>
		<MessagePanel bind:open={messageOpen}></MessagePanel>
	</section>

	<WidthResizer {widthManager}></WidthResizer>

	<section
		class={[
			'grid h-full min-h-0 grid-rows-[min-content_1fr] items-center justify-items-center overflow-hidden',
			'gap-y-8 2xl:gap-y-16'
		]}
		bind:clientWidth={widthManager.measuredWidths[1]}
	>
		<ChecksTrackerPanel></ChecksTrackerPanel>
		<GameTrackerPanel></GameTrackerPanel>
	</section>
</div>
