import { Activity, UsersRound } from 'lucide-react'
import type { HistoryItem } from '../../api/library'

interface AnalysisHistorySectionProps {
  histories: HistoryItem[]
  onClickItem: (jobId: string) => void
}

function getStatusFromScore(score: number): '위험' | '주의' | '정상' {
  if (score >= 60) return '위험'
  if (score >= 30) return '주의'
  return '정상'
}

function AnalysisHistorySection({
  histories,
  onClickItem,
}: AnalysisHistorySectionProps) {
  return (
    <section className="mt-14 overflow-hidden rounded-[34px] border border-stone-200 bg-stone-950 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.16)] transition-colors duration-300 dark:border-sky-400/20 dark:bg-slate-900 dark:shadow-[0_0_70px_rgba(56,189,248,0.10)]">
      <div className="mb-7 flex items-start justify-between gap-6 border-b border-white/10 pb-6">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.16)]">
            <Activity size={22} />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300">
              LIVE ANALYSIS FEED
            </span>

            <h3 className="mt-1 text-2xl font-black text-white">
              실시간 분석 피드
            </h3>

            <p className="mt-1 text-sm font-bold text-white/50">
              사용자들이 최근 분석한 약관 결과입니다.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black text-white/60 sm:flex">
          <UsersRound size={14} className="text-sky-300" />
          공용 피드
        </div>
      </div>

      {histories.length === 0 ? (
        <div className="rounded-[26px] border border-dashed border-white/15 bg-white/[0.04] p-8 text-center">
          <p className="text-sm font-bold text-white/45">
            아직 분석된 기록이 없습니다.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {histories.map((item, index) => {
            const status = getStatusFromScore(item.risk_score)
            const clauseCount = item.clauses?.length ?? 0

            const statusStyle =
              status === '위험'
                ? 'bg-red-500/15 text-red-300 ring-red-400/20'
                : status === '주의'
                  ? 'bg-amber-500/15 text-amber-300 ring-amber-400/20'
                  : 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/20'

            const dotStyle =
              status === '위험'
                ? 'bg-red-400'
                : status === '주의'
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'

            return (
              <div
                key={item.job_id}
                onClick={() => onClickItem(item.job_id)}
                className="group flex cursor-pointer items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:border-sky-300/30 hover:bg-sky-400/[0.08] hover:shadow-[0_0_35px_rgba(56,189,248,0.10)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-sm font-black text-white/20 group-hover:text-sky-300 sm:flex">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-black text-white">
                      {item.service_name || '이름 없는 서비스'}
                    </h4>

                    <p className="mt-1 text-xs font-bold text-white/40">
                      조항 {clauseCount}개
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ring-1 ${statusStyle}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${dotStyle}`} />
                    {status}
                  </span>

                  <span className="min-w-[42px] text-right text-sm font-black text-white">
                    {item.risk_score}점
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default AnalysisHistorySection