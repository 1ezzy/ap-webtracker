<script lang="ts">
	import logo from '$lib/assets/images/archipelago-logo.webp';
	import { Modals } from 'svelte-modals';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>AP Webtracker</title>
	<meta
		name="AP Webtracker"
		content="Web-based tracker for the Archipelago multi-game randomizer"
	/>
</svelte:head>

<Modals>
	{#snippet backdrop({ close })}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="fixed top-0 right-0 bottom-0 left-0 bg-surface-100/70"
			role="region"
			onclick={() => close()}
		></div>
	{/snippet}
</Modals>

<div class="grid h-screen w-full grid-rows-[min-content_1fr] bg-surface text-white">
	<header class="h-fit w-full px-6 py-4 2xl:px-12 2xl:py-8">
		<div class="flex w-fit flex-row items-center justify-center gap-4">
			<img class="aspect-square h-8 w-fit" src={logo} alt="Archipelago Logo" />
			<h1 class="text-fluid-lg">Archipelago Webtracker</h1>
		</div>
	</header>
	<main
		class={['flex h-full min-h-0 flex-1 flex-col', 'px-8 py-8 pt-4 2xl:px-16 2xl:py-16 2xl:pt-8']}
	>
		{@render children()}
	</main>
</div>
