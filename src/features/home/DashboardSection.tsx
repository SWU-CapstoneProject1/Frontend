import GlobalStatusCard from './GlobalStatusCard'
import TrendCard from './TrendCard'

function DashboardSection() {
  return (
    <section className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 좌우 2열 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlobalStatusCard />
          <TrendCard />
        </div>

      </div>
    </section>
  )
}

export default DashboardSection