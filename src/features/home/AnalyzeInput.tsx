import { useState } from 'react'
import { analyzeTerms, analyzeUrl, analyzeFile } from '../../api/analyses'
import { Link, FileText, Type, UploadCloud, X } from 'lucide-react'

interface AnalyzeInputProps {
  activeTab: 'url' | 'file' | 'text'
  onStartAnalysis: (analyzePromise: Promise<string>) => void
}

type AnalyzeMode = 'url' | 'file' | 'text'

function AnalyzeInput({ activeTab, onStartAnalysis }: AnalyzeInputProps) {
  const [activeMode, setActiveMode] = useState<AnalyzeMode>(activeTab)
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [serviceName, setServiceName] = useState('')
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)

  const modes = [
    { id: 'url', label: 'URL', icon: Link, desc: '약관 페이지 주소를 입력하세요' },
    { id: 'file', label: '파일', icon: FileText, desc: 'PDF, DOCX 파일을 업로드하세요' },
    { id: 'text', label: '텍스트', icon: Type, desc: '약관 내용을 직접 붙여넣으세요' },
  ] as const

  const activeInfo = modes.find((m) => m.id === activeMode)
  const ActiveIcon = activeInfo?.icon ?? Link

  const canAnalyze = () => {
    if (activeMode === 'url') return url.trim().length > 0
    if (activeMode === 'text') return text.trim().length > 0
    if (activeMode === 'file') return file !== null
    return false
  }

  const openNameModal = () => {
    if (!canAnalyze()) return
    setIsNameModalOpen(true)
  }

  const handleAnalyze = () => {
    const session_key = 'testkey'
    const finalServiceName = serviceName.trim() || '제목 없는 약관'

    let promise: Promise<string>

    switch (activeMode) {
      case 'url':
        promise = analyzeUrl({
          service_name: finalServiceName,
          session_key,
          url,
        })
        break

      case 'text':
        promise = analyzeTerms({
          service_name: finalServiceName,
          session_key,
          text,
        })
        break

      case 'file':
        if (!file) return
        promise = analyzeFile(file, finalServiceName, session_key)
        break
    }

    setIsNameModalOpen(false)
    onStartAnalysis(promise)
  }

  return (
    <section className="min-h-screen bg-[#F7F7F8] px-6 py-28 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
          START ANALYSIS
        </span>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900 dark:text-slate-50">
          직접 약관을 분석해보세요
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
          URL, 파일, 텍스트 중 편한 방식으로 약관을 입력하면 AI가 위험 조항을 분석합니다.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-[30px] border border-stone-200 bg-white p-7 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10">
            <ActiveIcon size={28} className="text-sky-600 dark:text-sky-400" />
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            INPUT MODE
          </p>

          <h3 className="mt-2 text-2xl font-black text-stone-900 dark:text-slate-50">
            {activeInfo?.label} 분석
          </h3>

          <p className="mt-3 text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
            {activeInfo?.desc}
          </p>

          <div className="mt-8 space-y-3">
            {modes.map((mode) => {
              const Icon = mode.icon
              const isActive = activeMode === mode.id

              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex w-full items-center gap-3 rounded-[20px] border px-4 py-3 text-left transition-all ${
                    isActive
                      ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300'
                      : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50 hover:text-stone-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-black">{mode.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex min-h-[560px] flex-col rounded-[30px] border border-stone-200 bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          {activeMode === 'url' && (
            <div className="flex-1">
              <div className="h-full rounded-[24px] border border-stone-200 bg-[#FAFAFA] p-6 transition-colors duration-300 dark:border-white/10 dark:bg-white/5">
                <div className="mb-4 flex items-center gap-2 text-sm font-black text-stone-400 dark:text-slate-400">
                  <Link size={17} />
                  URL 입력
                </div>

                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/terms"
                  className="w-full bg-transparent text-lg font-bold text-stone-900 outline-none placeholder:text-stone-300 dark:text-slate-50 dark:placeholder:text-slate-600"
                />
              </div>
            </div>
          )}

          {activeMode === 'file' && (
            <div className="flex-1">
              <label className="flex h-full cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-stone-300 bg-[#FAFAFA] transition hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-50 dark:bg-sky-500/10">
                  <UploadCloud size={30} className="text-sky-600 dark:text-sky-400" />
                </div>

                <span className="text-lg font-black text-stone-900 dark:text-slate-50">
                  파일 업로드
                </span>

                <span className="mt-2 text-sm font-bold text-stone-400 dark:text-slate-400">
                  PDF, DOCX 파일을 업로드하세요
                </span>

                {file && (
                  <p className="mt-5 rounded-full bg-sky-50 px-4 py-2 text-sm font-bold text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                    {file.name}
                  </p>
                )}

                <input
                  type="file"
                  hidden
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          )}

          {activeMode === 'text' && (
            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="약관 내용을 입력하세요..."
                className="h-full w-full resize-none rounded-[24px] border border-stone-200 bg-[#FAFAFA] p-6 text-sm font-bold leading-relaxed text-stone-900 outline-none placeholder:text-stone-300 transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:placeholder:text-slate-600"
              />
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={openNameModal}
              disabled={!canAnalyze()}
              className="rounded-[22px] bg-stone-950 px-8 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none disabled:hover:translate-y-0 dark:bg-sky-500 dark:hover:bg-sky-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
            >
              분석하기
            </button>
          </div>
        </div>
      </div>

      {isNameModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm dark:bg-black/60"
            onClick={() => setIsNameModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-[460px] rounded-[30px] border border-stone-200 bg-white p-7 shadow-[0_30px_80px_rgba(15,23,42,0.18)] transition-colors duration-300 dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <button
              onClick={() => setIsNameModalOpen(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-200 hover:text-stone-900 dark:bg-white/10 dark:text-slate-400 dark:hover:bg-white/15 dark:hover:text-slate-50"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              SAVE ANALYSIS
            </span>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-stone-900 dark:text-slate-50">
              분석 이름을 입력해주세요
            </h3>

            <p className="mt-3 text-sm font-bold leading-relaxed text-stone-500 dark:text-slate-400">
              보관함과 통계에서 사용할 이름입니다. 입력하지 않으면 제목 없는 약관으로 저장됩니다.
            </p>

            <input
              autoFocus
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="예: 카카오 이용약관"
              className="mt-7 h-14 w-full rounded-[20px] border border-stone-200 bg-[#FAFAFA] px-5 text-sm font-bold text-stone-900 outline-none placeholder:text-stone-400 transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-sky-400/40 dark:focus:bg-white/10 dark:focus:ring-sky-400/10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAnalyze()
              }}
            />

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => setIsNameModalOpen(false)}
                className="rounded-[18px] px-5 py-3 text-sm font-black text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-50"
              >
                취소
              </button>

              <button
                onClick={handleAnalyze}
                className="rounded-[18px] bg-stone-950 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-stone-800 dark:bg-sky-500 dark:hover:bg-sky-400"
              >
                분석 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AnalyzeInput