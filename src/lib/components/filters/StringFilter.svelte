<script lang="ts">
	import FilterDropdown from '$lib/components/filters/FilterDropdown.svelte';
	import type { FilterItem, SelectedFilterItem } from '$lib/types/filter.types';

	let {
		id,
		filterLabel,
		items,
		selectedItem = $bindable()
	}: {
		id: string;
		filterLabel: string;
		items: FilterItem[] | undefined;
		selectedItem: SelectedFilterItem | null;
	} = $props();

	const handleFilterApplied = (item: FilterItem) => {
		if (selectedItem?.value === item.value) {
			selectedItem = null;
		} else {
			selectedItem = item;
		}
	};

	const handleFilterCleared = (event: MouseEvent) => {
		event.stopPropagation();

		selectedItem = null;
	};
</script>

<FilterDropdown
	{id}
	{filterLabel}
	selectedItemLabel={selectedItem?.label}
	clearSelectedItem={handleFilterCleared}
>
	<div class="flex flex-col items-center justify-center gap-y-2 overflow-y-scroll py-1 2xl:py-2">
		{#each items as item (item.value)}
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<span
				role="listitem"
				class={[
					'w-full touch-none rounded-md py-1 text-fluid-xs',
					item.disabled
						? 'cursor-not-allowed text-surface-700'
						: 'cursor-pointer hover:bg-surface-300'
				]}
				class:bg-surface-300={selectedItem?.value === item.value}
				class:text-primary={selectedItem?.value === item.value}
				onclick={() => {
					if (!item.disabled) {
						handleFilterApplied(item);
					}
				}}
				onkeydown={() => {
					if (!item.disabled) {
						handleFilterApplied(item);
					}
				}}
			>
				{item.label}
			</span>
		{/each}
	</div>
</FilterDropdown>
