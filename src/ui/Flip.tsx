import type { ComponentProps } from 'react'

export default function Flip({ children, ...props }: ComponentProps<'span'>) {
	return (
		<div className="overflow-hidden" key={children?.toString()}>
			<span className="anim-fade-to-t inline-block" {...props}>
				{children}
			</span>
		</div>
	)
}
