'use client'

import { useLocalStorage } from '@/lib/store'

export default function GlobalOptions() {
	const { options, setOptions } = useLocalStorage()

	return (
		<fieldset>
			<legend className="text-sm">Options</legend>

			<div className="flex flex-wrap gap-x-2">
				<label>
					<input
						type="checkbox"
						checked={options.showScoreboard}
						onChange={() => setOptions({ ...options, showScoreboard: !options.showScoreboard })}
					/>
					Show scoreboard
				</label>

				<label>
					<input
						type="checkbox"
						checked={options.showTopPerformers}
						onChange={() =>
							setOptions({ ...options, showTopPerformers: !options.showTopPerformers })
						}
					/>
					Show top performers
				</label>

				<label>
					<input
						type="checkbox"
						checked={options.showColors}
						onChange={() => setOptions({ ...options, showColors: !options.showColors })}
					/>
					Show colors
				</label>
			</div>
		</fieldset>
	)
}
