import type { ReactNode } from 'react'

type RiskLevel = 'safe' | 'warning' | 'danger'

interface BadgeProps {
  children: ReactNode
  level: RiskLevel       // 위험도 (필수)
  showDot?: boolean      // 좌측에 점 표시할지 (선택)
}

function Badge({ children, level, showDot = false }: BadgeProps) {
  // 위험도별 스타일
  const styles: Record<RiskLevel, string> = {
    safe: 'bg-safe/15 text-safe',
    warning: 'bg-warning/15 text-warning',
    danger: 'bg-danger/15 text-danger',
  }

  // 점 색상
  const dotColors: Record<RiskLevel, string> = {
    safe: 'bg-safe',
    warning: 'bg-warning',
    danger: 'bg-danger',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-md
        text-xs font-medium
        ${styles[level]}
      `}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[level]}`} />
      )}
      {children}
    </span>
  )
}

export default Badge