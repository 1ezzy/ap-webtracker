<script lang="ts">
	import { modals } from 'svelte-modals';
	import Plus from '@lucide/svelte/icons/plus';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import AddConnectionModal from '$lib/components/modals/AddConnectionModal.svelte';
	import { Connection } from '$lib/clients/connection.svelte';

	let connections = $derived(connectionManager.connections);

	const openAddConnectionModal = () => {
		modals.open(AddConnectionModal, { title: 'Add New Connection' });
	};
</script>

{#snippet gamePanel(connection: Connection)}
	{let gameName = $derived(connection.gameName)}
	{let slotName = $derived(connection.slotName)}
	{let checksObtained = $derived(connection.checksObtained)}
	{let checksTotal = $derived(connection.checksTotal)}

	<div class="flex h-full w-64 min-w-64 flex-col gap-4 rounded-lg bg-secondary-500 px-4 py-2">
		<div class="flex flex-col">
			<span class="overflow-hidden text-fluid-sm text-nowrap text-ellipsis">
				{gameName}
				{#if connection.connecting}
					<span class="text-fluid-xs text-white">(connecting...)</span>
				{:else if connection.error}
					<span class="text-fluid-xs text-danger">(error connecting)</span>
				{/if}
			</span>
			<span class="text-fluid-xs text-primary-100/80">({slotName})</span>
		</div>
		<div class="flex h-fit flex-col items-start justify-end leading-snug">
			<div class="flex h-fit items-center gap-2">
				<span class="text-fluid-xl">{checksObtained} / {checksTotal}</span>
			</div>
			<span class="text-fluid-xs text-primary-100/80">checks</span>
		</div>
	</div>
{/snippet}

{#snippet connectionPanel()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={[
			'grid h-full w-64 min-w-64 grid-rows-2 justify-items-center gap-2',
			'rounded-lg border-2 border-dashed border-secondary-500 px-4 py-2',
			'transition-[background-color] duration-150 hover:bg-secondary-500/50'
		]}
		role="button"
		tabindex={1}
		onclick={openAddConnectionModal}
	>
		<span class="self-end">Add New Connection</span>
		<Plus class="h-8 w-8 self-start"></Plus>
	</div>
{/snippet}

<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
	<h2 class="flex items-center gap-2 text-fluid-lg">Checks Tracker</h2>
	<div class="panel overflow-x-scroll bg-secondary-400">
		<div class="flex h-full w-full flex-col gap-4">
			<div class="flex w-full gap-x-4">
				{#each connections as connection (connection.id)}
					{@render gamePanel(connection)}
				{/each}
				{@render connectionPanel()}
			</div>
		</div>
	</div>
</div>
