'use client'

import { useStore } from '@/lib/store'

export default function Options() {
	const { options, setOptions } = useStore()

	return (
		<fieldset>
			<legend>Options</legend>

			<label>
				<input
					type="checkbox"
					checked={options.showScoreboard}
					onChange={() => setOptions({ showScoreboard: !options.showScoreboard })}
				/>
				Show scoreboard
			</label>
		</fieldset>
	)
}
