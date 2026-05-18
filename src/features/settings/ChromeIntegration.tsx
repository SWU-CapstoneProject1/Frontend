import Card from '../../components/ui/Card'

interface Step {
  id: string
  label: string
  completed: boolean
}

function ChromeIntegration() {
  const steps: Step[] = [
    { id: 'install', label: '설치 링크', completed: true },
    { id: 'verify', label: '설치 확인 중', completed: true },
    { id: 'connect', label: '연동 완료', completed: true },
  ]

  const isConnected = true
  const lastChecked = '2분 전'

  return (
    <section className="px-6 py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 섹션 제목 */}
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
          <span>🌐</span>
          크롬 웹 가드 연동
        </h2>

        {/* 다크 카드 */}
        <Card variant="solid-dark" className="space-y-6">
          
          {/* 헤더 */}
          <div>
            <p className="font-semibold text-white">확장프로그램 설치 튜토리얼</p>
            <p className="text-xs text-white/60 mt-1">
              Chrome 브라우저에서 설치 링크를 통해 연동하세요
            </p>
          </div>

          {/* 단계별 인디케이터 */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <StepIndicator 
                key={step.id} 
                step={step} 
                isLast={index === steps.length - 1}
              />
            ))}
          </div>

          {/* 구분선 */}
          <div className="h-px bg-white/10" />

          {/* 연동 상태 */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">연동 상태</p>
              <p className="text-xs text-white/50 mt-0.5">
                마지막 확인: {lastChecked}
              </p>
            </div>
            
            {/* 연결 상태 배지 */}
            <div className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full
              ${isConnected ? 'bg-safe/20' : 'bg-danger/20'}
            `}>
              <span className={`
                w-1.5 h-1.5 rounded-full
                ${isConnected ? 'bg-safe' : 'bg-danger'}
              `} />
              <span className={`
                text-xs font-medium
                ${isConnected ? 'text-safe' : 'text-danger'}
              `}>
                {isConnected ? '연결됨' : '연결 끊김'}
              </span>
            </div>
          </div>

        </Card>
      </div>
    </section>
  )
}

// 헬퍼: 한 단계 인디케이터
interface StepIndicatorProps {
  step: Step
  isLast: boolean
}

function StepIndicator({ step, isLast }: StepIndicatorProps) {
  return (
    <div className="flex items-center flex-1 last:flex-none">
      
      {/* 동그라미 + 라벨 */}
      <div className="flex flex-col items-center gap-2">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${step.completed 
            ? 'bg-safe/20 text-safe' 
            : 'bg-white/10 text-white/40'
          }
        `}>
          {step.completed ? '✓' : '○'}
        </div>
        <span className="text-xs text-white/70">{step.label}</span>
      </div>

      {/* 연결선 (마지막 단계 뒤에는 안 그림) */}
      {!isLast && (
        <div className="flex-1 h-px bg-white/20 mx-2 mb-6" />
      )}
    </div>
  )
}

export default ChromeIntegration