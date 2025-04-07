import { useStorage } from '@/lib/store'
import { isFinal, isScheduled } from '@/lib/game-status'
import { fetchPlayer } from '@/lib/mlb'
import SelectablePlayer from '@/ui/SelectablePlayer'
import { cn } from '@/lib/utils'

export default function Scheduled({ data }: { data: MLB.LiveData }) {
	const { datetime, probablePitchers } = data.gameData
	const { detailedState } = data.gameData.status

	const { date } = useStorage()
	const year = new Date(date).getFullYear().toString()

	return (
		<div
			className={cn(
				'my-auto',
				!isScheduled(detailedState) && 'hidden',
				!isFinal(detailedState) && 'no-spoiler:block',
			)}
		>
			<p>
				{new Date(datetime.dateTime).toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					timeZoneName: 'short',
				})}
			</p>

			{(probablePitchers.away || probablePitchers.home) && (
				<div className="grid grid-cols-[1fr_auto_1fr] items-start gap-1 text-xs leading-tight">
					<ProbalePitcher pitcher={probablePitchers.away} year={year} />
					vs
					<ProbalePitcher pitcher={probablePitchers.home} year={year} />
				</div>
			)}
		</div>
	)
}

function ProbalePitcher({ pitcher, year }: { pitcher?: MLB.BasicPlayerData; year: string }) {
	const { data, stat } = fetchPlayer<MLB.PitchingStats>(pitcher, 'pitching', year)

	return (
		<dl className={cn('grow', !pitcher && 'text-stroke')} title={pitcher?.fullName}>
			<dt>
				<SelectablePlayer player={pitcher}>
					{data?.lastName || pitcher?.fullName || 'TBD'}
				</SelectablePlayer>
			</dt>
			{stat && (
				<dd className="text-stroke text-[0.75em]">
					{stat.wins}-{stat.losses} | {stat.era} ERA
				</dd>
			)}
		</dl>
	)
}
