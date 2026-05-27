import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import type { AnalysisClause, AnalysisReport } from '../../types'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import AnalysisHeader from '../../features/analysis/AnalysisHeader'
import ClauseList from '../../features/analysis/ClauseList'
import AiSidePanel from '../../features/analysis/AiSidePanel'

import { getAnalysisReport } from '../../api/analyses'
import { ApiError } from '../../api/client'

const POLL_INTERVAL_MS = 3000

function AnalysisPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [hoveredClauseId, setHoveredClauseId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }

    setIsLoading(true)
    setError(null)

    let intervalId: ReturnType<typeof setInterval>

    const fetchReport = async () => {
      try {
        const data = await getAnalysisReport(id)
        if (data) {
          setReport(data)
          setIsLoading(false)
          clearInterval(intervalId)
        }
      } catch (e) {
        const message = e instanceof ApiError ? e.message : '분석 결과를 불러오지 못했습니다.'
        setError(message)
        setIsLoading(false)
        clearInterval(intervalId)
      }
    }

    fetchReport()
    intervalId = setInterval(fetchReport, POLL_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [id, navigate])

  const hoveredClause: AnalysisClause | null =
    report?.clauses.find((c) => c.id === hoveredClauseId) ?? null

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-ink-soft text-sm">분석 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={() => navigate('/')} className="text-xs text-ink hover:underline">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-ink-soft text-sm">분석 결과를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/')} className="text-xs text-ink hover:underline">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
            style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            ←
          </button>
          <span className="text-xs text-ink-soft">약관 분석 결과</span>
        </div>
        <AnalysisHeader report={report} />
        <div className="flex gap-6">
          <ClauseList clauses={report.clauses} onHoverClause={setHoveredClauseId} />
          <AiSidePanel report={report} hoveredClause={hoveredClause} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AnalysisPage