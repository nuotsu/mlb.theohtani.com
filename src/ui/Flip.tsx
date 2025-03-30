import type { ComponentProps } from 'react'

export default function Flip({
	disable,
	children,
	...props
}: { disable?: boolean } & ComponentProps<'span'>) {
	if (disable) return <span {...props}>{children}</span>

	return (
		<div className="overflow-hidden" key={children?.toString()}>
			<span className="anim-fade-to-t inline-block duration-200" {...props}>
				{children}
			</span>
		</div>
	)
}
