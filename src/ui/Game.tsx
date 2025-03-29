import { fetchMLBLive } from '@/lib/mlb'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { data, isLoading } = fetchMLBLive<MLB.LiveData>(game.link)

	if (isLoading) return <div>Loading...</div>

	if (!data) return <div>No data</div>

	const { detailedState } = data?.gameData.status
	const { liveData, gameData } = data
	const isActive = (
		[
			'In Progress',
			'Manager challenge',
			'Manager challenge: Tag play',
			'Umpire review',
		] as MLB.GameStatus['detailedState'][]
	).includes(detailedState)

	return (
		<div>
			<div className="flex gap-1">
				{gameData.teams.away.abbreviation}
				<b>{liveData.linescore.teams.away.runs}</b>
				vs
				<b>{liveData.linescore.teams.away.runs}</b>
				{gameData.teams.home.abbreviation}
				<span>({detailedState})</span>
				<span>
					{liveData.linescore.balls}-{liveData.linescore.strikes}
				</span>
			</div>

			{/* @ts-ignore */}
			{isActive && <marquee>{liveData.plays.currentPlay.result.description}</marquee>}
		</div>
	)
}
