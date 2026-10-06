<script lang="ts">
	import ConnectionsPanel from '$lib/components/ConnectionsPanel.svelte';
	import ChecksTrackerPanel from '$lib/components/ChecksTrackerPanel.svelte';
	import PlayerTable from '$lib/components/PlayerTable.svelte';
	import GameTrackerPanel from '$lib/components/GameTrackerPanel.svelte';
	import MessagePanel from '../MessagePanel.svelte.svelte';

	let playerOpen = $state(false);
	let messageOpen = $state(false);
</script>

<div
	class={[
		'grid h-full min-h-0 grid-cols-[1fr_3fr] items-stretch justify-center ',
		'gap-x-12 2xl:gap-x-24'
	]}
>
	<section
		class={[
			'grid min-h-0 w-full grid-rows-[auto_min(min_content,1fr)_min(min_content,1fr)] justify-items-center overflow-hidden',
			'gap-y-8 2xl:gap-y-16'
		]}
	>
		<ConnectionsPanel></ConnectionsPanel>
		<PlayerTable bind:open={playerOpen}></PlayerTable>
		<MessagePanel bind:open={messageOpen}></MessagePanel>
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
