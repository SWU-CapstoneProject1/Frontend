import { useState, useEffect, useRef } from 'react'

function CountUpItem({ label, targetValue }: { label: string; targetValue: number }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let started = false
    
    // 화면에 들어왔을 때 카운팅을 시작하도록 Intersection Observer 기용
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true
        let start = 0
        const duration = 1500 // 1.5초 동안 순동 가속
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
    }, { threshold: 0.1 })

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [targetValue])

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white border border-stone-200/60 shadow-xs">
      <span className="text-[10px] font-black text-stone-400 tracking-wider mb-2 uppercase">{label}</span>
      <h4 className="text-3xl font-black text-stone-900 tracking-tight">
        {count.toLocaleString()}개
      </h4>
    </div>
  )
}

function RecentAnalysis() {
  return (
    <section className="w-full py-16 bg-[#edf2f7] border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CountUpItem label="전체 분석 약관 수" targetValue={1234} />
          <CountUpItem label="탐지된 독소 조항 수" targetValue={1234} />
          <CountUpItem label="검색된 대법원 판례 수" targetValue={1234} />
        </div>
      </div>
    </section>
  )
}

export default RecentAnalysis