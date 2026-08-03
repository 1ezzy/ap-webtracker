<script lang="ts">
	import PlayerTable from '$lib/components/PlayerTable.svelte';
</script>

<main
	class={[
		'grid flex-1 grid-cols-[1fr_3fr] items-start justify-center gap-x-16',
		'px-8 py-12 pt-4 2xl:px-16 2xl:py-24 2xl:pt-8'
	]}
>
	<section class="grid h-full grid-rows-[1fr_3fr] gap-y-16">
		<div class="rounded-2xl bg-primary"></div>
		<PlayerTable></PlayerTable>
	</section>
	<section class="grid h-full grid-rows-[1fr_2fr] gap-y-16">
		<div class="h-full w-full rounded-2xl bg-secondary"></div>
		<div class="h-full w-full rounded-2xl bg-accent"></div>
	</section>
</main>
