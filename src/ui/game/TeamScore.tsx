import { useLocalStorage } from '@/lib/store'
import { isActive, isScheduled } from '@/lib/game-status'
import TeamLogo from '@/ui/TeamLogo'
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
		isActive(detailedState) &&
		((inningState === 'Top' && side === 'away') || (inningState === 'Bottom' && side === 'home'))

	return (
		<div className="group/team relative flex w-[4ch] shrink-0 flex-col overflow-hidden">
			{options.showColors && (
				<figure
					className={cn(
						'overflow-hidden transition-opacity',
						!offense && isActive(detailedState) && 'not-no-spoiler:opacity-60',
					)}
					title={team.name}
				>
					<TeamLogo
						className="anim-fade-to-b aspect-[3] w-full scale-110 object-cover"
						team={team}
						size={288}
					/>
				</figure>
			)}

			<div
				className={cn(
					'no-spoiler:grow relative grid items-center justify-center gap-x-2',
					options.showColors && 'grow',
					isScheduled(detailedState) && 'my-auto',
				)}
			>
				<Abbreviation
					className={cn(
						'transition-opacity',
						offense
							? 'group-has-[[data-scoring]]/game:animate-pulse'
							: isActive(detailedState) && 'not-no-spoiler:opacity-60',
					)}
					team={team}
				/>

				<small className="text-stroke anim-fade-to-r bg-canvas no-spoiler:hidden! absolute inset-0 place-content-center group-[:not(:hover)]/team:hidden">
					{wins}-{losses}
				</small>
			</div>

			{!isScheduled(detailedState) && (
				<div className="no-spoiler:hidden m-auto text-lg font-bold" data-score>
					<Flip disable={!isActive(detailedState)}>{runs}</Flip>
				</div>
			)}
		</div>
	)
}
