<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';

	let games = $derived(
		connectionManager.connectedPlayers
			.map((player) => player?.game)
			.filter((game) => game !== undefined)
	);

	let activeTab = $state(0);
	let activeConnection = $derived(connectionManager.connections[activeTab]);
</script>

{#snippet tabs(games: string[])}
	<div class="flex w-fit flex-row justify-center gap-1 self-end">
		{#each games as game, i (game)}
			<button
				class={[
					'cursor-pointer bg-primary px-2 py-1',
					'rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-primary'
				]}
				class:border-white={activeTab === i}
				onclick={() => (activeTab = i)}
			>
				<span class="text-fluid-sm">{game}</span>
			</button>
		{/each}
	</div>
{/snippet}

{#snippet tabsContent()}
	<div class="">
		<span>Hints Points: {activeConnection.hintPoints}</span>
		<span>Hints Cost (Points Required): {activeConnection.hintCost}</span>
	</div>
{/snippet}

<div class="flex h-full w-full flex-col">
	<div class="flex flex-row items-center gap-4 2xl:gap-8">
		<h2 class="flex items-center gap-2 pb-4 text-fluid-lg">Game Tracker</h2>
		{@render tabs(games)}
	</div>

	<div class="panel h-full border-4 border-primary">
		{@render tabsContent()}
	</div>
</div>
