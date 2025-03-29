export async function swr<T = any>(
	fetcher: () => Promise<T>,
	{
		revalidate,
	}: {
		revalidate: number
	} = {
		revalidate: 30,
	},
) {
	let data = $state(await fetcher())

	setInterval(async () => {
		data = await fetcher()
		// console.log(data)
	}, revalidate * 1000)

	return data
}
