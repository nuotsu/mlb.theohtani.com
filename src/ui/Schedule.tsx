'use client'

import { useStore } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import Game from './Game'

export default function Schedule() {
	const { date } = useStore()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)

	if (isLoading) return <div>Loading...</div>

	const games = data?.dates?.[0]?.games

	if (!games) return <div>No games</div>

	return <>{games?.map((game, key) => <Game game={game} key={key} />)}</>
}
