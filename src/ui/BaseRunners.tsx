import { cn } from '@/lib/utils'

const runnerKeys: Record<string, number> = {
	first: 0,
	second: 1,
	third: 2,
}

export default function BaseRunners({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { inningState } = linescore

	const runners = Object.keys(linescore.offense)
		.map((key) => runnerKeys[key])
		.filter(Number.isInteger)

	console.log(runners)

	return (
		<div className="grid translate-y-0.5 rotate-45 grid-cols-2 gap-0.5">
			{[1, 0, 2].map((i) => (
				<span
					className={cn('size-2 bg-current opacity-25 transition-opacity', {
						'opacity-100': inningState !== 'Middle' && runners.includes(i),
					})}
					key={i}
				/>
			))}
		</div>
	)
}
