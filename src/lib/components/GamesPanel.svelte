<script lang="ts"></script>

{#snippet gamePanel(gameName: string, gamePlayer: string, gameChecks: number[])}
	<div class="flex h-full w-full flex-col gap-4 rounded-lg bg-secondary-500 px-4 py-2">
		<div class="flex flex-col">
			<span class="text-fluid-sm">{gameName}</span>
			<span class="text-fluid-xs text-primary-100/80">({gamePlayer})</span>
		</div>
		<div class="flex h-fit flex-col items-start justify-end leading-snug">
			<div class="flex h-fit items-center gap-2">
				<span class="text-fluid-xl">{gameChecks[0]} / {gameChecks[1]}</span>
			</div>
			<span class="text-fluid-xs text-primary-100/80">checks</span>
		</div>
	</div>
{/snippet}

<div class="flex h-full w-full flex-col gap-4 overflow-y-hidden">
	<h2 class="flex items-center gap-2 text-fluid-lg">Connected Games</h2>
	<div class="panel bg-secondary-400">
		<div class="flex h-full w-full flex-col gap-4">
			<div class="grid h-full grid-cols-3 gap-x-4">
				{@render gamePanel(`Jigsaw`, 'I Miss Title Fig', [498, 503])}
				{@render gamePanel(`Luigi's Mansion`, 'weegee', [680, 742])}
				{@render gamePanel(`Civilization VI`, 'charlie civ', [192, 270])}
			</div>
		</div>
	</div>
</div>
