<script lang="ts">
	import ConnectionsPanel from '$lib/components/ConnectionsPanel.svelte';
	import GamesPanel from '$lib/components/GamesPanel.svelte';
	import PlayerTable from '$lib/components/PlayerTable.svelte';
	import TrackerPanel from '$lib/components/TrackerPanel.svelte';
</script>

<div
	class={['grid h-full grid-cols-[1fr_4fr] items-start justify-center ', 'gap-x-8 2xl:gap-x-16']}
>
	<section
		class={[
			'grid h-full grid-rows-[min-content_1fr] items-center justify-items-center overflow-y-hidden',
			'gap-y-8 2xl:gap-y-16'
		]}
	>
		<ConnectionsPanel></ConnectionsPanel>
		<PlayerTable></PlayerTable>
	</section>
	<section
		class={[
			'grid h-full grid-rows-[min-content_1fr] items-center justify-items-center',
			'gap-y-8 2xl:gap-y-16'
		]}
	>
		<GamesPanel></GamesPanel>
		<TrackerPanel></TrackerPanel>
	</section>
</div>
