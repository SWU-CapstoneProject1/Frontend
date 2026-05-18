import React from 'react'

type FilterType = '전체' | '위험' | '주의' | '정상'

interface LibraryToolbarProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  searchTerm: string
  onSearchChange: (value: string) => void
  counts: { 전체: number; 위험: number; 주의: number; 정상: number }
}

function LibraryToolbar({ activeFilter, onFilterChange, searchTerm, onSearchChange, counts }: LibraryToolbarProps) {
  const tabs: FilterType[] = ['전체', '위험', '주의', '정상']

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4 border-black/[0.04]">
      
      {/* 내부에 수치 스펙 배지가 포함된 알약 필터 버튼 */}
      <div className="flex gap-2 items-center flex-wrap">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab
          return (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              style={{
                background: isActive ? 'rgba(112, 98, 246, 0.12)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${isActive ? 'rgba(112, 98, 246, 0.3)' : 'rgba(0,0,0,0.06)'}`,
                color: isActive ? '#7062f6' : 'rgba(0,0,0,0.4)',
              }}
            >
              <span>{tab}</span>
              <span className="text-[10px] opacity-60 font-medium">{counts[tab]}</span>
            </button>
          )
        })}
      </div>

      {/*  필터 탭과 우측 1:1 수평 매칭 정렬된 검색 피드 */}
      <div className="relative w-full md:w-[260px]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="검색..."
          className="w-full text-xs pl-9 pr-4 py-2.5 rounded-2xl outline-none transition-all placeholder:text-ink-soft/40 text-ink shadow-inner bg-black/[0.01]"
          style={{
            background: 'rgba(255,255,255,0.35)',
            border: '1px solid rgba(255,255,255,0.6)',
          }}
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/40 text-xs pointer-events-none">🔍</span>
      </div>

    </div>
  )
}

export default LibraryToolbar