import useSWR from 'swr'

const BASE_URL = 'https://statsapi.mlb.com'

export async function fetchMLB<T = any>(endpoint: string) {
	const url = new URL(endpoint, BASE_URL)
	const res = await fetch(url)
	return res.json() as Promise<T>
}

export function fetchMLBLive<T = any>(endpoint: string) {
	return useSWR<T>(endpoint, fetchMLB, {
		refreshInterval: 1000 * 3, // seconds
	})
}
