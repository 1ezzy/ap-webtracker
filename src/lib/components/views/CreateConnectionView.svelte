<script lang="ts">
	import { ListCheck } from '@lucide/svelte';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Tooltip from '$lib/components/atomics/Tooltip.svelte';

	async function connectClientToServer(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		const serverAddress = data.get('serverAddress')?.toString();
		const portNum = data.get('portNum')?.toString();
		const password = data.get('password')?.toString() || undefined;
		const slotName = data.get('slotName')?.toString() ?? 'Player1';

		await connectionManager
			.createConnection(`${serverAddress}:${portNum}`, slotName, password ?? '')
			.then(() => console.log('Connected to the Archipelago server!'))
			.catch(console.error);
	}
</script>

{#snippet connectionInput(label: string, id: string)}
	<div class="flex flex-col gap-2">
		<label class="text-secondary-content" for="serverAddress">{label}</label>
		<input class="input w-full input-secondary" type="text" {id} name={id} required={true} />
	</div>
{/snippet}

<div class="flex h-full w-full items-center justify-center">
	<section class="grid h-fit w-1/2 max-w-3xl grid-rows-[min-content_1fr] gap-8">
		<h2 class="text-fluid-2xl">Connect to an Archipelago Server</h2>
		<div class="panel h-full bg-secondary-500">
			<div class="h-full w-full rounded-2xl bg-secondary-400">
				<form class="grid-rows-auto grid gap-16 p-8" onsubmit={connectClientToServer}>
					<div class="grid grid-rows-4 gap-8">
						{@render connectionInput('Server Address', 'serverAddress')}
						{@render connectionInput('Port Number', 'portNum')}
						{@render connectionInput('Password', 'password')}
						{@render connectionInput('Slot Name', 'slotName')}
					</div>
					<div class="grid grid-cols-[1fr_min-content_min-content] gap-4">
						<button class="button button-md w-full bg-success">Connect to Server</button>
						<Tooltip
							anchorName="games-tooltip"
							label="List of Supported Games"
							tooltipText="Supported Games"
						>
							<ListCheck></ListCheck>
						</Tooltip>
						<Tooltip anchorName="github-tooltip" label="GitHub" tooltipText="GitHub Repo">
							<svg
								class="h-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
								/>
							</svg>
						</Tooltip>
					</div>
				</form>
			</div>
		</div>
	</section>
</div>
