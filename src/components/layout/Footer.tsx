function Footer() {
  

  return (
    <footer className="border-t border-stone-200/60 bg-[#F7F7F8] px-6 py-8 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-stone-900 dark:text-slate-50">
              약간동의
            </p>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              AI 기반 약관 분석 서비스
            </p>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              불공정 조항을 빠르게 탐지합니다
            </p>
          </div>

          
          
        </div>

        <p className="text-xs leading-relaxed text-stone-400 dark:text-slate-500">
          © 2026 약간동의. All rights reserved.
          This service is for informational purposes only and does not constitute legal advice.
        </p>
      </div>
    </footer>
  )
}

export default Footer