import { useEffect, useState } from 'react'
import { Download, Globe, Power, CheckCircle2 } from 'lucide-react'

import ChromeExtensionModal from './ChromeExtensionModal'

function ChromeIntegration() {
  const [enabled, setEnabled] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
  const handler = (event: MessageEvent) => {
    console.log('웹앱 message received:', event.data)

    if (event.data?.type === 'YAKGAN_EXTENSION_INSTALLED') {
      setIsInstalled(true)
      setEnabled(true)
    }
  }

  window.addEventListener('message', handler)

  return () => {
    window.removeEventListener('message', handler)
  }
  }, [])

  const handleToggle = () => {
    const nextEnabled = !enabled
    setEnabled(nextEnabled)

    window.postMessage(
      {
        type: 'YAKGAN_WEB_GUARD_ENABLED_CHANGED',
        enabled: nextEnabled,
      },
      '*',
    )
  }

  return (
    <>
      <section className="rounded-[30px] border border-stone-200 bg-stone-950 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
              <Globe size={18} />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-300">
                CHROME GUARD
              </span>

              <h2 className="mt-1 text-xl font-black text-white">
                크롬 웹 가드
              </h2>

              <p className="mt-1 text-sm font-bold text-white/50">
                {isInstalled
                  ? enabled
                    ? '약관 자동 감지가 활성화되어 있습니다.'
                    : '확장프로그램은 연결되었지만 자동 감지는 꺼져 있습니다.'
                  : '설치 후 약관 페이지를 자동 감지합니다.'}
              </p>
            </div>
          </div>

          {isInstalled ? (
            <button
              type="button"
              onClick={handleToggle}
              className={`relative flex h-8 w-14 items-center rounded-full transition-all duration-300 ${
                enabled
                  ? 'bg-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.55)]'
                  : 'bg-white/15'
              }`}
              aria-label="크롬 웹 가드 자동 감지 토글"
            >
              <span
                className={`absolute h-6 w-6 rounded-full bg-white transition-all duration-300 ${
                  enabled ? 'left-[30px]' : 'left-1'
                }`}
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-stone-950 transition hover:bg-sky-50"
            >
              <Download size={14} />
              다운로드
            </button>
          )}
        </div>

        <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-2">
            {isInstalled ? (
              enabled ? (
                <CheckCircle2 size={16} className="text-sky-300" />
              ) : (
                <Power size={16} className="text-white/40" />
              )
            ) : (
              <Download size={16} className="text-sky-300" />
            )}

            <span className="text-xs font-black text-sky-300">
              {isInstalled
                ? enabled
                  ? '연동 완료'
                  : '연동됨 · 감지 꺼짐'
                : '설치 필요'}
            </span>
          </div>

          <p className="mt-2 text-sm font-bold leading-relaxed text-white/60">
            이용약관 · 개인정보처리방침 페이지 방문 시 자동으로 분석 여부를 안내합니다.
          </p>
        </div>

        {!isInstalled && (
          <p className="mt-4 text-xs font-bold leading-relaxed text-white/35">
            시연용 확장프로그램 파일을 다운로드한 뒤, 압축을 풀고 Chrome 확장 프로그램 페이지에서 로드해주세요.
          </p>
        )}
      </section>

      <ChromeExtensionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}

export default ChromeIntegration