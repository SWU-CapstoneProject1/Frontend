import { useState } from 'react'
import { ChevronDown, Scale, Sparkles } from 'lucide-react'
import type { AnalysisClause } from '../../types'
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

const riskStyles = {
  safe: {
    dot: 'bg-emerald-500',
    badge:
      'bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
  },
  warning: {
    dot: 'bg-amber-500',
    badge:
      'bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20',
  },
  danger: {
    dot: 'bg-red-500',
    badge:
      'bg-red-50 text-red-600 ring-red-100 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20',
  },
}

function ClauseCard({
  clause,
  onHover,
  expandedId,
  onToggleExpand,
}: ClauseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = expandedId === clause.id
  const style = riskStyles[clause.risk]

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setIsHovered(true)
        onHover(clause.id)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover(null)
      }}
      id={`clause-card-${clause.id}`}
    >
      <div
        onClick={() => onToggleExpand(isExpanded ? null : clause.id)}
        className={`
          relative cursor-pointer overflow-hidden rounded-[30px]
          border bg-white p-6
          shadow-[0_16px_40px_rgba(15,23,42,0.05)]
          transition-all duration-300
          dark:border-white/10 dark:bg-slate-900/80
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
          ${
            isHovered
              ? 'border-sky-200 shadow-[0_20px_50px_rgba(14,165,233,0.10)] dark:border-sky-400/30 dark:bg-slate-900'
              : 'border-stone-200'
          }
        `}
      >
        <div className="pointer-events-none absolute right-6 top-4 text-6xl font-black tracking-tighter text-stone-100 dark:text-white/10">
          {String(clause.num).padStart(2, '0')}
        </div>

        <div className="relative z-10 flex items-start gap-4">
          <div className="w-[76px] shrink-0">
            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              ARTICLE {clause.num}
            </p>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ring-1 ${style.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${style.dot}`} />
              {riskLabels[clause.risk]}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="mb-2 text-base font-black text-stone-900 dark:text-slate-50">
              {clause.title}
            </h4>

            <p
              className={`whitespace-pre-wrap text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400 ${
                !isExpanded ? 'line-clamp-2' : ''
              }`}
            >
              {clause.text}
            </p>
          </div>

          <ChevronDown
            size={20}
            className={`mt-1 shrink-0 text-stone-300 transition-transform duration-300 dark:text-slate-500 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        {isExpanded && (
          <div className="relative z-10 mt-6 border-t border-stone-200 pt-6 dark:border-white/10">
            <div className="mb-4 rounded-[22px] border border-sky-100 bg-sky-50/60 p-4 dark:border-sky-400/20 dark:bg-sky-500/10">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-sky-600 dark:text-sky-400" />
                <span className="text-xs font-black text-sky-600 dark:text-sky-400">
                  AI 분석 요약
                </span>
              </div>

              <p className="text-sm font-bold leading-relaxed text-stone-600 dark:text-slate-300">
                {clause.aiSummary || 'AI 요약 정보가 없습니다.'}
              </p>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <Scale size={16} className="text-sky-600 dark:text-sky-400" />
              <span className="text-xs font-black text-stone-500 dark:text-slate-400">
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
              <p className="text-xs font-bold text-stone-400 dark:text-slate-500">
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