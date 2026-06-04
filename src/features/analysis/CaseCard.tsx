import type { AnalysisCase } from '../../types'

interface CaseCardProps {
  caseData: AnalysisCase
  isDark?: boolean 
  onViewOriginal?: () => void
}

function CaseCard({ caseData, isDark = false, onViewOriginal }: CaseCardProps) {
  return (
    <div
      className="p-3 rounded-xl transition-all duration-300"
      style={{
        // 💡 [배경/테두리] 호버 안 했을 땐 밝게, 호버했을 땐 어두운 카드에 맞게 반투명하게!
        background: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'}`,
      }}
    >
      {/* 상단: 판례 제목 + 관련도 % */}
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-xs font-semibold transition-colors duration-300"
          style={{ 
            // 💡 [판례 번호/제목] 평소엔 선명한 다크회색(0.75), 호버 시엔 밝은 회백색(0.85)
            color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)' 
          }}
        >
          {caseData.title}
        </span>
        <span
          className="px-2 py-0.5 rounded-full text-xs font-semibold transition-colors duration-300"
          style={{
            background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
            // 💡 [퍼센트 글자색]
            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
          }}
        >
          {caseData.relevance}%
        </span>
      </div>

      {/* 판결 내용 (사건번호, 내용 등) */}
      <p
        className="text-xs leading-relaxed mb-1 transition-colors duration-300"
        style={{ 
          // 💡 [핵심 본문 텍스트] 평소엔 가독성 높은 먹색(0.6), 호버 시엔 눈 안 아픈 그레이화이트(0.6)
          color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' 
        }}
      >
        {caseData.result}
      </p>

      
    </div>
  )
}

export default CaseCard