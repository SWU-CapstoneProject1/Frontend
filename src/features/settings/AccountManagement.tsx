import { MonitorCog } from 'lucide-react'

type ThemeOption = 'light' | 'dark' | 'system'

interface AccountManagementProps {
  theme: ThemeOption
  onThemeChange: (theme: ThemeOption) => void
}

function AccountManagement({
  theme,
  onThemeChange,
}: AccountManagementProps) {
  const options: { id: ThemeOption; label: string }[] = [
    { id: 'light', label: '라이트' },
    { id: 'dark', label: '다크' },
    { id: 'system', label: '시스템' },
  ]

  return (
    <section className="rounded-[30px] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
          <MonitorCog size={21} />
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            APPEARANCE
          </span>

          <h2 className="mt-1 text-xl font-black text-stone-900 dark:text-slate-50">
            화면 테마
          </h2>

          <p className="mt-1 text-sm font-bold text-stone-500 dark:text-slate-400">
            원하는 화면 모드를 선택하세요.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-stone-200 bg-stone-100/80 p-1 dark:border-white/10 dark:bg-white/5">
        {options.map((option) => {
          const isActive = theme === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onThemeChange(option.id)}
              className={`rounded-xl px-3 py-2 text-xs font-black transition ${
                isActive
                  ? 'bg-white text-stone-950 shadow-sm dark:bg-white/15 dark:text-slate-50'
                  : 'text-stone-500 hover:text-stone-900 dark:text-slate-400 dark:hover:text-slate-50'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default AccountManagement