<script lang="ts">
	import { fetchMLB } from '@/lib/mlb'

	const { endpoint }: { endpoint: string } = $props()
</script>

{#await fetchMLB<MLB.Game>(endpoint)}
	<div>Loading game...</div>
{:then { gameData }}
	<div>
		{gameData.teams.away.abbreviation} vs
		{gameData.teams.home.abbreviation}
	</div>
{/await}
