<script lang="ts">
	import type { TableItem } from '$lib/types/table-item.types';
	import type { Hint } from 'archipelago.js';

	let { items, activeSlotName }: { items: TableItem<Hint>[]; activeSlotName: string } = $props();
</script>

<div class="mt-4 flex min-h-0 flex-1 flex-col">
	<div class="min-h-0 flex-1 overflow-y-auto text-fluid-xs">
		<table class="w-full table-fixed rounded-2xl border-2 border-white bg-surface-200">
			<thead class="bg-primary text-black">
				<tr class="h-12">
					<th class="table-cell w-1/5">Receiving Player</th>
					<th class="table-cell w-1/5">Item Name</th>
					<th class="table-cell w-1/5">Finding Player</th>
					<th class="table-cell w-1/5">Location Name</th>
					<th class="table-cell w-1/5">Found?</th>
				</tr>
			</thead>
			<tbody>
				{#each items as tableItem (tableItem.item)}
					{#if tableItem.visible === true}
						<tr class="h-8 border-t-2 border-white">
							<td
								class="table-cell"
								class:text-success={tableItem.item.item.receiver.name === activeSlotName}
								class:text-secondary-400={tableItem.item.item.receiver.name !== activeSlotName}
							>
								{tableItem.item.item.receiver.name}
							</td>
							<td class="table-cell text-tertiary">{tableItem.item.item.name}</td>
							<td
								class="table-cell"
								class:text-success={tableItem.item.item.sender.name === activeSlotName}
								class:text-secondary-400={tableItem.item.item.sender.name !== activeSlotName}
							>
								{tableItem.item.item.sender.name}
							</td>
							<td class="table-cell text-accent">{tableItem.item.item.locationName}</td>
							<td
								class="table-cell"
								class:text-success={tableItem.item.found}
								class:text-danger={!tableItem.item.found}
							>
								{tableItem.item.found ? 'Found' : 'Not Found'}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
