import { cn, count } from '@/lib/utils'

export default function OutCount({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { inningState } = linescore
	const { outs } = linescore
	const interlude = ['Middle', 'End'].includes(inningState)

	return (
		<div className="flex gap-[3px]" title={interlude ? undefined : count(outs, 'out')}>
			{Array.from({ length: 3 }).map((_, i) => (
				<span
					className={cn(
						'inline-block size-1.5 rounded-full transition-opacity',
						interlude ? 'bg-stroke/50' : i >= outs ? 'border-stroke border' : 'bg-current',
					)}
					key={i}
				/>
			))}
		</div>
	)
}
