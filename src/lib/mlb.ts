import useSWR, { SWRConfiguration } from 'swr'

const BASE_URL = 'https://statsapi.mlb.com'

export async function fetchMLB<T = any>(endpoint: string) {
	const url = new URL(endpoint, BASE_URL)
	const res = await fetch(url)
	return res.json() as Promise<T>
}

export function fetchMLBLive<T = any>(endpoint?: string, options?: SWRConfiguration) {
	if (!endpoint) return { data: null, isLoading: false }

	return useSWR<T>(endpoint, fetchMLB, {
		refreshInterval: 1000 * 3, // seconds
		...options,
	})
}

export function fetchPlayer<T = MLB.PitchingStats | MLB.BattingStats>(
	player: MLB.BasicPlayerData | undefined,
	group?: 'pitching' | 'hitting' | 'pitching,hitting',
	year?: string,
) {
	const { data, ...rest } = fetchMLBLive<{
		people: MLB.PlayerStat[]
	}>(
		player?.link &&
			[player.link, group && `?hydrate=stats(group=[${group}],type=[yearByYear])`]
				.filter(Boolean)
				.join(''),
		{
			refreshInterval: 1000 * 60,
		},
	)

	return {
		data: data?.people[0],
		stat: getStat<T>(data?.people[0], year),
		...rest,
	}
}

export function getStat<T = MLB.PitchingStats | MLB.BattingStats>(
	data: MLB.PlayerStat | undefined,
	year?: string,
) {
	if (!year) return undefined
	return data?.stats?.[0].splits.find((split) => split.season === year)?.stat as T
}
