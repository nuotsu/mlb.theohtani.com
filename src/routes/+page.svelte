<script lang="ts">
	import { fetchSchedule } from '@/lib/mlb'
	import Game from '@/ui/Game.svelte'

	let date = $state(
		new Date().toLocaleDateString('en-CA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}),
	)
</script>

<h1>MLB Score Bug</h1>

<input name="date" type="date" bind:value={date} />

{#await fetchSchedule(date)}
	<div>Loading games...</div>
{:then schedule}
	{#if schedule.totalGames > 0}
		{@const { games } = schedule?.dates?.[0]}

		{#each games as game}
			<Game endpoint={game.link} />
		{/each}
	{:else}
		<div>No games found</div>
	{/if}
{/await}
