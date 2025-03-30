import { cn, count } from '@/lib/utils'

export default function OutCount({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { inningState } = linescore
	const { outs } = linescore
	const isMiddle = inningState === 'Middle'

	return (
		<div className="flex gap-[3px]" title={isMiddle ? undefined : count(outs, 'out')}>
			{Array.from({ length: 3 }).map((_, i) => (
				<span
					className={cn('inline-block size-1.5 rounded-full bg-current transition-opacity', {
						'opacity-25': i >= outs || isMiddle,
					})}
					key={i}
				/>
			))}
		</div>
	)
}
