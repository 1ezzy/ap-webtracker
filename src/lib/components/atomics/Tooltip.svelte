<script lang="ts">
	let { anchorName, label, tooltipText, children } = $props();

	let showTooltip = $state(false);

	let anchorNameClass = $derived(`[anchor-name:--${anchorName}]`);
	let positionAnchorClass = $derived(`[position-anchor:--${anchorName}]`);
</script>

<button
	class={['button button-md w-full', anchorNameClass]}
	aria-label={label}
	onmouseenter={() => (showTooltip = true)}
	onfocusin={() => (showTooltip = true)}
	onmouseleave={() => (showTooltip = false)}
	onfocusout={() => (showTooltip = false)}
>
	{@render children()}
</button>
<span
	class={['tooltip', positionAnchorClass]}
	class:hidden={!showTooltip}
	class:block={showTooltip}
>
	{tooltipText}
</span>
