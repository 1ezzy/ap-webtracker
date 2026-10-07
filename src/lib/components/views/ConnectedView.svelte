<script lang="ts">
	import ConnectionsPanel from '$lib/components/ConnectionsPanel.svelte';
	import ChecksTrackerPanel from '$lib/components/ChecksTrackerPanel.svelte';
	import PlayerTable from '$lib/components/PlayerTable.svelte';
	import GameTrackerPanel from '$lib/components/GameTrackerPanel.svelte';
	import MessagePanel from '$lib/components/MessagePanel.svelte';

	let playerOpen = $state(false);
	let messageOpen = $state(false);

	let playerRow = $derived(playerOpen ? '1fr' : 'min-content');
	let messageRow = $derived(messageOpen ? '1fr' : 'min-content');
</script>

<div
	class={[
		'grid h-full min-h-0 grid-cols-[1fr_3fr] items-stretch justify-center ',
		'gap-x-12 2xl:gap-x-24'
	]}
>
	<section
		class={[
			'grid h-full min-h-0 w-full grid-rows-[min-content_1fr] content-start justify-items-center overflow-hidden',
			'gap-8 2xl:gap-16'
		]}
	>
		<ConnectionsPanel></ConnectionsPanel>
		<div
			class={['grid h-full min-h-0 w-full', 'gap-4 2xl:gap-8']}
			style:grid-template-rows={`${playerRow} ${messageRow}`}
		>
			<PlayerTable bind:open={playerOpen}></PlayerTable>
			<MessagePanel bind:open={messageOpen}></MessagePanel>
		</div>
	</section>
	<section
		class={[
			'grid h-full grid-rows-[min-content_1fr] items-center justify-items-center',
			'gap-y-8 2xl:gap-y-16'
		]}
	>
		<ChecksTrackerPanel></ChecksTrackerPanel>
		<GameTrackerPanel></GameTrackerPanel>
	</section>
</div>
