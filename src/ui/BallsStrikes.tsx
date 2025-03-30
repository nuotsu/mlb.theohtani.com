import { count } from '@/lib/utils'
import Flip from './Flip'

export default function BallsStrikes({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { balls, strikes } = linescore

	return (
		<div
			className="flex justify-center tabular-nums"
			title={`${count(balls, 'ball')}, ${count(strikes, 'strike')}`}
		>
			<Flip>{balls}</Flip>-<Flip>{strikes}</Flip>
		</div>
	)
}
