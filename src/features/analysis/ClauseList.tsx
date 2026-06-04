import type { AnalysisClause } from '../../types'
import ClauseCard from './ClauseCard'

interface ClauseListProps {
  clauses: AnalysisClause[]
  onHoverClause: (id: string | null) => void
  expandedId: string | null 
  onToggleExpand: (id: string | null) => void 
}

function ClauseList({ clauses, onHoverClause, expandedId, onToggleExpand }: ClauseListProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold text-ink mb-4">약관 조항 분석</h3>
      <div className="space-y-3">
        {clauses.map((clause) => (
          <ClauseCard
            key={clause.id}
            clause={clause}
            onHover={onHoverClause}
            expandedId={expandedId} 
            onToggleExpand={onToggleExpand} 
          />
        ))}
      </div>
    </div>
  )
}
export default ClauseList