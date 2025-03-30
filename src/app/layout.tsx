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
			<body className="bg-canvas text-ink">
				<main>{children}</main>
			</body>
		</html>
	)
}
