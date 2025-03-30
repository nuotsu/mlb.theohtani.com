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
				<VscTriangleUp className={cn('opacity-25', inningState === 'Top' && 'opacity-100')} />
				<VscTriangleDown
					className={cn('mt-[-3px] opacity-25', inningState === 'Bottom' && 'opacity-100')}
				/>
			</span>

			{currentInning}
		</div>
	)
}
