import { useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../ui/Tabs'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const navTabs = [
    { id: 'dashboard', label: '대시보드', path: '/' },
    { id: 'library', label: '보관함', path: '/library' },
    { id: 'settings', label: '설정', path: '/settings' },
  ]

  // URL에 따라 활성 탭 자동 결정
  const getActiveTab = () => {
    const currentPath = location.pathname
    
    // 정확히 매칭되는 메인 탭 확인
    const exactMatch = navTabs.find(tab => tab.path === currentPath)
    if (exactMatch) return exactMatch.id
    
    // 부분 매칭 처리 (/library 등 하위 페이지 고려)
    const partialMatch = navTabs.find(tab => 
      tab.path !== '/' && currentPath.startsWith(tab.path)
    )
    if (partialMatch) return partialMatch.id
    
    
    if (currentPath.startsWith('/analysis')) return ''
    
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