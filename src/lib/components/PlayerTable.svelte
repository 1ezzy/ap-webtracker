<script lang="ts">
	import { archipelago } from '$lib/clients/archipelago-client.svelte';
</script>

{#if archipelago.connected === false}
	<span>Loading...</span>
{:else}
	<table class="w-full rounded-2xl border-2 border-primary-100">
		<thead class="bg-primary">
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
{/if}
