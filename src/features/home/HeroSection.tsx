import { motion } from 'framer-motion'
import glassChainImg from '../../assets/images/glass_chain_v2.png'

interface HeroSectionProps {
  onScrollToInput?: () => void
}

function HeroSection({ onScrollToInput }: HeroSectionProps) {
  return (
    <section className="relative w-screen h-screen bg-white flex items-center justify-between overflow-hidden select-none font-['Pretendard'] pt-20">
      <div className="flex flex-col justify-center h-full pl-8 md:pl-16 lg:pl-24 xl:pl-32 z-10 max-w-xl text-left space-y-6 -mt-12 relative">
        <div className="space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-[1.25]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            약관의 모든 것,<br />
            약관동의에서<br />
            쉽고 안전하게
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-xs md:text-sm font-bold text-stone-400 leading-relaxed pt-1"
          >
            AI 기반 이용약관 독소 조항 분석 플랫폼
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-start pt-2"
        >
          <button
            onClick={onScrollToInput}
            className="
              rounded-[22px]
              bg-stone-950
              px-8
              py-4
              text-sm
              font-black
              text-white
              shadow-[0_12px_30px_rgba(15,23,42,0.12)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-sky-600
              hover:shadow-[0_16px_35px_rgba(14,165,233,0.22)]
              active:scale-[0.98]
            "
          >
            분석하기
          </button>
        </motion.div>
      </div>

      <div className="absolute right-0 top-0 h-full w-[65%] pointer-events-none z-0 flex items-center justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-[15%] to-transparent z-10 w-full h-full" />

        <img
          src={glassChainImg}
          alt=""
          className="w-full h-full object-cover object-center scale-135 origin-center translate-x-[18%] select-none pointer-events-none"
        />
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-stone-900 z-20 cursor-pointer"
        onClick={onScrollToInput}
      >
        <svg
          className="w-7 h-7 stroke-current fill-none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}

export default HeroSection