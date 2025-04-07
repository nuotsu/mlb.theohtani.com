import { useMemo } from 'react'
import { useLocalStorage } from '@/lib/store'
import TeamRecord from './TeamRecord'

export default function DivisionRecord({ record }: { record: MLB.StandingsRecord }) {
	const { noSpoilers } = useLocalStorage()

	const records = useMemo(
		() =>
			structuredClone(record.teamRecords).sort((a, b) => {
				if (noSpoilers.includes(a.team.id)) return 1
				if (noSpoilers.includes(b.team.id)) return -1
				return 0
			}),
		[noSpoilers],
	)

	return (
		<tbody className="w-full not-last-of-type:border-b has-data-[no-spoiler]:[&_[data-games-back]]:invisible">
			{records.map((teamRecord) => (
				<TeamRecord record={teamRecord} key={teamRecord.team.id} />
			))}
		</tbody>
	)
}
