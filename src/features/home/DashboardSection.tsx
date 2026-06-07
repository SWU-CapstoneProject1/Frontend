function DashboardSection() {
  return (
    <section className="w-full py-24 bg-white flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto text-center px-6 w-full">
        <h3 className="text-xl font-black text-stone-800 mb-4 tracking-tight leading-snug">
          우리는 매번 '동의합니다'를 누르지만,<br />
          정확히 이해하고 동의하고 있을까요?
        </h3>
        <p className="text-xs font-bold text-stone-400 max-w-md mx-auto mb-16">
          약간동의가 복잡한 약관의 핵심 맥락만 짚어 깔끔한 리포트로 알기 쉽게 요약해 드립니다.
        </p>

        {/*  대시보드 이미지 프레임 구역 */}
        <div className="w-full max-w-4xl mx-auto bg-stone-50 rounded-2xl border border-stone-100 shadow-2xl p-4 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
          <div className="w-full aspect-[16/10] bg-stone-100 rounded-xl flex items-center justify-center border border-stone-200/60 text-stone-400 text-xs font-bold tracking-wider">
            [ 어플리케이션 및 리포트 대시보드 스크린샷 이미지 배치 영역 ]
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardSection