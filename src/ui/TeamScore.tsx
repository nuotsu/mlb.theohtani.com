import { isActive, isScheduled } from '@/lib/game-status'
import Abbreviation from './Abbreviation'
import Flip from './Flip'

export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { gameData, liveData } = data
	const { detailedState } = gameData.status
	const { runs } = liveData.linescore.teams[side]

	return (
		<div className="grid w-[4ch] shrink-0">
			<Abbreviation team={gameData.teams[side]} />
			{!isScheduled(detailedState) && <Flip disable={!isActive(detailedState)}>{runs}</Flip>}
		</div>
	)
}
