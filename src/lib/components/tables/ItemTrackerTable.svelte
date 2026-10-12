<script lang="ts">
	import type { Item } from 'archipelago.js';

	let { items }: { items: Item[] } = $props();
</script>

<div class="mt-4 flex min-h-0 flex-1 flex-col">
	<div class="min-h-0 flex-1 overflow-y-auto text-fluid-xs">
		<table class="w-full table-fixed rounded-2xl border-2 border-white bg-surface-200">
			<thead class="bg-primary text-primary-content">
				<tr class="h-12">
					<th class="table-cell w-1/4">Check</th>
					<th class="table-cell w-1/4">Received Item</th>
					<th class="table-cell w-1/4">Receiving Player</th>
					<th class="table-cell w-1/4">Receiving Game</th>
				</tr>
			</thead>
			<tbody>
				{#each items as item (item.locationId)}
					<tr class="h-8 border-t-2 border-white">
						<td class="table-cell text-accent">
							{item.locationName}
						</td>
						<td
							class="table-cell"
							class:text-surface-700={!item.progression && !item.useful && !item.trap}
							class:text-success={item.progression}
							class:text-tertiary={item.useful}
							class:text-danger={item.trap}
						>
							{item.name}
						</td>
						<td class="table-cell text-secondary">
							{item.receiver}
						</td>
						<td class="table-cell text-primary">
							{item.game}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
