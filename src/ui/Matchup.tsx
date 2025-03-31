import { cn } from '@/lib/utils'
import Flip from './Flip'

export default function Matchup({ liveData }: { liveData: MLB.LiveMatchData }) {
	const { linescore, boxscore } = liveData
	const interlude = ['Middle', 'End'].includes(linescore.inningState)

	const { batter, battingOrder } = linescore.offense
	const { pitcher } = linescore.defense

	const offense = (top: boolean) =>
		linescore.inningHalf === (top ? 'Bottom' : 'Top') ? 'home' : 'away'

	const pitcherStats = (
		boxscore.teams[offense(false)].players[`ID${pitcher.id}`] as MLB.BoxScoreTeamPlayer
	)?.stats?.pitching

	const batterStats = (
		boxscore.teams[offense(true)].players[`ID${batter.id}`] as MLB.BoxScoreTeamPlayer
	)?.stats?.batting

	return (
		<div
			className={cn('grid pr-1 text-left text-xs transition-opacity', interlude && 'opacity-30')}
		>
			<div className="anim-fade-to-r flex items-center gap-1" title="Pitcher" key={pitcher.id}>
				<small className="text-canvas bg-ink grid aspect-square size-[1lh] place-content-center">
					P
				</small>
				<span className="grow">{pitcher.fullName}</span>
				{pitcherStats && (
					<span className="flex">
						P:<Flip>{pitcherStats.numberOfPitches}</Flip>
					</span>
				)}
			</div>

			<div className="anim-fade-to-r flex items-center gap-1" title="Batter" key={batter.id}>
				<small className="bg-stroke grid aspect-square size-[1lh] place-content-center">
					{battingOrder}
				</small>
				<span className="shrink-0 grow">{batter.fullName}</span>
				{batterStats && (
					<span className="line-clamp-1" title={batterStats.summary}>
						{batterStats.summary}
					</span>
				)}
			</div>
		</div>
	)
}
