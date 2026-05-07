import { useState } from 'react'
import Header from '../../components/layout/Header'
import HeroSection from '../../features/home/HeroSection'
import RecentAnalysis from '../../features/home/RecentAnalysis'
import DashboardSection from '../../features/home/DashboardSection'
import IssuesSection from '../../features/home/IssuesSection'
import PhilosophySection from '../../features/home/PhilosophySection'
import HowItWorksSection from '../../features/home/HowItWorksSection'
import Footer from '../../components/layout/Footer'

function HomePage() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="min-h-screen">
      <Header
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />
      <HeroSection />
      <RecentAnalysis />
      <DashboardSection />
      <IssuesSection />
      <PhilosophySection />
      <HowItWorksSection />
      <Footer />
    </div>
  )
}

export default HomePage