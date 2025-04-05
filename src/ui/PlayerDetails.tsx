'use client'

import { fetchPlayer } from '@/lib/mlb'
import { useLocalStorage } from '@/lib/store'

export default function PlayerDetails({ player }: { player: MLB.BasicPlayerData }) {
	const { removeSelectedPlayer } = useLocalStorage()

	const { data } = fetchPlayer(player, 'pitching,hitting', '2024')

	console.log(data)

	return (
		<details
			className="anim-fade-to-t group bg-canvas shrink-0 overflow-hidden border open:w-2xs"
			open
		>
			<summary className="flex items-center gap-1 p-1 pr-0 group-not-open:pl-2">
				<span className="group-open:hidden">{data?.lastName}</span>

				<figure className="w-12 group-not-open:hidden">
					<img
						src={`https://midfield.mlbstatic.com/v1/people/${player.id}/spots/120`}
						alt="	"
						width={120}
						height={120}
					/>
				</figure>

				<strong className="leading-tight group-not-open:hidden">{player.fullName}</strong>
				<span className="text-stroke text-sm">#{data?.primaryNumber}</span>

				<button
					className="ml-auto grid aspect-square w-[2ch] place-content-center text-xl"
					onClick={() => removeSelectedPlayer(player)}
				>
					&times;
				</button>
			</summary>
		</details>
	)
}
