'use client'

import { useLocalStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import { cn } from '@/lib/utils'
import TeamLogo from '@/ui/TeamLogo'

export default function TeamRecord({ record }: { record: MLB.StandingsTeamRecord }) {
	const { options, noSpoilers } = useLocalStorage()

	const { data } = fetchMLBLive<{ teams: MLB.Team[] }>(record.team.link) ?? {}
	const [team] = data?.teams ?? []

	if (!team) return null

	const noSpoiler = noSpoilers.includes(record.team.id)

	return (
		<tr className={cn(noSpoiler && 'opacity-50')} data-no-spoiler={noSpoiler || undefined}>
			<th className="flex items-center gap-1" title={team.name}>
				{options.showColors && (
					<TeamLogo className="anim-fade-to-r w-6 shrink-0" team={record.team} size={48} />
				)}
				{team.abbreviation}
			</th>

			{!noSpoiler && (
				<>
					<td>
						{record.wins}-{record.losses}
					</td>

					<td>{record.winningPercentage}</td>

					<td data-games-back>{record.divisionGamesBack}</td>

					<td>{record.streak.streakCode}</td>
				</>
			)}
		</tr>
	)
}
