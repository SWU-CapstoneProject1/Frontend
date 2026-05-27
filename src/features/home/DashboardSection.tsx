import { useState, useEffect } from 'react'

import { getStats, type DashboardStats } from '../../api/dashboard'

import GlobalStatusCard from './GlobalStatusCard'
import TrendCard from './TrendCard'

function DashboardSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch((err) => {
        console.error('통계 조회 실패:', err)
      })
  }, [])

  return (
    <section className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 좌우 2열 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlobalStatusCard />
          <TrendCard 
            totalCount={stats?.totalAnalyses ?? 0}
            trendPercent={12}
          />
        </div>

      </div>
    </section>
  )
}

export default DashboardSection