import { useLocalStorage } from '@/lib/store'
import { isActive, isScheduled } from '@/lib/game-status'
import Abbreviation from '@/ui/Abbreviation'
import Flip from '@/ui/Flip'
import { cn } from '@/lib/utils'

export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { options } = useLocalStorage()

	const { gameData, liveData } = data
	const { detailedState } = gameData.status
	const team = gameData.teams[side]
	const { runs } = liveData.linescore.teams[side]
	const { wins, losses } = team.record

	const { inningState } = liveData?.linescore
	const offense =
		(inningState === 'Top' && side === 'away') || (inningState === 'Bottom' && side === 'home')

	return (
		<div className="group/team highlighted:sm:text-xl highlighted:sm:w-[6ch] highlighted:lg:w-[10ch] relative flex w-[4ch] shrink-0 flex-col overflow-hidden">
			{options.showColors && (
				<figure className="overflow-hidden" title={team.name}>
					<img
						className={cn('anim-fade-to-b aspect-[3] w-full scale-110 object-cover')}
						src={`https://midfield.mlbstatic.com/v1/team/${team.id}/spots/288`}
						draggable={false}
						alt=""
					/>
				</figure>
			)}

			<div
				className={cn(
					'highlighted:lg:flex no-spoiler:grow relative grid items-center justify-center gap-x-2',
					options.showColors && 'grow',
					isScheduled(detailedState) && 'my-auto',
				)}
			>
				<Abbreviation
					className={cn(
						'not-highlighted:m-auto',
						isActive(detailedState) && offense && 'font-bold',
					)}
					team={team}
				/>

				<small
					className={cn(
						'text-stroke anim-fade-to-r bg-canvas absolute inset-0 place-content-center group-[:not(:hover)]/team:hidden',
						'highlighted:lg:static highlighted:lg:block',
						'no-spoiler:hidden!',
					)}
				>
					{wins}-{losses}
				</small>
			</div>

			{!isScheduled(detailedState) && (
				<div
					className="no-spoiler:hidden highlighted:sm:text-3xl m-auto text-lg font-bold"
					data-score
				>
					<Flip disable={!isActive(detailedState)}>{runs}</Flip>
				</div>
			)}
		</div>
	)
}
