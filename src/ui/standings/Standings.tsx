'use client'

import { fetchMLBLive } from '@/lib/mlb'
import { cn } from '@/lib/utils'

export default function Standings() {
	const { data } = fetchMLBLive<MLB.Standings>('/api/v1/standings?leagueId=103,104', {
		refreshInterval: 1000 * 60 * 5,
	})

	const { records } = data ?? {}

	return (
		<details
			className={cn(
				'absolute inset-y-0 top-1/2 left-0 not-open:-translate-y-1/2',
				'group open:bg-canvas/50 open:fixed open:inset-y-0 open:overflow-y-auto open:border open:backdrop-blur-sm',
			)}
		>
			<summary className="group-open:blur-gradient top-0 z-1 m-px flex items-center gap-1 p-1 group-open:sticky group-open:pb-2">
				🏆
				<span className="group-not-open:hidden">Standings</span>
			</summary>

			<div className="anim-fade-to-r overflow-y-auto pb-[env(safe-area-inset-bottom)] whitespace-nowrap">
				{records?.map((record) => (
					<table className="w-full not-last-of-type:border-b" key={record.division.id}>
						<tbody>
							{record.teamRecords.map(({ team }) => (
								<tr>
									<th>{team.name}</th>
								</tr>
							))}
						</tbody>
					</table>
				))}
			</div>
		</details>
	)
}
