'use client'

import { useLocalStorage } from '@/lib/store'
import Abbreviation from '@/ui/Abbreviation'

export default function GameOptions({ teams }: { teams: MLB.LiveTeams }) {
	const { noSpoilers, addNoSpoiler, removeNoSpoiler, highlights, addHighlight, removeHighlight } =
		useLocalStorage()

	const teamOptions = Object.entries(teams).map(([side, team]) => team) as MLB.LiveTeam[]

	return (
		<details
			className="open:bg-canvas/50 absolute top-0 right-0 z-10 grid place-content-center text-left group-[:not(:hover)]/game:not-open:hidden open:inset-0 open:backdrop-blur-xs"
			onMouseLeave={(e) => (e.currentTarget.open = false)}
		>
			<summary
				className="anim-fade-to-l absolute top-0 right-0 z-1 inline-grid aspect-square h-[3ch] place-content-center text-xs"
				title="Options"
			>
				•••
			</summary>

			<div className="anim-fade-to-r flex flex-wrap place-content-center items-center justify-evenly gap-x-4 gap-y-1">
				<fieldset>
					<legend className="text-xs">No spoilers</legend>

					<div className="flex items-center gap-x-2">
						{teamOptions.map((team) => (
							<label key={team.id}>
								<input
									name="no-spoiler"
									type="checkbox"
									onChange={() => {
										noSpoilers.includes(team.id) ? removeNoSpoiler(team.id) : addNoSpoiler(team.id)
									}}
									checked={noSpoilers.includes(team.id)}
								/>
								<Abbreviation team={team} />
							</label>
						))}
					</div>
				</fieldset>

				<fieldset>
					<legend className="text-xs">Highlight</legend>

					<div className="flex items-center gap-x-2">
						{teamOptions.map((team) => (
							<label key={team.id}>
								<input
									name="highlight"
									type="checkbox"
									onChange={() => {
										highlights.includes(team.id) ? removeHighlight(team.id) : addHighlight(team.id)
									}}
									checked={highlights.includes(team.id)}
								/>
								<Abbreviation team={team} />
							</label>
						))}
					</div>
				</fieldset>
			</div>
		</details>
	)
}
