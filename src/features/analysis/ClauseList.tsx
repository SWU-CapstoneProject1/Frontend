import type { AnalysisClause } from '../../types'
import ClauseCard from './ClauseCard'

interface ClauseListProps {
  clauses: AnalysisClause[]
  onHoverClause: (id: string | null) => void  // 호버된 조항 id를 부모에게 전달
}

function ClauseList({ clauses, onHoverClause }: ClauseListProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold text-ink mb-4">약관 조항 분석</h3>

      <div className="space-y-3">
        {clauses.map((clause) => (
          <ClauseCard
            key={clause.id}
            clause={clause}
            onHover={onHoverClause}
          />
        ))}
      </div>
    </div>
  )
}

export default ClauseList