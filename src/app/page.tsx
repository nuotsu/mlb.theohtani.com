import Date from '@/ui/Date'
import Icon from '@/ui/Icon'
import Options from '@/ui/Options'
import Schedule from '@/ui/Schedule'

export default function Home() {
	return (
		<>
			<header className="flex items-center gap-1">
				<Icon />
				<h1>MLB Score Bug</h1>
			</header>
			<Date />
			<Options />
			<Schedule />
		</>
	)
}
