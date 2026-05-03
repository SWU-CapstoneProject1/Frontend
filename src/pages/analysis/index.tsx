import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { AnalysisClause, AnalysisReport } from '../../types'
import { getAnalysisReport } from '../../api/analyses'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import AnalysisHeader from '../../features/analysis/AnalysisHeader'
import ClauseList from '../../features/analysis/ClauseList'
import AiSidePanel from '../../features/analysis/AiSidePanel'

function AnalysisPage() {
  const { id } = useParams<{ id: string }>()        // URL에서 서비스 id 가져오기
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('analysis')
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [hoveredClauseId, setHoveredClauseId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 분석 리포트 불러오기
  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    getAnalysisReport(id).then((data) => {
      setReport(data)
      setIsLoading(false)
    })
  }, [id])

  // 현재 호버된 조항 데이터
  const hoveredClause: AnalysisClause | null =
    report?.clauses.find((c) => c.id === hoveredClauseId) ?? null

  // 로딩 중
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header activeNav={activeNav} onNavChange={setActiveNav} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-ink-soft text-sm">분석 중...</p>
        </div>
      </div>
    )
  }

  // 데이터 없을 때
  if (!report) {
    return (
      <div className="min-h-screen">
        <Header activeNav={activeNav} onNavChange={setActiveNav} />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-ink-soft text-sm">분석 결과를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/')}
            className="text-xs text-ink hover:underline"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header activeNav={activeNav} onNavChange={setActiveNav} />

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">

        {/* 뒤로가기 */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
            style={{
              background: 'rgba(0,0,0,0.02)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            ←
          </button>
          <span className="text-xs text-ink-soft">약관 분석 결과</span>
        </div>

        {/* 서비스 정보 + 통계 헤더 */}
        <AnalysisHeader report={report} />

        {/* 조항 목록 + AI 사이드 패널 */}
        <div className="flex gap-6">
          {/* 좌측: 조항 목록 */}
          <ClauseList
            clauses={report.clauses}
            onHoverClause={setHoveredClauseId}
          />

          {/* 우측: AI 패널 */}
          <AiSidePanel
            report={report}
            hoveredClause={hoveredClause}
          />
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default AnalysisPage