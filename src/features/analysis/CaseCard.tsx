import { Scale, ExternalLink } from 'lucide-react'
import type { AnalysisCase } from '../../types'

interface CaseCardProps {
  caseData: AnalysisCase
  isDark?: boolean
  isSidePanel?: boolean
  onViewOriginal?: () => void
}

function CaseCard({
  caseData,
  isSidePanel = false,
  onViewOriginal,
}: CaseCardProps) {
  const caseNoMatch = caseData.result.match(/사건번호\s*:\s*([^\s]+)/)
  const caseNameMatch = caseData.result.match(/사건명\s*:\s*([^피심인\n]+)/)

  const caseNo = caseNoMatch ? caseNoMatch[1] : caseData.title
  const caseName = caseNameMatch ? caseNameMatch[1].trim() : caseData.title

  return (
    <div className="rounded-[20px] border border-stone-200 bg-white p-4 text-left shadow-[0_10px_28px_rgba(15,23,42,0.04)] transition hover:border-sky-100 hover:shadow-[0_14px_32px_rgba(14,165,233,0.08)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50">
            <Scale size={16} className="text-sky-600" />
          </div>

          <span className="truncate rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black text-stone-500">
            {caseNo}
          </span>
        </div>

        <span className="shrink-0 text-[10px] font-black text-sky-600">
          {caseData.relevance}% {isSidePanel ? '' : '일치'}
        </span>
      </div>

      <h5
        className={`text-sm font-black leading-snug text-stone-900 ${
          isSidePanel ? 'line-clamp-2' : ''
        }`}
      >
        {caseName}
      </h5>

      {!isSidePanel && (
        <p className="mt-2 whitespace-pre-wrap text-xs font-bold leading-relaxed text-stone-500">
          {caseData.result}
        </p>
      )}

      {onViewOriginal && (
        <button
          onClick={onViewOriginal}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-[10px] font-black text-stone-500 transition hover:bg-sky-50 hover:text-sky-600"
        >
          원문 보기
          <ExternalLink size={12} />
        </button>
      )}
    </div>
  )
}

export default CaseCard