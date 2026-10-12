<script lang="ts">
	import type { WidthManager } from '$lib/managers/width-manager.svelte';
	import MoveHorizontal from '@lucide/svelte/icons/move-horizontal';

	let { widthManager }: { widthManager: WidthManager } = $props();

	let handleHovered = $state(false);
	let handleActive = $derived(widthManager.isResizing);
</script>

<div
	class="grid h-full w-fit grid-rows-[1fr_min-content_1fr] flex-col justify-items-center gap-2 2xl:gap-8"
>
	<span
		class={[
			handleHovered || handleActive ? 'border-r border-l border-dashed' : '',
			handleActive ? 'border-white' : 'border-surface-700'
		]}
	></span>
	<MoveHorizontal
		class={[
			'button icon-button button-md cursor-col-resize touch-none button-surface',
			handleActive ? 'text-white' : 'text-surface-700'
		]}
		onpointerenter={() => (handleHovered = true)}
		onpointerleave={() => (handleHovered = false)}
		onpointerdown={(event: PointerEvent) => {
			event.preventDefault();
			event.stopPropagation();

			(event.currentTarget as Element).setPointerCapture(event.pointerId);
			widthManager.startResize(event);
		}}
		onpointermove={(event: PointerEvent) => widthManager.handleWidthResize(event)}
		onlostpointercapture={() => widthManager.endResize()}
	></MoveHorizontal>
	<span
		class={[
			handleHovered || handleActive ? 'border-r border-l border-dashed' : '',
			handleActive ? 'border-white' : 'border-surface-700'
		]}
	></span>
</div>
