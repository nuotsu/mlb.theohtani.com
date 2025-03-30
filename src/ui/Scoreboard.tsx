import { isFinal } from '@/lib/game-status'
import Abbreviation from './Abbreviation'
import { cn } from '@/lib/utils'

export default function Scoreboard({ data }: { data: MLB.LiveData }) {
	const { currentInning, innings } = data.liveData.linescore

	return (
		<div
			className={cn(
				innings.length > 10 && '@max-xs:overflow-fade-r overflow-x-auto @max-xs:pr-[1ch]',
			)}
		>
			<table className="w-auto max-w-none min-w-full table-fixed text-xs whitespace-nowrap">
				<thead>
					<tr>
						<td className="bg-canvas sticky left-0" />

						{Array.from({ length: Math.max(9, currentInning) }).map((_, i) => (
							<td className="text-stroke min-w-[2ch]" key={i}>
								{i + 1}
							</td>
						))}
						<td className="min-w-[2ch]">
							<abbr title="Runs">R</abbr>
						</td>
						<td className="min-w-[2ch]">
							<abbr title="Hits">H</abbr>
						</td>
						<td className="min-w-[2ch]">
							<abbr title="Errors">E</abbr>
						</td>
					</tr>
				</thead>
				<tbody>
					<Row {...data} side="away" />
					<Row {...data} side="home" />
				</tbody>
			</table>
		</div>
	)
}

function Row({
	gameData,
	liveData,
	side,
}: {
	gameData: MLB.LiveGame
	liveData: MLB.LiveMatchData
	side: 'away' | 'home'
}) {
	const { innings } = liveData?.linescore
	const { detailedState } = gameData.status

	return (
		<tr>
			<th className="bg-canvas sticky left-0 min-w-[4ch] font-normal">
				<Abbreviation className="block w-full border-r" team={gameData.teams[side]} />
			</th>

			{Array.from({ length: Math.max(9, innings.length) }).map((_, i) => {
				const { runs } = innings[i]?.[side] ?? {}
				const calledEarly = isFinal(detailedState) && side === 'home' && i >= 8 && isNaN(runs)
				return <td key={i}>{calledEarly ? 'x' : runs}</td>
			})}

			<td className="border-l">
				<b>{liveData.linescore.teams[side].runs}</b>
			</td>
			<td>{liveData.linescore.teams[side].hits}</td>
			<td>{liveData.linescore.teams[side].errors}</td>
		</tr>
	)
}
