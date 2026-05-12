function PhilosophySection() {
  return (
    <section className="px-6 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/* 배경 장식 텍스트 */}
        <div 
          className="
            absolute -top-8 left-0 
            text-[180px] font-bold 
            text-ink/[0.04] 
            leading-none tracking-tighter
            pointer-events-none select-none
          "
        >
          WHY
        </div>

        {/* 실제 콘텐츠 */}
        <div className="relative space-y-6 max-w-2xl">
          
          {/* 헤드라인 */}
          <h2 className="text-3xl md:text-4xl font-bold text-ink leading-tight">
            우리는 매번{' '}
            <span className="text-ink-soft">'동의합니다'</span>
            를 누르지만,<br />
            정말 이해하고 동의하고 있을까요?
          </h2>

          {/* 본문 */}
          <p className="text-base text-ink-soft leading-relaxed">
            복잡하고 긴 약관 속에는 소비자가 놓치기 쉬운 위험 요소들이 숨어 있습니다.{' '}
            <strong className="text-ink">약간동의</strong>는 AI 기반 분석을 통해 
            불공정 조항을 빠르게 탐지하고, 핵심 내용을 한눈에 보여주는 것을 목표로 합니다.
          </p>

        </div>

      </div>
    </section>
  )
}

export default PhilosophySection