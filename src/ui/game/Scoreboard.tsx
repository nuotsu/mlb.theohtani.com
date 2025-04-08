import { isActive, isFinal } from '@/lib/game-status'
import Abbreviation from '@/ui/Abbreviation'
import { cn } from '@/lib/utils'

export default function Scoreboard({ data }: { data: MLB.LiveData }) {
	const { currentInning, innings } = data.liveData.linescore

	return (
		<div
			className={cn(
				'no-spoiler:hidden anim-fade-to-b mt-auto',
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
						<td className="min-w-[2ch]">R</td>
						<td className="min-w-[2ch]">H</td>
						<td className="min-w-[2ch]">E</td>
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
	const { innings, inningState, currentInning } = liveData?.linescore
	const { detailedState } = gameData.status
	const offense =
		isActive(detailedState) &&
		((inningState === 'Top' && side === 'away') || (inningState === 'Bottom' && side === 'home'))

	return (
		<tr>
			<th className="bg-canvas sticky left-0 min-w-[4ch] font-normal">
				<Abbreviation
					className={cn(
						'block w-full border-r',
						offense && 'group-has-[[data-scoring]]/game:animate-pulse',
					)}
					team={gameData.teams[side]}
				/>

				{offense && (
					<span className="absolute top-1/2 left-0 grid size-[0.4em] -translate-1/2 rotate-45 bg-current" />
				)}
			</th>

			{Array.from({ length: Math.max(9, innings.length) }).map((_, i) => {
				const { runs } = innings[i]?.[side] ?? {}
				const calledEarly = isFinal(detailedState) && side === 'home' && i >= 8 && isNaN(runs)
				const current = currentInning - 1 === i && isActive(detailedState) && offense
				return (
					<td
						className={cn(
							current &&
								'before:bg-stroke/50 relative before:absolute before:inset-x-1 before:inset-y-0 before:-z-1',
						)}
						key={i}
					>
						{calledEarly ? 'x' : runs}
					</td>
				)
			})}

			<td className="border-l">
				<b>{liveData.linescore.teams[side].runs}</b>
			</td>
			<td>{liveData.linescore.teams[side].hits}</td>
			<td>{liveData.linescore.teams[side].errors}</td>
		</tr>
	)
}
