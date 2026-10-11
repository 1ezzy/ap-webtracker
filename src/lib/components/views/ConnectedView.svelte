<script lang="ts">
	import ConnectionsPanel from '$lib/components/panels/ConnectionsPanel.svelte';
	import ChecksTrackerPanel from '$lib/components/panels/ChecksTrackerPanel.svelte';
	import PlayerTable from '$lib/components/tables/PlayerTable.svelte';
	import GameTrackerPanel from '$lib/components/panels/GameTrackerPanel.svelte';
	import MessagePanel from '$lib/components/panels/MessagePanel.svelte';
	import WidthResizer from '$lib/components/atomics/WidthResizer.svelte';

	let connectionsOpen = $state(false);
	let playerOpen = $state(false);
	let messageOpen = $state(true);

	let widths = $state<(number | null)[]>([]);

	let playerRow = $derived(playerOpen ? '1fr' : 'min-content');
	let messageRow = $derived(messageOpen ? '1fr' : 'min-content');
</script>

<div
	class={['grid h-full min-h-0 items-stretch justify-center ', 'gap-x-8 2xl:gap-x-16']}
	style:grid-template-columns={`${widths[0] ? `${widths[0]}px` : '1fr'} min-content ${widths[1] ? `${widths[1]}px` : '3fr'}`}
>
	<section
		class={[
			'grid h-full min-h-0 w-full content-start justify-items-center overflow-hidden',
			'gap-4 2xl:gap-8'
		]}
		style:grid-template-rows={`min-content ${playerRow} ${messageRow}`}
		bind:clientWidth={widths[0]}
	>
		<ConnectionsPanel bind:open={connectionsOpen}></ConnectionsPanel>
		<PlayerTable bind:open={playerOpen}></PlayerTable>
		<MessagePanel bind:open={messageOpen}></MessagePanel>
	</section>

	<WidthResizer bind:widths></WidthResizer>

	<section
		class={[
			'grid h-full min-h-0 grid-rows-[min-content_1fr] items-center justify-items-center overflow-hidden',
			'gap-y-8 2xl:gap-y-16'
		]}
		bind:clientWidth={widths[1]}
	>
		<ChecksTrackerPanel></ChecksTrackerPanel>
		<GameTrackerPanel></GameTrackerPanel>
	</section>
</div>
