import type { Metadata } from 'next'
import '@/styles/app.css'

export const metadata: Metadata = {
	title: 'MLB Score Bug',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}
