import { useRef } from 'react'
import { motion } from 'framer-motion'
import shieldImg from '../../assets/images/shield.png'

interface HeroTitleSectionProps {
  onScrollToInput: () => void
}

function HeroTitleSection({ onScrollToInput }: HeroTitleSectionProps) {
  return (
    <section className="relative w-screen h-screen bg-linear-to-b from-[#f8fafc] via-white to-[#f1f5f9] flex flex-col items-center justify-between pt-44 pb-12 px-6 overflow-hidden select-none font-['Pretendard']">
      
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          // bg-[radial-gradient] 표준 문법으로 전격 교체해서 완벽하게 다시 띄움!
          className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,rgba(34,211,238,0.06)_50%,transparent_70%)] filter blur-3xl"
        />
      </div>

      {/* 좌측 상단 3D 글래스 방패 오브젝트 도킹 구역 */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        // 누끼 핏
        className="absolute top-[16%] left-[10%] w-[320px] h-[400px] z-0 flex items-center justify-center"
      >
       
        <img 
          src={shieldImg} 
          alt="Security Glass Shield"
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/*메인 타이포그래피 레이어 */}
      <div className="text-center z-10 space-y-6 max-w-3xl mx-auto mt-12 relative pointer-events-none">
        <motion.h1 
          className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          약관의 모든 것,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-500">약간동의</span>에서 쉽고 안전하게
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm font-bold text-stone-400 max-w-lg mx-auto leading-relaxed"
        >
          10초 만에 스캔하는 AI 기반 이용약관 독소 조항 분석 플랫폼<br />
          숨겨진 법률 위험을 탐지하여 당신의 정당한 권리를 안겨드립니다
        </motion.p>
      </div>

      {/*바로가기 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 z-10 w-full relative">
        <button
          onClick={onScrollToInput}
          className="w-52 h-13 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs tracking-wide shadow-md active:scale-97 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          지금 바로 분석하기
        </button>

        <button
          onClick={() => {
            const nextSection = document.getElementById('analysis-input-zone')
            nextSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="w-52 h-13 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-500 font-bold text-xs tracking-wide shadow-xs active:scale-97 transition-all flex items-center justify-center cursor-pointer"
        >
          플랫폼 가이드 보기
        </button>
      </div>

      {/*  애니메이션 위아래 노란 화살표 */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="w-full flex flex-col items-center justify-center mt-12 text-stone-300 z-10 cursor-pointer"
        onClick={() => {
          const nextSection = document.getElementById('analysis-input-zone')
          nextSection?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <svg className="w-7 h-7 stroke-current fill-none text-yellow-400" viewBox="0 0 24 24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>

    </section>
  )
}

export default HeroTitleSection