<script lang="ts">
	import { archipelago } from '$lib/clients/archipelago-client.svelte';
	import ConnectedView from '$lib/components/views/ConnectedView.svelte';
	import CreateConnectionView from '$lib/components/views/CreateConnectionView.svelte';

	let connected = $derived(archipelago.connected);
	let connecting = $derived(archipelago.connecting);
</script>

{#if !connected && !connecting}
	<CreateConnectionView></CreateConnectionView>
{:else if !connected && connecting}
	<!--Spinner here-->
{:else}
	<ConnectedView></ConnectedView>
{/if}
