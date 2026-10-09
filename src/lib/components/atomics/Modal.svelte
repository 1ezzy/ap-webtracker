<script lang="ts">
	import type { ModalProps } from 'svelte-modals';

	interface Props extends ModalProps {
		title: string;
		message: string;
	}

	const { isOpen, close, title, message }: Props = $props();
</script>

{#if isOpen}
	<div role="dialog" class="">
		<div class="">
			<h2>{title}</h2>
			<p>{message}</p>
			<div class="">
				<button onclick={() => close()}>OK</button>
			</div>
		</div>
	</div>
{/if}
