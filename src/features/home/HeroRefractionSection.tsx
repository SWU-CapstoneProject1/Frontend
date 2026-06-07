import LiquidGlassCard from '../../components/ui/LiquidGlassCard'

function HeroRefractionSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto pt-40 pb-24 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 타이포그래피 레이어 */}
      <div className="absolute top-36 text-center tracking-tighter leading-none select-none font-black pointer-events-none z-0">
        <h1 className="text-[6.5rem] text-stone-900/90 leading-[1.1]">정말 다</h1>
        <h1 className="text-[6.5rem] text-stone-900/90 leading-[1.1] mt-2">읽으신</h1>
        <h1 className="text-[6.5rem] text-stone-900/90 leading-[1.1] mt-2">건가요</h1>
      </div>

      {/* 78% DYNAMIC GLASS CARD */}
      <div className="relative w-[340px] h-[100px] mt-24 z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.08)]">
        <LiquidGlassCard className="w-full h-full">
          <div className="flex flex-col items-center justify-center h-full text-center select-none">
            <h2 className="text-5xl font-black tracking-tighter text-stone-900/90">
              78%
            </h2>
            <p className="text-stone-500 font-bold text-[11px] mt-1 tracking-tight">
              사용자가 약관을 읽지 않고 동의합니다
            </p>
          </div>
        </LiquidGlassCard>
      </div>

      {/* 32page SECONDARY GLASS CARD */}
      <div className="relative w-[340px] h-[100px] mt-8 z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
        <LiquidGlassCard className="w-full h-full">
          <div className="flex flex-col items-center justify-center h-full text-center select-none">
            <h2 className="text-4xl font-black tracking-tighter text-stone-800/90">
              32<span className="text-xl font-bold text-stone-500 ml-0.5">page</span>
            </h2>
            <p className="text-stone-500 font-bold text-[11px] mt-1 tracking-tight">
              앱 가입 시 필요한 평균 이용약관 분량
            </p>
          </div>
        </LiquidGlassCard>
      </div>
      
      <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-stone-200 to-transparent mt-24 z-10" />
    </section>
  )
}

export default HeroRefractionSection