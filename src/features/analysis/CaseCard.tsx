import type { AnalysisCase } from '../../types'

interface CaseCardProps {
  caseData: AnalysisCase
  isDark?: boolean 
  onViewOriginal?: () => void
}

function CaseCard({ caseData, isDark = false, onViewOriginal }: CaseCardProps) {
  // 사건번호와 사건명 추출 (판례 데이터에서)
  const caseNoMatch = caseData.result.match(/사건번호\s*:\s*([^\s]+)/)
  const caseNameMatch = caseData.result.match(/사건명\s*:\s*([^피심인\n]+)/)

  const caseNo = caseNoMatch ? caseNoMatch[1] : '판례 정보'
  const caseName = caseNameMatch ? caseNameMatch[1].trim() : caseData.title

  return (
    <div
      className="p-3 rounded-xl transition-all duration-300"
      style={{
        background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'}`,
      }}
    >
      {/* 우측 요약 패널 */}
      {isDark ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            {/* 추출한 사건번호 배지 */}
            <span className="px-2 py-0.5 rounded-md text-[0.65rem] font-bold bg-white/10 text-white/80">
              {caseNo}
            </span>
            {/* 관련도 퍼센트 숫자 */}
            <span className="text-[0.65rem] font-semibold text-white/40">
              {caseData.relevance}% 일치
            </span>
          </div>
          
          <h5 className="text-xs font-semibold text-white/85 truncate">
            {caseName}
          </h5>
        </div>
      ) : (
        <>
          {/* 상단: 판례 제목 + 관련도 % */}
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-xs font-semibold transition-colors duration-300"
              style={{ 
                color: 'rgba(0, 0, 0, 0.75)' 
              }}
            >
              {caseData.title}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300"
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                color: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              {caseData.relevance}%
            </span>
          </div>

          {/* 판결 내용 (사건번호, 내용 등 전체 다 노출) */}
          <p
            className="text-xs leading-relaxed mb-1 transition-colors duration-300"
            style={{ 
              color: 'rgba(0, 0, 0, 0.6)' 
            }}
          >
            {caseData.result}
          </p>
        </>
      )}
    </div>
  )
}

export default CaseCard