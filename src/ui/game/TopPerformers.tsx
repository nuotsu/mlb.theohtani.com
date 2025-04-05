import MiniPlayer from './MiniPlayer'

export default function TopPerformers({ liveData }: { liveData: MLB.LiveMatchData }) {
	const { topPerformers } = liveData.boxscore

	return (
		<ul className="no-spoiler:hidden anim-fade-to-r highlighted:@lg:text-base px-2 text-sm">
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
			className="[&_dt]:text-stroke [&_dt]:highlighted:@lg:text-lg"
			label={`#${jerseyNumber}`}
			player={person}
		>
			<div className="highlighted:@lg:text-base text-xs">
				{performer.type === 'starter' ? stats.pitching.summary : stats.batting.summary}
			</div>
		</MiniPlayer>
	)
}
