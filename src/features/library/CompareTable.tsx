import { useState } from 'react'
import { GitCompareArrows } from 'lucide-react'
import type { ReportData } from './ReportCard'

type BadgeStatus = '위험' | '주의' | '정상'

interface CompareTableProps {
  reports: ReportData[]
}

const riskColors = {
  위험: '#ef4444',
  주의: '#f59e0b',
  정상: '#22c55e',
}

function CompareTable({ reports }: CompareTableProps) {
  const [selectedIdA, setSelectedIdA] = useState(reports[0]?.id ?? '')
  const [selectedIdB, setSelectedIdB] = useState(reports[1]?.id ?? '')

  const serviceA = reports.find((r) => r.id === selectedIdA)
  const serviceB = reports.find((r) => r.id === selectedIdB)

  const getStatusByScore = (score: number, offset: number): BadgeStatus => {
    const mockScore = (score + offset) % 100
    if (mockScore > 65) return '위험'
    if (mockScore > 35) return '주의'
    return '정상'
  }

  const categories = [
    '자동결제',
    '개인정보 활용',
    '환불 면책',
    '콘텐츠 저작권',
    '계정 해지',
  ]

  return (
    <div className="mt-12 rounded-[30px] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="mb-6 flex items-start justify-between gap-5 border-b border-stone-200 pb-5 transition-colors duration-300 dark:border-white/10">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10">
            <GitCompareArrows
              size={21}
              className="text-sky-600 dark:text-sky-400"
            />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              COMPARE
            </span>

            <h3 className="mt-1 text-xl font-black text-stone-900 dark:text-slate-50">
              동종 서비스 약관 비교
            </h3>

            <p className="mt-1 text-sm font-bold text-stone-500 dark:text-slate-400">
              유사한 서비스의 약관을 비교하여 인사이트를 얻으세요.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <select
            value={selectedIdA}
            onChange={(e) => setSelectedIdA(e.target.value)}
            className="h-10 rounded-2xl border border-stone-200 bg-white px-3 text-xs font-bold text-stone-600 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:focus:border-sky-400/40 dark:focus:ring-sky-400/10"
          >
            {reports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>

          <select
            value={selectedIdB}
            onChange={(e) => setSelectedIdB(e.target.value)}
            className="h-10 rounded-2xl border border-stone-200 bg-white px-3 text-xs font-bold text-stone-600 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:focus:border-sky-400/40 dark:focus:ring-sky-400/10"
          >
            {reports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-stone-200 text-xs font-black uppercase tracking-widest text-stone-400 dark:border-white/10 dark:text-slate-500">
              <th className="w-1/3 pb-3">카테고리</th>
              <th className="w-1/3 pb-3 dark:text-slate-300">
                {serviceA?.title ?? '서비스 A'}
              </th>
              <th className="w-1/3 pb-3 dark:text-slate-300">
                {serviceB?.title ?? '서비스 B'}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 text-sm dark:divide-white/5">
            {categories.map((category, index) => {
              const statusA = getStatusByScore(
                serviceA?.score ?? 0,
                index * 15
              )

              const statusB = getStatusByScore(
                serviceB?.score ?? 0,
                index * 25
              )

              return (
                <tr
                  key={category}
                  className="transition hover:bg-sky-50/40 dark:hover:bg-white/[0.03]"
                >
                  <td className="py-4 font-bold text-stone-600 dark:text-slate-300">
                    {category}
                  </td>

                  <td
                    className="py-4 font-black"
                    style={{ color: riskColors[statusA] }}
                  >
                    {statusA}
                  </td>

                  <td
                    className="py-4 font-black"
                    style={{ color: riskColors[statusB] }}
                  >
                    {statusB}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompareTable