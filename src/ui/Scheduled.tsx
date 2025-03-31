import { fetchMLBLive } from '@/lib/mlb'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function Scheduled({ gameData }: { gameData: MLB.LiveGame }) {
	const { datetime, probablePitchers } = gameData
	const { date } = useStore()

	return (
		<div className="my-auto py-1">
			<p>
				{datetime.time} {datetime.ampm}
			</p>

			{(probablePitchers.away || probablePitchers.home) && (
				<div className="grid grid-cols-[1fr_auto_1fr] items-start gap-1 text-xs leading-tight">
					<ProbalePitcher pitcher={probablePitchers.away} date={date} />
					vs
					<ProbalePitcher pitcher={probablePitchers.home} date={date} />
				</div>
			)}
		</div>
	)
}

function ProbalePitcher({ pitcher, date }: { pitcher?: MLB.NameableObject; date: string }) {
	const { data } = fetchMLBLive<{
		people: (MLB.Player & { stats: MLB.StatEntry<MLB.PlayerStatSplit>[] })[]
	}>(
		pitcher?.link &&
			`${pitcher.link}?hydrate=stats(group=[pitching],type=[yearByYear],team(league),leagueListId=mlb_hist)`,
		{
			refreshInterval: 1000 * 60,
		},
	)

	const person = data?.people[0]
	const year = new Date(date).getFullYear().toString()
	const stat = person?.stats?.[0].splits.find((split) => split.season === year)?.stat as
		| MLB.PitchingStats
		| undefined

	return (
		<dl className={cn('grow', !pitcher && 'text-stroke')} title={pitcher?.fullName}>
			<dt>{person?.lastName || pitcher?.fullName || 'TBD'}</dt>
			{stat && (
				<dd className="text-stroke text-[xx-small]">
					{stat.wins}-{stat.losses} | {stat.era} ERA
				</dd>
			)}
		</dl>
	)
}
