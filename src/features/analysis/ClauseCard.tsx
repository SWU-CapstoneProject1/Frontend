import { useState } from 'react'
import { ChevronDown, Scale, Sparkles } from 'lucide-react'
import type { AnalysisClause } from '../../types'
import Badge from '../../components/ui/Badge'
import CaseCard from './CaseCard'

interface ClauseCardProps {
  clause: AnalysisClause
  onHover: (id: string | null) => void
  expandedId: string | null
  onToggleExpand: (id: string | null) => void
}

const riskLabels = {
  safe: '안전',
  warning: '주의',
  danger: '위험',
}

const riskTextColors = {
  safe: 'text-green-600',
  warning: 'text-amber-600',
  danger: 'text-red-600',
}

function ClauseCard({
  clause,
  onHover,
  expandedId,
  onToggleExpand,
}: ClauseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = expandedId === clause.id

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover(clause.id)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover(null)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={`clause-card-${clause.id}`}
    >
      <div
        className={`
          relative cursor-pointer overflow-hidden rounded-[30px]
          border bg-white p-6
          shadow-[0_16px_40px_rgba(15,23,42,0.05)]
          transition-all duration-300
          ${
            isHovered
              ? 'border-sky-200 shadow-[0_20px_50px_rgba(14,165,233,0.10)]'
              : 'border-stone-200'
          }
        `}
        onClick={() => onToggleExpand(isExpanded ? null : clause.id)}
      >
        <div className="pointer-events-none absolute right-6 top-4 text-6xl font-black tracking-tighter text-stone-100">
          {String(clause.num).padStart(2, '0')}
        </div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="shrink-0">
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-sky-600">
              ARTICLE {clause.num}
            </p>

            <Badge level={clause.risk} showDot>
              {riskLabels[clause.risk]}
            </Badge>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="mb-2 text-base font-black text-stone-900">
              {clause.title}
            </h4>

            <p
              className={`whitespace-pre-wrap text-sm font-bold leading-relaxed text-stone-500 ${
                !isExpanded ? 'line-clamp-2' : ''
              }`}
            >
              {clause.text}
            </p>
          </div>

          <ChevronDown
            size={20}
            className={`mt-1 shrink-0 text-stone-300 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        {isExpanded && (
          <div className="relative z-10 mt-6 border-t border-stone-200 pt-6">
            <div className="mb-4 rounded-[22px] border border-sky-100 bg-sky-50/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-sky-600" />
                <span className="text-xs font-black text-sky-600">
                  AI 분석 요약
                </span>
              </div>

              <p className="text-sm font-bold leading-relaxed text-stone-600">
                {clause.aiSummary || 'AI 요약 정보가 없습니다.'}
              </p>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <Scale size={16} className="text-sky-600" />
              <span className="text-xs font-black text-stone-500">
                관련 판례
              </span>
            </div>

            {clause.cases && clause.cases.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {clause.cases.map((c) => (
                  <CaseCard key={c.title} caseData={c} />
                ))}
              </div>
            ) : (
              <p className="text-xs font-bold text-stone-400">
                연관된 판례 내역이 없습니다.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClauseCard