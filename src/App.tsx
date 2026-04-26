import { useState } from 'react'
import Header from './components/layout/Header'
import HeroSection from './components/home/HeroSection'
import RecentAnalysis from './components/home/RecentAnalysis'
import DashboardSection from './components/home/DashboardSection'
import IssuesSection from './components/home/IssuesSection'
import PhilosophySection from './components/home/PhilosophySection'
import HowItWorksSection from './components/home/HowItWorksSection'
import Footer from './components/layout/Footer'

function App() {
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

export default App