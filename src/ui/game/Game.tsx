import { useLocalStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import TeamScore from './TeamScore'
import { isActive, isFinal, isScheduled } from '@/lib/game-status'
import DiamondStatus from './DiamondStatus'
import Matchup from './Matchup'
import Scheduled from './Scheduled'
import Final from './Final'
import Scoreboard from './Scoreboard'
import GameOptions from './GameOptions'
import { cn } from '@/lib/utils'

export default function Game({ game }: { game: MLB.ScheduleGame }) {
	const { options } = useLocalStorage()
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)
	if (!data) return null

	const { gameData, liveData } = data
	const { detailedState, abstractGameState } = gameData.status

	return (
		<>
			<article
				className={cn(
					'group/game bg-canvas anim-fade @container relative flex min-h-[2lh] flex-col justify-evenly overflow-hidden border text-center transition-colors',
					'has-[[data-scoring]]:animate-scoring has-highlighted:order-first has-highlighted:col-span-full',
					'has-no-spoiler:border-stroke! has-no-spoiler:outline-none!',
					{
						'-order-3': isActive(detailedState),
						'-order-2': detailedState.startsWith('Delayed'),
						'-order-1': isScheduled(detailedState),
					},
				)}
			>
				<div className="relative z-1 flex grow items-stretch">
					<TeamScore data={data} side="away" />
					<TeamScore data={data} side="home" />

					<div className="grid grow leading-tight">
						{isActive(detailedState) && (
							<>
								<DiamondStatus data={data} />
								<Matchup liveData={liveData} />
							</>
						)}

						<Scheduled data={data} />

						{detailedState.startsWith('Delayed') && (
							<div className="m-auto p-1">{detailedState}</div>
						)}

						{abstractGameState === 'Final' && <Final data={data} />}
					</div>
				</div>

				{(isActive(detailedState) || isFinal(detailedState)) &&
					detailedState !== 'Cancelled' &&
					options.showScoreboard && <Scoreboard data={data} />}

				<GameOptions teams={gameData.teams} />
			</article>

			{isActive(detailedState) && (
				<hr
					data-active
					className="border-stroke -order-2 col-span-full my-4 border-dashed data-[active]:not-first-of-type:hidden"
				/>
			)}

			{detailedState.startsWith('Delayed') ||
				(isScheduled(detailedState) && (
					<hr
						data-scheduled
						className="border-stroke -order-1 col-span-full my-4 hidden border-dashed data-[scheduled]:not-last-of-type:hidden [[data-active]~&]:block"
					/>
				))}
		</>
	)
}
