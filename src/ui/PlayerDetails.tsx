'use client'

import { fetchPlayer } from '@/lib/mlb'
import { useLocalStorage } from '@/lib/store'
import SyncedTable from '@/ui/SyncedTable'

export default function PlayerDetails({ player }: { player: MLB.BasicPlayerData }) {
	const { removeSelectedPlayer } = useLocalStorage()

	const [{ data: pitching }, { data: hitting }] = [
		fetchPlayer(player, 'pitching', '2025'),
		fetchPlayer(player, 'hitting', '2025'),
	]
	if (!pitching || !hitting) return null

	const { lastName, primaryNumber } = hitting

	const [pitchingStat, hittingStat] = [
		pitching.stats?.[0].splits.at(-1)?.stat as MLB.PitchingStats | undefined,
		hitting.stats?.[0].splits.at(-1)?.stat as MLB.BattingStats | undefined,
	]

	const isPitcher = pitching.primaryPosition.abbreviation === 'P'

	return (
		<details
			className="anim-fade-to-t group bg-canvas/50 shrink-0 snap-end overflow-hidden border backdrop-blur-sm open:w-2xs"
			open
		>
			<summary className="flex items-center gap-1 p-1 pr-0 group-not-open:pl-2">
				<span className="group-open:hidden">{lastName}</span>

				<figure className="w-12 group-not-open:hidden">
					<img
						src={`https://midfield.mlbstatic.com/v1/people/${player.id}/spots/120`}
						alt=""
						width={120}
						height={120}
					/>
				</figure>

				<strong className="leading-tight group-not-open:hidden">{player.fullName}</strong>
				<span className="text-stroke text-sm">#{primaryNumber}</span>

				<button
					className="ml-auto grid aspect-square w-[2ch] place-content-center text-xl"
					onClick={() => removeSelectedPlayer(player)}
				>
					&times;
				</button>
			</summary>

			<div>
				{isPitcher ? (
					<SyncedTable identifier="pitching-stats">
						<tr>
							<th>W-L</th>
							<th>ERA</th>
							<th>SV</th>
							<th>IP</th>
							<th>SO</th>
							<th>WHIP</th>
						</tr>
						<tr>
							<td>
								{pitchingStat?.wins}-{pitchingStat?.losses}
							</td>
							<td>{pitchingStat?.era}</td>
							<td>{pitchingStat?.saves}</td>
							<td>{pitchingStat?.inningsPitched}</td>
							<td>{pitchingStat?.strikeOuts}</td>
							<td>{pitchingStat?.whip}</td>
						</tr>
					</SyncedTable>
				) : (
					<SyncedTable identifier="hitting-stats">
						<tr>
							<th>AVG</th>
							<th>H</th>
							<th>2B</th>
							<th>3B</th>
							<th>HR</th>
							<th>R</th>
							<th>RBI</th>
							<th>SB</th>
							<th>SLG</th>
							<th>OBP</th>
							<th>OPS</th>
						</tr>
						<tr>
							<td>{hittingStat?.avg}</td>
							<td>{hittingStat?.hits}</td>
							<td>{hittingStat?.doubles}</td>
							<td>{hittingStat?.triples}</td>
							<td>{hittingStat?.homeRuns}</td>
							<td>{hittingStat?.runs}</td>
							<td>{hittingStat?.rbi}</td>
							<td>{hittingStat?.stolenBases}</td>
							<td>{hittingStat?.slg}</td>
							<td>{hittingStat?.obp}</td>
							<td>{hittingStat?.ops}</td>
						</tr>
					</SyncedTable>
				)}
			</div>
		</details>
	)
}
