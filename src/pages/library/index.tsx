import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import LibraryHeader from '../../features/library/LibraryHeader'
import LibraryToolbar from '../../features/library/LibraryToolbar'
import ReportCard, { type ReportData } from '../../features/library/ReportCard'

import { getHistory } from '../../api/library'
import { apiGet } from '../../api/client'
import {
  getBookmarkedJobIds,
  removeBookmarkedJobId,
} from '../../utils/bookmarkStorage'

type FilterType = '전체' | '위험' | '주의' | '정상'

interface StatsResponse {
  total_analyses: number
  total_danger: number
  total_services: number
}

function getStatusFromScore(score: number): '위험' | '주의' | '정상' {
  if (score >= 60) return '위험'
  if (score >= 30) return '주의'
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
          apiGet<StatsResponse>('/api/stats'),
        ])

        setStats(statsData)

        const bookmarkedIds = getBookmarkedJobIds()

        const bookmarkedHistory = historyData.filter((item) =>
          bookmarkedIds.includes(item.job_id)
        )

        const resultDetails = await Promise.all(
          bookmarkedHistory.map((item) =>
            apiGet<any>(`/api/result/${item.job_id}`)
          )
        )

        setReports(
          resultDetails.map((item) => ({
            id: item.job_id,
            title: item.service_name,
            date: item.created_at?.slice(0, 10).replaceAll('-', '.') ?? '',
            score: item.risk_score,
            clauseCount: item.clauses?.length ?? 0,
            status: getStatusFromScore(item.risk_score),
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
    removeBookmarkedJobId(id)
    setReports((prev) => prev.filter((report) => report.id !== id))
  }

  const filteredReports = reports.filter((report) => {
    const matchesFilter = activeFilter === '전체' || report.status === activeFilter
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] font-['Pretendard']">
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 pt-24">
          <div className="rounded-[30px] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
            <Loader2 size={28} className="mx-auto mb-4 animate-spin text-sky-600" />
            <p className="text-sm font-bold text-stone-500">
              보관함을 불러오는 중입니다...
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] font-['Pretendard']">
        <Header />

        <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 pt-24">
          <div className="rounded-[30px] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.07)]">
            <AlertCircle size={28} className="mx-auto mb-4 text-red-500" />
            <p className="text-sm font-bold text-red-500">{error}</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8] font-['Pretendard'] text-stone-900">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <LibraryHeader statsData={stats} />

        <LibraryToolbar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          counts={filterCounts}
        />

        <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
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