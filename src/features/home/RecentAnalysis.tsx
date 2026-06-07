import { useState, useEffect, useRef } from 'react'

function CountUpItem({ label, targetValue }: { label: string; targetValue: number }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          let start = 0
          const duration = 1500
          const stepTime = 20
          const totalSteps = duration / stepTime
          const increment = targetValue / totalSteps

          const timer = setInterval(() => {
            start += increment
            if (start >= targetValue) {
              clearInterval(timer)
              setCount(targetValue)
            } else {
              setCount(Math.floor(start))
            }
          }, stepTime)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [targetValue])

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center rounded-[30px] border border-stone-200 bg-white p-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition-all duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <span className="mb-2 text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
        {label}
      </span>

      <h4 className="text-4xl font-black tracking-tight text-stone-900 dark:text-slate-50">
        {count.toLocaleString()}개
      </h4>
    </div>
  )
}

function RecentAnalysis() {
  return (
    <section className="w-full bg-[#F7F7F8] py-28 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            TRUST DATA
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900 dark:text-slate-50">
            분석 데이터로 확인하는 신뢰도
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
            약관동의는 다양한 약관 분석 데이터를 기반으로 위험 조항을 더 정확하게 찾아냅니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CountUpItem label="ANALYZED TERMS" targetValue={1234} />
          <CountUpItem label="DETECTED RISKS" targetValue={482} />
          <CountUpItem label="REFERENCE CASES" targetValue={316} />
        </div>
      </div>
    </section>
  )
}

export default RecentAnalysis