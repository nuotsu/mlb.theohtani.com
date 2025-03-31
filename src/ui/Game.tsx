import { useStore } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import TeamScore from './TeamScore'
import { isActive, isFinal, isScheduled } from '@/lib/game-status'
import CurrentInning from './CurrentInning'
import BaseRunners from './BaseRunners'
import OutCount from './OutCount'
import BallsStrikes from './BallsStrikes'
import CurrentPlay from './CurrentPlay'
import Matchup from './Matchup'
import Scheduled from './Scheduled'
import Final from './Final'
import Scoreboard from './Scoreboard'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { options } = useStore()
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)
	if (!data) return null

	const { gameData, liveData } = data
	const { detailedState, abstractGameState } = gameData.status

	return (
		<>
			<article
				className={cn(
					'bg-canvas has-[[data-scoring]]:animate-scoring anim-fade @container grid overflow-hidden border text-center',
					{
						'-order-3': isActive(detailedState),
						'-order-2': detailedState.startsWith('Delayed'),
						'-order-1': isScheduled(detailedState),
					},
				)}
			>
				<div className="relative z-1 flex items-stretch">
					<TeamScore data={data} side="away" />
					<TeamScore data={data} side="home" />

					<div className="grid grow leading-tight">
						{isActive(detailedState) && (
							<div>
								<div className="relative flex flex-wrap items-center justify-center gap-x-3 py-2">
									<CurrentInning linescore={liveData.linescore} />
									<BaseRunners linescore={liveData.linescore} />
									<OutCount linescore={liveData.linescore} />
									<BallsStrikes liveData={liveData} />
									{isActive(detailedState) && (
										<CurrentPlay play={liveData.plays.currentPlay.result.description} />
									)}
								</div>
								<Matchup liveData={liveData} />
							</div>
						)}

						{isScheduled(detailedState) && <Scheduled gameData={gameData} />}

						{detailedState.startsWith('Delayed') && (
							<div className="m-auto p-1">{detailedState}</div>
						)}

						{abstractGameState === 'Final' && <Final data={data} />}
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
