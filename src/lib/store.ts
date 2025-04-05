import { create } from 'zustand'

type Options = {
	showScoreboard: boolean
	showColors: boolean
}

export const useStore = create<{
	date: string
	setDate: (date: string) => void

	options: Options
	setOptions: (options: Options) => void

	selectedPlayers: MLB.BasicPlayerData[]
	addSelectedPlayer: (player: MLB.BasicPlayerData) => void
	removeSelectedPlayer: (player: MLB.BasicPlayerData) => void
}>((set) => ({
	date: new Date().toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}),
	setDate: (date) => set({ date }),

	options: {
		showScoreboard: false,
		showColors: true,
	},
	setOptions: (options) => set({ options }),

	selectedPlayers: [],
	addSelectedPlayer: (player) =>
		set((state) => ({
			selectedPlayers: state.selectedPlayers.some((p) => p.id === player.id)
				? state.selectedPlayers.filter((p) => p.id !== player.id)
				: [...state.selectedPlayers, player],
		})),
	removeSelectedPlayer: (player) =>
		set((state) => ({ selectedPlayers: state.selectedPlayers.filter((p) => p.id !== player.id) })),
}))
