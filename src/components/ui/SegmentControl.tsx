import type { ReactNode } from 'react'

interface SegmentOption {
  id: string
  label: ReactNode    // 텍스트 + 아이콘 같이 들어갈 수 있게
}

interface SegmentControlProps {
  options: SegmentOption[]
  activeId: string
  onChange: (id: string) => void
}

function SegmentControl({ options, activeId, onChange }: SegmentControlProps) {
  return (
    <div className="inline-flex p-1 bg-stone-200/60 rounded-xl gap-1 w-full">
      {options.map((option) => {
        const isActive = activeId === option.id
        
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`
              flex-1 flex items-center justify-center gap-2
              px-4 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive
                ? 'bg-white text-ink shadow-sm'
                : 'bg-transparent text-ink-soft hover:text-ink'
              }
            `}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentControl