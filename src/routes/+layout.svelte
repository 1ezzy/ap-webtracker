<script lang="ts">
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

<div class="flex h-full min-h-screen w-full bg-surface text-primary-100">
	{@render children()}
</div>
