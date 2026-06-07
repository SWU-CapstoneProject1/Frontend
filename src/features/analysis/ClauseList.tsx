import { FileText } from 'lucide-react'
import type { AnalysisClause } from '../../types'
import ClauseCard from './ClauseCard'

interface ClauseListProps {
  clauses: AnalysisClause[]
  onHoverClause: (id: string | null) => void
  expandedId: string | null
  onToggleExpand: (id: string | null) => void
}

function ClauseList({
  clauses,
  onHoverClause,
  expandedId,
  onToggleExpand,
}: ClauseListProps) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            CLAUSE ANALYSIS
          </span>

          <h3 className="mt-2 flex items-center gap-2 text-xl font-black text-stone-900 dark:text-slate-50">
            <FileText size={20} className="text-sky-600 dark:text-sky-400" />
            약관 조항 분석
          </h3>
        </div>

        <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-black text-stone-500 transition-colors duration-300 dark:bg-white/10 dark:text-slate-300">
          총 {clauses.length}개
        </span>
      </div>

      <div className="space-y-4">
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