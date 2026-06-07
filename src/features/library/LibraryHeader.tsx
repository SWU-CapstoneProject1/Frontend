import { FolderOpen, ShieldAlert, Files } from 'lucide-react'

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
    {
      label: '총 분석',
      value: statsData?.total_analyses ?? 0,
      icon: FolderOpen,
      bg: 'bg-sky-50 dark:bg-sky-500/10',
      iconColor: 'text-sky-600 dark:text-sky-400',
      valueColor: 'text-stone-900 dark:text-slate-50',
    },
    {
      label: '위험 발견',
      value: statsData?.total_danger ?? 0,
      icon: ShieldAlert,
      bg: 'bg-red-50 dark:bg-red-500/10',
      iconColor: 'text-red-500 dark:text-red-400',
      valueColor: statsData?.total_danger
        ? 'text-red-500 dark:text-red-400'
        : 'text-stone-900 dark:text-slate-50',
    },
    {
      label: '분석된 서비스',
      value: statsData?.total_services ?? 0,
      icon: Files,
      bg: 'bg-sky-50 dark:bg-sky-500/10',
      iconColor: 'text-sky-600 dark:text-sky-400',
      valueColor: 'text-stone-900 dark:text-slate-50',
    },
  ]

  return (
    <section className="relative px-0 pt-28 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            MY ARCHIVE
          </span>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-900 dark:text-slate-50 md:text-5xl">
            나의 보관함
          </h1>

          <p className="mt-4 text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
            저장된 약관 분석 기록을 조회하고 관리하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                  <Icon size={22} className={stat.iconColor} />
                </div>

                <p className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-slate-500">
                  {stat.label}
                </p>

                <h3 className={`mt-3 text-3xl font-black tracking-tight ${stat.valueColor}`}>
                  {stat.value.toLocaleString()}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LibraryHeader