import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import LibraryHeader from '../../features/library/LibraryHeader'
import LibraryToolbar from '../../features/library/LibraryToolbar'
import ReportCard, { type ReportData } from '../../features/library/ReportCard'
import CompareTable from '../../features/library/CompareTable'

type FilterType = '전체' | '위험' | '주의' | '정상'

function LibraryPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체')
  const [searchTerm, setSearchTerm] = useState('')

  
  const [reports, setReports] = useState<ReportData[]>([
    { id: '1', title: '쿠팡 플레이', date: '2025.04.01', score: 82, clauseCount: 14, status: '위험' },
    { id: '2', title: '카카오페이', date: '2025.03.08', score: 76, clauseCount: 11, status: '위험' },
    { id: '3', title: '넷플릭스', date: '2025.03.22', score: 54, clauseCount: 9, status: '주의' },
    { id: '4', title: '왓챠', date: '2025.02.28', score: 48, clauseCount: 7, status: '주의' },
    { id: '5', title: '토스', date: '2025.03.15', score: 21, clauseCount: 5, status: '정상' },
    { id: '6', title: '스포티파이', date: '2025.02.20', score: 68, clauseCount: 12, status: '위험' },
    { id: '7', title: '배달의민족', date: '2025.01.10', score: 52, clauseCount: 8, status: '주의' },
    { id: '8', title: '카카오톡', date: '2025.01.05', score: 45, clauseCount: 6, status: '주의' },
  ])

  // 필터 배지 카운트 실시간 계산용 스펙 객체
  const filterCounts = {
    전체: reports.length,
    위험: reports.filter((r) => r.status === '위험').length,
    주의: reports.filter((r) => r.status === '주의').length,
    정상: reports.filter((r) => r.status === '정상').length,
  }

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((report) => report.id !== id))
  }

  const filteredReports = reports.filter((report) => {
    const matchesFilter = activeFilter === '전체' || report.status === activeFilter
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-transparent">
      <Header />

      <main className="max-w-6xl mx-auto px-6 space-y-8 pb-20">
        
        {/* 1. 상단 장식 워터마크 + 대시보드 스펙 전광판 */}
        <LibraryHeader 
          totalCount={filterCounts.전체} 
          dangerCount={filterCounts.위험} 
          safeCount={filterCounts.정상} 
        />

        {/* 2. 인라인 정렬 필터 알약 + 검색 엔진 툴바 */}
        <LibraryToolbar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          counts={filterCounts}
        />

        {/* 3. 대시보드 피드용 카드 그리드 리스트 */}
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

        {/* 4. 하단 딥 다크 슬레이트 전용 동종 비교 대시보드 */}
        <CompareTable />

      </main>

      <Footer />
    </div>
  )
}

export default LibraryPage