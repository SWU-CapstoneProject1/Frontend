import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle, Loader2, FileSearch } from 'lucide-react'

import type { AnalysisClause, AnalysisReport } from '../../types'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import AnalysisHeader from '../../features/analysis/AnalysisHeader'
import ClauseList from '../../features/analysis/ClauseList'
import AiSidePanel from '../../features/analysis/AiSidePanel'

import { getAnalysisReport, bookmarkAnalysis } from '../../api/analyses'
import { ApiError } from '../../api/client'

const POLL_INTERVAL_MS = 3000

function AnalysisPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [hoveredClauseId, setHoveredClauseId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(null)

  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleBookmark = async () => {
    if (!id) return

    try {
      await bookmarkAnalysis(id, 'testkey')
      alert('보관함에 저장되었습니다!')
    } catch (e) {
      console.error(e)
      alert('보관함 저장에 실패했습니다.')
    }
  }

  const handleHoverClause = (clauseId: string | null) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }

    if (clauseId) {
      setHoveredClauseId(clauseId)
      return
    }

    leaveTimerRef.current = setTimeout(() => {
      setHoveredClauseId(null)
    }, 100)
  }

  const handleViewOriginal = (clauseId: string) => {
    setExpandedClauseId(clauseId)

    setTimeout(() => {
      const element = document.getElementById(`clause-card-${clauseId}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

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
        const message =
          e instanceof ApiError
            ? e.message
            : '분석 결과를 불러오지 못했습니다.'

        setError(message)
        setIsLoading(false)
        clearInterval(intervalId)
      }
    }

    fetchReport()
    intervalId = setInterval(fetchReport, POLL_INTERVAL_MS)

    return () => {
      clearInterval(intervalId)
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [id, navigate])

  const hoveredClause: AnalysisClause | null =
    report?.clauses.find((c) => c.id === hoveredClauseId) ?? null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] text-stone-900 font-['Pretendard']">
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 pt-24">
          <div className="w-full max-w-md rounded-[30px] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
              <Loader2 size={26} className="animate-spin text-sky-600" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">
              LOADING REPORT
            </span>

            <h2 className="mt-3 text-2xl font-black text-stone-900">
              분석 결과를 불러오는 중입니다
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-stone-500">
              잠시만 기다려주세요. 약관 분석 리포트를 준비하고 있습니다.
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] text-stone-900 font-['Pretendard']">
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 pt-24">
          <div className="w-full max-w-md rounded-[30px] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <AlertCircle size={26} className="text-red-600" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
              ERROR
            </span>

            <h2 className="mt-3 text-2xl font-black text-stone-900">
              리포트를 불러오지 못했습니다
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-stone-500">
              {error}
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 rounded-[20px] bg-stone-950 px-6 py-3 text-sm font-black text-white transition hover:bg-stone-800"
            >
              홈으로 돌아가기
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] text-stone-900 font-['Pretendard']">
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 pt-24">
          <div className="w-full max-w-md rounded-[30px] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <FileSearch size={26} className="text-stone-500" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              NOT FOUND
            </span>

            <h2 className="mt-3 text-2xl font-black text-stone-900">
              분석 결과를 찾을 수 없습니다
            </h2>

            <p className="mt-3 text-sm font-bold leading-relaxed text-stone-500">
              요청한 리포트가 없거나 아직 생성되지 않았습니다.
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 rounded-[20px] bg-stone-950 px-6 py-3 text-sm font-black text-white transition hover:bg-stone-800"
            >
              홈으로 돌아가기
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8] text-stone-900 font-['Pretendard']">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pt-24 pb-24">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">
              REPORT DETAIL
            </span>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-900">
              약관 분석 결과
            </h1>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-black text-stone-500 shadow-[0_10px_25px_rgba(15,23,42,0.04)] transition hover:bg-stone-950 hover:text-white"
          >
            <ArrowLeft size={16} />
            홈으로
          </button>
        </div>

        <AnalysisHeader report={report} onBookmark={handleBookmark} />

        <div className="flex gap-6">
          <ClauseList
            clauses={report.clauses}
            onHoverClause={handleHoverClause}
            expandedId={expandedClauseId}
            onToggleExpand={setExpandedClauseId}
          />

          <AiSidePanel
            report={report}
            hoveredClause={hoveredClause}
            onHoverPanel={handleHoverClause}
            onViewOriginal={handleViewOriginal}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AnalysisPage