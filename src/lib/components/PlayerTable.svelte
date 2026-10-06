<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';

	let connected = $derived(connectionManager.connected);
	let players = $derived(connectionManager.players);

	let activePlayerSlotIDs = $derived([...connectionManager.connectedSlots]);
</script>

{#if connected === false}
	<span>Loading...</span>
{:else}
	<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
		<h2 class="flex items-center gap-2 text-fluid-lg">
			Room Info
			<span class="text-fluid-sm"> ({players.length} players)</span>
		</h2>
		<div class="overflow-y-scroll text-fluid-xs">
			<table class="h-full w-full rounded-2xl border-2 border-primary-100 bg-surface-200">
				<thead class="bg-accent text-primary-content">
					<tr class="h-12">
						<th class="table-cell">Player</th>
						<th class="table-cell">Game</th>
					</tr>
				</thead>
				<tbody>
					{#each players as player, index (player?.name)}
						<tr
							class="h-8 border-t-2 border-primary-100"
							class:text-success={activePlayerSlotIDs.includes(index)}
						>
							<td class="table-cell">{player?.name}</td>
							<td class="table-cell">{player?.game}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
