<script lang="ts">
	import { fetchMLB } from '@/lib/mlb'

	const { endpoint }: { endpoint: string } = $props()

	type DetailedState = MLB.GameStatus['detailedState']

	const isInProgress = (detailedState: DetailedState) =>
		(['In Progress', 'Manager challenge', 'Umpire review'] as DetailedState[]).includes(
			detailedState,
		)
</script>

{#await fetchMLB<MLB.LiveData>(endpoint)}
	<div>Loading game...</div>
{:then { gameData, liveData }}
	{@const { detailedState } = gameData.status}

	<div>
		{gameData.teams.away.abbreviation}
		{liveData.linescore.teams.away.runs} vs
		{liveData.linescore.teams.home.runs}
		{gameData.teams.home.abbreviation}
		({detailedState})

		{#if isInProgress(detailedState) && liveData.plays.currentPlay.result.description}
			<!-- svelte-ignore a11y_distracting_elements -->
			<marquee>
				{liveData.plays.currentPlay.result.description}
			</marquee>
		{/if}
	</div>

	{#if gameData.teams.home.abbreviation === 'LAD'}
		{$inspect(liveData)}
		<!-- <pre>{JSON.stringify(liveData, null, 2)}</pre> -->
	{/if}
{/await}
