import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
  
  // 마우스 지연 처리를 위한 타이머 ref
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // 어떤 조항 카드가 드롭다운으로 펼쳐져 있는지 관리하는 상태
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(null)

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

  // 마우스 호버 상태를 스마트하게 제어하는 함수
  const handleHoverClause = (clauseId: string | null) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }

    if (clauseId) {
      setHoveredClauseId(clauseId)
    } else {
      leaveTimerRef.current = setTimeout(() => {
        setHoveredClauseId(null)
      }, 100)
    }
  }


  const handleViewOriginal = (clauseId: string) => {
    // 1. 해당 조항 카드를 활성화
    setExpandedClauseId(clauseId)
    
    // 2. 펼쳐진 왼쪽 카드 위치로 부드럽게 화면을 스크롤링 
    setTimeout(() => {
      const element = document.getElementById(`clause-card-${clauseId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
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
        const message = e instanceof ApiError ? e.message : '분석 결과를 불러오지 못했습니다.'
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

  // 1. 로딩 상태 뷰
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

  // 2. 에러 발생 상태 뷰
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

  // 3. 데이터를 찾을 수 없는 상태 뷰
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

  // 4. 정상적인 분석 완료 화면 뷰
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* 생략되었던 상단 뒤로가기 바 복구 */}
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

        <AnalysisHeader report={report} onBookmark={handleBookmark} />

        <div className="flex gap-6">
          {/* 왼쪽 리스트: 펼쳐짐 상태 제어 프롭스 연결 */}
          <ClauseList 
            clauses={report.clauses} 
            onHoverClause={handleHoverClause} 
            expandedId={expandedClauseId}
            onToggleExpand={setExpandedClauseId}
          />
          
          {/* 오른쪽 패널: 원문보기 링크 이벤트 연결 */}
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