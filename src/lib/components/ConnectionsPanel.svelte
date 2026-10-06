<script lang="ts">
	import { Plus, GlobeX } from '@lucide/svelte';

	let connections = $state([{ slotName: 'Civilization 6' }]);
</script>

{#snippet connectionEntry(slotName: string, slotIndex: number)}
	<div class="flex flex-row items-center gap-2">
		<button class="button button-sm bg-danger">
			<GlobeX class=" h-2/3 text-primary-100"></GlobeX>
		</button>
		<span class="text-fluid-base text-primary-900">{slotIndex} - {slotName}</span>
	</div>
{/snippet}

<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
	<div class="flex h-fit items-center justify-between gap-2">
		<h2 class="text-fluid-lg">Slot Connections</h2>
		<button class="button button-md bg-success">
			<Plus class="h-2/3"></Plus>
		</button>
	</div>
	<div class="panel bg-accent">
		<div class="flex w-full flex-col gap-2">
			{#each connections as connection, i (connection.slotName)}
				{@render connectionEntry(connection.slotName, i + 1)}
			{/each}
		</div>
	</div>
</div>
