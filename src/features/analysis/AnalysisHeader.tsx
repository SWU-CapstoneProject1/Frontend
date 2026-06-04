import { useState } from 'react'
import type { AnalysisReport } from '../../types'
import { downloadAnalysisPdf } from '../../api/analyses'

interface AnalysisHeaderProps {
  report: AnalysisReport
  onBookmark: () => Promise<void> 
}

function AnalysisHeader({ report, onBookmark }: AnalysisHeaderProps) {
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false)

  const handleDownloadPdf = async () => {
    setIsPdfLoading(true)
    try {
      await downloadAnalysisPdf(report.id)
    } catch (e) {
      alert('PDF 다운로드에 실패했습니다.')
    } finally {
      setIsPdfLoading(false)
    }
  }

  const handleBookmark = async () => {
    if (isBookmarked) return
    setIsBookmarkLoading(true)
    try {
      await onBookmark()
      setIsBookmarked(true)
    } catch (e) {
      // 에러 처리는 부모 위임
    } finally {
      setIsBookmarkLoading(false)
    }
  }

  // 위험 조항과 주의 조항을 데이터에서 직접 카운트 (통계 보완)
  const dangerCount = report.clauses.filter(c => c.risk === 'danger').length
  const warningCount = report.clauses.filter(c => c.risk === 'warning').length

  return (
    <div
      className="p-8 rounded-3xl mb-10"
      style={{
        background: 'rgba(255,255,255,0.32)',
        border: '1px solid rgba(255,255,255,0.55)',
        backdropFilter: 'blur(40px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.4)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: report.color,
              boxShadow: `0 4px 16px ${report.color}30`,
            }}
          >
            <span className="text-white text-xl font-black">{report.initial}</span>
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-ink mb-1">{report.name}</h2>
            <p className="text-xs text-ink-soft leading-relaxed max-w-md">{report.summary}</p>
          </div>
        </div>

        {/* 우측: 원문, 재분석 버튼 삭제 후 보관함 + PDF 버튼만 남김 */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            disabled={isBookmarkLoading || isBookmarked}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors disabled:opacity-40"
            style={{
              background: isBookmarked ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.06)',
              color: isBookmarked ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)',
            }}
          >
            {isBookmarkLoading ? '저장 중...' : isBookmarked ? '🔖 저장됨' : '🔖 보관함'}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isPdfLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors disabled:opacity-40"
            style={{
              background: 'rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            {isPdfLoading ? '다운로드 중...' : '📄 PDF'}
          </button>
        </div>
      </div>

      {/* 하단: 통계 4개 (위험/주의 분리 표시) */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '위험도', value: `${report.riskScore}점`, color: '#ef4444' },
          { label: '전체 조항', value: `${report.totalClauses}개`, color: 'rgba(0,0,0,0.6)' },
          { 
            label: '위험 / 주의 조항', 
            value: `${dangerCount}개 / ${warningCount}개`, // 💡 위험과 주의 개수를 같이 표기!
            color: dangerCount > 0 ? '#ef4444' : warningCount > 0 ? '#f59e0b' : 'rgba(0,0,0,0.6)' 
          },
          { label: '분석 일시', value: report.lastAnalyzed, color: 'rgba(0,0,0,0.35)' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.55)',
            }}
          >
            <p className="text-[0.65rem] text-ink-soft mb-1">{stat.label}</p>
            <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnalysisHeader