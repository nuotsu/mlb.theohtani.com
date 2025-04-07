'use client'

import { fetchMLBLive } from '@/lib/mlb'
import DivisionRecord from './DivisionRecord'
import { cn } from '@/lib/utils'

export default function Standings() {
	const { data } = fetchMLBLive<MLB.Standings>('/api/v1/standings?leagueId=103,104', {
		refreshInterval: 1000 * 60 * 5,
	})

	const { records } = data ?? {}

	return (
		<details
			className={cn(
				'open:anim-fade-to-r absolute inset-y-0 top-1/2 left-0 not-open:-translate-y-1/2',
				'group/standings open:bg-canvas/50 open:fixed open:top-0 open:bottom-auto open:max-h-dvh open:overflow-y-auto open:border open:backdrop-blur-sm',
			)}
		>
			<summary className="group-open/standings:blur-gradient top-0 z-1 flex items-center gap-1 p-1 group-open/standings:sticky group-open/standings:mb-1">
				🏆
				<span className="group-not-open/standings:hidden">Standings</span>
			</summary>

			<div className="overflow-y-auto text-center whitespace-nowrap [&_:is(th,td)]:px-1">
				<table>
					{records?.map((record) => <DivisionRecord record={record} key={record.division.id} />)}
				</table>
			</div>
		</details>
	)
}
