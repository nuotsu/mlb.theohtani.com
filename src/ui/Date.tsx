'use client'

import { useStore } from '@/lib/store'

export default function Date() {
	const { date, setDate } = useStore()

	return (
		<label>
			<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
		</label>
	)
}
