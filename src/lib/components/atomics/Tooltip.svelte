<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

	let {
		anchorName,
		label,
		tooltipText,
		children,
		class: className,
		href
	}: {
		anchorName: string;
		label: string;
		tooltipText: string;
		children: Snippet;
		class?: string;
		href?: string;
	} = $props();

	let showTooltip = $state(false);

	let anchorNameClass = $derived(`--${anchorName}`);
	let positionAnchorClass = $derived(`--${anchorName}`);

	onNavigate(() => {
		showTooltip = false;
	});
</script>

{#snippet button()}
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
{/snippet}

{#if href}
	<a {href} rel="external" target="_blank">
		{@render button()}
	</a>
{:else}
	{@render button()}
{/if}
