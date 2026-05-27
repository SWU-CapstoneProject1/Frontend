import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import LibraryHeader from '../../features/library/LibraryHeader'
import LibraryToolbar from '../../features/library/LibraryToolbar'
import ReportCard, { type ReportData } from '../../features/library/ReportCard'
import CompareTable from '../../features/library/CompareTable'

import { getHistory, deleteHistory } from '../../api/library'

type FilterType = '전체' | '위험' | '주의' | '정상'

// API risk_level → 한글 변환
function mapRiskLevel(risk_level: string): '위험' | '주의' | '정상' {
  if (risk_level === 'danger') return '위험'
  if (risk_level === 'caution') return '주의'
  return '정상'
}

// TODO: 백엔드 세션 연결 시 실제 session_key로 교체
const SESSION_KEY = 'test-session'

function LibraryPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체')
  const [searchTerm, setSearchTerm] = useState('')
  const [reports, setReports] = useState<ReportData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 보관함 목록 불러오기
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory(SESSION_KEY)
        setReports(
          data.map((item) => ({
            id: item.job_id,
            title: item.service_name,
            date: item.created_at?.slice(0, 10).replaceAll('-', '.') ?? '',
            score: item.risk_score,
            clauseCount: 0,  // API 미제공 → 추후 백엔드 추가 시 교체
            status: mapRiskLevel(item.risk_level),
          }))
        )
      } catch (e) {
        setError('보관함을 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const filterCounts = {
    전체: reports.length,
    위험: reports.filter((r) => r.status === '위험').length,
    주의: reports.filter((r) => r.status === '주의').length,
    정상: reports.filter((r) => r.status === '정상').length,
  }

  // 보관함 항목 삭제
  const handleDeleteReport = async (id: string) => {
    try {
      await deleteHistory(id)
      setReports(reports.filter((report) => report.id !== id))
    } catch (e) {
      alert('삭제에 실패했습니다.')
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesFilter = activeFilter === '전체' || report.status === activeFilter
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-ink-soft text-sm">불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Header />

      <main className="max-w-6xl mx-auto px-6 space-y-8 pb-20">

        <LibraryHeader
          totalCount={filterCounts.전체}
          dangerCount={filterCounts.위험}
          safeCount={filterCounts.정상}
        />

        <LibraryToolbar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          counts={filterCounts}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => navigate(`/analysis/${report.id}`)}
              className="cursor-pointer"
            >
              <ReportCard data={report} onDelete={handleDeleteReport} />
            </div>
          ))}
          <div onClick={() => navigate('/')} className="cursor-pointer">
            <ReportCard isAddCard />
          </div>
        </div>

        <CompareTable />

      </main>

      <Footer />
    </div>
  )
}

export default LibraryPage