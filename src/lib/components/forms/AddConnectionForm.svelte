<script lang="ts">
	import ConnectionForm from './ConnectionForm.svelte';
	import { emptyConnectionValues, type ConnectionFormValues } from '$lib/schemas/connection';

	let { values = $bindable(emptyConnectionValues()) }: { values?: ConnectionFormValues } = $props();
</script>

<ConnectionForm bind:values disabledInputs={{ hostName: true, portNum: true }}></ConnectionForm>
