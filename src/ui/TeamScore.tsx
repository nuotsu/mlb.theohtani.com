import { isActive } from '@/lib/game-status'
import Flip from './Flip'

export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { gameData, liveData } = data
	const { detailedState } = gameData.status
	const { runs } = liveData.linescore.teams[side]

	return (
		<div className="grid w-[4ch] shrink-0">
			<abbr className="no-underline" title={gameData.teams[side].name}>
				{gameData.teams[side].abbreviation}
			</abbr>
			<Flip disable={!isActive(detailedState)}>{runs}</Flip>
		</div>
	)
}
