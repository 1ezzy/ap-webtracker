<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Modal from '$lib/components/atomics/Modal.svelte';
	import CreateConnectionForm from '$lib/components/CreateConnectionForm.svelte';
	import type { ConnectionFormValues } from '$lib/schemas/connection';

	const { isOpen, close } = $props();

	let connecting = $state(false);

	const title = 'Add New Connection';
	const contentProps = {
		includeButtons: false
	};

	let values = $state<ConnectionFormValues>({
		serverAddress: 'archipelago.gg',
		portNum: '38281',
		password: '',
		slotName: ''
	});
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
				<CreateConnectionForm {...contentProps} bind:values></CreateConnectionForm>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet actions()}
	<button
		class="button button-md button-success"
		onclick={async () => {
			connecting = true;
			await connectionManager.addConnection(values.slotName).then((result) => {
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
