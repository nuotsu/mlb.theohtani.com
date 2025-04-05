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

	return (
		<div className="flex items-center gap-1">
			<label>
				<input
					className="tabular-nums"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</label>

			<button className="order-first" onClick={() => addDay(-1)}>
				&lt;
			</button>
			<button onClick={() => addDay(1)}>&gt;</button>

			{date !== TODAY && (
				<button className="anim-fade-to-r" onClick={() => setDate(TODAY)}>
					Today
				</button>
			)}
		</div>
	)
}
