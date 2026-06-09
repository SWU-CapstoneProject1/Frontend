import { RotateCcw, SlidersHorizontal } from 'lucide-react'

interface SensitivityTuningProps {
  sensitivity: number
  onChange: (value: number) => void
  onReset: () => void
}

function SensitivityTuning({
  sensitivity,
  onChange,
  onReset,
}: SensitivityTuningProps) {
  return (
    <section className="rounded-[30px] border border-stone-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
          <SlidersHorizontal size={21} />
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            SENSITIVITY
          </span>

          <h2 className="mt-1 text-xl font-black text-stone-900 dark:text-slate-50">
            내 위험 민감도
          </h2>

          <p className="mt-1 text-sm font-bold text-stone-500 dark:text-slate-400">
            값이 높을수록 더 엄격하게 위험 조항을 감지합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-[26px] border border-sky-100 bg-sky-50/40 p-6 shadow-[0_0_45px_rgba(14,165,233,0.10)] dark:border-sky-400/20 dark:bg-sky-500/10 dark:shadow-[0_0_55px_rgba(56,189,248,0.14)]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-black text-stone-900 dark:text-slate-100">
              위험 감지 민감도
            </p>

            <p className="mt-1 text-xs font-bold text-stone-400 dark:text-slate-500">
              0~100 범위로 분석 기준을 조정합니다.
            </p>
          </div>

          <span className="text-4xl font-black text-sky-500 drop-shadow-[0_0_18px_rgba(14,165,233,0.35)] dark:text-sky-300">
            {sensitivity}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={sensitivity}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            h-4
            w-full
            cursor-pointer
            appearance-none
            rounded-full
            bg-stone-200
            accent-sky-500
            shadow-inner

            [&::-webkit-slider-runnable-track]:h-4
            [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-runnable-track]:bg-stone-200

            [&::-webkit-slider-thumb]:-mt-1.5
            [&::-webkit-slider-thumb]:h-7
            [&::-webkit-slider-thumb]:w-7
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-[5px]
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:bg-sky-500
            [&::-webkit-slider-thumb]:shadow-[0_0_28px_rgba(14,165,233,0.85)]

            dark:[&::-webkit-slider-runnable-track]:bg-white/10
            dark:[&::-webkit-slider-thumb]:border-slate-900
            dark:[&::-webkit-slider-thumb]:bg-sky-400
            dark:[&::-webkit-slider-thumb]:shadow-[0_0_32px_rgba(56,189,248,0.95)]
          "
        />

        <div className="mt-4 flex justify-between text-xs font-black text-stone-400 dark:text-slate-500">
          <span>낮음</span>
          <span>보통</span>
          <span>높음</span>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-stone-200 pt-6 dark:border-white/10">
        <div>
          <p className="text-sm font-black text-stone-900 dark:text-slate-100">
            민감도 기본값 초기화
          </p>
          <p className="mt-1 text-xs font-bold text-stone-400 dark:text-slate-500">
            위험 민감도를 기본값 50으로 되돌립니다.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-2 text-xs font-black text-stone-500 transition hover:bg-stone-50 hover:text-stone-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
        >
          <RotateCcw size={15} />
          초기화
        </button>
      </div>
    </section>
  )
}

export default SensitivityTuning