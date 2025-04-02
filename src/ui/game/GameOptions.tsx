export default function GameOptions() {
	return (
		<details
			className="open:bg-canvas/50 absolute top-0 right-0 z-10 grid place-content-center group-[:not(:hover)]/game:not-open:hidden open:inset-0 open:backdrop-blur-xs"
			onMouseLeave={(e) => (e.currentTarget.open = false)}
		>
			<summary
				className="anim-fade-to-l absolute top-0 right-0 z-1 inline-grid aspect-square h-[3ch] place-content-center text-xs"
				title="Options"
			>
				•••
			</summary>

			<div className="anim-fade-to-r flex flex-wrap place-content-center gap-x-2 gap-y-1">
				<label>
					<input name="no-spoiler" type="checkbox" />
					Prevent spoilers
				</label>

				<label>
					<input name="highlight" type="checkbox" />
					Highlight
				</label>
			</div>
		</details>
	)
}
