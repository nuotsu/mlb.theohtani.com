import { swr } from './utils.svelte'

const BASE_URL = 'https://statsapi.mlb.com'

export async function fetchMLB<T = any>(endpoint: string) {
	const url = new URL(endpoint, BASE_URL)
	const res = await fetch(url)
	return res.json() as Promise<T>
}

export async function fetchMLBLive<T = any>(endpoint: string) {
	return await swr(async () => await fetchMLB<T>(endpoint), { revalidate: 2 })
}

export async function fetchSchedule(date: string) {
	return await fetchMLB<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)
}
