import Card from '../ui/Card'

interface Step {
  number: string
  icon: string
  title: string
  description: string
  iconBg: string        // 아이콘 배경색
}

function HowItWorksSection() {
  const steps: Step[] = [
    {
      number: 'STEP 01',
      icon: '🔍',
      title: '약관 텍스트\n수집 & 파싱',
      description: 'URL을 입력하면 해당 서비스의 약관 전문을 자동으로 수집합니다. AI가 문서 구조를 파악하고 개별 조항으로 분리합니다.',
      iconBg: 'bg-purple-100',
    },
    {
      number: 'STEP 02',
      icon: '📄',
      title: 'AI 위험도 분석',
      description: '각 조항을 AI가 분석하여 위험·주의·안전으로 분류합니다. 약관규제법, 전자상거래법 등 국내 법률 기준을 적용합니다.',
      iconBg: 'bg-rose-100',
    },
    {
      number: 'STEP 03',
      icon: '⚖️',
      title: '판례 연결 & 리포트',
      description: '위험 조항과 관련된 실제 판례를 자동으로 연결합니다. 시각화된 리포트로 누구나 쉽게 이해할 수 있도록 돕습니다.',
      iconBg: 'bg-emerald-100',
    },
  ]

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        
        {/* 섹션 제목 */}
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-8">
          <span>📖</span>
          어떻게 분석하나요?
        </h2>

        {/* 3단계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <StepCard 
              key={step.number} 
              step={step} 
              isFirst={index === 0}
            />
          ))}
        </div>

        {/* 하단 캡션 */}
        <p className="text-center text-sm text-ink-soft">
          💡 나아가 관련 판례까지 연결하여 보다{' '}
          <strong className="text-ink">신뢰할 수 있는 판단</strong>
          을 제공합니다.
        </p>

      </div>
    </section>
  )
}

// 헬퍼 컴포넌트: 한 단계 카드
interface StepCardProps {
  step: Step
  isFirst: boolean
}

function StepCard({ step, isFirst }: StepCardProps) {
  // 첫 번째 카드만 어두운 스타일 (디자인 보면 강조됨)
  const variant = isFirst ? 'solid-dark' : 'glass'
  const titleColor = isFirst ? 'text-white' : 'text-ink'
  const descColor = isFirst ? 'text-white/70' : 'text-ink-soft'
  const numberColor = isFirst ? 'text-white/50' : 'text-ink-soft'

  return (
    <Card variant={variant} className="h-full">
      
      {/* 아이콘 + STEP 번호 */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center text-lg
          ${isFirst ? 'bg-white/10' : step.iconBg}
        `}>
          {step.icon}
        </div>
        <span className={`text-xs font-medium tracking-wider ${numberColor}`}>
          {step.number}
        </span>
      </div>

      {/* 타이틀 (\n으로 줄바꿈 처리) */}
      <h3 className={`text-xl font-bold mb-3 whitespace-pre-line ${titleColor}`}>
        {step.title}
      </h3>

      {/* 설명 */}
      <p className={`text-sm leading-relaxed ${descColor}`}>
        {step.description}
      </p>

      {/* 첫 번째 카드만 하단 태그 */}
      {isFirst && (
        <div className="flex gap-2 mt-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">
            URL 크롤링
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">
            DOM 파싱
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">
            구조화
          </span>
        </div>
      )}

    </Card>
  )
}

export default HowItWorksSection