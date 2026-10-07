<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	let { open = $bindable(false) } = $props();
</script>

<details class="flex h-full w-full flex-col overflow-hidden">
	<summary class="flex h-fit w-full items-center justify-between" onclick={() => (open = !open)}>
		<h2 class="flex items-center gap-2 text-fluid-lg">Multiworld Messages</h2>
		<ChevronRight class={['transition duration-300', open ? 'rotate-90' : '']}></ChevronRight>
	</summary>
	<div class="min-h-0 overflow-hidden pt-4">
		<div class="h-full min-h-0 overflow-y-scroll bg-primary text-fluid-xs"></div>
	</div>
</details>
