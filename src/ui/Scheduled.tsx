import { fetchPlayer, getStat } from '@/lib/mlb'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function Scheduled({ gameData }: { gameData: MLB.LiveGame }) {
	const { datetime, probablePitchers } = gameData

	const { date } = useStore()
	const year = new Date(date).getFullYear().toString()

	return (
		<div className="my-auto">
			<p>
				{datetime.time} {datetime.ampm}
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
			<dt>{data?.lastName || pitcher?.fullName || 'TBD'}</dt>
			{stat && (
				<dd className="text-stroke text-[xx-small]">
					{stat.wins}-{stat.losses} | {stat.era} ERA
				</dd>
			)}
		</dl>
	)
}
