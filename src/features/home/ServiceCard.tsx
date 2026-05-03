import type { ServiceAnalysis } from '../../types'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

interface ServiceCardProps {
  data: ServiceAnalysis
}

function ServiceCard({ data }: ServiceCardProps) {
  // 위험도별 라벨 매핑
  const riskLabels = {
    safe: '안전',
    warning: '주의',
    danger: '위험',
  }

  // 위험도별 프로그레스바 색상
  const riskBarColors = {
    safe: 'bg-safe',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }

  return (
    <Card variant="glass" className="min-w-[180px]">
      
      {/* 상단: 브랜드 원 */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        text-white font-bold mb-3
        ${data.brandColor}
      `}>
        {data.initial}
      </div>

      {/* 서비스 이름 + 시간 */}
      <p className="font-semibold text-ink text-sm">{data.name}</p>
      <p className="text-xs text-ink-soft mb-3">{data.analyzedAt}</p>

      {/* 하단: 배지 + 진행바 */}
      <div className="space-y-1.5">
        <Badge level={data.riskLevel} showDot>
          {riskLabels[data.riskLevel]}
        </Badge>
        
        {/* 위험도 % 바 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${riskBarColors[data.riskLevel]}`}
              style={{ width: `${data.riskPercent}%` }}
            />
          </div>
          <span className="text-xs text-ink-soft">{data.riskPercent}%</span>
        </div>
      </div>

    </Card>
  )
}

export default ServiceCard