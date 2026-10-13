<script lang="ts">
	import type { Item } from 'archipelago.js';

	let { checks }: { checks: Item[] } = $props();
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
				{#each checks as check (check.locationId)}
					<tr class="h-8 border-t-2 border-white">
						<td class="table-cell text-accent">
							{check.locationName}
						</td>
						<td
							class="table-cell"
							class:text-surface-700={!check.progression && !check.useful && !check.trap}
							class:text-success={check.progression}
							class:text-tertiary={check.useful}
							class:text-danger={check.trap}
						>
							{check.name}
						</td>
						<td class="table-cell text-secondary">
							{check.receiver}
						</td>
						<td class="table-cell text-primary">
							{check.game}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
