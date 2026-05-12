import Card from '../../components/ui/Card'

interface KpiData {
  icon: string         // 이모지로 간단히
  label: string
  value: string
}

function KpiCards() {
  const kpis: KpiData[] = [
    { icon: '📊', label: '총 분석 건수', value: '2,847' },
    { icon: '⚠️', label: '위험 조항 발견', value: '1,243' },
    { icon: '✓', label: '분석 서비스', value: '89+' },
    { icon: '⚡', label: 'AI 정확도', value: '99%' },
  ]

  return (
    <div className="relative h-[400px]">
      {/* 4개 카드를 자유로운 위치에 배치 */}
      
      {/* 좌상단 */}
      <div className="absolute top-0 left-0">
        <KpiCard {...kpis[0]} />
      </div>
      
      {/* 우상단 */}
      <div className="absolute top-12 right-0">
        <KpiCard {...kpis[1]} />
      </div>
      
      {/* 좌하단 */}
      <div className="absolute bottom-12 left-8">
        <KpiCard {...kpis[2]} />
      </div>
      
      {/* 우하단 */}
      <div className="absolute bottom-0 right-12">
        <KpiCard {...kpis[3]} />
      </div>
    </div>
  )
}

// 같은 파일에 작은 헬퍼 컴포넌트
function KpiCard({ icon, label, value }: KpiData) {
  return (
    <Card variant="glass" className="min-w-[180px]">
      <div className="flex items-center gap-2 mb-2 text-ink-soft text-xs">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <p className="text-3xl font-bold text-ink">{value}</p>
    </Card>
  )
}

export default KpiCards