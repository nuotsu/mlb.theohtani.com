import { useLocalStorage } from '@/lib/store'
import TeamRecord from './TeamRecord'
import { useMemo } from 'react'

export default function DivisionRecord({ record }: { record: MLB.StandingsRecord }) {
	const { noSpoilers } = useLocalStorage()

	const records = useMemo(() => {
		return structuredClone(record.teamRecords).sort(({ team }) =>
			noSpoilers.includes(team.id) ? 1 : -1,
		)
	}, [noSpoilers])

	return (
		<tbody className="w-full not-last-of-type:border-b has-data-[no-spoiler]:[&_[data-games-back]]:invisible">
			{records.map((teamRecord, key) => (
				<TeamRecord record={teamRecord} key={teamRecord.team.id} />
			))}
		</tbody>
	)
}
