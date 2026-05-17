import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import PageHeader from '../../features/settings/PageHeader'
import SensitivityTuning from '../../features/settings/SensitivityTuning'
import PrivacySection from '../../features/settings/PrivacySection'
import ChromeIntegration from '../../features/settings/ChromeIntegration'
import AccountManagement from '../../features/settings/AccountManagement'

function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <PageHeader />
      <SensitivityTuning />
      <PrivacySection />
      <ChromeIntegration />
      <AccountManagement />

      <Footer />
    </div>
  )
}

export default SettingsPage