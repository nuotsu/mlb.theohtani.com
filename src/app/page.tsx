import DatePicker from '@/ui/DatePicker'
import Icon from '@/ui/Icon'
import GlobalOptions from '@/ui/GlobalOptions'
import Schedule from '@/ui/Schedule'
import SelectedPlayers from '@/ui/SelectedPlayers'
import { cn } from '@/lib/utils'

export default function Home() {
	return (
		<>
			<header className="flex items-center justify-center gap-1">
				<Icon />
				<h1>MLB Score Bug</h1>
			</header>

			<nav
				className={cn(
					'from-canvas sticky top-0 z-10 flex flex-wrap items-center justify-evenly gap-x-2 gap-y-1 bg-linear-to-b',
					'before:absolute before:inset-0 before:-bottom-4 before:-z-1 before:mask-b-from-25% before:mask-b-to-100% before:backdrop-blur',
				)}
			>
				<DatePicker />
				<GlobalOptions />
			</nav>

			<Schedule />
			<SelectedPlayers />
		</>
	)
}
