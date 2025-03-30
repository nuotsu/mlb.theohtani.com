'use client'

import { useStore } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import Game from './Game'

export default function Schedule() {
	const { date } = useStore()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)

	if (isLoading) return <div>Loading games...</div>

	const games = data?.dates?.[0]?.games

	if (!games) return <div>No games</div>

	return (
		<section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1">
			{games?.map((game, key) => <Game game={game} key={key} />)}
		</section>
	)
}
