import { useState } from 'react'

import Card from '../../components/ui/Card'
import SegmentControl from '../../components/ui/SegmentControl'

function AccountManagement() {
  const [theme, setTheme] = useState('light')

  const themeOptions = [
    { id: 'light', label: <>☀️ 라이트</> },
    { id: 'dark', label: <>🌙 다크</> },
  ]

  const handleLogout = () => {
    // TODO: 백엔드 연동 시 JWT 토큰 삭제 + 세션 종료
    alert('로그아웃되었습니다.')
  }

  const handleWithdraw = () => {
    // TODO: 백엔드 연동 시 회원 탈퇴 API 호출
    const confirmed = window.confirm('정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')
    if (confirmed) {
      alert('탈퇴 처리되었습니다.')
    }
  }

  return (
    <section className="px-6 py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 섹션 제목 */}
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
          <span>👤</span>
          계정 관리
        </h2>

        <Card variant="glass" className="space-y-5">
          
          {/* 화면 테마 */}
          <div>
            <p className="font-semibold text-ink">화면 테마</p>
            <p className="text-xs text-ink-soft mt-0.5 mb-3">
              시스템 설정을 따르거나 직접 선택하세요
            </p>
            <SegmentControl
              options={themeOptions}
              activeId={theme}
              onChange={setTheme}
            />
          </div>

          {/* 구분선 */}
          <div className="h-px bg-stone-200/60" />

          {/* 로그아웃 행 */}
          <ActionRow
            icon="➡️"
            title="로그아웃"
            description="JWT 토큰 삭제 및 세션을 종료합니다"
            actionLabel="로그아웃"
            onAction={handleLogout}
            variant="default"
          />

          {/* 구분선 */}
          <div className="h-px bg-stone-200/60" />

          {/* 회원 탈퇴 행 */}
          <ActionRow
            icon="❌"
            title="회원 탈퇴"
            description="회원 탈퇴 및 데이터가 삭제됩니다"
            actionLabel="탈퇴하기"
            onAction={handleWithdraw}
            variant="danger"
          />

        </Card>
      </div>
    </section>
  )
}

// 헬퍼: 액션 행 컴포넌트
interface ActionRowProps {
  icon: string
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  variant: 'default' | 'danger'
}

function ActionRow({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  variant 
}: ActionRowProps) {
  // variant에 따라 버튼 스타일 결정
  const buttonStyles = {
    default: 'bg-white text-ink hover:bg-stone-50 border-stone-200',
    danger: 'bg-danger/10 text-danger hover:bg-danger/15 border-danger/20',
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <span className="text-lg mt-0.5">{icon}</span>
        <div>
          <p className="font-medium text-ink">{title}</p>
          <p className="text-xs text-ink-soft mt-0.5">{description}</p>
        </div>
      </div>

      <button
        onClick={onAction}
        className={`
          px-5 py-2 rounded-lg text-sm font-medium 
          border transition-colors
          ${buttonStyles[variant]}
        `}
      >
        {actionLabel}
      </button>
    </div>
  )
}

export default AccountManagement