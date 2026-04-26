import KeyIssuesCard from './KeyIssuesCard'
import RiskDistributionCard from './RiskDistributionCard'

function IssuesSection() {
  return (
    <section className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 2:1 비율 그리드 (이슈가 더 넓음) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 좌측 - 2칸 차지 */}
          <div className="lg:col-span-2">
            <KeyIssuesCard />
          </div>

          {/* 우측 - 1칸 */}
          <div>
            <RiskDistributionCard />
          </div>

        </div>

      </div>
    </section>
  )
}

export default IssuesSection