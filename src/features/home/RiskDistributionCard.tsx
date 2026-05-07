import type { RiskDistribution } from '../../types'
import Card from '../../components/ui/Card'
import { useState, useEffect } from 'react'
import { getRiskDistribution } from '../../api/dashboard'



function RiskDistributionCard() {
  // 전체 카운트 계산
  const [riskDistribution, setRiskDistribution] = useState<RiskDistribution[]>([])

  useEffect(() => {
    getRiskDistribution().then(setRiskDistribution)
  }, [])

   const total = riskDistribution.reduce((sum, item) => sum + item.count, 0)
  return (
    <Card variant="solid-light" className="h-full">
      
      {/* 헤더 */}
      <h3 className="text-sm font-semibold text-ink mb-6">위험도 분포</h3>

      {/* 분포 리스트 */}
      <div className="space-y-4">
        {riskDistribution.map((item) => (
          <RiskRow key={item.level} item={item} />
        ))}
      </div>

      {/* 하단 총합 */}
      <div className="mt-6 pt-4 border-t border-stone-200">
        <span className="text-3xl font-bold text-ink">
          {total.toLocaleString()}
        </span>
        <span className="text-sm text-ink-soft ml-2">전체</span>
      </div>

    </Card>
  )
}

interface RiskRowProps {
  item: RiskDistribution
}

function RiskRow({ item }: RiskRowProps) {
  // 위험도별 색상 매핑
  const colorMap = {
    safe: 'bg-safe',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }
  const dotColor = colorMap[item.level]

  return (
    <div>
      {/* 라벨 행 */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
        <span className="text-sm text-ink">{item.label}</span>
        <span className="ml-auto text-sm font-semibold text-ink">
          {item.count.toLocaleString()}
        </span>
        <span className="text-xs text-ink-soft w-10 text-right">
          {item.percent}%
        </span>
      </div>

      {/* 진행바 */}
      <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${dotColor}`}
          style={{ width: `${item.percent}%` }}
        />
      </div>
    </div>
  )
}

export default RiskDistributionCard