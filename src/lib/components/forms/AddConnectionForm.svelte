<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';

	let { slotName = $bindable(null) } = $props();

	let connectedPlayers = $derived(connectionManager.connectedPlayers);
	let disconnectedPlayers = $derived(
		connectionManager.players.filter((player) => !connectedPlayers.includes(player))
	);
</script>

<form class="grid-rows-auto grid gap-8 p-8" novalidate>
	<div>
		<h3 class="text-fluid-lg text-white">Select an Additional Slot</h3>
	</div>
	<select class="input input-surface" bind:value={slotName}>
		{#if !slotName}
			<option class="font-open-sans" value={null}> Select a slot </option>
		{/if}
		{#each disconnectedPlayers as player (player?.slot)}
			<option class="font-open-sans" value={player?.name}>
				{player?.name}
			</option>
		{/each}
	</select>
</form>
