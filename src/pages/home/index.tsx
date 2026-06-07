import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import ScrollStickyLiquidSection from '../../features/home/ScrollStickyLiquidSection'
import IssuesSection from '../../features/home/IssuesSection'
import TechStackCarousel from '../../features/home/TechStackCarousel'
import HeroSection from '../../features/home/HeroSection'
import RecentAnalysis from '../../features/home/RecentAnalysis'
import AnalyzeInput from '../../features/home/AnalyzeInput'

import AnalysisLoadingPage from '../../components/ui/AnalysisLoadingPage'

function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisPromise, setAnalysisPromise] = useState<Promise<string> | null>(null)

  const handleTriggerLoading = (promise: Promise<string>) => {
    setAnalysisPromise(promise)
    setIsAnalyzing(true)
  }

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

      <HeroSection onScrollToInput={handleScrollToInput} />
      <IssuesSection />
      <ScrollStickyLiquidSection />

      <section id="analysis-input-zone" className="w-full">
        <AnalyzeInput activeTab="url" onStartAnalysis={handleTriggerLoading} />
      </section>

      <TechStackCarousel />
      <RecentAnalysis />

      <Footer />
    </div>
  )
}

export default HomePage