import { ComponentProps } from 'react'

export default function TeamLogo({
	team,
	size,
	...props
}: { team: MLB.Team | MLB.NameableObject; size: number } & ComponentProps<'img'>) {
	return (
		<img
			src={`https://midfield.mlbstatic.com/v1/team/${team.id}/spots/${size}`}
			draggable={false}
			alt=""
			{...props}
		/>
	)
}
