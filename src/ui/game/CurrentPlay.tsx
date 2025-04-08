'use client'

import { useEffect } from 'react'

export default function CurrentPlay({ play }: { play: string }) {
	if (!play) return null

	const scoring = ['homers', 'scores'].some((type) => play?.includes(type)) || undefined

	useEffect(() => {
		if (!('Notification' in window)) return

		Notification.requestPermission().then((permission) => {
			if (permission !== 'granted') return

			if (play)
				new Notification('Test', {
					body: 'testing notification',
					// icon: '/favicon.ico',
				})

			if (play.includes('homers'))
				new Notification('Test', {
					body: 'Someone just hit a home run!',
					icon: '/favicon.ico',
				})
		})
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
