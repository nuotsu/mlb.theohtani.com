import { useStore } from '@/lib/store'
import { fetchPlayer } from '@/lib/mlb'
import MiniPlayer from '@/ui/game/MiniPlayer'

export default function Final({ data }: { data: MLB.LiveData }) {
	const { detailedState } = data.gameData.status
	const { winner, save, loser } = data.liveData.decisions ?? {}

	const { date } = useStore()
	const year = new Date(date).getFullYear().toString()

	return (
		<div className="flex flex-col">
			<p className="my-auto">{detailedState}</p>

			<dl className="no-spoiler:hidden gap-x-1 text-xs @xs:columns-2 [&_dd]:grow-0">
				{winner && (
					<MiniPlayer
						className="[&_dt]:text-canvas [&_dt]:bg-ink"
						label="W"
						player={winner}
						nameType="lastName"
					>
						<WL player={winner} year={year} />
					</MiniPlayer>
				)}

				{save && (
					<MiniPlayer
						className="[&_dt]:text-canvas [&_dt]:bg-ink"
						label="SV"
						player={save}
						nameType="lastName"
					/>
				)}

				{loser && (
					<MiniPlayer className="[&_dt]:bg-stroke" label="L" player={loser} nameType="lastName">
						<WL player={loser} year={year} />
					</MiniPlayer>
				)}
			</dl>
		</div>
	)
}

function WL({ player, year }: { player: MLB.BasicPlayerData; year: string }) {
	const { stat } = fetchPlayer<MLB.PitchingStats>(player, 'pitching', year)
	const { wins, losses } = stat ?? {}

	return (
		<span className="text-stroke">
			({wins}-{losses})
		</span>
	)
}
