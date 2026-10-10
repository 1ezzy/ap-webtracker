<script lang="ts">
	import type { Hint } from 'archipelago.js';

	let { hints, activeSlotName }: { hints: Hint[]; activeSlotName: string } = $props();
</script>

<div class="mt-4 flex min-h-0 flex-1 flex-col">
	<div class="min-h-0 flex-1 overflow-y-auto text-fluid-xs">
		<table class="w-full table-fixed rounded-2xl border-2 border-white bg-surface-200">
			<thead class="bg-primary text-primary-content">
				<tr class="h-12">
					<th class="table-cell w-1/5">Receiving Player</th>
					<th class="table-cell w-1/5">Item Name</th>
					<th class="table-cell w-1/5">Finding Player</th>
					<th class="table-cell w-1/5">Location Name</th>
					<th class="table-cell w-1/5">Found?</th>
				</tr>
			</thead>
			<tbody>
				{#each hints as hint (hint.item)}
					<tr class="h-8 border-t-2 border-white">
						<td
							class="table-cell"
							class:text-success={hint.item.receiver.name === activeSlotName}
							class:text-secondary-400={hint.item.receiver.name !== activeSlotName}
						>
							{hint.item.receiver.name}
						</td>
						<td class="table-cell text-tertiary">{hint.item.name}</td>
						<td
							class="table-cell"
							class:text-success={hint.item.sender.name === activeSlotName}
							class:text-secondary-400={hint.item.sender.name !== activeSlotName}
						>
							{hint.item.sender.name}
						</td>
						<td class="table-cell text-accent">{hint.item.locationName}</td>
						<td class="table-cell" class:text-success={hint.found} class:text-danger={!hint.found}>
							{hint.found ? 'Found' : 'Not Found'}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
