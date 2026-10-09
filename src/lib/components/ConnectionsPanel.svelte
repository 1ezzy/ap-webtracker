<script lang="ts">
	import { Plus, GlobeX, ChevronRight } from '@lucide/svelte';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import type { Connection } from '$lib/clients/connection.svelte';

	let { open = $bindable(true) } = $props();

	let connections = $derived(connectionManager.connections);

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
				<span class="text-fluid-xs text-tertiary">(connecting...)</span>
			{:else if connection.error}
				<span class="text-fluid-xs text-danger">(error)</span>
			{/if}
		</span>
	</div>
{/snippet}

<details
	bind:open
	class={[
		'flex h-full w-full flex-col overflow-hidden',
		'details-content:flex details-content:min-h-0 details-content:flex-1 details-content:flex-col'
	]}
>
	<summary class="flex h-fit w-full items-center justify-between">
		<h2 class="text-fluid-lg">
			Slot Connections
			<span class="text-fluid-sm">
				({connections.length} {connections.length === 1 ? 'connection' : 'connections'})</span
			>
		</h2>
		<div class="flex items-center gap-2">
			<button class="button button-sm bg-success" aria-label="Add slot connection">
				<Plus class="h-2/3"></Plus>
			</button>
			<ChevronRight class={['transition duration-300', open ? 'rotate-90' : '']}></ChevronRight>
		</div>
	</summary>
	<div class="mt-4 flex panel h-full min-h-0 flex-col gap-2 bg-accent 2xl:gap-4">
		{#each connections as connection, i (connection.id)}
			{@render connectionEntry(connection, i + 1)}
		{/each}
	</div>
</details>
