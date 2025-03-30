type DetailedState = MLB.GameStatus['detailedState']

export const isScheduled = (detailedState: DetailedState) =>
	(['Scheduled', 'Warmup', 'Pre-Game'] as DetailedState[]).some((state) =>
		detailedState.startsWith(state),
	)

export const isActive = (detailedState: DetailedState) =>
	(['In Progress', 'Umpire review', 'Manager challenge', 'Umpire review'] as DetailedState[]).some(
		(state) => detailedState.startsWith(state),
	)

export const isFinal = (detailedState: DetailedState) =>
	(['Game Over', 'Final', 'Cancelled', 'Completed Early', 'Postponed'] as DetailedState[]).some(
		(state) => detailedState.startsWith(state),
	)
