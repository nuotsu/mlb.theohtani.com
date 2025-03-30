import { cn, count } from '@/lib/utils'
import Flip from './Flip'

export default function BallsStrikes({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { balls, strikes } = linescore
	const interlude = ['Middle', 'End'].includes(linescore.inningState)

	return (
		<div
			className={cn('flex justify-center tabular-nums', interlude && 'text-stroke/50')}
			title={`${count(balls, 'ball')}, ${count(strikes, 'strike')}`}
		>
			<Flip>{balls}</Flip>-<Flip>{strikes}</Flip>
		</div>
	)
}
