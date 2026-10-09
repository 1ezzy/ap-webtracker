<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		anchorName,
		label,
		tooltipText,
		children,
		class: className
	}: {
		anchorName: string;
		label: string;
		tooltipText: string;
		children: Snippet;
		class?: string;
	} = $props();

	let showTooltip = $state(false);

	let anchorNameClass = $derived(`--${anchorName}`);
	let positionAnchorClass = $derived(`--${anchorName}`);
</script>

<button
	type="button"
	class={['button button-md', className]}
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
