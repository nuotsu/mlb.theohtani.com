// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace MLB {
		interface Schedule {
			dates: {
				date: string
				games: {
					dayNight: 'day' | 'night'
					gameDate: string
					link: string
				}[]
				totalGames: number
				totalGamesInProgress: number
			}[]
			totalGames: number
		}

		interface Game {
			gameData: {
				teams: {
					away: Team
					home: Team
				}
			}
			liveData: {}
		}

		interface Team {
			abbreviation: string
		}
	}
}

export {}
