import { create } from 'zustand'

export const useStore = create<{
	date: string
	setDate: (date: string) => void
}>((set) => ({
	date: new Date().toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}),
	setDate: (date) => set({ date }),
}))
