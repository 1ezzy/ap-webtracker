<script lang="ts">
	import { Plus, GlobeX } from '@lucide/svelte';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import type { Connection } from '$lib/clients/connection.svelte';

	let connections = $derived(connectionManager.connections);

	let addingSlot = $state(false);

	function removeConnection(connection: Connection) {
		connectionManager.removeConnection(connection.id);
	}
</script>

{#snippet connectionEntry(connection: Connection, slotIndex: number)}
	<div class="flex flex-row items-center gap-2">
		<button
			class="button button-sm bg-danger"
			aria-label={`Disconnect ${connection.slotName}`}
			onclick={() => removeConnection(connection)}
		>
			<GlobeX class=" h-2/3 text-primary-100"></GlobeX>
		</button>
		<span class="text-fluid-base text-primary-900">
			{slotIndex} - {connection.slotName}
			{#if connection.connecting}
				<span class="text-fluid-xs text-primary-700">(connecting...)</span>
			{:else if connection.error}
				<span class="text-fluid-xs text-danger">(error)</span>
			{/if}
		</span>
	</div>
{/snippet}

<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
	<div class="flex h-fit items-center justify-between gap-2">
		<h2 class="text-fluid-lg">Slot Connections</h2>
		<button class="button button-md bg-success" aria-label="Add slot connection">
			<Plus class="h-2/3"></Plus>
		</button>
	</div>
	<div class="panel bg-accent">
		<div class="flex w-full flex-col gap-2">
			{#each connections as connection, i (connection.id)}
				{@render connectionEntry(connection, i + 1)}
			{/each}
			{#if addingSlot}
				<!--TODO: Implement slot adding-->
			{/if}
		</div>
	</div>
</div>
