<script lang="ts">
	import PlayerTable from '$lib/components/PlayerTable.svelte';
	import { Plus, SquarePen } from '@lucide/svelte';
</script>

<div
	class="grid h-full flex-1 grid-cols-[1fr_3fr] items-start justify-center gap-x-16 overflow-y-hidden"
>
	<section
		class="grid h-full grid-rows-[1fr_3fr] items-center justify-items-center gap-y-16 overflow-y-hidden"
	>
		<div class="panel bg-primary">
			<div class="flex w-full flex-col gap-1">
				<div class="flex h-full justify-between gap-2">
					<h2 class="text-fluid-lg text-primary-content">Slot Connections</h2>
					<div class="flex flex-row items-center justify-center gap-4">
						<button
							class="flex aspect-square h-4/5 w-4/5 items-center justify-center rounded-lg bg-surface-100"
						>
							<SquarePen class="h-2/3"></SquarePen>
						</button>

						<button
							class="flex aspect-square h-4/5 w-4/5 items-center justify-center rounded-lg bg-surface-100"
						>
							<Plus class="h-2/3"></Plus>
						</button>
					</div>
				</div>
				<span class="text-fluid-lg text-primary-900">ezzy puzzle</span>
			</div>
		</div>
		<PlayerTable></PlayerTable>
	</section>
	<section class="grid h-full grid-rows-[1fr_2fr] items-center justify-items-center gap-y-16">
		<div class="h-full w-full rounded-2xl bg-secondary"></div>
		<div class="h-full w-full rounded-2xl bg-accent"></div>
	</section>
</div>
