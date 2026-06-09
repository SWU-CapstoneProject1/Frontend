import { Bell, BellOff, EyeOff, ShieldCheck } from 'lucide-react'

interface PrivacySectionProps {
  excludePersonalData: boolean
  notifications: boolean
  onExcludePersonalDataChange: (checked: boolean) => void
  onNotificationsChange: (checked: boolean) => void
}

function PrivacySection({
  excludePersonalData,
  notifications,
  onExcludePersonalDataChange,
  onNotificationsChange,
}: PrivacySectionProps) {
  return (
    <section className="rounded-[30px] border border-stone-950 bg-stone-950 p-8 shadow-[0_24px_65px_rgba(15,23,42,0.18)] transition-colors duration-300 dark:border-sky-400/20 dark:bg-slate-900 dark:shadow-[0_0_60px_rgba(56,189,248,0.12)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300 shadow-[0_0_28px_rgba(56,189,248,0.18)]">
          <ShieldCheck size={21} />
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-300">
            PRIVACY
          </span>

          <h2 className="mt-1 text-xl font-black text-white">
            개인정보 및 알림
          </h2>

          <p className="mt-1 text-sm font-bold text-white/50">
            분석 결과 표시와 알림 옵션을 관리합니다.
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-5">
        <SettingToggleRow
          icon={<EyeOff size={18} />}
          title="개인정보 항목 제외"
          description="AI 분석 결과에서 개인정보 관련 항목을 제외합니다."
          checked={excludePersonalData}
          onChange={onExcludePersonalDataChange}
        />

        <div className="h-px bg-white/10" />

        <SettingToggleRow
          icon={notifications ? <Bell size={18} /> : <BellOff size={18} />}
          title="알림 설정"
          description="분석 완료 및 위험 초과 시 알림을 받습니다."
          checked={notifications}
          onChange={onNotificationsChange}
        />
      </div>
    </section>
  )
}

interface SettingToggleRowProps {
  icon: React.ReactNode
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function SettingToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: SettingToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-start gap-3">
        <div className="mt-0.5 text-white/40">{icon}</div>

        <div>
          <p className="text-sm font-black text-white">{title}</p>
          <p className="mt-1 text-xs font-bold text-white/40">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked
            ? 'bg-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.55)]'
            : 'bg-white/20'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}

export default PrivacySection