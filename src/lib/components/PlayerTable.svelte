<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import { ChevronRight } from '@lucide/svelte';

	let players = $derived(connectionManager.players);
	let activePlayerSlotIDs = $derived([...connectionManager.connectedSlots]);

	let { open = $bindable(false) } = $props();
</script>

<details class="flex h-full w-full flex-col overflow-hidden">
	<summary class="flex h-fit w-full items-center justify-between" onclick={() => (open = !open)}>
		<h2 class="flex items-center gap-2 text-fluid-lg">
			Room Info
			<span class="text-fluid-sm"> ({players.length} players)</span>
		</h2>
		<ChevronRight class={['transition duration-300', open ? 'rotate-90' : '']}></ChevronRight>
	</summary>
	<div class="min-h-0 overflow-y-scroll pt-4">
		<div class="h-full min-h-0 text-fluid-xs">
			<table
				class="h-full w-full table-fixed rounded-2xl border-2 border-primary-100 bg-surface-200"
			>
				<thead class="bg-accent text-primary-content">
					<tr class="h-12">
						<th class="table-cell w-1/2">Player</th>
						<th class="table-cell w-1/2">Game</th>
					</tr>
				</thead>
				<tbody>
					{#each players as player, index (player?.name)}
						<tr
							class="h-8 border-t-2 border-primary-100"
							class:text-success={activePlayerSlotIDs.includes(index + 1)}
						>
							<td class="table-cell">{player?.name}</td>
							<td class="table-cell">{player?.game}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</details>
