const BASE_URL = 'https://statsapi.mlb.com'

/**
 * @see https://github.com/toddrob99/MLB-StatsAPI/wiki
 */
export async function fetchMLB<T = any>(endpoint: string, options?: RequestInit) {
	const url = new URL(endpoint, BASE_URL)
	const res = await fetch(url, options)
	return res.json() as Promise<T>
}

export async function fetchSchedule(date: string) {
	return await fetchMLB<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)
}
