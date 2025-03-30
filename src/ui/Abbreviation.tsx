import type { ComponentProps } from 'react'

export default function Abbreviation({
	team,
	...props
}: { team: MLB.LiveTeam } & ComponentProps<'abbr'>) {
	return (
		<abbr title={team.name} {...props}>
			{team.abbreviation}
		</abbr>
	)
}
