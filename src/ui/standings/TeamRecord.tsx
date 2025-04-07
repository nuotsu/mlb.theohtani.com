'use client'

import { fetchMLBLive } from '@/lib/mlb'
import TeamLogo from '@/ui/TeamLogo'

export default function TeamRecord({ record }: { record: MLB.StandingsTeamRecord }) {
	const { data } = fetchMLBLive<{ teams: MLB.Team[] }>(record.team.link) ?? {}
	const [team] = data?.teams ?? []

	return (
		<tr>
			<th className="flex items-center gap-1" title={team.name}>
				<TeamLogo className="w-6 shrink-0" team={record.team} size={48} />
				{team.abbreviation}
			</th>
			<td>
				{record.wins}-{record.losses}
			</td>
		</tr>
	)
}
