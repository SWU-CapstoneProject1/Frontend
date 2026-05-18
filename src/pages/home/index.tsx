import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import HeroSection from '../../features/home/HeroSection'
import RecentAnalysis from '../../features/home/RecentAnalysis'
import DashboardSection from '../../features/home/DashboardSection'
import IssuesSection from '../../features/home/IssuesSection'
import PhilosophySection from '../../features/home/PhilosophySection'
import HowItWorksSection from '../../features/home/HowItWorksSection'

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
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