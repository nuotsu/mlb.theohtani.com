export default function TeamScore({ data, side }: { data: MLB.LiveData; side: 'home' | 'away' }) {
	const { gameData, liveData } = data

	return (
		<div className="grid w-[4ch] shrink-0">
			<abbr className="no-underline" title={gameData.teams[side].name}>
				{gameData.teams[side].abbreviation}
			</abbr>
			<span>{liveData.linescore.teams[side].runs}</span>
		</div>
	)
}
