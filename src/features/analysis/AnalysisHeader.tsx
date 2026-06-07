import { useState } from 'react'
import { Bookmark, Download, ShieldAlert, FileText, AlertTriangle, Clock } from 'lucide-react'
import type { AnalysisReport } from '../../types'
import { downloadAnalysisPdf } from '../../api/analyses'

interface AnalysisHeaderProps {
  report: AnalysisReport
  onBookmark: () => Promise<void>
}

function AnalysisHeader({ report, onBookmark }: AnalysisHeaderProps) {
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false)

  const handleDownloadPdf = async () => {
    setIsPdfLoading(true)
    try {
      await downloadAnalysisPdf(report.id)
    } catch (e) {
      alert('PDF 다운로드에 실패했습니다.')
    } finally {
      setIsPdfLoading(false)
    }
  }

  const handleBookmark = async () => {
    if (isBookmarked) return
    setIsBookmarkLoading(true)
    try {
      await onBookmark()
      setIsBookmarked(true)
    } finally {
      setIsBookmarkLoading(false)
    }
  }

  const dangerCount = report.clauses.filter((c) => c.risk === 'danger').length
  const warningCount = report.clauses.filter((c) => c.risk === 'warning').length

  const stats = [
    {
      label: '위험도',
      value: `${report.riskScore}점`,
      icon: ShieldAlert,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-500/10',
    },
    {
      label: '전체 조항',
      value: `${report.totalClauses}개`,
      icon: FileText,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-50 dark:bg-sky-500/10',
    },
    {
      label: '위험 / 주의',
      value: `${dangerCount}개 / ${warningCount}개`,
      icon: AlertTriangle,
      color:
        dangerCount > 0
          ? 'text-red-600 dark:text-red-400'
          : warningCount > 0
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-stone-600 dark:text-slate-400',
      bg:
        dangerCount > 0
          ? 'bg-red-50 dark:bg-red-500/10'
          : warningCount > 0
            ? 'bg-amber-50 dark:bg-amber-500/10'
            : 'bg-stone-100 dark:bg-white/10',
    },
    {
      label: '분석 일시',
      value: report.lastAnalyzed,
      icon: Clock,
      color: 'text-stone-500 dark:text-slate-400',
      bg: 'bg-stone-100 dark:bg-white/10',
    },
  ]

  return (
    <div className="mb-10 rounded-[34px] border border-stone-200 bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.07)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="mb-7 flex items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-sky-50 transition-colors duration-300 dark:bg-sky-500/10">
            <span className="text-2xl font-black text-sky-600 dark:text-sky-400">
              {report.initial}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              ANALYSIS REPORT
            </span>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 dark:text-slate-50">
              {report.name}
            </h2>

            <p className="mt-2 max-w-xl text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
              {report.summary}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleBookmark}
            disabled={isBookmarkLoading || isBookmarked}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-black text-stone-500 transition hover:bg-sky-50 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-sky-500/10 dark:hover:text-sky-300"
          >
            <Bookmark size={15} />
            {isBookmarkLoading ? '저장 중...' : isBookmarked ? '저장됨' : '보관함'}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isPdfLoading}
            className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-xs font-black text-white transition hover:bg-stone-800 disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            <Download size={15} />
            {isPdfLoading ? '다운로드 중...' : 'PDF'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded-[24px] border border-stone-200 bg-[#FAFAFA] p-5 transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${stat.bg}`}>
                <Icon size={19} className={stat.color} />
              </div>

              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-slate-500">
                {stat.label}
              </p>

              <p className={`text-lg font-black ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AnalysisHeader