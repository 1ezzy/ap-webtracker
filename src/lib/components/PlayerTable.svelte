<script lang="ts">
	import { archipelago } from '$lib/clients/archipelago-client.svelte';
</script>

{#if archipelago.connected === false}
	<span>Loading...</span>
{:else}
	<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
		<h2 class="flex items-center gap-2 text-fluid-lg">
			Room Info
			<span class="text-fluid-sm text-primary-200"> ({archipelago.players.length} players)</span>
		</h2>
		<div class="overflow-y-scroll">
			<table class="h-full w-full rounded-2xl border-2 border-primary-100">
				<thead class="bg-primary text-primary-content">
					<tr class="h-12">
						<th class="table-cell">Player</th>
						<th class="table-cell">Game</th>
					</tr>
				</thead>
				<tbody>
					{#each archipelago.players as player (player?.name)}
						<tr class="h-8 border-t-2 border-primary-100">
							<td class="table-cell">{player?.name}</td>
							<td class="table-cell">{player?.game}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
