<script lang="ts">
	import CircleX from '@lucide/svelte/icons/circle-x';
	import ListCheck from '@lucide/svelte/icons/list-check';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Tooltip from '$lib/components/atomics/Tooltip.svelte';
	import {
		connectionSchema,
		type ConnectionDetails,
		type ConnectionFormErrors,
		type ConnectionFormValues
	} from '$lib/schemas/connection';
	import { z } from 'zod';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import { resolve } from '$app/paths';

	let {
		values = $bindable<ConnectionFormValues>({
			serverAddress: 'archipelago.gg',
			portNum: '38281',
			password: '',
			slotName: ''
		}),
		includeButtons = true
	} = $props();

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

<form class="grid-rows-auto grid gap-16 p-8" novalidate onsubmit={onSubmit}>
	<div class="grid grid-rows-4 gap-8">
		{@render connectionInput('Server Address', 'serverAddress', 'archipelago.gg')}
		{@render connectionInput('Port Number', 'portNum', '38281')}
		{@render connectionInput('Password', 'password', '[your server password]', true)}
		{@render connectionInput('Slot Name', 'slotName', '[your slot name]')}
	</div>
	{#if includeButtons}
		<div class="grid grid-cols-[1fr_min-content_min-content] gap-4">
			<button class="button button-md w-full button-success">Connect to Server</button>

			<Tooltip
				class="icon-button button-md button-surface"
				anchorName="games-tooltip"
				label="List of Supported Games"
				tooltipText="Supported Games"
			>
				<a href={resolve('/')}>
					<ListCheck class="h-2/3"></ListCheck>
				</a>
			</Tooltip>
			<Tooltip
				class="icon-button button-md button-surface"
				anchorName="github-tooltip"
				label="GitHub"
				tooltipText="GitHub Repo"
			>
				<GithubIcon class="h-2/3"></GithubIcon>
			</Tooltip>
		</div>
	{/if}
</form>
