import type { AnalysisCase } from '../../types'

interface CaseCardProps {
  caseData: AnalysisCase
  isDark?: boolean 
  isSidePanel?: boolean 
  onViewOriginal?: () => void
}

function CaseCard({ caseData, isDark = false, isSidePanel = false, onViewOriginal }: CaseCardProps) {
  // 정규식으로 사건번호와 사건명 추출
  const caseNoMatch = caseData.result.match(/사건번호\s*:\s*([^\s]+)/)
  const caseNameMatch = caseData.result.match(/사건명\s*:\s*([^피심인\n]+)/)

  const caseNo = caseNoMatch ? caseNoMatch[1] : '판례 정보'
  const caseName = caseNameMatch ? caseNameMatch[1].trim() : caseData.title

  return (
    <div
      className="p-3.5 rounded-xl transition-all duration-300 flex flex-col gap-1.5 text-left"
      style={{
        background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'}`,
      }}
    >
      {/* 상단부: 사건번호 배지 + 일치율 퍼센트 */}
      <div className="flex items-center justify-between">
        <span 
          className={`px-2 py-0.5 rounded-md text-[0.65rem] font-bold transition-colors duration-300 ${
            isDark ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/60'
          }`}
        >
          {caseNo}
        </span>
        <span 
          className={`text-[0.65rem] font-semibold transition-colors duration-300 ${
            isDark ? 'text-white/40' : 'text-black/40'
          }`}
        >
          {caseData.relevance}% {isSidePanel ? '' : '일치'}
        </span>
      </div>

      {/* 사건명 타이틀 */}
      <h5 
        className={`text-xs font-bold transition-colors duration-300 leading-snug ${
          isSidePanel ? 'text-white/85 line-clamp-2' : '' // 💡 사이드 패널일 땐 좁으니까 두 줄까지만 나오게 제한!
        }`}
        style={isSidePanel ? {} : { color: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.75)' }}
      >
        {caseName}
      </h5>

      {/* 사이드 패널이 아닐 때만 원문 전체를 노출 */}
      {!isSidePanel && (
        <p
          className="text-xs leading-relaxed mt-1 transition-colors duration-300 font-medium whitespace-pre-wrap"
          style={{ 
            color: isDark ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.6)' 
          }}
        >
          {caseData.result}
        </p>
      )}
    </div>
  )
}

export default CaseCard