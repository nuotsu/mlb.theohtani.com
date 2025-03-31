import { fetchPlayer } from '@/lib/mlb'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export default function MiniPlayer({
	label,
	player,
	className,
	children,
	...props
}: {
	label: string | number
	player?: MLB.BasicPlayerData
} & ComponentProps<'dl'>) {
	const { data, isLoading } = fetchPlayer(player) ?? {}

	return (
		<dl className={cn('flex items-center gap-1', isLoading && 'invisible', className)} {...props}>
			<dt>
				<small className="grid aspect-square size-[1lh] place-content-center">{label}</small>
			</dt>

			<dd className="grow text-left whitespace-nowrap" title={player?.fullName}>
				{data?.lastName || player?.fullName}
			</dd>

			{children && <dd>{children}</dd>}
		</dl>
	)
}
