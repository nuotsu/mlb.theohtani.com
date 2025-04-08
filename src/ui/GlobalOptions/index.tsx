'use client'

import { useLocalStorage } from '@/lib/store'
import NotificationsOption from './NotificationsOption'

export default function GlobalOptions() {
	const { options, setOptions } = useLocalStorage()

	return (
		<details
			className="group absolute top-1/2 right-0 -translate-y-1/2"
			onMouseLeave={(e) => (e.currentTarget.open = false)}
		>
			<summary className="relative z-1 block p-1">•••</summary>

			<div className="anim-fade-to-b absolute top-full right-0 -mt-4 min-w-max pt-4">
				<div className="bg-canvas/50 flex flex-col border p-1 backdrop-blur-xs">
					<label>
						<input
							type="checkbox"
							checked={options.showScoreboard}
							onChange={() => setOptions({ ...options, showScoreboard: !options.showScoreboard })}
						/>
						Scoreboard
					</label>

					<label>
						<input
							type="checkbox"
							checked={options.showTopPerformers}
							onChange={() =>
								setOptions({ ...options, showTopPerformers: !options.showTopPerformers })
							}
						/>
						Top performers
					</label>

					<label>
						<input
							type="checkbox"
							checked={options.showColors}
							onChange={() => setOptions({ ...options, showColors: !options.showColors })}
						/>
						Colors
					</label>

					<NotificationsOption />
				</div>
			</div>
		</details>
	)
}
