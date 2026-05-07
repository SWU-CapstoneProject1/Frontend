interface SectionHeaderProps {
  icon: string        // 이모지 아이콘 
  title: string       // 섹션 제목
  onMore?: () => void // 전체보기 클릭 핸들러 (없으면 버튼 안 보임)
  moreLabel?: string  // 전체보기 버튼 텍스트 (기본값: "전체 보기 →")
}

function SectionHeader({ icon, title, onMore, moreLabel = '전체 보기 →' }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* 좌측: 아이콘 + 제목 */}
      <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span>{icon}</span>
        {title}
      </h2>

      {/* 우측: 전체보기 버튼 (onMore 있을 때만 표시) */}
      {onMore && (
        <button
          onClick={onMore}
          className="text-xs text-ink-soft hover:text-ink transition-colors"
        >
          {moreLabel}
        </button>
      )}
    </div>
  )
}

export default SectionHeader