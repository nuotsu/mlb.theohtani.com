export default function CurrentPlay({ play }: { play: string }) {
	if (!play) return null

	const scoring = ['homers', 'scores'].some((type) => play?.includes(type)) || undefined

	return (
		// @ts-ignore
		<marquee
			className="overflow-fade from-canvas to-tran absolute inset-x-0 bottom-0 bg-linear-to-t text-xs"
			data-scoring={scoring}
			title={play}
			children={play}
			key={play}
		/>
	)
}
