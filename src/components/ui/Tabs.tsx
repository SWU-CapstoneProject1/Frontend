interface TabItem {
  id: string
  label: string
  icon?: any
}

interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  variant?: 'pill' | 'underline'
}

function Tabs({
  items,
  activeId,
  onChange,
  variant = 'pill',
}: TabsProps) {
  if (variant === 'pill') {
    return (
      <div className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-stone-100/80 p-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`
                flex items-center gap-2 rounded-full px-4 py-2
                text-sm font-bold transition-all duration-200
                ${
                  isActive
                    ? 'bg-white text-stone-950 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900'
                }
              `}
            >
              {Icon && (
                <Icon
                  size={16}
                  strokeWidth={2.3}
                />
              )}

              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 border-b border-stone-200">
      {items.map((item) => {
        const isActive = activeId === item.id

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`
              relative px-2 py-2 text-sm font-bold
              transition-colors duration-200
              ${
                isActive
                  ? 'text-stone-950'
                  : 'text-stone-500 hover:text-stone-900'
              }
            `}
          >
            {item.label}

            {isActive && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-stone-950" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs