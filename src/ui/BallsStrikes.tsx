import { cn, count } from '@/lib/utils'
import Flip from './Flip'

export default function BallsStrikes({ liveData }: { liveData: MLB.LiveMatchData }) {
	const { balls, strikes } = liveData.plays.currentPlay.count
	const interlude = ['Middle', 'End'].includes(liveData.linescore.inningState)

	return (
		<div
			className={cn('flex justify-center tabular-nums', interlude && 'text-stroke/50')}
			title={`${count(balls, 'ball')}, ${count(strikes, 'strike')}`}
		>
			<Flip>{balls}</Flip>-<Flip>{strikes}</Flip>
		</div>
	)
}
