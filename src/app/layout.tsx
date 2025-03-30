import type { Metadata } from 'next'
import '@/styles/app.css'

export const metadata: Metadata = {
	title: 'MLB Score Bug',
	description: '',
	icons: {
		icon: 'https://fav.farm/⚾',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="bg-canvas text-ink">
				<main className="pb-[env(safe-area-inset-bottom)]">{children}</main>
			</body>
		</html>
	)
}
