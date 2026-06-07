import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TechItem {
  id: number
  name: string
  desc: string
  spec: string
}

const techStacks: TechItem[] = [
  { id: 0, name: "React 19", desc: "컴포넌트 기반 UI 아키텍처", spec: "가상 DOM 최적화 및 고성능 렌더링 스레드를 가동하여 3D 인터랙션을 매끄럽게 제어합니다." },
  { id: 1, name: "Framer Motion", desc: "물리 엔진 기반 3D 애니메이션", spec: "SVG 베지어 곡선 모핑 및 스크롤 인터랙티브 가속도를 수학적 물리 기반으로 연산합니다." },
  { id: 2, name: "TypeScript", desc: "정적 타입 안정성 확보", spec: "컴포넌트 간 Props 데이터 파이프라인의 타입을 컴파일 시점에 완벽 규격화합니다." },
  { id: 3, name: "Tailwind CSS v4", desc: "유틸리티 퍼스트 스타일링", spec: "런타임 오버헤드 제로의 차세대 JIT 엔진을 통해 고해상도 글래스모피즘 코드를 매핑합니다." }
]

function TechStackCarousel() {
  const [activeId, setActiveId] = useState(1) // Framer Motion 기본 활성화

  return (
    <section className="w-full py-24 bg-white flex flex-col items-center overflow-hidden border-b border-stone-200/60">
      <div className="w-full max-w-4xl text-center px-6 mb-12">
        <span className="text-[10px] font-black tracking-widest text-sky-600 uppercase">TECH STACK WHEEL</span>
        <h3 className="text-xl font-black text-stone-800 mt-2 tracking-tight">우리가 사용하는 코어 기술 스택</h3>
      </div>

      {/* 3D 회전 캐러셀 컨테이너 트랙 */}
      <div className="relative flex items-center justify-center w-full h-44 max-w-3xl">
        {techStacks.map((tech) => {
          const offset = tech.id - activeId
          const isActive = tech.id === activeId

          return (
            <motion.div
              key={tech.id}
              onClick={() => setActiveId(tech.id)}
              animate={{
                x: offset * 180,
                scale: isActive ? 1.15 : 0.85,
                rotateY: offset * -25,
                opacity: Math.abs(offset) > 1 ? 0.4 : 1,
                z: isActive ? 100 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`absolute w-44 p-5 rounded-2xl border text-center cursor-pointer select-none shadow-md ${
                isActive 
                  ? 'bg-linear-to-b from-stone-900 to-stone-800 text-white border-stone-950' 
                  : 'bg-stone-50 text-stone-500 border-stone-200'
              }`}
            >
              <h4 className="text-sm font-black">{tech.name}</h4>
              <p className="text-[10px] mt-1 opacity-70">{tech.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 하단 네모 상자: 선택된 기술 상세 설명 패널 */}
      <div className="w-full max-w-xl mx-auto px-6 mt-6">
        <div className="w-full bg-stone-50 rounded-2xl border border-stone-200 p-6 shadow-xs min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h5 className="text-xs font-black text-sky-600 mb-1">
                {techStacks[activeId].name} 상세 명세
              </h5>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {techStacks[activeId].spec}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default TechStackCarousel