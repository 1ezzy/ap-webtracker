<script lang="ts">
	import CreateConnectionForm from '$lib/components/forms/CreateConnectionForm.svelte';

	let values = $state({
		hostName: 'archipelago.gg',
		portNum: null,
		password: null,
		slotName: null
	});
</script>

<div class="flex h-full w-full items-center justify-center">
	<section class="grid h-fit w-1/2 max-w-3xl grid-rows-[min-content_1fr] gap-8">
		<h2 class="text-center text-fluid-2xl">Connect to an Archipelago Server</h2>
		<div class="panel h-full bg-secondary-500">
			<div class="h-full w-full rounded-2xl bg-secondary-400">
				<CreateConnectionForm bind:values></CreateConnectionForm>
			</div>
		</div>
	</section>
</div>
