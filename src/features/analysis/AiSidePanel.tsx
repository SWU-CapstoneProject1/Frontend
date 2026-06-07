import { AlertTriangle, FileText, Scale, Sparkles } from 'lucide-react'
import type { AnalysisClause, AnalysisReport } from '../../types'
import CaseCard from './CaseCard'

const riskColors = {
  safe: '#16a34a',
  warning: '#d97706',
  danger: '#dc2626',
}

const riskLabels = {
  safe: '안전',
  warning: '주의',
  danger: '위험',
}

interface AiSidePanelProps {
  report: AnalysisReport
  hoveredClause: AnalysisClause | null
  onHoverPanel: (id: string | null) => void
  onViewOriginal: (id: string) => void
}

function AiSidePanel({
  report,
  hoveredClause,
  onHoverPanel,
  onViewOriginal,
}: AiSidePanelProps) {
  const riskyClauses = report.clauses.filter(
    (c) => c.risk === 'danger' || c.risk === 'warning'
  )

  return (
    <div className="w-[300px] shrink-0">
      <div className="sticky top-24">
        {hoveredClause ? (
          <div
            className="rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.07)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
            onMouseEnter={() => onHoverPanel(hoveredClause.id)}
            onMouseLeave={() => onHoverPanel(null)}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              SELECTED ARTICLE
            </p>

            <p className="mt-3 text-5xl font-black tracking-tighter text-stone-100 dark:text-white/10">
              {String(hoveredClause.num).padStart(2, '0')}
            </p>

            <h4 className="mt-1 text-xl font-black text-stone-900 dark:text-slate-50">
              {hoveredClause.title}
            </h4>

            <div className="mt-3 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: riskColors[hoveredClause.risk] }}
              />
              <span
                className="text-xs font-black"
                style={{ color: riskColors[hoveredClause.risk] }}
              >
                {riskLabels[hoveredClause.risk]}
              </span>
            </div>

            <div className="mt-5 rounded-[24px] border border-sky-100 bg-sky-50/70 p-4 transition-colors duration-300 dark:border-sky-400/20 dark:bg-sky-500/10">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-sky-600 dark:text-sky-400" />
                <span className="text-xs font-black text-sky-600 dark:text-sky-400">
                  AI 분석
                </span>
              </div>

              <p className="text-sm font-bold leading-relaxed text-stone-600 dark:text-slate-300">
                {hoveredClause.aiSummary || 'AI 요약 정보가 없습니다.'}
              </p>
            </div>

            {hoveredClause.cases.length > 0 && (
              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2">
                  <Scale size={16} className="text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-black text-stone-500 dark:text-slate-400">
                    관련 판례
                  </span>
                </div>

                <div className="space-y-3">
                  {hoveredClause.cases.map((c) => (
                    <CaseCard
                      key={c.title}
                      caseData={c}
                      onViewOriginal={() => onViewOriginal(hoveredClause.id)}
                      isSidePanel
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
                <AlertTriangle size={19} className="text-red-600 dark:text-red-400" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                  RISK SUMMARY
                </span>
                <h4 className="mt-1 text-sm font-black text-stone-900 dark:text-slate-50">
                  핵심 위험 및 주의 요약
                </h4>
              </div>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
              {riskyClauses.length > 0 ? (
                riskyClauses.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-[18px] border border-stone-200 bg-[#FAFAFA] p-3 transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: riskColors[c.risk] }}
                      />

                      <span
                        className="text-[10px] font-black"
                        style={{ color: riskColors[c.risk] }}
                      >
                        {riskLabels[c.risk]}
                      </span>
                    </div>

                    <p className="text-xs font-bold leading-relaxed text-stone-600 dark:text-slate-300">
                      {c.title}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[18px] border border-stone-200 bg-[#FAFAFA] p-4 text-center transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
                  <FileText size={20} className="mx-auto mb-2 text-stone-300 dark:text-slate-500" />
                  <p className="text-xs font-bold text-stone-400 dark:text-slate-500">
                    위험 조항이 없습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AiSidePanel