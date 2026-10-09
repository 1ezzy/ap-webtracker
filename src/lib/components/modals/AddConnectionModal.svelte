<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Modal from '$lib/components/atomics/Modal.svelte';
	import AddConnectionForm from '$lib/components/forms/AddConnectionForm.svelte';
	import type { ConnectionFormValues } from '$lib/schemas/connection';

	const { isOpen, close } = $props();

	const { hostName, portNum } = connectionManager.getConnectionFormInfo();
	let values = $state<ConnectionFormValues>({
		hostName,
		portNum,
		password: null,
		slotName: null
	});

	let connecting = $state(false);

	const title = 'Add New Connection';
</script>

{#snippet body()}
	{#if connecting}
		<div class="my-auto flex flex-col items-center justify-center gap-2">
			<span class="bg-linear-to-r from-white to-primary bg-clip-text text-transparent">
				Connecting to the server...
			</span>
			<span class="loader"></span>
		</div>
	{:else}
		<div class="panel h-full bg-secondary-500">
			<div class="h-full w-full rounded-2xl bg-secondary-400">
				<AddConnectionForm bind:values></AddConnectionForm>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet actions()}
	<button
		class="button button-lg button-success"
		onclick={async () => {
			const { slotName } = values;
			if (!slotName) return;

			connecting = true;
			await connectionManager.addConnection(slotName).then((result) => {
				connecting = false;

				if (result.connected) {
					close();
				}
			});
		}}
	>
		Connect to Server
	</button>
{/snippet}

<Modal {isOpen} {close} {title} {body} {actions}></Modal>
