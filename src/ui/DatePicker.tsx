'use client'

import { useStorage } from '@/lib/store'

const TODAY = new Date().toISOString().split('T')[0]

export default function DatePicker() {
	const { date, setDate } = useStorage()

	function addDay(days: number = 1) {
		const current = new Date(date)
		current.setDate(current.getDate() + days)
		setDate(current.toISOString().split('T')[0])
	}

	const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })

	return (
		<div className="mx-auto flex flex-col items-center">
			<label htmlFor="date" className="anim-fade-to-r text-xs" key={date}>
				{dayOfWeek}
			</label>

			<div className="relative flex items-center">
				<label>
					<input
						className="w-[13ch] text-center tabular-nums"
						id="date"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</label>

				<button className="order-first px-1" onClick={() => addDay(-1)}>
					&lt;
				</button>

				<button className="px-1" onClick={() => addDay(1)}>
					&gt;
				</button>

				{date !== TODAY && (
					<button
						className="absolute top-1/2 left-full ml-2 -translate-y-1/2"
						onClick={() => setDate(TODAY)}
					>
						<span className="anim-fade-to-r inline-block">Today</span>
					</button>
				)}
			</div>
		</div>
	)
}
