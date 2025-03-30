import { fetchMLBLive } from '@/lib/mlb'
import TeamScore from './TeamScore'
import { isActive, isFinal, isScheduled } from '@/lib/game-status'
import CurrentInning from './CurrentInning'
import BaseRunners from './BaseRunners'
import OutCount from './OutCount'
import Flip from './Flip'
import CurrentPlay from './CurrentPlay'
import { cn } from '@/lib/utils'

export default function Game({ game, index }: { game: MLB.ScheduleGame; index: number }) {
	const { data, isLoading } = fetchMLBLive<MLB.LiveData>(game.link)

	if (isLoading) return <div>Loading game...</div>
	if (!data) return <div>No data</div>

	const { detailedState } = data?.gameData.status
	const { liveData, gameData } = data

	return (
		<>
			<article
				className={cn('bg-canvas border text-center', {
					'order-first': isActive(detailedState),
					'-order-1': isScheduled(detailedState),
				})}
			>
				<div className="flex">
					<TeamScore data={data} side="away" />
					<TeamScore data={data} side="home" />
					<div className="relative grid grow place-content-center">
						{isScheduled(detailedState) && (
							<>
								{gameData.datetime.time} {gameData.datetime.ampm}
							</>
						)}

						{isActive(detailedState) && (
							<div className="flex flex-wrap items-center justify-center gap-x-3">
								<CurrentInning linescore={liveData.linescore} />
								<BaseRunners linescore={liveData.linescore} />
								<OutCount linescore={liveData.linescore} />
								<div className="flex w-full justify-center tabular-nums">
									<Flip title="Balls">{liveData.linescore.balls}</Flip>-
									<Flip title="Strikes">{liveData.linescore.strikes}</Flip>
								</div>

								{isActive(detailedState) && (
									<CurrentPlay play={liveData.plays.currentPlay.result.description} />
								)}
							</div>
						)}

						{isFinal(detailedState) && <span>{detailedState}</span>}
					</div>
				</div>
			</article>

			{isActive(detailedState) && (
				<hr className="order-first col-span-full my-4 not-last-of-type:hidden" />
			)}
		</>
	)
}
