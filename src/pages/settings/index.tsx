import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

import PageHeader from '../../features/settings/PageHeader'
import SensitivityTuning from '../../features/settings/SensitivityTuning'
import PrivacySection from '../../features/settings/PrivacySection'
import ChromeIntegration from '../../features/settings/ChromeIntegration'

import {
  getUserSettings,
  updateUserSettings,
  type UserSettings,
} from '../../api/settings'

const SESSION_KEY = 'testkey'

const DEFAULT_SETTINGS: UserSettings = {
  session_key: SESSION_KEY,
  risk_sensitivity: 50,
  notifications: false,
  theme: 'system',
  exclude_personal_data: false,
}

function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getUserSettings(SESSION_KEY)
        setSettings(data)
      } catch (e) {
        console.error(e)
        setSettings(DEFAULT_SETTINGS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSetting = <K extends keyof UserSettings>(
    key: K,
    value: UserSettings[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))

    setIsSaved(false)
  }

  const handleReset = () => {
    updateSetting('risk_sensitivity', 50)
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      const saved = await updateUserSettings(SESSION_KEY, {
        risk_sensitivity: settings.risk_sensitivity,
        notifications: settings.notifications,
        theme: settings.theme,
        exclude_personal_data: settings.exclude_personal_data,
      })

      setSettings(saved)
      setIsSaved(true)

      if (saved.notifications && Notification.permission === 'default') {
        await Notification.requestPermission()
      }
    } catch (e) {
      console.error(e)
      alert('설정 저장에 실패했습니다.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] font-['Pretendard'] dark:bg-slate-950">
        <Header />
        <main className="mx-auto max-w-6xl px-6 pt-24">
          <div className="rounded-[30px] border border-stone-200 bg-white p-8 text-sm font-black text-stone-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400">
            설정을 불러오는 중입니다...
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8] font-['Pretendard'] text-stone-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-24">
        <PageHeader />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <SensitivityTuning
            sensitivity={settings.risk_sensitivity}
            onChange={(value) => updateSetting('risk_sensitivity', value)}
            onReset={handleReset}
          />

          <PrivacySection
            excludePersonalData={settings.exclude_personal_data}
            notifications={settings.notifications}
            onExcludePersonalDataChange={(value) =>
              updateSetting('exclude_personal_data', value)
            }
            onNotificationsChange={(value) =>
              updateSetting('notifications', value)
            }
          />

          <ChromeIntegration />
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          {isSaved && (
            <span className="text-xs font-black text-emerald-500">
              저장되었습니다.
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-[20px] bg-stone-950 px-6 py-3 text-sm font-black text-white transition hover:bg-stone-800 disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            <Save size={16} />
            {isSaving ? '저장 중...' : '설정 저장'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default SettingsPage