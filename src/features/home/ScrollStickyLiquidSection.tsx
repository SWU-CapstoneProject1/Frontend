const steps = [
  {
    number: '01',
    label: 'INPUT',
    title: '약관 입력',
    desc: 'URL, 파일, 텍스트 중 원하는 방식으로 약관을 입력합니다.',
  },
  {
    number: '02',
    label: 'DETECT',
    title: '위험 조항 탐지',
    desc: 'AI가 환불 제한, 자동 결제, 개인정보 제공 같은 위험 조항을 찾아냅니다.',
  },
  {
    number: '03',
    label: 'EXPLAIN',
    title: '쉬운 해설',
    desc: '어려운 법률 문장을 사용자가 이해하기 쉬운 말로 정리합니다.',
  },
]

function ScrollStickyLiquidSection() {
  return (
    <section className="w-full bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <span className="text-[10px] font-black tracking-widest text-sky-600 uppercase">
            SOLUTION FLOW
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900">
            약간동의는 이렇게 분석합니다
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-relaxed text-stone-500">
            긴 약관을 직접 읽지 않아도, 중요한 위험 조항과 핵심 내용을 빠르게 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group min-h-[250px] rounded-[30px] border border-stone-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-black text-sky-600">
                  {step.label}
                </span>

                <span className="text-5xl font-black tracking-tight text-stone-100 transition-colors group-hover:text-sky-100">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-black text-stone-900">
                {step.title}
              </h3>

              <p className="mt-4 text-sm font-bold leading-relaxed text-stone-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ScrollStickyLiquidSection