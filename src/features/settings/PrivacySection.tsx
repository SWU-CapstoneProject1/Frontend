import { useState } from 'react'

import Card from '../../components/ui/Card'
import Toggle from '../../components/ui/Toggle'

function PrivacySection() {
  const [privacyOptOut, setPrivacyOptOut] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <section className="px-6 py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 섹션 제목 */}
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
          <span>🔔</span>
          개인정보 및 알림
        </h2>

        {/* 옵션 카드 */}
        <Card variant="glass">
          <div className="space-y-5">
            
            {/* 개인정보 제공 동의 */}
            <SettingRow
              icon="👁"
              title="개인정보 제공 동의 토글"
              description="AI 분석 시 개인정보 카테고리를 결과에서 제외합니다"
              checked={privacyOptOut}
              onChange={setPrivacyOptOut}
            />

            {/* 구분선 */}
            <div className="h-px bg-stone-200/60" />

            {/* 알림 설정 */}
            <SettingRow
              icon="🔔"
              title="알림 설정"
              description="분석 완료, 위험 초과 시 새 약관 감지 항목 알림"
              checked={notifications}
              onChange={setNotifications}
            />

          </div>
        </Card>
      </div>
    </section>
  )
}

// 헬퍼 컴포넌트: 한 줄 설정 행
interface SettingRowProps {
  icon: string
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function SettingRow({ icon, title, description, checked, onChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <span className="text-lg mt-0.5">{icon}</span>
        <div>
          <p className="font-medium text-ink">{title}</p>
          <p className="text-xs text-ink-soft mt-0.5">{description}</p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export default PrivacySection