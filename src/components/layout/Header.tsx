import { useLocation, useNavigate } from 'react-router-dom'

import Tabs from '../ui/Tabs'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  // TODO: /analysis, /archive 페이지 미구현 상태
  // 해당 탭 클릭 시 404 발생 — 별도 PR에서 페이지 추가 예정
  
  const navTabs = [
    { id: 'dashboard', label: '대시보드', path: '/' },
    { id: 'analysis', label: '약관 분석', path: '/analysis' },
    { id: 'archive', label: '보관함', path: '/archive' },
    { id: 'settings', label: '설정', path: '/settings' },
  ]

  // URL에 따라 활성 탭 자동 결정
  const getActiveTab = () => {
    const currentPath = location.pathname
    
    // 정확히 매칭
    const exactMatch = navTabs.find(tab => tab.path === currentPath)
    if (exactMatch) return exactMatch.id
    
    // 부분 매칭 (예: /analysis/netflix 도 analysis 탭으로 인식)
    const partialMatch = navTabs.find(tab => 
      tab.path !== '/' && currentPath.startsWith(tab.path)
    )
    if (partialMatch) return partialMatch.id
    
    // 기본값
    return 'dashboard'
  }

  const handleNavChange = (id: string) => {
    const tab = navTabs.find(t => t.id === id)
    if (tab) {
      navigate(tab.path)
    }
  }

  return (
    <header className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* 좌측: 로고 */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <span className="font-semibold text-ink">Clause AI</span>
        </button>

        {/* 가운데: 네비게이션 탭 */}
        <Tabs
          items={navTabs}
          activeId={getActiveTab()}
          onChange={handleNavChange}
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