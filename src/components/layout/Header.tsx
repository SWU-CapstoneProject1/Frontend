import Tabs from '../ui/Tabs'

interface HeaderProps {
  activeNav: string
  onNavChange: (id: string) => void
}

function Header({ activeNav, onNavChange }: HeaderProps) {
  const navTabs = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'analysis', label: '약관 분석' },
    { id: 'consent', label: '약관 동의' },
  ]

  return (
    <header className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* 좌측: 로고 */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <span className="font-semibold text-ink">Clause AI</span>
        </div>

        {/* 가운데: 네비게이션 탭 */}
        <Tabs
          items={navTabs}
          activeId={activeNav}
          onChange={onNavChange}
          variant="pill"
        />

        {/* 우측: 유저 아바타 */}
        <button className="w-9 h-9 rounded-full bg-ink text-white text-sm font-semibold flex items-center justify-center hover:opacity-90 transition-opacity">
          A
        </button>

      </div>
    </header>
  )
}

export default Header