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
}>((set) => ({
	date: new Date().toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}),
	setDate: (date) => set({ date }),

	options: {
		showScoreboard: false,
		showColors: false,
	},
	setOptions: (options) => set({ options }),
}))
