import { cn, count } from '@/lib/utils'

export default function OutCount({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { inningState } = linescore
	const { outs } = linescore

	return (
		<div className="flex gap-[3px]" title={count(outs, 'out')}>
			{Array.from({ length: 3 }).map((_, i) => (
				<span
					className={cn('inline-block size-1.5 rounded-full bg-current transition-opacity', {
						'opacity-25': i >= outs || inningState === 'Middle',
					})}
					key={i}
				/>
			))}
		</div>
	)
}
