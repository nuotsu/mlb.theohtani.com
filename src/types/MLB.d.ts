// https://github.com/toddrob99/MLB-StatsAPI/wiki/Endpoints
// https://github.com/qixils/mlb-matchup-viewer/blob/20e0fa105ce74b52b0564fd288f63b8a79dc5918/src/mlb.d.ts

declare global {
	namespace MLB {
		interface RootResponse {
			copyright: string
		}

		interface PartialDateTime {
			officialDate: string // US date of the event as YYYY-MM-DD
			dayNight: 'day' | 'night'
		}

		interface IdentifiableObject {
			id: number // int
			link: string
		}

		interface NameableObject extends IdentifiableObject {
			name: string
			fullName?: string
		}

		// misc

		interface Record {
			wins: number // int; games won in the series/league/best of whatever
			losses: number // int; games lost in the you know
		}

		interface LeagueRecord extends Record {
			pct: string // percent of games won as a 0-1 float as a string
		}

		interface FullLeagueRecord extends LeagueRecord {
			ties: number // int; games tied in the you know
		}

		interface Coded {
			description: string
			code: string // first character of the above
		}

		interface Coordinates {
			x: number // float
			y: number // float
		}

		// games

		interface GameStatus {
			abstractGameState: 'Live' | 'Final' | 'Preview'
			abstractGameCode: string // first char of abstractGameState ig
			detailedState:
				| 'Scheduled'
				| 'Warmup'
				| 'Pre-Game'
				| 'Delayed'
				| 'In Progress'
				| 'Umpire review'
				| 'Manager challenge'
				| 'Manager challenge: Tag play'
				| 'Game Over'
				| 'Final'
				| 'Final: Tied'
				| 'Cancelled'
				| 'Completed Early'
			statusCode: string // first char of detailedState
			codedGameState: GameStatus['statusCode'] // dupe of statusCode
			startTimeTBD: boolean
		}

		interface Game {
			doubleHeader: string // unknown (to me) single-char code
			gamedayType: string // unknown (to me) single-char code
			tiebreaker: string // unknown (to me) single-char code
			calendarEventID: string
			season: string // year as string (i suppose it might not always be the year)
			seasonDisplay: string // display name of the season (generally the same)
			gameNumber: number // int
		}

		// player

		interface BasicPlayerData extends IdentifiableObject {
			fullName: string
		}

		interface Player extends BasicPlayerData {
			firstName: string
			middleName: string
			lastName: string
			useName: string // preferred name?
			boxscoreName: string
			gender: string // i assume the MLB isn't based and this is just M or F
			primaryNumber: string // this is a string i think because of zero padding?
			birthDate: string // YYYY-MM-DD
			currentAge: number // int
			birthCity: string
			birthStateProvince: string
			birthCountry: string
			height: string // X' X"
			weight: number // int
			active: boolean
			primaryPosition: PrimaryPosition
			isPlayer: boolean
			isVerified: boolean
			draftYear: number
			mlbDebutDate: string // YYYY-MM-DD
			batSide: Side
			pitchHand: Side
			nameSlug: string
			nameFirstLast: string
			firstLastName: string
			lastFirstName: string
			lastInitName: string
			initLastName: string
			fullFMLName: string
			fullLFMName: string
			strikeZoneTop: number // float
			strikeZoneBottom: number // float
		}

		interface PlayerStat extends Player {
			stats: MLB.StatEntry<MLB.PlayerStatSplit>[]
		}

		interface PrimaryPosition {
			code: string
			name: string
			type: string
			abbreviation: string
		}

		interface Side extends Coded {}

		// team

		interface BasicTeamData extends NameableObject {
			springLeague: SpringLeague
			allStarStatus: string // i think N or Y
		}

		interface Team extends BasicTeamData {
			season: number // int; year
			venue: NameableObject
			springVenue: IdentifiableObject
			teamCode: string
			fileCode: string
			abbreviation: string // team abbreviation
			teamName: string // team short name
			locationName: string
			firstYearOfPlay: string // YYYY
			league: NameableObject
			division: NameableObject
			sport: NameableObject
			shortName: string
			franchiseName: string
			clubName: string
			active: boolean
		}

		interface SpringLeague extends NameableObject {
			abbreviation: string
		}

		interface Sport extends IdentifiableObject {
			abbreviation: string
		}

		// venue

		interface Venue extends NameableObject {
			location: Location
			timeZone: TimeZone
			fieldInfo: FieldInfo
			active: boolean
		}

		interface Location {
			address1: string
			city: string
			state: string
			stateAbbrev: string
			postalCode: string // int as a string?
			defaultCoordinates: LatLong
			country: string
			phone: string // (XXX) XXX-XXXX
		}

		interface LatLong {
			latitude: number // float
			longitude: number // float
		}

		interface TimeZone {
			id: string // timezone id a la America/New_York
			offset: number // int; UTC offset
			tz: string // timezone code a la EDT
		}

		interface FieldInfo {
			capacity: number
			turfType: string // can be 'Grass' and idk what else
			roofType: string // presumably 'Open' or 'Closed'
			leftLine: number // int
			left: number // int
			leftCenter: number // int
			center: number // int
			rightCenter: number // int
			right: number // int
			rightLine: number // int
		}

		// misc

		interface Weather {
			condition: string
			temp: string // int; temp in fahrenheit
			wind: string
		}

		interface GameInfo {
			attendance?: number
			firstPitch: string // UTC instant
		}

		interface Review {
			hasChallenges: boolean
			away: TeamChallenges
			home: TeamChallenges
		}

		interface TeamChallenges {
			used: number
			remaining: number
		}

		interface Flags {
			noHitter: boolean
			perfectGame: boolean
			awayTeamNoHitter: boolean
			awayTeamPerfectGame: boolean
			homeTeamNoHitter: boolean
			homeTeamPerfectGame: boolean
		}

		interface Alert {
			// TODO: dunno what this is
		}

		interface ProbablePitchers {
			away: BasicPlayerData
			home: BasicPlayerData
		}

		interface DisplayNameObject {
			displayName: string
		}

		// stats

		interface Stats {
			batting: BattingStats
			pitching: PitchingStats
			fielding: FieldingStats
		}

		interface BattingStats {
			summary: string
			flyOuts: number // int
			groundOuts: number // int
			runs: number // int
			doubles: number // int
			triples: number // int
			homeRuns: number // int
			strikeOuts: number // int
			baseOnBalls: number // int
			intentionalWalks: number // int
			hits: number // int
			hitByPitch: number // int
			atBats: number // int
			caughtStealing: number // int
			stolenBases: number // int
			groundIntoDoublePlay: number // int
			groundIntoTriplePlay: number // int
			plateAppearances: number // int
			totalBases: number // int
			rbi: number // int
			leftOnBase: number // int
			sacBunts: number // int
			sacFlies: number // int
			catchersInterference: number // int
			pickoffs: number // int
			atBasePerHomeRun: string // float; can be "-.--" if unavailable
			avg: string // 0-1 float as a string; can be ".---" if unavailable
			obp: string // 0-1 float as a string; can be ".---" if unavailable
			slg: string // 0-1 float as a string; can be ".---" if unavailable
			ops: string // 0-1 float as a string; can be ".---" if unavailable
			stolenBasePercentage: string // 0-1 float as a string; can be ".---" if unavailable
		}

		interface PitchingStats extends PlayCount {
			summary: string
			gamesPlayed: number // int
			gamesStarted: number // int
			groundOuts: number // int
			airOuts: number // int
			runs: number // int
			doubles: number // int
			triples: number // int
			homeRuns: number // int
			strikeOuts: number // int
			baseOnBalls: number // int
			intentionalWalks: number // int
			hits: number // int
			hitByPitch: number // int
			atBats: number // int
			obp: string // 0-1 float as a string; can be ".---" if unavailable
			slg: string // 0-1 float as a string; can be ".---" if unavailable
			ops: string // 0-1 float as a string; can be ".---" if unavailable
			caughtStealing: number // int
			stolenBases: number // int
			stolenBasePercentage: string // 0-1 float as a string; can be ".---" if unavailable
			groundIntoDoublePlay: number // int
			numberOfPitches: number // int
			era: string // float; can be "-.--" if unavailable
			inningsPitched: string // float; can be "-.--" if unavailable
			wins: number // int
			losses: number // int
			saves: number // int
			saveOpportunities: number // int
			holds: number // int
			blownSaves: number // int
			earnedRuns: number // int
			whip: string // float; can be "-.--" if unavailable
			battersFaced: number // int
			outs: number // int
			gamesPitched: number // int
			completeGames: number // int
			shutouts: number // int
			strikes: number // int
			strikePercentage: string // 0-1 float as a string; can be ".---" if unavailable
			hitBatsmen: number // int
			balks: number // int
			wildPitches: number // int
			pickoffs: number // int
			totalBases: number // int
			groundOutsToAirouts: string // float; can be "-.--" if unavailable
			winPercentage: string // 0-1 float as a string; can be ".---" if unavailable
			pitchesPerInning: string // float; can be "-.--" if unavailable
			gamesFinished: number // int
			strikeoutWalkRatio: string // float; can be "-.--" if unavailable
			strikeoutsPer9Inn: string // float; can be "-.--" if unavailable
			hitsPer9Inn: string // float; can be "-.--" if unavailable
			runsScoredPer9: string // float; can be "-.--" if unavailable
			homeRunsPer9: string // float; can be "-.--" if unavailable
			inheritedRunners: number // int
			inheritedRunnersScored: number // int
			catchersInterference: number // int
			sacBunts: number // int
			sacFlies: number // int
			pitchesThrown: number // int
			rbi: number // int
			passedBall: number // int
		}

		interface FieldingStats {
			caughtStealing: number // int
			stolenBases: number // int
			assists: number // int
			putOuts: number // int
			errors: number // int
			chances: number // int
			passedBall: number // int
			pickoffs: number // int
			stolenBasePercentage: string // 0-1 float as a string; can be ".---" if unavailable
		}

		///// responses /////

		// schedule

		interface Schedule extends RootResponse {
			totalItems: number // int
			totalEvents: number // int
			totalGames: number // int
			totalGamesInProgress: number // int
			dates: ScheduleDate[]
		}

		interface ScheduleDate {
			date: string // YYYY-MM-DD
			totalItems: number // int
			totalEvents: number // int
			totalGames: number // int
			totalGamesInProgress: number // int
			games: ScheduleGame[]
			events: ScheduleEvent[]
		}

		interface ScheduleGame extends PartialDateTime, Game {
			gamePk: number // int
			link: string
			gameType: string
			gameDate: string // UTC instant
			status: GameStatus
			teams: ScheduleTeams
			venue: NameableObject
			content: GameContent
			publicFacing: boolean
			description: string // display name of the game (i.e. 'World Series Game 1')
			scheduledInnings: number // int
			reverseHomeAwayStatus: boolean
			inningBreakLength: number // int (seconds?)
			gamesInSeries: number // int; best of <this variable>
			seriesGameNumber: number // int
			seriesDescription: string // display name of the series (i.e. 'World Series')
			recordSource: string // unknown (to me) single-char code
			ifNecessary: string // unknown (to me) single-char code
			ifNecessaryDescription: string // full string of whatever the above is
		}

		interface ScheduleEvent {
			// idk what this is
		}

		interface ScheduleTeams {
			away: ScheduleTeam
			home: ScheduleTeam
		}

		interface ScheduleTeam {
			splitSquad: boolean
			seriesNumber: number // int
			score?: number // int; current game score; only present if game is in progress
			team: NameableObject
			leagueRecord: LeagueRecord
			isWinner?: boolean
		}

		interface GameContent {
			link: string
		}

		// live

		interface LiveData extends RootResponse {
			gamePk: number // int
			link: string
			metaData: LiveMetaData
			gameData: LiveGame
			liveData: LiveMatchData
		}

		interface LiveMetaData {
			wait: number
			timeStamp: string // YYYYMMDD_hhmmss
			gameEvents: string[] // describes the most recent action from the batter?
			logicalEvents: string[] // describes the state of play (current count and inning status)
		}

		interface LiveGame {
			game: LiveGameData
			datetime: GameDateTime
			status: GameStatus
			teams: LiveTeams
			players: any // Map<string, Player>; keys are of the format "IDXXXXXX" where XXXXXX is the player's ID
			venue: Venue
			officialVenue: IdentifiableObject
			weather: Weather
			gameInfo: GameInfo
			review: Review
			flags: Flags
			alerts: Alert[]
			probablePitchers: ProbablePitchers
			officialScorer: NameableObject
			primaryDatacaster: NameableObject
		}

		interface LiveGameData {
			pk: number // int
			type: string // unknown (to me) single-char code
			doubleHeader: string // unknown (to me) single-char code
			id: string
			gamedayType: string // unknown (to me) single-char code
		}

		interface WinProbability {
			result: {
				type: string
				event: string
				eventType: string
				description: string
				rbi: number
				awayScore: number
				homeScore: number
				isOut: boolean
			}
			about: {
				atBatIndex: number
				halfInning: string
				isTopInning: boolean
				inning: number
				startTime: string
				endTime: string
				isComplete: boolean
				isScoringPlay: boolean
				hasReview: boolean
				hasOut: boolean
				captivatingIndex: number
			}
			count: {
				balls: number
				strikes: number
				outs: number
			}
			matchup: {}
			pitchIndex: number[]
			actionIndex: number[]
			runnerIndex: number[]
			runners: {}
			playEvents: {}[]
			credits: {}[]
			flags: {}[]
			homeTeamWinProbability: number
			awayTeamWinProbability: number
			homeTeamWinProbabilityAdded: number
			leverageIndex: number
			contextMetrics: {}
			playEndTime: string
			atBatIndex: number
		}

		interface GameDateTime extends PartialDateTime {
			dateTime: string // UTC instant
			originalDate: string // date of the event as YYYY-MM-DD
			time: string // h:mm; local tz?
			ampm: string // AM or PM
		}

		interface LiveTeams {
			away: LiveTeam
			home: LiveTeam
		}

		interface LiveTeam extends Team {
			record: LiveRecord
		}

		interface LiveRecord extends Record {
			gamesPlayed: number
			wildCardGamesBack: string
			leagueGamesBack: string
			springLeagueGamesBack: string
			sportGamesBack: string
			divisionGamesBack: string
			conferenceGamesBack: string
			leagueRecord: FullLeagueRecord
			records: Records
			divisionLeader: boolean
			winningPercentage: string // percent of games won as a 0-1 float as a string
		}

		interface Records {
			splitRecords: FullLeagueRecord[]
			divisionRecords: FullLeagueRecord[]
			overallRecords: FullLeagueRecord[]
			leagueRecords: FullLeagueRecord[]
			extendedRecords: FullLeagueRecord[]
		}

		interface LiveMatchData {
			plays: LivePlays
			linescore: LiveLineScore
			boxscore: LiveBoxScore
			decisions?: LiveDecisions
			leaders: LiveLeaders
		}

		interface LivePlays {
			allPlays: LivePlay[]
			currentPlay: LivePlay
			scoringPlays: number[] // indices of allPlays i think
			playsByInning: LivePlaysInning[]
		}

		interface LivePlay {
			result: LivePlayResult
			about: LivePlayAbout
			count: PlayCount
			matchup: LivePlayMatchup
			pitchIndex: number[] // ints
			actionIndex: number[] // ints
			runnerIndex: number[] // ints
			runners: LivePlayRunner[]
			playEvents: LivePlayEvent[]
			playEndTime: string // UTC instant
			atBatIndex: number
		}

		interface LivePlayResult {
			type: string
			event: string
			eventType: string
			description: string // written description
			rbi: number // int
			awayScore: number // int
			homeScore: number // int
		}

		interface LivePlayAbout {
			atBatIndex: number // int
			halfInning: string
			isTopInning: boolean
			inning: number // int
			startTime: string // UTC instant
			endTime: string // UTC instant
			isComplete: boolean
			isScoringPlay: boolean
			hasReview: boolean
			hasOut: boolean
			captivatingIndex: number
		}

		interface PlayCount {
			balls: number // int
			strikes: number // int
			outs: number // int
		}

		interface LivePlayMatchup {
			batter: BasicPlayerData
			batSide: Side
			pitcher: BasicPlayerData
			pitchHand: Side
			batterHotColdZoneStats: StatHolder<StatSplit<LivePlayZoneSplit>>
			batterHotColdZones: LivePlayZone[]
			pitcherHotColdZones: LivePlayZone[]
			splits: LivePlayMatchupSplits
		}

		interface StatHolder<SplitType extends StatSplit<any>> {
			stats: StatEntry<SplitType>[]
		}

		interface StatEntry<SplitType extends StatSplit<any>> {
			type: DisplayNameObject
			group: DisplayNameObject
			exemptions: any[] // dunno
			splits: SplitType[]
		}

		interface StatSplit<DataType> {
			stat: DataType
		}

		interface LivePlayZoneSplit {
			name: string
			zones: LivePlayZone[]
		}

		interface LivePlayZone {
			zone: string
			color: string // "rgba(XXX, XXX, XXX, X.XX)"
			temp: string
			value: string
		}

		interface LivePlayMatchupSplits {
			batter: string
			pitcher: string
			menOnBase: string
		}

		interface LivePlayRunner {
			movement: LivePlayRunnerMovement
			details: LivePlayRunnerDetails
			credits: LivePlayRunnerCredit[]
		}

		interface LivePlayRunnerMovement {
			originBase: string | null // guessing on the type of this
			start: string | null
			end: string | null
			outBase: string | null
			isOut: boolean
			outNumber: number | null
		}

		interface LivePlayRunnerDetails {
			event: string
			eventType: string
			movementReason: string | null
			runner: BasicPlayerData
			responsiblePitcher: IdentifiableObject
			isScoringEvent: boolean
			rbi: boolean
			earned: boolean
			teamUnearned: boolean
			playIndex: number // int
		}

		interface LivePlayRunnerCredit {
			player: IdentifiableObject
			position: PrimaryPosition
			credit: string
		}

		interface LivePlayEvent {
			details: LivePlayEventDetails
			count: PlayCount
			index: number // int
			startTime: string // UTC instant
			endTime: string // UTC instant
			isPitch: boolean
			type: string
			player: IdentifiableObject
		}

		interface LivePlayEventDetails {
			description: string
			event: string
			eventType: string
			awayScore: number
			homeScore: number
			isScoringPlay: boolean
			hasReview: boolean
		}

		interface LivePlaysInning {
			startIndex: number // int
			endIndex: number // int
			top: number[] // ints; indices of allPlays
			bottom: number[] // ints; indices of allPlays
			hits: LivePlaysInningHits
		}

		interface LivePlaysInningHits {
			away: LivePlaysInningHit[]
			home: LivePlaysInningHit[]
		}

		interface LivePlaysInningHit {
			team: BasicTeamData
			inning: number // int
			pitcher: BasicPlayerData
			batter: BasicPlayerData
			coordinates: Coordinates
			type: string
			description: string
		}

		interface LiveLineScore extends PlayCount {
			currentInning: number // int
			currentInningOrdinal: string // above as an ordinal, i.e. "1st"
			isTopInning: boolean
			inningState: 'Top' | 'Middle' | 'Bottom' | 'End'
			inningHalf: 'Top' | 'Bottom'
			scheduledInnings: number
			innings: Inning[]
			teams: LineScoreTeams
			defense: LineScoreTeam
			offense: LineScoreTeam
		}

		interface LineScoreTeams {
			home: LineScoreTeamStats
			away: LineScoreTeamStats
		}

		interface Inning extends LineScoreTeams {
			num: number
			ordinalNum: string // above as an ordinal, i.e. "1st"
		}

		interface LineScoreTeamStats {
			runs: number // int
			hits: number // int
			errors: number // int
			leftOnBase: number // int
		}

		interface LineScoreTeam {
			pitcher: BasicPlayerData
			catcher: BasicPlayerData
			first: BasicPlayerData
			second: BasicPlayerData
			third: BasicPlayerData
			shortstop: BasicPlayerData
			left: BasicPlayerData
			center: BasicPlayerData
			right: BasicPlayerData
			batter: BasicPlayerData
			onDeck: BasicPlayerData
			inHole: BasicPlayerData
			battingOrder: number // int
			team: BasicTeamData
		}

		interface LiveBoxScore {
			teams: BoxScoreTeams
			officials: Official[]
			info: BoxScoreInfo[]
			pitchingNotes: string[]
			topPerformers: (TopPerformerHitter | TopPerformerStarter)[]
		}

		interface BoxScoreTeams {
			home: BoxScoreTeam
			away: BoxScoreTeam
		}

		interface BoxScoreTeam {
			team: BasicTeamData
			teamStats: Stats
			players: any // Map<string, BoxScoreTeamPlayer>; keys are of the format "IDXXXXXX" where XXXXXX is the player's ID
			batters: number[] // IDs
			pitchers: number[] // IDs
			bench: number[] // IDs
			bullpen: number[] // IDs
			battingOrder: number[] // IDs
			info: BoxScoreTeamInfo[]
			note: string[]
		}

		interface BoxScoreTeamPlayer {
			person: BasicPlayerData
			jerseyNumber: number // int
			position: PrimaryPosition
			status: Coded
			parentTeamId: number // int
			stats: Stats
			seasonStats: Stats
			gameStatus: BoxScoreGameStatus
		}

		interface BoxScoreTeamInfo {
			title: string
			fieldList: BoxScoreInfo[]
		}

		interface BoxScoreGameStatus {
			isCurrentBatter: boolean
			isCurrentPitcher: boolean
			isOnBench: boolean
			isSubstitute: boolean
		}

		interface Official {
			official: NameableObject
			officialType: string
		}

		interface BoxScoreInfo {
			label: string
			value: string
		}

		interface TopPerformer {
			gameScore: number // int
			player: BoxScoreTeamPlayer
		}

		interface TopPerformerHitter extends TopPerformer {
			type: 'hitter'
			hittingGameScore: number // int
		}

		interface TopPerformerStarter extends TopPerformer {
			type: 'starter'
			pitchingGameScore: number // int
		}

		interface LiveDecisions {
			winner: BasicPlayerData
			loser: BasicPlayerData
			save: BasicPlayerData
		}

		interface LiveLeaders {
			hitDistance: any // dunno
			hitSpeed: any // dunno
			pitchSpeed: any // dunno
		}

		// stats

		interface StatData extends RootResponse, StatHolder<PlayerStatSplit> {}

		interface PlayerStatSplit extends StatSplit<PitchingStats | BattingStats> {
			season: string
			team?: NameableObject
			player: BasicPlayerData
			league?: NameableObject
			sport: Sport
			gameType: string
			numTeams?: number // int
		}

		// standings

		interface Standings extends RootResponse {
			records: StandingsRecord[]
		}

		interface StandingsRecord {
			standingsType: string
			league: IdentifiableObject
			division: IdentifiableObject
			sport: IdentifiableObject
			lastUpdated: string // date
			teamRecords: StandingsTeamRecord[]
		}

		interface StandingsTeamRecord extends LiveRecord {
			team: NameableObject
			season: string
			streak: {
				streakType: string
				streakNumber: number // int
				streakCode: string
			}
			divisionRank: string
			leagueRank: string
			sportRank: string
			runsAllowed: number // int
			runsScored: number // int
			divisionChamp: boolean
			divisionLeader: boolean
			wildCardLeader: boolean
			hasWildcard: boolean
			clinched: boolean
			eliminationNumber: string
			eliminationNumberSport: string
			eliminationNumberLeague: string
			eliminationNumberDivision: string
			eliminationNumberConference: string
			wildCardEliminationNumber: string
			wins: number // int
			losses: number // int
			runDifferential: number // int
			winningPercentage: string // 0-1 float as a string; can be ".---" if unavailable
		}
	}
}

export {}
