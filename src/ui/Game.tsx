import { useStore } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import TeamScore from './TeamScore'
import { isActive, isFinal, isScheduled } from '@/lib/game-status'
import CurrentInning from './CurrentInning'
import BaseRunners from './BaseRunners'
import OutCount from './OutCount'
import BallsStrikes from './BallsStrikes'
import CurrentPlay from './CurrentPlay'
import Scoreboard from './Scoreboard'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { options } = useStore()
	const { data, isLoading } = fetchMLBLive<MLB.LiveData>(game.link)

	if (isLoading) return <div>Loading game...</div>
	if (!data) return <div>No data</div>

	const { gameData, liveData } = data
	const { detailedState } = gameData.status

	return (
		<>
			<article
				className={cn(
					'bg-canvas has-[[data-scoring]]:animate-scoring @container grid border text-center',
					{
						'-order-3': isActive(detailedState),
						'-order-2': detailedState.startsWith('Delayed'),
						'-order-1': isScheduled(detailedState),
					},
				)}
			>
				<div className="flex">
					<TeamScore data={data} side="away" />
					<TeamScore data={data} side="home" />
					<div className="relative grid grow place-content-center leading-tight">
						{isScheduled(detailedState) && (
							<>
								{gameData.datetime.time} {gameData.datetime.ampm}
							</>
						)}

						{detailedState.startsWith('Delayed') && <span>{detailedState}</span>}

						{isActive(detailedState) && (
							<div className="flex flex-wrap items-center justify-center gap-x-3">
								<CurrentInning linescore={liveData.linescore} />
								<BaseRunners linescore={liveData.linescore} />
								<OutCount linescore={liveData.linescore} />
								<BallsStrikes linescore={liveData.linescore} />

								{isActive(detailedState) && (
									<CurrentPlay play={liveData.plays.currentPlay.result.description} />
								)}
							</div>
						)}

						{isFinal(detailedState) && <span>{detailedState}</span>}
					</div>
				</div>

				{(isActive(detailedState) || isFinal(detailedState)) &&
					detailedState !== 'Cancelled' &&
					options.showScoreboard && <Scoreboard data={data} />}
			</article>

			{isActive(detailedState) && (
				<hr
					data-active
					className="border-stroke -order-2 col-span-full my-4 data-[active]:not-first-of-type:hidden"
				/>
			)}

			{detailedState.startsWith('Delayed') ||
				(isScheduled(detailedState) && (
					<hr
						data-scheduled
						className="border-stroke -order-1 col-span-full my-4 hidden data-[scheduled]:not-last-of-type:hidden [[data-active]~&]:block"
					/>
				))}
		</>
	)
}
