import Card from '../../components/ui/Card'

function GlobalStatusCard() {
  return (
    <Card variant="glass" className="h-full">
      
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-ink">글로벌 현황</h3>
        
        {/* 범례 */}
        <div className="flex items-center gap-3 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-safe"></span>
            안전
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
            주의
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-danger"></span>
            위험
          </span>
        </div>
      </div>

      {/* 지구본 자리 (placeholder) */}
      <div className="relative aspect-square max-w-sm mx-auto">
        {/* 임시 원형 일러스트 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200/50">
          {/* 위치 점들 */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-safe animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-danger animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-safe animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-warning animate-pulse"></div>
        </div>
      </div>

      {/* 하단 캡션 */}
      <p className="text-center text-xs text-ink-soft mt-4">
        드래그해서 지구본을 돌려보세요
      </p>

    </Card>
  )
}

export default GlobalStatusCard