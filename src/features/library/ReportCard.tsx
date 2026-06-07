import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Trash2,
  Plus,
} from 'lucide-react'

export interface ReportData {
  id: string
  title: string
  date: string
  score: number
  clauseCount: number
  status: '위험' | '주의' | '정상'
}

const statusLabels: Record<'위험' | '주의' | '정상', string> = {
  위험: '위험',
  주의: '주의',
  정상: '안전',
}

const statusColors: Record<'위험' | '주의' | '정상', string> = {
  위험: '#ef4444',
  주의: '#f59e0b',
  정상: '#22c55e',
}

const statusIcons = {
  위험: ShieldX,
  주의: ShieldAlert,
  정상: ShieldCheck,
}

interface ReportCardProps {
  data?: ReportData
  isAddCard?: boolean
  onDelete?: (id: string) => void
}

function ReportCard({ data, isAddCard = false, onDelete }: ReportCardProps) {
  if (isAddCard) {
    return (
      <div className="group relative flex h-[266px] flex-col items-center justify-center rounded-[30px] border border-dashed border-stone-300 bg-white transition hover:border-sky-300 hover:bg-sky-50 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-sky-400/40 dark:hover:bg-sky-500/10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 transition group-hover:scale-105 dark:bg-sky-500/10">
          <Plus size={26} className="text-sky-600 dark:text-sky-400" />
        </div>

        <span className="text-sm font-black text-stone-900 dark:text-slate-50">
          새 분석 추가
        </span>

        <p className="mt-1 text-xs font-bold text-stone-400 dark:text-slate-500">
          새로운 약관 분석 시작하기
        </p>
      </div>
    )
  }

  if (!data) return null

  const currentStatus = data.status
  const StatusIcon = statusIcons[currentStatus]

  return (
    <div className="relative flex h-[266px] flex-col justify-between rounded-[30px] border border-stone-200 bg-white p-6 shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:hover:bg-slate-900">
      <div>
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black"
          style={{
            backgroundColor: `${statusColors[currentStatus]}22`,
            color: statusColors[currentStatus],
          }}
        >
          <StatusIcon size={14} />
          {statusLabels[currentStatus]}
        </div>

        <h4 className="mt-4 text-xl font-black tracking-tight text-stone-900 dark:text-slate-50">
          {data.title}
        </h4>

        <p className="mt-1 text-xs font-bold text-stone-400 dark:text-slate-500">
          {data.date}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1 text-xs font-bold text-stone-500 dark:text-slate-400">
          <span>위험도</span>
          <span
            className="font-black"
            style={{ color: statusColors[currentStatus] }}
          >
            {data.score}
          </span>
          <span className="ml-2 text-stone-400 dark:text-slate-500">
            조항 {data.clauseCount}개
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${data.score}%`,
              backgroundColor: statusColors[currentStatus],
            }}
          />
        </div>
      </div>

      <div className="border-t border-stone-100 pt-4 dark:border-white/10">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.(data.id)
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 py-3 text-sm font-black text-red-500 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
        >
          <Trash2 size={15} />
          삭제하기
        </button>
      </div>
    </div>
  )
}

export default ReportCard