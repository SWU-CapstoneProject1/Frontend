import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  FileText,
  Link,
  Search,
  MessageCircle,
} from 'lucide-react'

const techStacks = [
  {
    name: '데이터 수집 및 추출',
    icon: Link,
    tag: 'Processing',
    details: [
      { tech: 'FastAPI', desc: 'RESTful API 구현 및 서버 최적화' },
      { tech: 'PyMuPDF', desc: 'PDF 문서 정밀 처리 및 데이터 추출' },
      { tech: 'Tesseract OCR', desc: '이미지 내 텍스트 인식' },
      { tech: 'BackgroundTasks', desc: '비동기 작업 처리' },
    ],
  },
  {
    name: 'AI 위험 감지',
    icon: FileText,
    tag: 'AI/Data',
    details: [
      { tech: 'KoELECTRA', desc: '약관 조항 위험도 분류' },
      { tech: '불공정 패턴 분석', desc: '독소 조항 실시간 탐지' },
    ],
  },
  {
    name: '심결례 분석 엔진',
    icon: Search,
    tag: 'Analysis',
    details: [
      { tech: 'FAISS', desc: '벡터 유사도 검색 및 인덱싱' },
      { tech: 'RAG', desc: '판례 검색 증강 생성' },
    ],
  },
  {
    name: '사용자 해설',
    icon: MessageCircle,
    tag: 'Service',
    details: [
      { tech: 'Gemini API', desc: '법률 용어 쉬운 해설' },
      { tech: 'Prompt Engineering', desc: '맞춤형 해설 생성' },
    ],
  },
  {
    name: '시스템 영속성',
    icon: AlertTriangle,
    tag: 'Backend',
    details: [
      { tech: 'SQLAlchemy', desc: 'ORM 및 데이터 모델링' },
      { tech: 'SQLite', desc: 'MVP 데이터 저장소' },
    ],
  },
]

function TechStackCarousel() {
  const [active, setActive] = useState(2)

  return (
    <section className="w-full bg-white px-4 py-28">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="text-[10px] font-black tracking-widest text-sky-600 uppercase">
          AI ARCHITECTURE
        </span>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900">
          정확한 분석을 위한 기술 구조
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-relaxed text-stone-500">
          약관 문서 추출부터 위험 조항 분류, 판례 검색, 쉬운 해설까지 하나의 흐름으로 처리합니다.
        </p>
      </div>

      <div className="relative mx-auto mb-10 flex h-[330px] w-full max-w-6xl items-center justify-center">
        {techStacks.map((item, index) => {
          const offset = (index - active + techStacks.length) % techStacks.length
          const displayOffset =
            offset > techStacks.length / 2 ? offset - techStacks.length : offset

          const Icon = item.icon
          const isActive = displayOffset === 0

          return (
            <motion.div
              key={item.name}
              onClick={() => setActive(index)}
              className="absolute cursor-pointer"
              animate={{
                x: displayOffset * 190,
                scale: isActive ? 1 : 0.82,
                opacity: 1 - Math.abs(displayOffset) * 0.25,
                zIndex: 10 - Math.abs(displayOffset),
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <div
                className={`relative flex h-[270px] w-[215px] flex-col overflow-hidden rounded-[30px] border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)] transition-all ${
                  isActive ? 'border-sky-200' : 'border-stone-200'
                }`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50">
                  <Icon size={24} className="text-sky-600" />
                </div>

                <h3 className="text-base font-black leading-snug text-stone-900">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs font-bold leading-relaxed text-stone-500">
                  {item.details[0].desc}
                </p>

                <div className="mt-auto">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-black text-sky-600">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-full bg-sky-500" />
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mx-auto w-full max-w-4xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[30px] border border-stone-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
          >
            <h3 className="mb-6 flex items-center gap-2 text-base font-black text-stone-900">
              {(() => {
                const I = techStacks[active].icon
                return <I size={20} className="text-sky-600" />
              })()}
              {techStacks[active].name} 상세 기술 원리
            </h3>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              {techStacks[active].details.map((detail, i) => (
                <div key={i} className="border-l-2 border-sky-100 pl-4">
                  <h4 className="text-sm font-black text-sky-600">
                    {detail.tech}
                  </h4>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-stone-500">
                    {detail.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TechStackCarousel