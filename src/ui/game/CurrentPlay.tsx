'use client'

import { useEffect } from 'react'

export default function CurrentPlay({ play }: { play: string }) {
	if (!play) return null

	const scoring = ['homers', 'scores'].some((type) => play?.includes(type)) || undefined

	useEffect(() => {
		// if (play) notify()

		if (play.includes('homers')) notify()
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

function notify() {
	if (!('Notification' in window)) {
		console.log('This browser does not support notifications')
	}

	Notification.requestPermission().then((permission) => {
		console.log({ permission })

		if (permission !== 'granted') return

		new Notification('Test', {
			body: 'Someone just hit a home run!',
			icon: '/favicon.ico',
		})
	})
}
