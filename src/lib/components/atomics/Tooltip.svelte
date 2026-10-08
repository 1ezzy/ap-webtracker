<script lang="ts">
	let { anchorName, label, tooltipText, children } = $props();

	let showTooltip = $state(false);

	let anchorNameClass = $derived(`--${anchorName}`);
	let positionAnchorClass = $derived(`--${anchorName}`);
</script>

<button
	class={['button button-md w-full']}
	style:anchor-name={anchorNameClass}
	aria-label={label}
	onmouseenter={() => (showTooltip = true)}
	onfocusin={() => (showTooltip = true)}
	onmouseleave={() => (showTooltip = false)}
	onfocusout={() => (showTooltip = false)}
>
	{@render children()}
</button>
<span
	class={['tooltip']}
	style:position-anchor={positionAnchorClass}
	class:hidden={!showTooltip}
	class:block={showTooltip}
>
	{tooltipText}
</span>
