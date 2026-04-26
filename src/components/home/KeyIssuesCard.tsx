import { keyIssues } from '../../constants/mockData'
import Card from '../ui/Card'

function KeyIssuesCard() {
  return (
    <Card variant="solid-dark" className="h-full">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
          <span>📋</span>
          주요 이슈
        </h3>
        <button className="text-xs text-white/60 hover:text-white transition-colors">
          전체 보기 →
        </button>
      </div>

      {/* 이슈 리스트 */}
      <div className="space-y-3">
        {keyIssues.map((issue, index) => (
          <IssueRow key={issue.id} issue={issue} index={index} />
        ))}
      </div>

    </Card>
  )
}

// 한 줄짜리 이슈 행 (같은 파일 내 헬퍼)
import type { KeyIssue } from '../../types'

interface IssueRowProps {
  issue: KeyIssue
  index: number
}

function IssueRow({ issue, index }: IssueRowProps) {
  // 트렌드가 양수면 빨강(증가=나쁨), 음수면 초록(감소=좋음)
  const isUp = issue.trend > 0
  const trendColor = isUp ? 'text-danger' : 'text-safe'
  const trendSymbol = isUp ? '↗' : '↘'

  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/10 last:border-0">
      
      {/* 인덱스 번호 */}
      <span className="text-xs text-white/40 w-6">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* 이슈 타이틀 */}
      <span className="flex-1 text-sm text-white/90">
        {issue.title}
      </span>

      {/* 카운트 */}
      <span className="text-sm font-semibold text-white">
        {issue.count}
      </span>

      {/* 트렌드 */}
      <span className={`text-xs font-medium w-12 text-right ${trendColor}`}>
        {trendSymbol} {Math.abs(issue.trend)}%
      </span>

    </div>
  )
}

export default KeyIssuesCard