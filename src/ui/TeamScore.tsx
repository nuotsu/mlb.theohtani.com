import { useStore } from '@/lib/store'
import { isActive, isScheduled } from '@/lib/game-status'
import Abbreviation from './Abbreviation'
import Flip from './Flip'
import { cn } from '@/lib/utils'

export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { options } = useStore()

	const { gameData, liveData } = data
	const { detailedState } = gameData.status
	const team = gameData.teams[side]
	const { runs } = liveData.linescore.teams[side]

	return (
		<div className="group/team relative flex w-[4ch] shrink-0 flex-col">
			<img
				className={cn(
					'anim-fade pointer-events-none absolute inset-0 size-full scale-125 object-cover opacity-50 mix-blend-saturation blur saturate-200 transition-opacity',
					!options.showColors && 'opacity-0',
				)}
				src={`https://midfield.mlbstatic.com/v1/team/${team.id}/spots/24`}
				alt=""
			/>

			<Abbreviation className={cn(isScheduled(detailedState) && 'my-auto')} team={team} />

			{!isScheduled(detailedState) && (
				<div className="m-auto text-lg font-bold" data-score>
					<Flip disable={!isActive(detailedState)}>{runs}</Flip>
				</div>
			)}
		</div>
	)
}
