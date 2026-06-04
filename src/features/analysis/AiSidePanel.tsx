import type { AnalysisClause, AnalysisReport } from '../../types'
import CaseCard from './CaseCard'

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
  hoveredClause: AnalysisClause | null 
  onHoverPanel: (id: string | null) => void
  onViewOriginal: (id: string) => void 
}

function AiSidePanel({ report, hoveredClause, onHoverPanel, onViewOriginal }: AiSidePanelProps) {
  return (
    // 💡 Tailwind v4 경고 반영: w-[300px] -> w-75
    <div className="w-75 shrink-0">
      <div className="sticky top-24">
        {hoveredClause ? (
          <div
            className="p-6 rounded-3xl transition-all duration-200"
            style={{
              background: 'rgba(18,18,24,0.52)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(40px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
            }}
            onMouseEnter={() => onHoverPanel(hoveredClause.id)}
            onMouseLeave={() => onHoverPanel(null)}
          >
            {/* 상단 타이틀 영역 */}
            <p className="text-[0.55rem] font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>SELECTED ARTICLE</p>
            <p className="text-5xl font-black tracking-tighter mb-2" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1 }}>{String(hoveredClause.num).padStart(2, '0')}</p>
            <h4 className="text-lg font-bold mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{hoveredClause.title}</h4>

            {/* 위험도 표시 */}
            <div className="flex items-center gap-1.5 mb-5">
              <span className="w-2 h-2 rounded-full" style={{ background: riskColors[hoveredClause.risk] }} />
              <span className="text-xs font-semibold" style={{ color: riskColors[hoveredClause.risk] }}>{riskLabels[hoveredClause.risk]}</span>
            </div>

            {/* AI 분석 요약 박스 */}
            <div className="p-4 rounded-2xl mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                {/* 💡 Tailwind v4 경고 반영: bg-gradient-to-r -> bg-linear-to-r */}
                <span className="text-sm font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">✦</span>
                <span className="text-xs font-semibold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI 분석</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{hoveredClause.aiSummary}</p>
            </div>

            {/* 관련 판례 목록 */}
            {hoveredClause.cases.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>⚖</span>
                  <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>관련 판례</span>
                </div>
                <div className="space-y-2">
                  {hoveredClause.cases.map((c) => (
                    <CaseCard 
                      key={c.title} 
                      caseData={c} 
                      // 💡 여기를 true로 수정! 오른쪽 패널은 무조건 어두우니까 텍스트도 화이트 톤으로 고정이야!
                      isDark={true} 
                      onViewOriginal={() => onViewOriginal(hoveredClause.id)} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 기본 핵심 위험 요약 */
          <div className="p-6 rounded-3xl" style={{ background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.45)', backdropFilter: 'blur(40px) saturate(1.4)', WebkitBackdropFilter: 'blur(40px) saturate(1.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}>
            <div className="flex items-center gap-2 mb-4"><span className="text-sm">⚠️</span><h4 className="text-sm font-bold text-ink">핵심 위험 및 주의 요약</h4></div>
            {/* 💡 Tailwind v4 경고 반영: max-h-[320px] -> max-h-80 */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {report.clauses.filter((c) => c.risk === 'danger' || c.risk === 'warning').map((c) => (
                <div key={c.id} className="flex items-start gap-2.5">
                  <span className="text-xs mt-0.5 shrink-0" style={{ color: riskColors[c.risk] }}>●</span>
                  <p className="text-xs text-ink-soft leading-relaxed"><span className="font-semibold" style={{ color: riskColors[c.risk] }}>[{riskLabels[c.risk]}]</span> {c.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AiSidePanel