import { isActive, isScheduled } from '@/lib/game-status'
import Abbreviation from './Abbreviation'
import Flip from './Flip'

export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { gameData, liveData } = data
	const { detailedState } = gameData.status
	const { runs } = liveData.linescore.teams[side]

	return (
		<div className="flex w-[4ch] shrink-0 flex-col">
			<Abbreviation team={gameData.teams[side]} />
			{!isScheduled(detailedState) && (
				<div className="m-auto text-lg font-bold">
					<Flip disable={!isActive(detailedState)}>{runs}</Flip>
				</div>
			)}
		</div>
	)
}
