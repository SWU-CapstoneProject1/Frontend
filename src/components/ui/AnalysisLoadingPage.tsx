import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAnalysisProgress } from '../../api/analyses'
import type { AnalysisProgress } from '../../api/analyses'

interface AnalysisLoadingPageProps {
  analysisPromise: Promise<string>
}

function AnalysisLoadingPage({ analysisPromise }: AnalysisLoadingPageProps) {
  const navigate = useNavigate()

  const [jobId, setJobId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('분석 작업을 준비하고 있습니다.')
  const [stage, setStage] = useState('queued')
  const [currentInfo, setCurrentInfo] = useState<AnalysisProgress | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    analysisPromise
      .then((id) => {
        console.log('받은 job_id:', id)
        setJobId(id)
      })
      .catch((err) => {
        console.error(err)
        setError('분석 시작 중 오류가 발생했습니다.')
      })
  }, [analysisPromise])

  useEffect(() => {
    if (!jobId || error) return

    let stopped = false

    const poll = async () => {
      if (stopped) return

      try {
        const data = await getAnalysisProgress(jobId)

        if (stopped) return

        setCurrentInfo(data)
        setProgress(data.progress_percent ?? 0)
        setStage(data.stage)
        setMessage(data.message || '분석을 진행하고 있습니다.')

        if (data.status === 'done' || data.status === 'completed') {
          stopped = true
          setProgress(100)
          setMessage('분석이 완료되었습니다. 리포트로 이동합니다.')

          setTimeout(() => {
            navigate(`/analysis/${jobId}`)
          }, 900)

          return
        }

        if (data.status === 'failed') {
          stopped = true
          setError(data.message || '분석 도중 오류가 발생했습니다.')
        }
      } catch (err) {
        console.error(err)
        stopped = true
        setError('진행률을 불러오는 중 오류가 발생했습니다.')
      }
    }

    poll()

    const timer = setInterval(poll, 900)

    return () => {
      stopped = true
      clearInterval(timer)
    }
  }, [jobId, navigate, error])

  const stageLabel: Record<string, string> = {
    queued: '분석 대기 중',
    extracting_url: 'URL 본문 추출 중',
    extracting_file: '파일 텍스트 추출 중',
    preparing: '분석 준비 중',
    splitting: '약관 조항 분리 중',
    classifying: '위험도 분류 중',
    retrieving_precedents: '관련 판례 검색 중',
    generating_explanation: 'AI 설명 생성 중',
    summarizing: '전체 요약 계산 중',
    saving: '결과 저장 중',
    completed: '완료',
    failed: '실패',
  }

  const shouldShowClauseScan =
    Boolean(currentInfo) &&
    Number(currentInfo?.total_clauses) > 0 &&
    Number(currentInfo?.current_clause) > 0

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#F7F7F8] px-6 font-['Pretendard'] transition-colors duration-300 dark:bg-slate-950">
      <div className="w-full max-w-2xl rounded-[34px] border border-stone-200 bg-white p-9 shadow-[0_30px_90px_rgba(15,23,42,0.10)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/90 dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              ANALYSIS IN PROGRESS
            </span>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-stone-900 dark:text-slate-50">
              약관을 분석하고 있습니다
            </h1>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10 dark:shadow-[0_0_35px_rgba(56,189,248,0.18)]">
            <motion.div
              className="h-5 w-5 rounded-full bg-sky-500 dark:bg-sky-400"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-black text-stone-900 dark:text-slate-100">
              {error ? '오류 발생' : stageLabel[stage] ?? '분석 진행 중'}
            </p>

            <p className="mt-2 text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
              {error || message}
            </p>
          </div>

          <span className="text-4xl font-black tracking-tight text-stone-900 dark:text-slate-50">
            {Math.min(progress, 100)}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-sky-500 dark:bg-sky-400 dark:shadow-[0_0_25px_rgba(56,189,248,0.45)]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {shouldShowClauseScan && (
          <div className="mt-6 rounded-[24px] border border-stone-200 bg-[#FAFAFA] p-5 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-sky-600 dark:text-sky-400">
                CLAUSE SCAN
              </span>

              <span className="text-xs font-black text-stone-400 dark:text-slate-500">
                {currentInfo?.current_clause} / {currentInfo?.total_clauses}
              </span>
            </div>

            {currentInfo?.current_clause_title && (
              <h3 className="mt-3 text-base font-black text-stone-900 dark:text-slate-100">
                {currentInfo.current_clause_title}
              </h3>
            )}

            {currentInfo?.current_clause_preview && (
              <p className="mt-2 line-clamp-2 text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
                {currentInfo.current_clause_preview}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={() => {
                navigate('/', { replace: true })
              }}
              className="rounded-[20px] bg-stone-950 px-6 py-3 text-sm font-black text-white transition-all duration-300 hover:bg-stone-800 dark:border dark:border-white/10 dark:bg-white/10 dark:hover:border-sky-400/40 dark:hover:bg-sky-500 dark:hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalysisLoadingPage