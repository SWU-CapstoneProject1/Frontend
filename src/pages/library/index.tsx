import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import LibraryHeader from '../../features/library/LibraryHeader'
import LibraryToolbar from '../../features/library/LibraryToolbar'
import ReportCard, { type ReportData } from '../../features/library/ReportCard'

import { getHistory, deleteHistory } from '../../api/library'
import { apiGet } from '../../api/client'

type FilterType = '전체' | '위험' | '주의' | '정상'

interface StatsResponse {
  total_analyses: number
  total_danger: number
  total_services: number
}

function mapRiskLevel(risk_level: string): '위험' | '주의' | '정상' {
  if (risk_level === 'danger') return '위험'
  if (risk_level === 'caution') return '주의'
  return '정상'
}

const SESSION_KEY = 'testkey' 

function LibraryPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체')
  const [searchTerm, setSearchTerm] = useState('')
  const [reports, setReports] = useState<ReportData[]>([])
  const [stats, setStats] = useState<StatsResponse | null>(null) 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLibraryData = async () => {
      try {
        const [historyData, statsData] = await Promise.all([
          getHistory(SESSION_KEY),
          apiGet<StatsResponse>('/api/stats')
        ])

        setStats(statsData)
        setReports(
          historyData.map((item) => ({
            id: item.job_id,
            title: item.service_name,
            date: item.created_at?.slice(0, 10).replaceAll('-', '.') ?? '',
            score: item.risk_score,
            clauseCount: (item as any).clause_count ?? 18,  
            status: mapRiskLevel(item.risk_level),
          }))
        )
      } catch (e) {
        setError('보관함을 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLibraryData()
  }, [])

  const filterCounts = {
    전체: reports.length,
    위험: reports.filter((r) => r.status === '위험').length,
    주의: reports.filter((r) => r.status === '주의').length,
    정상: reports.filter((r) => r.status === '정상').length,
  }

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
    <div className="min-h-screen bg-transparent font-['Pretendard']">
      <Header />

      <main className="max-w-6xl mx-auto px-6 space-y-8 pb-20">
      
        <LibraryHeader statsData={stats} />

        <LibraryToolbar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          counts={filterCounts}
        />

        {/* 보관함 카드 그리드 영역 */}
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

      </main>

      <Footer />
    </div>
  )
}

export default LibraryPage