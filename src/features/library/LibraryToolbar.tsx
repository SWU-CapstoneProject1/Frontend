import { Search } from 'lucide-react'

type FilterType = '전체' | '위험' | '주의' | '정상'

interface LibraryToolbarProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  searchTerm: string
  onSearchChange: (value: string) => void
  counts: { 전체: number; 위험: number; 주의: number; 정상: number }
}

function LibraryToolbar({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  counts,
}: LibraryToolbarProps) {
  const tabs: FilterType[] = ['전체', '위험', '주의', '정상']

  return (
    <div className="flex flex-col items-start justify-between gap-4 border-b border-stone-200 pb-5 transition-colors duration-300 dark:border-white/10 md:flex-row md:items-center">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab

          return (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black transition-all ${
                isActive
                  ? 'bg-stone-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] dark:bg-sky-500 dark:text-white dark:shadow-[0_10px_28px_rgba(56,189,248,0.18)]'
                  : 'border border-stone-200 bg-white text-stone-500 hover:border-stone-300 hover:text-stone-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-50'
              }`}
            >
              <span>{tab}</span>
              <span className={isActive ? 'text-white/60' : 'text-stone-400 dark:text-slate-500'}>
                {counts[tab]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative w-full md:w-[280px]">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-slate-500"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="서비스 검색"
          className="h-11 w-full rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm font-bold text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-sky-400/40 dark:focus:ring-sky-400/10"
        />
      </div>
    </div>
  )
}

export default LibraryToolbar