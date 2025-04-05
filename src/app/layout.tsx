import { Chakra_Petch as Font } from 'next/font/google'
import type { Metadata } from 'next'
import '@/styles/app.css'
import { cn } from '@/lib/utils'

const font = Font({
	subsets: ['latin'],
	weight: ['400', '700'],
})

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
			<body className={cn(font.className, 'bg-canvas text-ink')}>
				<main className="flex min-h-svh flex-col pb-[env(safe-area-inset-bottom)]">{children}</main>
			</body>
		</html>
	)
}
