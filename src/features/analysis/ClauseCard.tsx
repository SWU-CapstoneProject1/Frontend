import { useState } from 'react'
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

function ClauseCard({ clause, onHover, expandedId, onToggleExpand }: ClauseCardProps) {
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
      {/* 배경 장식 번호 */}
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
        onClick={() => onToggleExpand(isExpanded ? null : clause.id)}
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

          {/* 중앙: 제목 + 원문 텍스트 */}
          <div className="flex-1 min-w-0">
          
            <h4
              className="text-base font-bold mb-1.5 transition-colors duration-300"
              style={{ color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.75)' }}
            >
              {clause.title}
            </h4>
            
            <p
              className={`text-sm leading-relaxed transition-colors duration-300 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''}`}
              style={{ color: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)' }}
            >
              {clause.text}
            </p>
          </div>

          {/* 우측: 화살표 아이콘 */}
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

        {/* 펼쳐지는 영역 */}
        {isExpanded && (
          <div
            className="mt-5 pt-5"
            style={{ borderTop: `1px solid ${isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}` }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <span style={{ color: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}>⚖</span>
              <span
                className="text-xs font-bold"
                style={{ color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)' }}
              >
                이 조항의 위반 관련 판례 사례
              </span>
            </div>
            
            {clause.cases && clause.cases.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {clause.cases.map((c) => (
                  <CaseCard 
                    key={c.title} 
                    caseData={c} 
                    isDark={isHovered} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-ink-soft">연관된 판례 내역이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClauseCard