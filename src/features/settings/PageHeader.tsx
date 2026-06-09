import { Settings } from 'lucide-react'

function PageHeader() {
  return (
    <section className="relative mb-8 overflow-hidden rounded-[34px] border border-stone-200 bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.07)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute -right-6 -top-8 text-[130px] font-black tracking-tighter text-stone-100 dark:text-white/5">
        설정
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10">
          <Settings size={24} className="text-sky-600 dark:text-sky-400" />
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            SETTINGS
          </span>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-stone-900 dark:text-slate-50">
            맞춤 설정
          </h1>

          <p className="mt-2 text-sm font-bold text-stone-500 dark:text-slate-400">
            위험 감지 민감도와 개인정보 옵션을 조정하세요.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PageHeader