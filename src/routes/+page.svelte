<script lang="ts">
	import { fetchSchedule } from '@/lib/mlb'

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

		<ul>
			{#each games as game}
				<li>{game.link}</li>
			{/each}
		</ul>
	{:else}
		<p>No games found</p>
	{/if}
{/await}
