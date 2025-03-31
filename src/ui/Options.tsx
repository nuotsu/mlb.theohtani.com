'use client'

import { useStore } from '@/lib/store'

export default function Options() {
	const { options, setOptions } = useStore()

	return (
		<fieldset>
			<legend>Options</legend>

			<div className="flex flex-wrap gap-x-2 gap-y-1">
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
						checked={options.showColors}
						onChange={() => setOptions({ ...options, showColors: !options.showColors })}
					/>
					Show colors
				</label>
			</div>
		</fieldset>
	)
}
