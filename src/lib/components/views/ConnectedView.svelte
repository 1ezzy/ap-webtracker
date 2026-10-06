<script lang="ts">
	import ConnectionsPanel from '$lib/components/ConnectionsPanel.svelte';
	import ChecksTrackerPanel from '$lib/components/ChecksTrackerPanel.svelte';
	import PlayerTable from '$lib/components/PlayerTable.svelte';
	import GameTrackerPanel from '$lib/components/GameTrackerPanel.svelte';
</script>

<div
	class={['grid h-full grid-cols-[1fr_3fr] items-start justify-center ', 'gap-x-12 2xl:gap-x-24']}
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
		<ChecksTrackerPanel></ChecksTrackerPanel>
		<GameTrackerPanel></GameTrackerPanel>
	</section>
</div>
