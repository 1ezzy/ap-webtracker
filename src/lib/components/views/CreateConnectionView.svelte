<script lang="ts">
	import { CircleX, ListCheck } from '@lucide/svelte';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Tooltip from '$lib/components/atomics/Tooltip.svelte';
	import {
		connectionSchema,
		type ConnectionDetails,
		type ConnectionFormErrors,
		type ConnectionFormValues
	} from '$lib/schemas/connection';
	import { z } from 'zod';
	import GithubIcon from '../icons/GithubIcon.svelte';

	let values = $state<ConnectionFormValues>({
		serverAddress: 'archipelago.gg',
		portNum: '38281',
		password: '',
		slotName: ''
	});
	let errors = $state<ConnectionFormErrors>({});

	const onSubmit = (event: SubmitEvent) => {
		event.preventDefault();

		const result = connectionSchema.safeParse(values);
		if (!result.success) {
			errors = z.flattenError(result.error).fieldErrors;
			return;
		}

		errors = {};
		connectClientToServer(result.data);
	};

	const connectClientToServer = async ({
		serverAddress,
		portNum,
		password,
		slotName
	}: ConnectionDetails) => {
		await connectionManager
			.createConnection(`${serverAddress}:${portNum}`, slotName, password)
			.then(() => console.log('Connected to the Archipelago server!'))
			.catch(console.error);
	};
</script>

{#snippet connectionInput(
	label: string,
	id: keyof ConnectionFormValues,
	placeholder: string,
	optional?: boolean
)}
	<div class="flex flex-col gap-2">
		<div class="flex gap-2">
			<label class="text-secondary-content" for={id}>
				{label}
				{#if optional}
					<span class="text-fluid-xs text-secondary-700">(optional)</span>
				{/if}
			</label>
			{#if errors[id]?.length}
				<div class="flex items-center text-danger">
					<CircleX class="h-4 stroke-3"></CircleX>
					<span id="{id}-error">{errors[id][0]}</span>
				</div>
			{/if}
		</div>
		<input
			{id}
			class="input w-full input-secondary"
			type={id === 'password' ? 'password' : 'text'}
			name={id}
			required={!optional}
			{placeholder}
			bind:value={values[id]}
			aria-invalid={errors[id]?.length ? true : undefined}
			aria-describedby={errors[id]?.length ? `${id}-error` : undefined}
		/>
	</div>
{/snippet}

<div class="flex h-full w-full items-center justify-center">
	<section class="grid h-fit w-1/2 max-w-3xl grid-rows-[min-content_1fr] gap-8">
		<h2 class="text-center text-fluid-2xl">Connect to an Archipelago Server</h2>
		<div class="panel h-full bg-secondary-500">
			<div class="h-full w-full rounded-2xl bg-secondary-400">
				<form class="grid-rows-auto grid gap-16 p-8" novalidate onsubmit={onSubmit}>
					<div class="grid grid-rows-4 gap-8">
						{@render connectionInput('Server Address', 'serverAddress', 'archipelago.gg')}
						{@render connectionInput('Port Number', 'portNum', '38281')}
						{@render connectionInput('Password', 'password', '[your server password]', true)}
						{@render connectionInput('Slot Name', 'slotName', '[your slot name]')}
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
							<GithubIcon></GithubIcon>
						</Tooltip>
					</div>
				</form>
			</div>
		</div>
	</section>
</div>
