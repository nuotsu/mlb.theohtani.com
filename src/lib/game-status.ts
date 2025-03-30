type DetailedState = MLB.GameStatus['detailedState']

export const isScheduled = (detailedState: DetailedState) =>
	(['Scheduled', 'Warmup', 'Pre-Game'] as DetailedState[]).includes(detailedState)

export const isActive = (detailedState: DetailedState) =>
	(
		[
			'In Progress',
			'Umpire review',
			'Manager challenge',
			'Manager challenge: Tag play',
			'Umpire review',
		] as DetailedState[]
	).includes(detailedState)

export const isFinal = (detailedState: DetailedState) =>
	(
		[
			'Game Over',
			'Final',
			'Final: Tied',
			'Cancelled',
			'Completed Early',
			'Postponed',
		] as DetailedState[]
	).includes(detailedState)
