<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';

	let { filterLabel } = $props();
</script>

<div
	class="flex h-10 flex-row items-center gap-2 rounded-md bg-primary-700 py-1 pr-4 pl-2 text-white"
>
	<ChevronDown class=""></ChevronDown>
	<span>{filterLabel}</span>
</div>
