function HeroCopy() {
  return (
    <div className="space-y-6">
      
      {/* 작은 라벨 */}
      <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft">
        <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
        AI-POWERED TERMS ANALYSIS
      </div>

      {/* 메인 헤드라인 */}
      <h1 className="text-5xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
        이런 경험,<br />
        한 번쯤 있지<br />
        <span className="text-ink-soft/50">않으셨나요?</span>
      </h1>

      {/* 본문 */}
      <div className="space-y-3 text-ink-soft text-base leading-relaxed max-w-md">
        <p>
          길고 복잡한 약관을 제대로 읽지 못한 채<br />
          '동의' 버튼을 눌러야 했던 순간들.
        </p>
        <p>
          우리는 그 불안함에서 출발했습니다.
        </p>
      </div>

    </div>
  )
}

export default HeroCopy