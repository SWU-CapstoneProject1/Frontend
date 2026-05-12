interface TabItem {
  id: string         // 내부 식별자
  label: string      // 화면에 보이는 이름
}

interface TabsProps {
  items: TabItem[]              // 탭 목록
  activeId: string              // 현재 활성 탭의 id
  onChange: (id: string) => void // 탭 클릭 시 호출되는 함수
  variant?: 'pill' | 'underline'
}

function Tabs({ items, activeId, onChange, variant = 'pill' }: TabsProps) {
  if (variant === 'pill') {
    // 알약 모양 탭 (헤더 네비게이션용)
    return (
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/40 backdrop-blur-md border border-white/50">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium
              transition-all duration-200
              ${activeId === item.id
                ? 'bg-white text-ink shadow-sm'
                : 'text-ink-soft hover:text-ink'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }

  // 밑줄 탭 (입력 모드용)
  return (
    <div className="flex items-center gap-4 border-b border-stone-200">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`
            px-2 py-2 text-sm font-medium relative
            transition-colors duration-200
            ${activeId === item.id
              ? 'text-ink'
              : 'text-ink-soft hover:text-ink'
            }
          `}
        >
          {item.label}
          {/* 활성 탭에만 밑줄 표시 */}
          {activeId === item.id && (
            <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-ink" />
          )}
        </button>
      ))}
    </div>
  )
}

export default Tabs