import { recentAnalyses } from '../../constants/mockData'
import ServiceCard from './ServiceCard'

function RecentAnalysis() {
  return (
    <section className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span>👁</span>
            최근 분석
          </h2>
          <button className="text-xs text-ink-soft hover:text-ink transition-colors">
            전체 보기 →
          </button>
        </div>

        {/* 가로 스크롤 카드 리스트 */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6">
          {recentAnalyses.map((analysis) => (
            <ServiceCard key={analysis.id} data={analysis} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default RecentAnalysis