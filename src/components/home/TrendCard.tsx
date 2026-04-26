import Card from '../ui/Card'

function TrendCard() {
  return (
    <Card variant="solid-dark" className="h-full relative overflow-hidden">
      
      {/* 우상단 배지 */}
      <div className="absolute top-6 right-6">
        <span className="px-3 py-1 rounded-full bg-safe/20 text-safe text-xs font-medium">
          ↗ +12%
        </span>
      </div>

      {/* 헤더 */}
      <p className="text-xs text-white/60 mb-1">분석 트렌드</p>
      <p className="text-xs text-white/40 mb-4">최근 24시간 추이</p>

      {/* 메인 숫자 */}
      <div className="mb-2">
        <span className="text-5xl font-bold text-white">2,847</span>
        <span className="text-sm text-white/50 ml-2">total analyses</span>
      </div>

      {/* 배경 큰 숫자 (장식) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[200px] font-bold text-white/[0.03] leading-none pointer-events-none">
        89
      </div>

      {/* 차트 자리 (placeholder) */}
      <div className="mt-8 h-24 relative">
        {/* 임시 라인 - SVG로 간단히 */}
        <svg
          className="w-full h-full"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 70 Q 50 60 100 50 T 200 40 T 300 30 T 400 10"
            stroke="rgb(96 165 250)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 70 Q 50 60 100 50 T 200 40 T 300 30 T 400 10 L 400 100 L 0 100 Z"
            fill="url(#gradient)"
            opacity="0.2"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(96 165 250)" />
              <stop offset="100%" stopColor="rgb(96 165 250)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 하단 시간 라벨 */}
      <div className="flex justify-between text-xs text-white/40 mt-2">
        <span>3일 전</span>
        <span>지금</span>
      </div>

    </Card>
  )
}

export default TrendCard