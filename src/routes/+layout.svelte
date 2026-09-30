<script lang="ts">
	import { onMount } from 'svelte';
	import { archipelago } from '$lib/clients/archipelago-client.svelte';
	import logo from '$lib/assets/images/archipelago-logo.webp';
	import './layout.css';

	let { children } = $props();

	onMount(async () => {
		await archipelago
			.connect('archipelago.gg:40309', 'charlie civ')
			.then(() => console.log('Connected to the Archipelago server!'))
			.catch(console.error);
	});
</script>

<svelte:head>
	<title>AP Webtracker</title>
	<meta
		name="AP Webtracker"
		content="Web-based tracker for the Archipelago multi-game randomizer"
	/>
</svelte:head>

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
