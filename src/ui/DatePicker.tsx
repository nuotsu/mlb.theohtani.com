'use client'

import { useStore } from '@/lib/store'

export default function DatePicker() {
	const { date, setDate } = useStore()

	function addDay(days: number = 1) {
		const current = new Date(date)
		// add one day of seconds
		current.setDate(current.getDate() + days)
		setDate(current.toISOString().split('T')[0])
	}

	return (
		<div className="flex items-center gap-1">
			<button onClick={() => addDay(-1)}>&lt;</button>
			<label>
				<input
					className="tabular-nums"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</label>
			<button onClick={() => addDay(1)}>&gt;</button>
		</div>
	)
}
