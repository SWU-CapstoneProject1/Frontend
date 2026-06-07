import { useState } from 'react'
import AnalyzeInput from './AnalyzeInput'

// 1. 부모(HomePage)로부터는 오직 분석 시작 함수
interface HeroSectionProps {
  onStartAnalysis: (promise: Promise<string>) => void
}

function HeroSection({ onStartAnalysis }: HeroSectionProps) {
  // 2. 탭 상태는 이 HeroSection 내부에서 직접 관리
  const [activeTab, setActiveTab] = useState<'url' | 'file' | 'text'>('url')

  return (
    <section id="analysis-input-zone" className="w-full py-28 bg-white border-t border-stone-200/50 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* 좌측: 기획서 내용 타이틀 타이포그래피 */}
        <div className="space-y-4">
          <span className="text-[10px] font-black tracking-widest text-stone-400 uppercase">AI-POWERED TERMS ANALYSIS</span>
          <h2 className="text-4xl font-black text-stone-800 leading-tight tracking-tight">
            이런 경험,<br />한 번쯤 있지<br />
            <span className="text-stone-300">않으셨나요?</span>
          </h2>
          <p className="text-xs font-bold text-stone-500 leading-relaxed pt-2">
            길고 복잡한 약관을 제대로 읽지 못한 채<br />
            '동의' 버튼을 눌러야 했던 순간들.<br />
            약간동의는 그 불안함에서 출발했습니다.
          </p>
        </div>

        {/* 우측: 디자인 시안 탭 브라우저 및 인풋 컴포넌트 박스 */}
        <div className="w-full bg-stone-50 rounded-2xl border border-stone-200/70 p-6 shadow-sm space-y-6">
          
          {/* 탭 상단 메뉴바 제어 버튼 */}
          <div className="flex gap-4 border-b border-stone-200 pb-3 text-xs font-black text-stone-400">
            <button onClick={() => setActiveTab('url')} className={`pb-1 transition-all ${activeTab === 'url' ? 'text-sky-600 border-b-2 border-sky-600' : 'hover:text-stone-600'}`}>🔗 URL 주소</button>
            <button onClick={() => setActiveTab('file')} className={`pb-1 transition-all ${activeTab === 'file' ? 'text-sky-600 border-b-2 border-sky-600' : 'hover:text-stone-600'}`}>📂 파일 업로드</button>
            <button onClick={() => setActiveTab('text')} className={`pb-1 transition-all ${activeTab === 'text' ? 'text-sky-600 border-b-2 border-sky-600' : 'hover:text-stone-600'}`}>📄 직접 텍스트</button>
          </div>
          
          
          
          <AnalyzeInput activeTab={activeTab} onStartAnalysis={onStartAnalysis} />
        </div>

      </div>
    </section>
  )
}

export default HeroSection