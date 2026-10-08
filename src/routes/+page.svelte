<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import ConnectedView from '$lib/components/views/ConnectedView.svelte';
	import CreateConnectionView from '$lib/components/views/CreateConnectionView.svelte';

	let connected = $derived(connectionManager.connected);
	let connecting = $derived(connectionManager.connecting);
</script>

{#if !connected && !connecting}
	<CreateConnectionView></CreateConnectionView>
{:else if !connected && connecting}
	<div class="my-auto flex flex-col items-center justify-center gap-2">
		<span class="bg-linear-to-r from-white to-primary bg-clip-text text-transparent">
			Connecting to the server...
		</span>
		<span class="loader"></span>
	</div>
{:else}
	<ConnectedView></ConnectedView>
{/if}
