import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import HeroTitleSection from '../../features/home/HeroTitleSection'
import ScrollStickyLiquidSection from '../../features/home/ScrollStickyLiquidSection'
import IssuesSection from '../../features/home/IssuesSection'
import TechStackCarousel from '../../features/home/TechStackCarousel'
import HeroSection from '../../features/home/HeroSection'
import RecentAnalysis from '../../features/home/RecentAnalysis'

import AnalysisLoadingPage from '../../components/ui/AnalysisLoadingPage'

function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisPromise, setAnalysisPromise] = useState<Promise<string> | null>(null)

  const handleTriggerLoading = (promise: Promise<string>) => {
    setAnalysisPromise(promise)
    setIsAnalyzing(true) 
  }

  // 분석하러가기 버튼 클릭 시 인풋 창으로 스무스 스크롤 이동
  const handleScrollToInput = () => {
    const target = document.getElementById('analysis-input-zone')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  
  if (isAnalyzing && analysisPromise) {
    return <AnalysisLoadingPage analysisPromise={analysisPromise} />
  }

  return (
    <div className="min-h-screen bg-white text-stone-900 overflow-x-hidden font-['Pretendard']">
      <Header />
      
      {/* 1. 리퀴드 물음표 테마 히어로 구역 */}
      <HeroTitleSection onScrollToInput={handleScrollToInput} />

      {/* 2. 스크롤 스티키 리퀴드 데이터 관통 구역 */}
      <ScrollStickyLiquidSection />

      {/* 3. 호버 시 가려지지 않는 지능형 말풍선 구역 */}
      <IssuesSection />

      {/* 4. 3D 이동 회전 기술 스택 캐러셀 구역 */}
      <TechStackCarousel />

      {/* 5. 텍스트/파일/URL 수집 분석 인풋 대시보드 구역 */}
      <HeroSection onStartAnalysis={handleTriggerLoading} />

      {/* 6. 숫자가 촤르륵 올라가는 실시간 현황 판례 통계 구역 */}
      <RecentAnalysis />

      <Footer />
    </div>
  )
}

export default HomePage