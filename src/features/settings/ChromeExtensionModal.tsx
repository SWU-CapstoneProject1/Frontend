import { X, Download, Globe, FolderOpen, Puzzle, RefreshCw } from 'lucide-react'

interface ChromeExtensionModalProps {
  open: boolean
  onClose: () => void
}

function ChromeExtensionModal({
  open,
  onClose,
}: ChromeExtensionModalProps) {
  if (!open) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/chrome-extension.zip'
    link.download = 'yakgandongui-chrome-extension.zip'
    link.click()
  }

  const steps = [
    {
      icon: Download,
      title: '확장프로그램 zip 다운로드',
      desc: '아래 버튼을 눌러 시연용 파일을 다운로드합니다.',
    },
    {
      icon: FolderOpen,
      title: '압축 풀기',
      desc: '다운로드한 zip 파일을 반드시 압축 해제해주세요.',
    },
    {
      icon: Puzzle,
      title: 'chrome://extensions 접속',
      desc: '개발자 모드를 켠 뒤 “압축해제된 확장 프로그램 로드”를 선택합니다.',
    },
    {
      icon: RefreshCw,
      title: '압축 해제한 폴더 선택',
      desc: 'chrome-extension 폴더를 선택하면 설치가 완료됩니다.',
    },
  ]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] border border-stone-200 bg-white p-7 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-slate-900">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-500/10">
              <Globe size={22} className="text-sky-600 dark:text-sky-400" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                CHROME GUARD
              </span>

              <h2 className="mt-1 text-xl font-black text-stone-900 dark:text-slate-50">
                시연용 확장프로그램 설치
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-stone-100 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="rounded-[24px] border border-sky-100 bg-sky-50/70 p-5 dark:border-sky-400/20 dark:bg-sky-500/10">
          <p className="text-sm font-bold leading-relaxed text-stone-600 dark:text-slate-300">
            크롬 웹 가드는 시연용 확장프로그램입니다. 파일을 다운로드한 뒤
            압축을 풀고 Chrome 확장 프로그램 페이지에서 직접 로드해주세요.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className="flex gap-3 rounded-2xl border border-stone-200 bg-[#FAFAFA] p-4 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-white dark:bg-sky-500">
                  <Icon size={16} />
                </div>

                <div>
                  <p className="text-sm font-black text-stone-900 dark:text-slate-100">
                    {index + 1}. {step.title}
                  </p>

                  <p className="mt-1 text-xs font-bold leading-relaxed text-stone-500 dark:text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-stone-100 p-4 dark:bg-white/5">
          <p className="text-xs font-bold leading-relaxed text-stone-500 dark:text-slate-400">
            주의: zip 파일 자체를 선택하는 것이 아니라, 압축을 푼 뒤 나온
            <span className="font-black text-stone-900 dark:text-slate-100">
              {' '}chrome-extension 폴더
            </span>
            를 선택해야 합니다.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[20px] bg-stone-950 px-5 py-4 text-sm font-black text-white transition hover:bg-stone-800 dark:bg-sky-500 dark:hover:bg-sky-400"
        >
          <Download size={16} />
          확장프로그램 파일 다운로드
        </button>
      </div>
    </div>
  )
}

export default ChromeExtensionModal