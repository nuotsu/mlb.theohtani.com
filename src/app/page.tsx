import DatePicker from '@/ui/DatePicker'
import Icon from '@/ui/Icon'
import GlobalOptions from '@/ui/GlobalOptions'
import Schedule from '@/ui/game/Schedule'
import Standings from '@/ui/standings/Standings'
import SelectedPlayers from '@/ui/SelectedPlayers'
import { cn } from '@/lib/utils'

export default function Home() {
	return (
		<>
			<header className="flex items-center justify-center gap-1">
				<Icon />
				<h1>MLB Score Bug</h1>
			</header>

			<nav className={cn('blur-gradient sticky top-0 z-10 flex flex-wrap items-center')}>
				<DatePicker />
				<GlobalOptions />
				<Standings />
			</nav>

			<Schedule />
			<SelectedPlayers />
		</>
	)
}
