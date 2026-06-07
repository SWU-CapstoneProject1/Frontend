import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { House, Archive, Sun, Moon } from 'lucide-react'

import Tabs from '../ui/Tabs'
import logoImg from '../../assets/images/logo_terms_agree.png'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const navTabs = [
    {
      id: 'dashboard',
      label: '홈',
      icon: House,
      path: '/',
    },
    {
      id: 'library',
      label: '보관함',
      icon: Archive,
      path: '/library',
    },
  ]

  const getActiveTab = () => {
    const currentPath = location.pathname

    const exactMatch = navTabs.find((tab) => tab.path === currentPath)
    if (exactMatch) return exactMatch.id

    const partialMatch = navTabs.find(
      (tab) => tab.path !== '/' && currentPath.startsWith(tab.path)
    )
    if (partialMatch) return partialMatch.id

    if (currentPath.startsWith('/analysis')) return ''

    return 'dashboard'
  }

  const handleNavChange = (id: string) => {
    const tab = navTabs.find((t) => t.id === id)
    if (tab) navigate(tab.path)
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const isDark = theme === 'dark'

  return (
    <header className="fixed left-0 right-0 top-0 z-[999] border-b border-stone-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden">
            <img
              src={logoImg}
              alt="약간동의"
              className="h-8 w-8 object-contain rounded-xl"
            />
          </div>

          <div className="flex flex-col items-start leading-none">
            <span className="text-sm font-black tracking-tight text-stone-950">
              약간동의
            </span>
          </div>
        </button>

        <Tabs
          items={navTabs}
          activeId={getActiveTab()}
          onChange={handleNavChange}
          variant="pill"
        />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="테마 변경"
          className={`
            relative flex h-10 w-10 items-center justify-center rounded-full
            border transition-all duration-300
            ${
              isDark
                ? 'border-indigo-200/70 bg-indigo-50 text-indigo-500 shadow-[0_8px_24px_rgba(99,102,241,0.16)]'
                : 'border-amber-200/80 bg-amber-50 text-amber-500 shadow-[0_8px_24px_rgba(245,158,11,0.14)]'
            }
          `}
        >
          <span className="absolute inset-0 rounded-full bg-white/35" />

          {isDark ? (
            <Moon size={18} strokeWidth={2.4} className="relative z-10" />
          ) : (
            <Sun size={18} strokeWidth={2.4} className="relative z-10" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header