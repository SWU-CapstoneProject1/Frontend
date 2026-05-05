import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'glass' | 'solid-dark' | 'solid-light'
  className?: string
}

function Card({ children, variant = 'glass', className = '' }: CardProps) {
  const variants = {
    // 글래스모피즘 (기본): 반투명 + 블러
    glass: 'bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg',
    
    // 어두운 카드: 분석 트렌드, 주요 이슈 카드용
    'solid-dark': 'bg-stone-700/90 text-white shadow-lg',
    
    // 밝은 카드: 위험도 분포 카드용
    'solid-light': 'bg-white shadow-lg border border-stone-200',
  }

  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export default Card