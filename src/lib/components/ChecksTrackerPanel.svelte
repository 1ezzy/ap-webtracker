<script lang="ts">
	import { modals } from 'svelte-modals';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import { Plus } from '@lucide/svelte';
	import Modal from '$lib/components/atomics/Modal.svelte';

	let connections = $derived(connectionManager.connections);

	const openAddConnectionModal = () => {
		modals.open(Modal, { title: 'Alert', message: 'This is an alert' });
	};
</script>

{#snippet gamePanel(gameName: string | null, gamePlayer: string, gameChecks: number[])}
	<div class="flex h-full w-64 flex-col gap-4 rounded-lg bg-secondary-500 px-4 py-2">
		<div class="flex flex-col">
			<span class="overflow-hidden text-fluid-sm text-nowrap text-ellipsis">{gameName}</span>
			<span class="text-fluid-xs text-primary-100/80">({gamePlayer})</span>
		</div>
		<div class="flex h-fit flex-col items-start justify-end leading-snug">
			<div class="flex h-fit items-center gap-2">
				<span class="text-fluid-xl">{gameChecks[0]} / {gameChecks[1]}</span>
			</div>
			<span class="text-fluid-xs text-primary-100/80">checks</span>
		</div>
	</div>
{/snippet}

{#snippet connectionPanel()}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={[
			'grid h-full w-64 grid-rows-2 justify-items-center gap-2',
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
	<div class="panel bg-secondary-400">
		<div class="flex h-full w-full flex-col gap-4">
			<div class="flex w-full gap-x-4">
				{#each connections as connection (connection.id)}
					{@render gamePanel(connection.gameName, connection.slotName, [
						connection.checksFound,
						connection.checksTotal
					])}
				{/each}
				{@render connectionPanel()}
			</div>
		</div>
	</div>
</div>
