import type { AnalysisClause, AnalysisReport } from '../../types'
import CaseCard from './CaseCard'

// 위험도별 색상
const riskColors = {
  safe: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
}

const riskLabels = {
  safe: '안전',
  warning: '주의',
  danger: '위험',
}

interface AiSidePanelProps {
  report: AnalysisReport
  hoveredClause: AnalysisClause | null  // 현재 호버된 조항 (null이면 기본 요약 표시)
}

function AiSidePanel({ report, hoveredClause }: AiSidePanelProps) {
  return (
    <div className="w-[300px] shrink-0">
      <div className="sticky top-24">

        {/* 호버된 조항 있을 때: 해당 조항 상세 */}
        {hoveredClause ? (
          <div
            className="p-6 rounded-3xl"
            style={{
              background: 'rgba(18,18,24,0.52)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(40px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
            }}
          >
            {/* 조항 번호 + 제목 */}
            <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              SELECTED ARTICLE
            </p>
            <p className="text-5xl font-black tracking-tighter mb-2"
              style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1 }}>
              {String(hoveredClause.num).padStart(2, '0')}
            </p>
            <h4 className="text-lg font-bold mb-1"
              style={{ color: 'rgba(255,255,255,0.8)' }}>
              {hoveredClause.title}
            </h4>

            {/* 위험도 */}
            <div className="flex items-center gap-1.5 mb-5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: riskColors[hoveredClause.risk] }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: riskColors[hoveredClause.risk] }}
              >
                {riskLabels[hoveredClause.risk]}
              </span>
            </div>

            {/* AI 분석 박스 */}
            <div
              className="p-4 rounded-2xl mb-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>✦</span>
                <span className="text-xs font-semibold"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  AI 분석
                </span>
              </div>
              <p className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
                {hoveredClause.aiSummary}
              </p>
            </div>

            {/* 관련 판례 */}
            {hoveredClause.cases.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>⚖</span>
                  <span className="text-xs font-semibold"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>
                    관련 판례
                  </span>
                </div>
                <div className="space-y-2">
                  {hoveredClause.cases.map((c) => (
                    <CaseCard key={c.title} caseData={c} isDark />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 호버 없을 때: 핵심 위험 요약 */
          <div
            className="p-6 rounded-3xl"
            style={{
              background: 'rgba(255,255,255,0.22)',
              border: '1px solid rgba(255,255,255,0.45)',
              backdropFilter: 'blur(40px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">⚠️</span>
              <h4 className="text-sm font-bold text-ink">핵심 위험 요약</h4>
            </div>

            {/* 위험 조항만 필터링해서 표시 */}
            <div className="space-y-3">
              {report.clauses
                .filter((c) => c.risk === 'danger')
                .map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5">
                    <span className="text-danger text-xs mt-0.5">●</span>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {c.title}
                    </p>
                  </div>
                ))}
            </div>

            {/* 안내 문구 */}
            <div
              className="mt-5 pt-4"
              style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}
            >
              <p className="text-xs leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.2)' }}>
                조항에 마우스를 올리면<br />
                AI 요약과 관련 판례가 표시됩니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AiSidePanel