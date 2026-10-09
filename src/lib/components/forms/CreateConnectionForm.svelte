<script lang="ts">
	import ListCheck from '@lucide/svelte/icons/list-check';
	import Tooltip from '$lib/components/atomics/Tooltip.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import { resolve } from '$app/paths';
	import ConnectionForm from './ConnectionForm.svelte';
	import { emptyConnectionValues, type ConnectionFormValues } from '$lib/schemas/connection';

	let { values = $bindable(emptyConnectionValues()) }: { values?: ConnectionFormValues } = $props();
</script>

{#snippet buttons()}
	<div class="grid grid-cols-[1fr_min-content_min-content] gap-4">
		<button class="button button-md w-full button-success">Connect to Server</button>
		<a href={resolve('/')}>
			<Tooltip
				class="icon-button button-md button-surface"
				anchorName="games-tooltip"
				label="List of Supported Games"
				tooltipText="Supported Games"
			>
				<ListCheck></ListCheck>
			</Tooltip>
		</a>
		<Tooltip
			class="icon-button button-md button-surface"
			anchorName="github-tooltip"
			label="GitHub"
			tooltipText="GitHub Repo"
		>
			<GithubIcon></GithubIcon>
		</Tooltip>
	</div>
{/snippet}

<ConnectionForm {buttons} bind:values></ConnectionForm>
