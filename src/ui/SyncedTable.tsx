'use client'

import { useEffect, useRef, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export default function SyncedTable({
	identifier,
	cellCount,
	children,
}: {
	identifier: string
	cellCount: number
} & ComponentProps<'table'>) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current || typeof document === 'undefined') return

		function handleScroll() {
			const { scrollLeft = 0, clientWidth = 0 } = ref.current ?? {}
			const percent = scrollLeft / clientWidth

			document.querySelectorAll(`.synced-table`).forEach((elem) => {
				if (elem === ref.current) return
				if (!elem.closest('details')?.open) return
				elem.scrollTo({ left: elem.clientWidth * percent })
			})
		}

		ref.current.addEventListener('scroll', handleScroll)
		return () => ref.current?.removeEventListener('scroll', handleScroll)
	}, [ref])

	const css = Array.from({ length: cellCount })
		.map(
			(_, i) =>
				`body:has([data-identifier="${identifier}"] :is(th, td):nth-child(${i + 1}):hover) [data-identifier="${identifier}"] :is(th, td):nth-child(${i + 1}) {
					background-color: color-mix(in srgb, var(--color-stroke) 50%, transparent);
				}`,
		)
		.join('')

	return (
		<>
			<div
				ref={ref}
				className={cn('synced-table overflow-fade-r overflow-x-auto pr-[1ch]')}
				data-identifier={identifier}
			>
				<table className="text-center [&_:is(th,td)]:px-1">
					<tbody>{children}</tbody>
				</table>
			</div>

			<style jsx>{`
				${css}
			`}</style>
		</>
	)
}
