<script lang="ts">
	import MoveHorizontal from '@lucide/svelte/icons/move-horizontal';

	let { widths = $bindable([null, null]) } = $props();

	let handleHovered = $state(false);
	let handleActive = $state(false);

	let handleOriginalPosition = $state<number>(-1);
	let handlePreviousPosition = $state<number>(-1);

	const handleWidthResize = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (!handleActive) {
			return;
		}

		if (!handleOriginalPosition) {
			handleOriginalPosition = event.clientX;
			handlePreviousPosition = event.clientX;
		}

		if (handleOriginalPosition !== handlePreviousPosition) {
			widths = [
				widths[0] - (handlePreviousPosition - event.clientX),
				widths[1] + (handlePreviousPosition - event.clientX)
			];
		}

		handlePreviousPosition = event.clientX;
	};
</script>

<svelte:window
	onmousemove={handleWidthResize}
	onmouseup={() => {
		if (handleActive) {
			handleActive = false;
		}
	}}
/>

<div
	class="grid h-full w-fit grid-rows-[1fr_min-content_1fr] flex-col justify-items-center gap-2 2xl:gap-8"
>
	<span
		class={[
			handleHovered || handleActive ? 'border-r border-l border-dashed' : '',
			handleActive ? 'border-primary' : 'border-surface-700'
		]}
	></span>
	<MoveHorizontal
		class={[
			'button icon-button button-md button-surface',
			handleActive ? 'text-primary' : 'text-surface-700'
		]}
		onmouseover={() => (handleHovered = true)}
		onmouseout={() => (handleHovered = false)}
		onmousedown={(event) => {
			event.preventDefault();
			event.stopPropagation();

			handleActive = true;
		}}
		onmouseup={() => (handleActive = false)}
	></MoveHorizontal>
	<span
		class={[
			handleHovered || handleActive ? 'border-r border-l border-dashed' : '',
			handleActive ? 'border-primary' : 'border-surface-700'
		]}
	></span>
</div>
