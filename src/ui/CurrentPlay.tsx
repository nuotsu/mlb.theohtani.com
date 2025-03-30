export default function CurrentPlay({ play }: { play: string }) {
	if (!play) return null

	return (
		// @ts-ignore
		<marquee className="absolute inset-x-0 bottom-0 text-xs" key={play} children={play} />
	)
}
