import { motion } from 'framer-motion'
import glassChainImg from '../../assets/images/glass_chain_v2.png'
import darkGlassChainImg from '../../assets/images/dark_chain.png'

interface HeroSectionProps {
  onScrollToInput?: () => void
}

function HeroSection({ onScrollToInput }: HeroSectionProps) {
  return (
    <section className="relative flex h-screen w-screen select-none items-center justify-between overflow-hidden bg-white pt-20 font-['Pretendard'] transition-colors duration-300 dark:bg-slate-950">
      <div className="relative z-10 -mt-12 flex h-full max-w-xl flex-col justify-center space-y-6 pl-8 text-left md:pl-16 lg:pl-24 xl:pl-32">
        <div className="space-y-4">
          <motion.h1
            className="text-4xl font-black leading-[1.25] tracking-tight text-stone-900 dark:text-slate-50 md:text-5xl"
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
            className="pt-1 text-xs font-bold leading-relaxed text-stone-400 dark:text-slate-400 md:text-sm"
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
            className="rounded-[22px] bg-stone-950 px-8 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-[0_16px_35px_rgba(14,165,233,0.22)] active:scale-[0.98] dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            분석하기
          </button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 z-0 flex h-full w-[65%] items-center justify-end overflow-hidden">
        <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-r from-white via-white via-[15%] to-transparent transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-transparent" />

        <>
          {/* 라이트모드 */}
          <img
            src={glassChainImg}
            alt=""
            className="
              pointer-events-none h-full w-full origin-center
              translate-x-[18%] scale-135 select-none
              object-cover object-center
              opacity-100 transition-all duration-500
              dark:hidden
            "
          />

          {/* 다크모드 */}
          <img
            src={darkGlassChainImg}
            alt=""
            className="
              pointer-events-none hidden h-full w-full origin-center
              translate-x-[18%] scale-135 select-none
              object-cover object-center
              opacity-80 transition-all duration-500
              dark:block
            "
          />
        </>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center justify-center text-stone-900 dark:text-slate-50"
        onClick={onScrollToInput}
      >
        <svg
          className="h-7 w-7 fill-none stroke-current"
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