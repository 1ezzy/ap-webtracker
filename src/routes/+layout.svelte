<script lang="ts">
	import { onMount } from 'svelte';
	import { archipelago } from '$lib/clients/archipelago-client.svelte';
	import logo from '$lib/assets/images/archipelago-logo.webp';
	import './layout.css';

	let { children } = $props();

	onMount(async () => {
		await archipelago
			.connect('archipelago.gg:34413', 'ezzy puzzle')
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

<div class="flex h-full min-h-screen w-full flex-col bg-surface text-primary-100">
	<header class="h-28 w-full px-6 py-4 2xl:px-12 2xl:py-8">
		<div class="flex w-fit flex-row items-center justify-center gap-4">
			<img class="aspect-square h-8 w-fit" src={logo} alt="Archipelago Logo" />
			<h1 class="text-fluid-lg">Archipelago Webtracker</h1>
		</div>
	</header>
	<main
		class={[
			'flex h-full max-h-[calc(100vh-7rem)] flex-1 flex-col',
			'px-8 py-12 pt-4 2xl:px-16 2xl:py-24 2xl:pt-8'
		]}
	>
		{@render children()}
	</main>
</div>
