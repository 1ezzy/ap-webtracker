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
	<span class="loader my-auto"></span>
{:else}
	<ConnectedView></ConnectedView>
{/if}
