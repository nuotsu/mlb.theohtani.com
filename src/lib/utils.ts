import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function count(
	arr: Array<any> | number | undefined,
	singular: string = 'item',
	plural?: string,
) {
	const num = typeof arr === 'number' ? arr : arr?.length || 0
	return `${num || 'no'} ${num === 1 ? singular : plural || singular + 's'}`
}
