'use client'

import { fetchPlayer } from '@/lib/mlb'
import { useStore } from '@/lib/store'

export default function PlayerDetails({ player }: { player: MLB.BasicPlayerData }) {
	const { removeSelectedPlayer } = useStore()

	const { data } = fetchPlayer(player, 'pitching,hitting', '2024')

	console.log(data)

	return (
		<details
			className="anim-fade-to-t group bg-canvas shrink-0 overflow-hidden border open:w-2xs"
			open
		>
			<summary className="flex items-center gap-1 p-1 pr-0 group-not-open:pl-2">
				<span className="group-open:hidden">{data?.lastName}</span>

				<figure className="relative w-12 group-not-open:hidden">
					<img
						src={`https://midfield.mlbstatic.com/v1/people/${player.id}/spots/120`}
						alt={player.fullName}
						width={120}
						height={120}
					/>

					<figcaption className="bg-ink text-canvas absolute bottom-0 left-0 grid size-[2.5ch] place-content-center text-[xx-small] font-bold">
						{data?.primaryNumber}
					</figcaption>
				</figure>

				<strong className="grow group-not-open:hidden">{player.fullName}</strong>

				<button
					className="grid aspect-square w-[2ch] place-content-center text-xl"
					onClick={() => removeSelectedPlayer(player)}
				>
					&times;
				</button>
			</summary>
		</details>
	)
}
