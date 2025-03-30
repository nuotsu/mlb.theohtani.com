import { cn } from '@/lib/utils'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'

export default function CurrentInning({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { inningState, currentInning, currentInningOrdinal } = linescore

	return (
		<div
			className="flex items-center justify-center"
			title={`${inningState} of the ${currentInningOrdinal}`}
		>
			<span className="grid text-[xx-small] *:transition-opacity">
				<VscTriangleUp className={cn('text-stroke/50', inningState === 'Top' && 'text-ink')} />
				<VscTriangleDown
					className={cn('text-stroke/50 mt-[-3px]', inningState === 'Bottom' && 'text-ink')}
				/>
			</span>

			{currentInning}
		</div>
	)
}
