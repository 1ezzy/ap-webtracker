<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Badge from '$lib/components/atomics/Badge.svelte';
	import HintTrackerTable from '$lib/components/tables/HintTrackerTable.svelte';
	import CheckTrackerTable from '$lib/components/tables/CheckTrackerTable.svelte';
	import GameTrackerPanelSubview from '$lib/components/panels/GameTrackerPanelSubview.svelte';
	import StringFilter from '$lib/components/filters/StringFilter.svelte';
	import type { SelectedFilterItem } from '$lib/components/filters/filter.types';
	import type { Hint } from 'archipelago.js';

	let games = $derived(
		connectionManager.connectedPlayers
			.map((player) => player?.game)
			.filter((game) => game !== undefined)
	);

	let activeTab = $state(0);
	let activeConnection = $derived(connectionManager.connections[activeTab]);

	let subviewModel = $state({
		subviews: ['Hints', 'Checks'],
		selectedSubviewIndex: 0
	});

	// filter-specific logic
	// TODO: should this be moved to a service?
	let hintsWithFiltersApplied = $derived.by(() => {
		if (filterState.every((filter) => filter === null)) {
			return activeConnection.hints;
		}

		return activeConnection.hints.filter((hint) => filterHintByConditional(hint));
	});
	let filterState = $state([null, null, null] as SelectedFilterItem[]);
	let filterItems = $derived([
		[...new Set(hintsWithFiltersApplied.flatMap((hint) => hint.item.receiver.name))].map(
			(hint) => ({
				label: hint,
				value: hint
			})
		),
		[...new Set(hintsWithFiltersApplied.flatMap((hint) => hint.item.sender.name))].map((hint) => ({
			label: hint,
			value: hint
		})),
		[
			...new Set(
				hintsWithFiltersApplied.flatMap((hint) => (hint.status === 40 ? 'Found' : 'Not Found'))
			)
		].map((hint) => ({
			label: hint,
			value: hint
		}))
	]);

	const filterHintByConditional = (hint: Hint): boolean => {
		let [appliedLabel1, appliedLabel2, appliedLabel3] = [
			...filterState.map((filter) => filter?.label ?? null)
		];
		if (
			hint.item.receiver.name !== appliedLabel1 &&
			hint.item.sender.name !== appliedLabel2 &&
			(hint.status === 40 ? 'Found' : 'Not Found') !== appliedLabel3
		) {
			return false;
		} else {
			let shouldIncludeRow = true;

			if (hint.item.receiver.name !== appliedLabel1 && appliedLabel1 !== null) {
				shouldIncludeRow = false;
			} else if (hint.item.sender.name !== appliedLabel2 && appliedLabel2 !== null) {
				shouldIncludeRow = false;
			} else if (
				(hint.status === 40 ? 'Found' : 'Not Found') !== appliedLabel3 &&
				appliedLabel3 !== null
			) {
				shouldIncludeRow = false;
			}

			return shouldIncludeRow;
		}
	};
</script>

{#snippet tabs(games: string[])}
	<div class="flex w-fit flex-row justify-center gap-1 self-end">
		{#each games as game, i (game)}
			<button
				class={[
					'cursor-pointer bg-primary px-2 pt-1 pb-2 text-black',
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
							'flex h-8 w-48 min-w-48 cursor-pointer items-center justify-center border-primary-600 px-2 py-1 leading-snug',
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
		<div class="grid min-h-0 grid-rows-[minmax(0,1fr)] gap-4">
			{#if subviewModel.selectedSubviewIndex === 0}
				<GameTrackerPanelSubview
					badges={hintsBadges}
					subviewTitle={subviewModel.subviews[subviewModel.selectedSubviewIndex]}
					trackerTable={hintTrackerTable}
					tableFilters={hintTrackerTableFilters}
				></GameTrackerPanelSubview>
			{:else if subviewModel.selectedSubviewIndex === 1}
				<GameTrackerPanelSubview
					badges={checksBadges}
					subviewTitle={subviewModel.subviews[subviewModel.selectedSubviewIndex]}
					trackerTable={checkTrackerTable}
					tableFilters={hintTrackerTableFilters}
				></GameTrackerPanelSubview>
			{/if}
		</div>
	</div>
{/snippet}

{#snippet hintTrackerTable()}
	<HintTrackerTable activeSlotName={activeConnection.slotName} hints={hintsWithFiltersApplied}
	></HintTrackerTable>
{/snippet}

{#snippet checkTrackerTable()}
	<CheckTrackerTable checks={activeConnection.remainingItems}></CheckTrackerTable>
{/snippet}

{#snippet hintTrackerTableFilters()}
	<StringFilter
		id="receiving-player"
		filterLabel="Receiving Player"
		items={filterItems[0]}
		bind:selectedItem={filterState[0]}
	></StringFilter>
	<StringFilter
		id="finding-player"
		filterLabel="Finding Player"
		items={filterItems[1]}
		bind:selectedItem={filterState[1]}
	></StringFilter>
	<StringFilter
		id="location-name"
		filterLabel="Found Status"
		items={filterItems[2]}
		bind:selectedItem={filterState[2]}
	></StringFilter>
{/snippet}

{#snippet hintsBadges()}
	<Badge label="Hint Points" value={`${activeConnection.hintPoints}pts`} color="primary"></Badge>
	<Badge label="Next Hint Cost" value={`${activeConnection.hintCost}pts`} color="primary"></Badge>
{/snippet}

{#snippet checksBadges()}
	<Badge label="Checks Obtained" value={`${activeConnection.checksObtained}`} color="primary"
	></Badge>
	<Badge
		label="Checks Remaining"
		value={`${activeConnection.checksTotal - activeConnection.checksObtained}`}
		color="primary"
	></Badge>
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
