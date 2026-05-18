import React from 'react'

interface LibraryHeaderProps {
  totalCount: number
  dangerCount: number
  safeCount: number
}

function LibraryHeader({ totalCount, dangerCount, safeCount }: LibraryHeaderProps) {
  // 상단 4대 통계 스펙 데이터
  const stats = [
    { label: '총 분석', value: totalCount, icon: '📄' },
    { label: '위험 발견', value: dangerCount, icon: '⚠️', color: '#ef4444' },
    { label: '평균 위험도', value: '58%', icon: '📈' },
    { label: '이번 달', value: '12', icon: '📅' },
  ]

  return (
    // 가로 끝 정렬을 맞추기 위해 px-0으로 메인 컨테이너와 정렬선을 통일함
    <section className="relative px-0 pt-24 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/* 🔮 피그마 시안과 1:1 싱크: 더욱 두껍고 묵직한 오리지널 초고농도 폰트 두께와 투명도 반영 */}
        <div 
          className="
            absolute -top-10 left-0 
            text-[180px] font-black 
            text-ink/[0.04] 
            leading-none tracking-tighter
            pointer-events-none select-none
            z-0
          "
        >
          보관함
        </div>

        {/* 📌 설정 페이지의 핵심 공식: space-y-3으로 쫀쫀하고 정교하게 밀착된 구조 */}
        <div className="relative space-y-3 z-10">
          
          {/* 작은 라벨 */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft">
            <span>🗑️</span>
            MY ARCHIVE
          </div>

          {/* 메인 헤드라인 (설정 페이지의 텍스트 스케일, 굵기 완벽 동기화) */}
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight">
            나의 보관함
          </h1>

          {/* 설명 */}
          <p className="text-base text-ink-soft">
            저장된 약관 분석 기록을 조회하고 관리하세요
          </p>

          {/* 📊 하단 4대 통계 카드 대시보드 - 텍스트 영역과 자연스럽게 이어지도록 상단 여백(pt-6) 밸런싱 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
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
                  {stat.value}
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