import { isActive, isScheduled } from '@/lib/game-status'
import Abbreviation from './Abbreviation'
import Flip from './Flip'

export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { gameData, liveData } = data
	const { detailedState } = gameData.status
	const team = gameData.teams[side]
	const { runs } = liveData.linescore.teams[side]

	return (
		<div className="relative flex w-[4ch] shrink-0 flex-col">
			<img
				className="anim-fade pointer-events-none absolute inset-0 size-full scale-125 object-cover opacity-50 mix-blend-saturation blur saturate-200"
				src={`https://midfield.mlbstatic.com/v1/team/${team.id}/spots/24`}
				alt=""
			/>

			<Abbreviation team={team} />

			{!isScheduled(detailedState) && (
				<div className="m-auto text-lg font-bold">
					<Flip disable={!isActive(detailedState)}>{runs}</Flip>
				</div>
			)}
		</div>
	)
}
