import CurrentInning from './CurrentInning'
import BaseRunners from './BaseRunners'
import OutCount from './OutCount'
import BallsStrikes from './BallsStrikes'
import CurrentPlay from './CurrentPlay'
import { isActive } from '@/lib/game-status'

export default function DiamondStatus({ data }: { data: MLB.LiveData }) {
	const { liveData } = data
	const { detailedState } = data.gameData.status

	return (
		<div className="no-spoiler:hidden relative flex flex-wrap items-center justify-center gap-x-3 py-2">
			<CurrentInning linescore={liveData.linescore} />
			<BaseRunners linescore={liveData.linescore} />
			<OutCount linescore={liveData.linescore} />
			<BallsStrikes liveData={liveData} />

			{isActive(detailedState) && (
				<CurrentPlay play={liveData.plays.currentPlay.result.description} />
			)}
		</div>
	)
}
