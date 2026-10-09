<script lang="ts">
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import type { Connection } from '$lib/clients/connection.svelte';
	import { mapMessageWithColors } from '$lib/messages/color-message';
	import { parseChatInput } from '$lib/messages/parse-chat-input';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Send from '@lucide/svelte/icons/send';

	let { open = $bindable(true) } = $props();

	let messages = $derived(connectionManager.feed);
	let connectedPlayers = $derived(connectionManager.connectedPlayers);

	let scroller = $state<HTMLDivElement>();
	let pinned = true;

	let message = $state('');
	let selectedSlot = $state<number>();

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

	const onMessageSubmit = async (event: SubmitEvent) => {
		event.preventDefault();

		const parsed = parseChatInput(message);
		let text: string;

		switch (parsed.type) {
			case 'message':
				text = parsed.text;
				break;
			case 'hint':
				text = `!hint ${parsed.itemName}`;
				break;
			case 'invalid':
				return;
		}

		const connection = connectionManager.getConnectionBySlot(
			selectedSlot ?? connectedPlayers[0]?.slot ?? -1
		);

		if (!connection) {
			return;
		}

		await sendMessage(connection, text);
	};

	const sendMessage = async (connection: Connection, text: string) => {
		try {
			await connection.client.messages.say(text);
			message = '';
		} catch (err) {
			console.error(err);
		}
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
	<div class="mt-4 flex h-full min-h-0 flex-col gap-2 2xl:gap-4">
		<div
			bind:this={scroller}
			onscroll={handleScroll}
			class={[
				'panel h-full overflow-y-auto border-4 border-white bg-surface-300',
				'flex flex-col gap-2'
			]}
		>
			{#each messages as message (message.id)}
				<div class="">
					{#each mapMessageWithColors(message.nodes) as coloredNode (coloredNode.node.text)}
						<span class={['font-times', coloredNode.color]}>
							{coloredNode.node.text}
						</span>
					{/each}
				</div>
			{/each}
		</div>
		<div class="grid grid-rows-[min-content_auto] gap-1 2xl:gap-2">
			<span class="text-fluid-xs">Command Input</span>
			<div class="grid grid-rows-2 gap-2 2xl:gap-4">
				<select class="input input-surface" bind:value={selectedSlot}>
					{#if !selectedSlot}
						<option class="font-open-sans" value={null}> Select a slot </option>
					{/if}
					{#each connectedPlayers as player (player?.slot)}
						<option class="font-open-sans" value={player?.slot}>
							{player?.name}
						</option>
					{/each}
				</select>
				<form
					class="grid grid-cols-[auto_min-content] items-center gap-1 2xl:gap-2"
					onsubmit={onMessageSubmit}
				>
					<input
						class="input input-surface"
						placeholder="!hint [item name] or type a message"
						bind:value={message}
					/>
					<button
						type="submit"
						class="button icon-button button-lg button-success"
						disabled={!selectedSlot}
					>
						<Send></Send>
					</button>
				</form>
			</div>
		</div>
	</div>
</details>
