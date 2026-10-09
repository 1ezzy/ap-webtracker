<script lang="ts">
	const { isOpen, close, title, body, actions } = $props();
</script>

{#if isOpen}
	<div
		role="dialog"
		class={[
			'text-white',
			'fixed top-0 right-0 bottom-0 left-0',
			'pointer-events-none flex items-center justify-center'
		]}
	>
		<div
			class="pointer-events-auto flex min-w-2/5 flex-col gap-8 rounded-lg border-2 border-white bg-surface-300 p-8"
		>
			<div class="flex flex-col gap-2">
				<h2 class="text-2xl">{title}</h2>
				<hr />
			</div>

			{@render body()}

			<div class="flex flex-col gap-2">
				<hr />
				<div class="flex items-center justify-end gap-2 py-4">
					<button class="button button-lg w-fit button-danger px-2" onclick={() => close()}
						>Close</button
					>
					{@render actions()}
				</div>
			</div>
		</div>
	</div>
{/if}
