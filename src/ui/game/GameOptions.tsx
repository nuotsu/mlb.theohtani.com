'use client'

import { useStorage, useLocalStorage } from '@/lib/store'
import Abbreviation from '@/ui/Abbreviation'

export default function GameOptions({ teams }: { teams: MLB.LiveTeams }) {
	const { date } = useStorage()
	const { noSpoilers, addNoSpoiler, removeNoSpoiler } = useLocalStorage()

	return (
		<details
			className="open:bg-canvas/50 absolute top-0 right-0 z-10 grid place-content-center group-[:not(:hover)]/game:not-open:hidden open:inset-0 open:backdrop-blur-xs"
			onMouseLeave={(e) => (e.currentTarget.open = false)}
		>
			<summary
				className="anim-fade-to-l absolute top-0 right-0 z-1 inline-grid aspect-square h-[3ch] place-content-center text-xs"
				title="Options"
			>
				•••
			</summary>

			<div className="anim-fade-to-r flex flex-wrap place-content-center items-center justify-evenly gap-x-2 gap-y-1">
				<fieldset>
					<legend className="text-xs">No spoilers</legend>

					<div className="flex items-center gap-x-2">
						{Object.entries(teams).map(([side, team]: [string, MLB.LiveTeam]) => (
							<label key={side}>
								<input
									name="no-spoiler"
									type="checkbox"
									onChange={() => {
										if (noSpoilers.includes(team.id)) {
											removeNoSpoiler(team.id)
										} else {
											addNoSpoiler(team.id)
										}
									}}
									checked={noSpoilers.includes(team.id)}
								/>
								<Abbreviation team={team} />
							</label>
						))}
					</div>
				</fieldset>

				<label>
					<input name="highlight" type="checkbox" key={date} />
					Highlight
				</label>
			</div>
		</details>
	)
}
