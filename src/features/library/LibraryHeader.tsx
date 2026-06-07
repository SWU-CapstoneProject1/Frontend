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
      bg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      valueColor: 'text-stone-900',
    },
    {
      label: '위험 발견',
      value: statsData?.total_danger ?? 0,
      icon: ShieldAlert,
      bg: 'bg-red-50',
      iconColor: 'text-red-500',
      valueColor: statsData?.total_danger ? 'text-red-500' : 'text-stone-900',
    },
    {
      label: '분석된 서비스',
      value: statsData?.total_services ?? 0,
      icon: Files,
      bg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      valueColor: 'text-stone-900',
    },
  ]

  return (
    <section className="relative px-0 pt-28 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">
            MY ARCHIVE
          </span>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-900 md:text-5xl">
            나의 보관함
          </h1>

          <p className="mt-4 text-sm font-bold leading-relaxed text-stone-500">
            저장된 약관 분석 기록을 조회하고 관리하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}>
                  <Icon size={22} className={stat.iconColor} />
                </div>

                <p className="text-xs font-black uppercase tracking-widest text-stone-400">
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