'use client'

import { useStorage } from '@/lib/store'

export default function NotificationsOption() {
	const { notificationPermission, setNotificationPermission } = useStorage()

	return (
		<label>
			<input
				type="checkbox"
				checked={notificationPermission === 'granted'}
				disabled={notificationPermission === 'default'}
				onChange={() =>
					setNotificationPermission(notificationPermission === 'granted' ? 'denied' : 'granted')
				}
			/>

			{(notificationPermission === 'granted' || notificationPermission === 'denied') &&
				'Enable notifications'}

			{notificationPermission === 'default' && (
				<button
					onClick={() => {
						if (!('Notification' in window)) return

						Notification.requestPermission().then((permission) => {
							if (permission === 'granted') {
								setNotificationPermission(permission)
							}
						})
					}}
				>
					Enable notifications
				</button>
			)}
		</label>
	)
}
