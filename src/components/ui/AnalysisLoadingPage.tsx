import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const textTips = [
  "공정거래위원회 표준약관과 다른 불리한 조항을 꼼꼼히 탐색하고 있습니다.",
  "고객에게 과도한 위약금을 부과하는 조항은 약관규제법상 무효 사유가 됩니다.",
  "AI가 대법원 판례 데이터를 기반으로 독소 문구의 위반 여부를 대조하는 중입니다.",
  "거의 다 되었습니다! 종합 위험도 스코어를 산출하고 리포트를 가공하고 있습니다."
]

interface AnalysisLoadingPageProps {
  analysisPromise: Promise<string>
}

function AnalysisLoadingPage({ analysisPromise }: AnalysisLoadingPageProps) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    let realJobId: string | null = null
    let currentProgress = 0

    analysisPromise
      .then((id) => {
        realJobId = id
        if (currentProgress >= 90) {
          triggerFinalJump(id)
        }
      })
      .catch((err) => {
        console.error(err)
        alert('분석 도중 오류가 발생했습니다.')
        window.location.href = '/'
      })

    
    const triggerFinalJump = (targetId: string) => {
      setProgress(100) 
      
      // 바로 넘기지 않고 1.5초(1500ms) 동안 대기
      setTimeout(() => {
        navigate(`/analysis/${targetId}`)
      }, 1500) 
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        currentProgress = prev
        if (realJobId) {
          if (prev >= 99) {
            clearInterval(timer)
            triggerFinalJump(realJobId)
            return 100
          }
          return prev + 2
        }
        if (prev >= 90) return 90
        return prev + 1
      })
    }, 70)

    const textTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % textTips.length)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(textTimer)
    }
  }, [analysisPromise, navigate])

  return (
    <div className="fixed inset-0 z-50 bg-[#eef5f9] text-stone-800 font-['Pretendard'] flex flex-col justify-between p-12 overflow-hidden select-none">
      
      {/*  상단 네비 */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center opacity-60 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black tracking-widest text-sky-600">YAKGAN DONGUI</span>
          <span className="text-[9px] font-bold bg-white/80 text-sky-700 px-1.5 py-0.5 rounded shadow-xs border border-white">AI SCAN ENGINE v2.0</span>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-sky-600/70">DEEP SCANNING MODE ACTIVE</span>
      </header>

      {/* 실시간 오션 블루 멀티 파도 레이어 */}
      <div 
        className="absolute bottom-0 left-0 right-0 transition-all duration-100 ease-out z-0"
        style={{ height: `${progress}%` }}
      >
        {/* [Back Layer] 뒤쪽 파도 모핑 */}
        <div className="absolute -top-20 left-0 right-0 h-24 opacity-30 pointer-events-none">
          <svg className="w-full h-full fill-current text-sky-400/40" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <motion.path 
              animate={{
                d: [
                  "M0,60 C360,10, 720,110, 1080,40 C1260,5, 1380,35, 1440,50 L1440,120 L0,120 Z",
                  "M0,40 C400,100, 800,20, 1100,70 C1280,95, 1390,45, 1440,30 L1440,120 L0,120 Z",
                  "M0,60 C360,10, 720,110, 1080,40 C1260,5, 1380,35, 1440,50 L1440,120 L0,120 Z"
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>

        {/* [Front Layer] 전면 메인 오션 파도 모핑 */}
        <div className="absolute -top-16 left-0 right-0 h-20 opacity-50 pointer-events-none">
          <svg className="w-full h-full fill-current text-cyan-400/60" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <motion.path 
              animate={{
                d: [
                  "M0,40 C300,90, 600,10, 900,70 C1150,120, 1320,50, 1440,30 L1440,120 L0,120 Z",
                  "M0,70 C350,20, 700,100, 1050,30 C1250,-10, 1380,40, 1440,60 L1440,120 L0,120 Z",
                  "M0,40 C300,90, 600,10, 900,70 C1150,120, 1320,50, 1440,30 L1440,120 L0,120 Z"
                ]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>

        {/* 🔹 물 본체 액체 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/35 via-cyan-300/25 to-sky-200/20" />
      </div>

      {/* 전면 프로스트 유리 마스크 패널 */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[4px] pointer-events-none z-5" />

      {/* 완벽 투명 글래스모피즘 숫자 */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 text-center my-auto">
        <div className="space-y-6 max-w-xl">
          
          <h1 
            className="text-[10rem] font-black tracking-tighter leading-none select-none drop-shadow-[0_8px_32px_rgba(14,116,144,0.05)] text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.35))',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)',
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.7)',
            }}
          >
            {progress}%
          </h1>
          
          {/* 하단 정보 캡슐 */}
          <div className="inline-block bg-white/70 backdrop-blur-xl px-5 py-2 rounded-2xl border border-white/90 shadow-xs">
            <p className="text-xs font-black tracking-wider text-sky-600 transition-all duration-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              {progress === 100 
                ? "✨ 분석 완료! 리포트를 구성합니다." 
                : progress >= 90 
                  ? "AI 엔진이 최종 리포트를 정밀 조율 중입니다..." 
                  : "약관 조항 가동 및 판례 대조 스캔 중..."
              }
            </p>
          </div>
        </div>
      </main>

      {/* 하단 브리핑 자막 라인 */}
      <footer className="relative z-10 w-full max-w-2xl mx-auto text-center border-t border-sky-900/5 pt-6">
        <span className="text-[9px] font-black tracking-widest text-sky-600/40 uppercase block mb-2">
          ANALYSIS STEP BRIEFING
        </span>
        <p className="text-xs text-stone-600 font-bold leading-relaxed max-w-md mx-auto h-8 transition-all duration-500">
          "{textTips[tipIndex]}"
        </p>
      </footer>

    </div>
  )
}

export default AnalysisLoadingPage