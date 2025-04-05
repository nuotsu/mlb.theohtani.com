import DatePicker from '@/ui/DatePicker'
import Icon from '@/ui/Icon'
import GlobalOptions from '@/ui/GlobalOptions'
import Schedule from '@/ui/Schedule'
import SelectedPlayers from '@/ui/SelectedPlayers'

export default function Home() {
	return (
		<>
			<header className="flex items-center gap-1">
				<Icon />
				<h1>MLB Score Bug</h1>
			</header>
			<DatePicker />
			<GlobalOptions />
			<Schedule />
			<SelectedPlayers />
		</>
	)
}
