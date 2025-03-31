import MiniPlayer from './MiniPlayer'
import Flip from './Flip'
import { cn } from '@/lib/utils'

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
			<MiniPlayer
				label="P"
				className="anim-fade-to-r [&_dt]:text-canvas [&_dt]:bg-ink"
				player={pitcher}
				title="Pitcher"
				key={pitcher.id}
			>
				{pitcherStats && (
					<span className="flex">
						P:<Flip>{pitcherStats.numberOfPitches}</Flip>
					</span>
				)}
			</MiniPlayer>

			<MiniPlayer
				label={battingOrder}
				className="anim-fade-to-r [&_dt]:bg-stroke"
				player={batter}
				title="Batter"
				key={batter.id}
			>
				{batterStats && (
					<span className="line-clamp-1" title={batterStats.summary}>
						{batterStats.summary}
					</span>
				)}
			</MiniPlayer>
		</div>
	)
}
