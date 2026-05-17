function PageHeader() {
  return (
    <section className="relative px-6 pt-24 pb-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/* 배경 장식 텍스트 (흐릿한 "설정") */}
        <div 
          className="
            absolute -top-8 left-0 
            text-[180px] font-bold 
            text-ink/[0.04] 
            leading-none tracking-tighter
            pointer-events-none select-none
          "
        >
          설정
        </div>

        {/* 실제 콘텐츠 */}
        <div className="relative space-y-3">
          
          {/* 작은 라벨 */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft">
            <span>⚙️</span>
            SETTINGS
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight">
            맞춤 설정
          </h1>

          {/* 설명 */}
          <p className="text-base text-ink-soft">
            위험 감지 민감도와 개인정보 옵션을 조정하세요
          </p>

        </div>

      </div>
    </section>
  )
}

export default PageHeader