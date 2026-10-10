<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Badge from '$lib/components/atomics/Badge.svelte';
	import HintTrackerTable from '$lib/components/tables/HintTrackerTable.svelte';
	import ItemTrackerTable from '../tables/ItemTrackerTable.svelte';

	let games = $derived(
		connectionManager.connectedPlayers
			.map((player) => player?.game)
			.filter((game) => game !== undefined)
	);

	let activeTab = $state(0);
	let activeConnection = $derived(connectionManager.connections[activeTab]);

	let subviewModel = $state({
		subviews: ['Hints', 'Items'],
		selectedSubviewIndex: 0
	});
</script>

{#snippet tabs(games: string[])}
	<div class="flex w-fit flex-row justify-center gap-1 self-end">
		{#each games as game, i (game)}
			<button
				class={[
					'cursor-pointer bg-primary px-2 pt-1 pb-2',
					'rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-primary'
				]}
				class:border-white={activeTab === i}
				onclick={() => (activeTab = i)}
			>
				<span class="text-fluid-sm">{game}</span>
			</button>
		{/each}
	</div>
{/snippet}

{#snippet tabsContent()}
	<div class="grid h-full min-h-0 w-full grid-rows-[min-content_minmax(0,1fr)] gap-4 2xl:gap-8">
		<div class="flex w-full items-center gap-4 2xl:gap-8">
			<h3 class="min-w-fit text-fluid-base">Select View</h3>
			<span class="text-fluid-base">|</span>
			<div class="flex h-full w-full gap-4 rounded-lg text-center text-fluid-base">
				{#each subviewModel.subviews as subview, index (subview)}
					<button
						class={[
							'w-48 min-w-48 cursor-pointer border-primary-600 px-2 py-1',
							index === 0 ? 'rounded-tl-md rounded-bl-md' : '',
							index === subviewModel.subviews.length - 1 ? 'rounded-tr-md rounded-br-md' : ''
						]}
						class:bg-primary-600={subviewModel.selectedSubviewIndex === index}
						class:border-2={subviewModel.selectedSubviewIndex !== index}
						onclick={() => (subviewModel.selectedSubviewIndex = index)}
					>
						{subview}
					</button>
				{/each}
			</div>
		</div>
		<div class="grid min-h-0 grid-rows-[min-content_minmax(0,1fr)] gap-4">
			<div class="text-fluid-4xl">
				<h2>{subviewModel.subviews[subviewModel.selectedSubviewIndex]} Tracker</h2>
			</div>
			{#if subviewModel.selectedSubviewIndex === 0}
				{@render hintsSubview()}
			{:else if subviewModel.selectedSubviewIndex === 1}
				{@render itemsSubview()}
			{/if}
		</div>
	</div>
{/snippet}

{#snippet hintsSubview()}
	<div class="grid min-h-0 grid-rows-[min-content_minmax(0,1fr)] gap-2 overflow-hidden 2xl:gap-4">
		<div class="flex flex-row items-center gap-2 2xl:gap-4">
			<Badge label="Hint Points" value={`${activeConnection.hintPoints}pts`} color="primary"
			></Badge>
			<Badge label="Next Hint Cost" value={`${activeConnection.hintCost}pts`} color="primary"
			></Badge>
		</div>
		<HintTrackerTable hints={activeConnection.hints} activeSlotName={activeConnection.slotName}
		></HintTrackerTable>
	</div>
{/snippet}

{#snippet itemsSubview()}
	<div class="grid min-h-0 grid-rows-[min-content_minmax(0,1fr)] gap-2 overflow-hidden 2xl:gap-4">
		<div class="flex flex-row items-center gap-2 2xl:gap-4">
			<Badge label="Checks Obtained" value={`${activeConnection.checksObtained}`} color="primary"
			></Badge>
			<Badge
				label="Checks Remaining"
				value={`${activeConnection.checksTotal - activeConnection.checksObtained}`}
				color="primary"
			></Badge>
		</div>
		<ItemTrackerTable></ItemTrackerTable>
	</div>
{/snippet}

<div class="flex h-full w-full flex-col overflow-hidden">
	<div class="flex flex-row items-center gap-4 2xl:gap-8">
		<h2 class="flex items-center gap-2 pb-4 text-fluid-lg">Game Tracker</h2>
		{@render tabs(games)}
	</div>

	<div class="panel min-h-0 flex-1 overflow-hidden border-4 border-primary p-8">
		{@render tabsContent()}
	</div>
</div>
