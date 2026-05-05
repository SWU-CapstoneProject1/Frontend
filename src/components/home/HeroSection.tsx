import HeroCopy from './HeroCopy'
import KpiCards from './KpiCards'
import AnalyzeInput from './AnalyzeInput'

function HeroSection() {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        
        {/* 좌우 2열 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* 좌측: 카피 */}
          <HeroCopy />
          
          {/* 우측: KPI 카드들 */}
          <div className="hidden lg:block">
            <KpiCards />
          </div>

        </div>

        {/* 하단: 입력창 (전체 너비 차지) */}
        <AnalyzeInput />

      </div>
    </section>
  )
}

export default HeroSection