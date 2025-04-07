import MiniPlayer from './MiniPlayer'

export default function TopPerformers({ liveData }: { liveData: MLB.LiveMatchData }) {
	const { topPerformers } = liveData.boxscore

	return (
		<ul className="no-spoiler:hidden anim-fade-to-r px-2 text-sm">
			{topPerformers.map((performer, key) => (
				<li key={key}>
					<TopPerformer performer={performer} />
				</li>
			))}
		</ul>
	)
}

function TopPerformer({
	performer,
}: {
	performer: MLB.TopPerformerHitter | MLB.TopPerformerStarter
}) {
	const { jerseyNumber, person, stats } = performer.player

	return (
		<MiniPlayer
			className="[&_dt]:text-stroke"
			label={`#${jerseyNumber}`}
			player={person}
			nameType="lastName"
		>
			<div className="text-xs">
				{performer.type === 'starter' ? stats.pitching.summary : stats.batting.summary}
			</div>
		</MiniPlayer>
	)
}
