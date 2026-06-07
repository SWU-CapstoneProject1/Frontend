import { useState } from 'react'
import { motion } from 'framer-motion'

function IssuesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const mockReviews = [
    { text: "약관 너무 길어서 그냥 '동의' 누르고 넘어가는데 항상 찝찝해요." },
    { text: "나중에 나도 모르게 자동 결제되거나 개인정보 털릴까 봐 무서움..." },
    { text: "동의하라고 해서 누르긴 했는데, 내 권리를 빼앗기는 기분이에요." },
    { text: "진짜 중요한 독소 조항만 한눈에 골라내서 보여주면 좋겠어요." },
    { text: "뭐가 유리하고 불리한지 법률 용어가 너무 어려워서 읽다 포기함." }
  ]

  return (
    <section className="w-full bg-[#f8f9fa] py-28 border-b border-stone-200/60">
      <div className="max-w-5xl mx-auto text-center px-6">
        <span className="text-[10px] font-black tracking-widest text-sky-600 uppercase">OUR PROJECT SPACE</span>
        <h3 className="text-xl font-black text-stone-800 mt-2 mb-20 tracking-tight">
          우리는 바로 그 답답함과 불안함에서 출발했습니다
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 max-w-3xl mx-auto relative">
          {mockReviews.map((review, idx) => (
            <motion.div
              key={idx}
              onHoverStart={() => setHoveredIdx(idx)}
              onHoverEnd={() => setHoveredIdx(null)}
              // 호버된 카드가 z-50으로 격상되어 절대 다른 카드에 가려지지 않고 깔끔하게 위로 레이어 안착
              style={{ zIndex: hoveredIdx === idx ? 50 : 10 }}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className={`bg-white p-6 rounded-2xl border border-stone-200/60 shadow-lg text-left text-xs font-bold text-stone-700 leading-relaxed max-w-sm cursor-pointer ${
                idx % 2 === 1 ? 'md:translate-y-8 md:ml-auto' : 'md:mr-auto'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-base text-sky-500">💬</span>
                <p>"{review.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IssuesSection