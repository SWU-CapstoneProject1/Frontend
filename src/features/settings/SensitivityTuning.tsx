import { useState } from 'react'

import Card from '../../components/ui/Card'
import Slider from '../../components/ui/Slider'

interface SensitivityStat {
  icon: string
  label: string
  value: number
  color: string  // 텍스트 색상 (Tailwind 클래스)
}

const DEFAULT_SENSITIVITY = 50

function SensitivityTuning() {
  const [sensitivity, setSensitivity] = useState(DEFAULT_SENSITIVITY)

  // 통계 데이터
  const stats: SensitivityStat[] = [
    { icon: '👤', label: '개인정보 수집', value: 72, color: 'text-red-500' },
    { icon: '🛡️', label: '면책 조항', value: 58, color: 'text-amber-500' },
    { icon: '🔒', label: '일방적 변경', value: 85, color: 'text-indigo-500' },
  ]

  const handleReset = () => {
    setSensitivity(DEFAULT_SENSITIVITY)
  }

  return (
    <section className="px-6 py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 섹션 제목 */}
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
          <span>🎚️</span>
          내 위험 민감도 튜닝
        </h2>

        {/* 메인 카드 */}
        <Card variant="glass" className="space-y-6">
          
          {/* 슬라이더 섹션 */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-ink">자동결제 민감도</p>
                <p className="text-xs text-ink-soft mt-0.5">
                  0~100 범위로 자동결제 조항 탐지 민감도를 설정합니다
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-soft">현재 값</p>
                <p className="text-2xl font-bold text-indigo-500">{sensitivity}</p>
              </div>
            </div>

            {/* 슬라이더 */}
            <Slider value={sensitivity} onChange={setSensitivity} />

            {/* 레이블 */}
            <div className="flex justify-between text-xs text-ink-soft">
              <span>낮음</span>
              <span>보통</span>
              <span>높음</span>
            </div>
          </div>

          {/* 통계 카드들 (3개) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* 구분선 */}
          <div className="h-px bg-stone-200/60" />

          {/* 초기화 행 */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-ink">민감도 기본값 초기화</p>
              <p className="text-xs text-ink-soft mt-0.5">
                모든 민감도 슬라이더를 기본값으로 되돌립니다
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-lg bg-white text-sm font-medium text-ink hover:bg-stone-50 border border-stone-200 transition-colors"
            >
              초기화
            </button>
          </div>

        </Card>
      </div>
    </section>
  )
}

// 헬퍼: 통계 미니 카드
interface StatCardProps {
  stat: SensitivityStat
}

function StatCard({ stat }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
      <div className="flex items-center gap-2 mb-2">
        <span>{stat.icon}</span>
        <span className="text-xs text-ink-soft">{stat.label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
        <span className="text-xs text-ink-soft">/ 100</span>
      </div>
    </div>
  )
}

export default SensitivityTuning