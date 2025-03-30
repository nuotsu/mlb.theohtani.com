'use client'

import { useStore } from '@/lib/store'

export default function Date() {
	const { date, setDate } = useStore()

	return (
		<input className="w-full" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
	)
}
