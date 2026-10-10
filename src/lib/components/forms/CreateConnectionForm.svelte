<script lang="ts">
	import CircleX from '@lucide/svelte/icons/circle-x';
	import ListCheck from '@lucide/svelte/icons/list-check';
	import { connectionManager } from '$lib/clients/connection-manager.svelte';
	import Tooltip from '$lib/components/atomics/Tooltip.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import {
		connectionSchema,
		emptyConnectionValues,
		type ConnectionDetails,
		type ConnectionFormErrors,
		type ConnectionFormValues
	} from '$lib/schemas/connection';
	import { z } from 'zod';

	let {
		values = $bindable(emptyConnectionValues())
	}: {
		values?: ConnectionFormValues;
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
		hostName,
		portNum,
		password,
		slotName
	}: ConnectionDetails) => {
		await connectionManager
			.createConnection(`${hostName}:${portNum}`, slotName, password)
			.then(() => console.log('Connected to the Archipelago server!'))
			.catch(console.error);
	};
</script>

{#snippet buttons()}
	<div class="grid grid-cols-[1fr_min-content_min-content] gap-4">
		<button class="button button-lg w-full button-success">Connect to Server</button>
		<Tooltip
			class="icon-button button-lg button-surface"
			anchorName="games-tooltip"
			label="List of Supported Games"
			tooltipText="Supported Games"
		>
			<ListCheck></ListCheck>
		</Tooltip>
		<a href="https://github.com/1ezzy/ap-webtracker" target="_blank">
			<Tooltip
				class="icon-button button-lg button-surface"
				anchorName="github-tooltip"
				label="GitHub"
				tooltipText="GitHub Repo"
			>
				<GithubIcon></GithubIcon>
			</Tooltip>
		</a>
	</div>
{/snippet}

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
		{@render connectionInput('Host Name', 'hostName', 'archipelago.gg')}
		{@render connectionInput('Port Number', 'portNum', '38281')}
		{@render connectionInput('Password', 'password', '[your server password]', true)}
		{@render connectionInput('Slot Name', 'slotName', '[your slot name]')}
	</div>
	{#if buttons}
		{@render buttons()}
	{/if}
</form>
