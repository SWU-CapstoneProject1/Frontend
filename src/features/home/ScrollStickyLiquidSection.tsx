import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LiquidGlassCard from '../../components/ui/LiquidGlassCard'

function ScrollStickyLiquidSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 스크롤 트래킹을 통해 물바닥 레이어 높낮이 정밀 연동
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative w-full bg-stone-950 text-white min-h-[180vh]">
      
      {/*  숫자를 실시간으로 덮고 투과시키는 리퀴드 렌즈 */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-20">
        <div className="w-[420px] h-[160px] opacity-90">
          {/* 내부 children 없이 투과 필터링 본연의 역할 수행 */}
          <LiquidGlassCard className="w-full h-full shadow-[0_0_80px_rgba(255,255,255,0.1)]" />
        </div>
      </div>

      {/* 스크롤에 따라 위로 슥 지나가는 대형 데이터 숫자 레이어 */}
      <div className="relative w-full flex flex-col items-center justify-start z-10 space-y-[45vh] pt-[25vh] pb-[30vh]">
        
        {/* 78% 스펙 라인 */}
        <div className="text-center max-w-md mix-blend-difference">
          <h2 className="text-[7rem] font-black tracking-tighter leading-none text-white">78%</h2>
          <p className="text-stone-400 font-bold text-xs mt-4">사용자가 약관을 읽지 않고 동의합니다</p>
        </div>

        {/* 32page 스펙 라인 */}
        <div className="text-center max-w-md mix-blend-difference">
          <h2 className="text-[6.5rem] font-black tracking-tighter leading-none text-white">
            32<span className="text-2xl font-bold text-stone-400 ml-1">page</span>
          </h2>
          <p className="text-stone-400 font-bold text-xs mt-4">앱 가입 시 필요한 평균 이용약관 분량</p>
        </div>

      </div>
    </div>
  )
}

export default ScrollStickyLiquidSection