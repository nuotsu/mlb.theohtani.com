'use client'

import { useLocalStorage } from '@/lib/store'

export default function GlobalOptions() {
	const { options, setOptions } = useLocalStorage()

	return (
		<details
			className="group absolute top-1/2 right-0 -translate-y-1/2"
			onMouseLeave={(e) => (e.currentTarget.open = false)}
		>
			<summary className="relative z-1 block">•••</summary>

			<div className="anim-fade-to-b absolute top-full right-0 -mt-4 min-w-max pt-4">
				<div className="bg-canvas/50 flex flex-col border p-1 backdrop-blur-xs">
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
			</div>
		</details>
	)
}
