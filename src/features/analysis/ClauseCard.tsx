// src/features/analysis/ClauseCard.tsx
import { useState } from 'react'
import type { AnalysisClause } from '../../types'
import Badge from '../../components/ui/Badge'
import CaseCard from './CaseCard'

interface ClauseCardProps {
  clause: AnalysisClause
  onHover: (id: string | null) => void  // 호버 시 부모에게 알림 (우측 패널 연동)
}

// 위험도별 한글 라벨
const riskLabels = {
  safe: '안전',
  warning: '주의',
  danger: '위험',
}

function ClauseCard({ clause, onHover }: ClauseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
    >
      {/* 배경 조항 번호 (장식용) */}
      <div
        className="absolute -left-2 -top-4 pointer-events-none select-none z-0 text-[5rem] font-black leading-none tracking-tighter transition-all duration-300"
        style={{
          opacity: isHovered ? 0.06 : 0.02,
          color: isHovered ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {String(clause.num).padStart(2, '0')}
      </div>

      {/* 카드 본체 */}
      <div
        className="relative z-10 p-6 rounded-3xl cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          background: isHovered ? 'rgba(20,20,22,0.65)' : 'rgba(255,255,255,0.22)',
          border: `1px solid ${isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.45)'}`,
          backdropFilter: 'blur(40px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 8px 32px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">

          {/* 좌측: 조항 번호 + 위험도 뱃지 */}
          <div className="shrink-0 pt-0.5">
            <p
              className="text-[0.55rem] font-semibold tracking-widest uppercase mb-1.5"
              style={{ color: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.18)' }}
            >
              ARTICLE {clause.num}
            </p>
            <Badge level={clause.risk} showDot>
              {riskLabels[clause.risk]}
            </Badge>
          </div>

          {/* 중앙: 제목 + 본문 */}
          <div className="flex-1 min-w-0">
            <h4
              className="text-base font-bold mb-1.5 transition-colors duration-300"
              style={{ color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.75)' }}
            >
              {clause.title}
            </h4>
            <p
              className="text-sm leading-relaxed transition-colors duration-300"
              style={{ color: isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}
            >
              {clause.text}
            </p>
          </div>

          {/* 우측: 펼치기 아이콘 */}
          <span
            className="shrink-0 mt-1 text-sm transition-all duration-300"
            style={{
              color: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}
          >
            ▾
          </span>
        </div>

        {/* 펼쳐지는 AI 분석 + 판례 영역 */}
        {isExpanded && (
          <div
            className="mt-5 pt-5"
            style={{ borderTop: `1px solid ${isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}` }}
          >
            {/* AI 분석 */}
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)' }}>✦</span>
              <span
                className="text-xs font-semibold"
                style={{ color: isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }}
              >
                AI 분석
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
            >
              {clause.aiSummary}
            </p>

            {/* 관련 판례 */}
            {clause.cases.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span style={{ color: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' }}>⚖</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }}
                  >
                    관련 판례
                  </span>
                </div>
                <div className="space-y-2">
                  {clause.cases.map((c) => (
                    <CaseCard key={c.title} caseData={c} isDark={isHovered} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClauseCard