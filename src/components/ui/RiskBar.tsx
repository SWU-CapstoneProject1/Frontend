import type { RiskLevel } from '../../types'

interface RiskBarProps {
  percent: number      // 위험도 % (0~100)
  level: RiskLevel     // 위험도 레벨 (색상 결정)
  showLabel?: boolean  // 우측에 % 숫자 표시 여부
  height?: string      // 바 높이 (기본 h-1.5)
}

function RiskBar({ percent, level, showLabel = true, height = 'h-1.5' }: RiskBarProps) {
  // 위험도별 색상
  const barColors: Record<RiskLevel, string> = {
    safe: 'bg-safe',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }

  return (
    <div className="flex items-center gap-2">
      {/* 프로그레스바 */}
      <div className={`flex-1 ${height} bg-stone-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full ${barColors[level]}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* % 라벨 */}
      {showLabel && (
        <span className="text-xs text-ink-soft w-8 text-right">
          {percent}%
        </span>
      )}
    </div>
  )
}

export default RiskBar