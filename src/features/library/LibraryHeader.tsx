import React from 'react'

interface StatsData {
  total_analyses: number
  total_danger: number
  total_services: number
}

interface LibraryHeaderProps {
  statsData: StatsData | null
}

function LibraryHeader({ statsData }: LibraryHeaderProps) {
  const stats = [
    { label: '총 분석', value: statsData?.total_analyses ?? 0, icon: '📄' },
    { label: '위험 발견', value: statsData?.total_danger ?? 0, icon: '⚠️', color: statsData?.total_danger ? '#ef4444' : undefined },
    { label: '분석된 서비스', value: statsData?.total_services ?? 0, icon: '🧩' },
  ]

  return (
    <section className="relative px-0 pt-24 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute -top-10 left-0 text-[180px] font-black text-ink/[0.04] leading-none tracking-tighter pointer-events-none select-none z-0">
          보관함
        </div>

        <div className="relative space-y-3 z-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft">
            <span>🗑️</span>
            MY ARCHIVE
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight">
            나의 보관함
          </h1>

          <p className="text-base text-ink-soft">
            저장된 약관 분석 기록을 조회하고 관리하세요
          </p>

          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.02)',
                }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft mb-3">
                  <span>{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
                <p className="text-3xl font-black text-ink" style={{ color: stat.color }}>
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LibraryHeader