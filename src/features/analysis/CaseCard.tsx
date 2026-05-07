import type { AnalysisCase } from '../../types'

interface CaseCardProps {
  caseData: AnalysisCase
  isDark?: boolean  // 조항 카드가 dark 상태일 때 (hover)
}

function CaseCard({ caseData, isDark = false }: CaseCardProps) {
  return (
    <div
      className="p-3 rounded-xl"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.015)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.025)'}`,
      }}
    >
      {/* 상단: 판례 제목 + 관련도 % */}
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-xs font-semibold"
          style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)' }}
        >
          {caseData.title}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
            color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)',
          }}
        >
          {caseData.relevance}%
        </span>
      </div>

      {/* 판결 내용 */}
      <p
        className="text-xs leading-relaxed mb-1"
        style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)' }}
      >
        {caseData.result}
      </p>

      {/* 원문 보기 버튼 */}
      <button
        className="text-xs"
        style={{ color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
      >
        원문 보기 →
      </button>
    </div>
  )
}

export default CaseCard