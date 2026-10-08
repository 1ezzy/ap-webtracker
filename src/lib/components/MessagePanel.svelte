<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import { ChevronRight, Send } from '@lucide/svelte';

	let { open = $bindable(true) } = $props();

	let messages = $derived(connectionManager.feed);
	let players = $derived(connectionManager.connectedPlayers);

	let scroller = $state<HTMLDivElement>();
	let pinned = true;

	const handleScroll = () => {
		if (!scroller) {
			return;
		}
		pinned = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 24;
	};

	$effect(() => {
		const lastMessage = messages.at(-1);
		if (lastMessage && scroller && pinned) scroller.scrollTop = scroller.scrollHeight;
	});

	const handleMessageInput = (event: Event) => {
		console.log(event);
	};
</script>

<details
	bind:open
	class={[
		'flex h-full w-full flex-col overflow-hidden',
		'details-content:flex details-content:min-h-0 details-content:flex-1 details-content:flex-col'
	]}
>
	<summary class="flex h-fit w-full items-center justify-between">
		<h2 class="flex items-center gap-2 text-fluid-lg">Multiworld Messages</h2>
		<ChevronRight class={['transition duration-300', open ? 'rotate-90' : '']}></ChevronRight>
	</summary>
	<div class="flex h-full min-h-0 flex-col gap-2 pt-4 2xl:gap-4">
		<div
			bind:this={scroller}
			onscroll={handleScroll}
			class={[
				'panel h-full overflow-y-auto border-4 border-white bg-surface-200',
				'flex flex-col gap-2'
			]}
		>
			{#each messages as message (message.id)}
				<span>{message.text}</span>
			{/each}
		</div>
		<div class="grid grid-rows-[min-content_auto] gap-1 2xl:gap-2">
			<span class="text-fluid-xs">Command Input</span>
			<div class="grid grid-rows-2 gap-2 2xl:gap-4">
				<select class="input input-surface" onsubmit={handleMessageInput}>
					{#each players as player (player?.slot)}
						<option class="font-open-sans" value={`message-slot-${player?.slot}`}
							>{player?.name}</option
						>
					{/each}
				</select>
				<div class="grid grid-cols-[1fr_min-content] items-center gap-1 2xl:gap-2">
					<input
						class="input input-surface"
						placeholder="!hint [slot name] [item name]"
						onsubmit={handleMessageInput}
					/>
					<button class="button button-sm text-success" onclick={handleMessageInput}>
						<Send></Send>
					</button>
				</div>
			</div>
		</div>
	</div>
</details>
