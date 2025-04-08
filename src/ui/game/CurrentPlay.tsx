'use client'

import { useStorage } from '@/lib/store'
import { useEffect } from 'react'

export default function CurrentPlay({ play }: { play: string }) {
	if (!play) return null

	const scoring = ['homers', 'scores'].some((type) => play?.includes(type)) || undefined
	const { notificationPermission } = useStorage()

	useEffect(() => {
		if (notificationPermission === 'granted' && play.includes('homers')) {
			new Notification('Home Run Alert', {
				body: 'Home Run!',
			})
		}
	}, [play])

	return (
		// @ts-ignore
		<marquee
			className="overflow-fade absolute inset-x-0 bottom-0 text-xs"
			data-scoring={scoring}
			title={play}
			children={play}
			key={play}
		/>
	)
}
