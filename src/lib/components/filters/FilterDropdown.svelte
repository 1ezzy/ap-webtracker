<script lang="ts">
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import X from '@lucide/svelte/icons/x';
	import type { Snippet } from 'svelte';

	let {
		id,
		filterLabel,
		selectedItemLabel,
		clearSelectedItem,
		children
	}: {
		id: string;
		filterLabel: string;
		selectedItemLabel: string | undefined;
		clearSelectedItem: (event: MouseEvent) => void;
		children: Snippet;
	} = $props();

	let open = $state(false);
</script>

<button
	class="flex h-10 flex-row items-center gap-2 rounded-md bg-primary-700 py-1 pr-4 pl-2 text-white"
	popovertarget={id}
	style:anchor-name={`${id}-anchor`}
>
	<ChevronDown class={['icon icon-sm transition duration-300', open ? '-scale-y-100' : '']}
	></ChevronDown>
	<span class="text-fluid-sm">{filterLabel}</span>
	{#if selectedItemLabel !== undefined}
		<span class="text-fluid-sm">|</span>
		<span class="text-fluid-sm">{selectedItemLabel}</span>
		<X class="icon icon-sm cursor-pointer" onclick={clearSelectedItem}></X>
	{/if}
</button>
<div class="popover w-full" style:position-anchor={`${id}-anchor`} {id} popover>
	{@render children()}
</div>
