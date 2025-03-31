import { cn } from '@/lib/utils'

export default function Flip({
	disable,
	children,
	className,
	...props
}: { disable?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
	if (disable) return <span {...props}>{children}</span>

	return (
		<div className={cn('overflow-hidden', className)} key={children?.toString()} {...props}>
			<span className="anim-fade-to-t inline-block duration-200">{children}</span>
		</div>
	)
}
