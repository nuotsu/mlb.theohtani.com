import { fetchPlayer } from '@/lib/mlb'
import SelectablePlayer from '@/ui/SelectablePlayer'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export default function MiniPlayer({
	label,
	player,
	nameType = 'initLastName',
	className,
	children,
	...props
}: {
	label: string | number
	player?: MLB.BasicPlayerData
	nameType?: 'initLastName' | 'lastName' | 'fullName'
} & ComponentProps<'dl'>) {
	const { data, isLoading } = fetchPlayer(player) ?? {}

	const nameMap = {
		initLastName: data?.initLastName,
		lastName: data?.lastName,
		fullName: player?.fullName,
	}

	return (
		<dl className={cn('flex items-center gap-1', isLoading && 'invisible', className)} {...props}>
			<dt>
				<small className="grid aspect-square size-[1lh] place-content-center">{label}</small>
			</dt>

			<dd className="grow text-left whitespace-nowrap" title={player?.fullName}>
				<SelectablePlayer player={player}>{nameMap[nameType] || player?.fullName}</SelectablePlayer>
			</dd>

			{children && <dd>{children}</dd>}
		</dl>
	)
}
