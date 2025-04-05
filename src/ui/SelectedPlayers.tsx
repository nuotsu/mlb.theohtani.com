'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import PlayerDetails from './PlayerDetails'

export default function SelectedPlayers() {
	const ref = useRef<HTMLDivElement>(null)
	const [scrollWidth, setScrollWidth] = useState(0)
	const { selectedPlayers } = useStore()

	useEffect(() => {
		if (!ref.current) return
		setScrollWidth(ref.current.scrollWidth)
	}, [ref, selectedPlayers.length])

	useEffect(() => {
		if (!ref.current) return

		ref.current.scrollTo({
			left: scrollWidth,
			behavior: 'smooth',
		})
	}, [selectedPlayers?.at(-1)?.id])

	return (
		<aside
			ref={ref}
			className="sticky bottom-[env(safe-area-inset-bottom)] mt-auto flex w-full items-end gap-1 overflow-x-auto before:m-auto empty:hidden"
		>
			{selectedPlayers?.map((player) => <PlayerDetails player={player} key={player.id} />)}
		</aside>
	)
}
