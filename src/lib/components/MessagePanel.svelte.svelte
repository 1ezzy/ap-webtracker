<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronRight } from '@lucide/svelte';

	let { open = $bindable(false) } = $props();
</script>

<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
	<button
		class="flex h-fit w-full items-center justify-between"
		onclick={() => (open = !open)}
		onkeydown={() => (open = !open)}
	>
		<h2 class="flex items-center gap-2 text-fluid-lg">Multiworld Messages</h2>
		<ChevronRight class={['transition duration-200', open ? 'rotate-90' : '']}></ChevronRight>
	</button>
	{#if open}
		<div
			class="overflow-y-scroll text-fluid-xs"
			transition:slide={{ duration: 200, axis: 'y' }}
		></div>
	{/if}
</div>
