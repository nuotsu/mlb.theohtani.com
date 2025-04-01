export default function GameOptions() {
	return (
		<details className="open:bg-canvas/50 absolute top-0 right-0 z-10 grid place-content-center group-[:not(:hover)]/game:not-open:hidden open:inset-0 open:backdrop-blur-xs">
			<summary
				className="anim-fade-to-l absolute top-0 right-0 z-1 inline-grid aspect-square h-[3ch] place-content-center text-xs"
				title="Options"
			>
				•••
			</summary>

			<div className="anim-fade-to-r">
				<label>
					<input name="spoiler" type="checkbox" />
					Prevent spoilers
				</label>
			</div>
		</details>
	)
}
