import { useState } from 'react'
import { motion } from 'framer-motion'

function IssuesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const reviews = [
    {
      name: '쇼핑몰 이용자',
      text: '환불 제한 조항이 있는 줄 모르고 동의했어요.',
      top: '10%',
      left: '8%',
    },
    {
      name: '앱 이용자',
      text: '약관이 너무 길어서 중요한 내용을 놓쳤어요.',
      top: '16%',
      left: '36%',
    },
    {
      name: 'SNS 이용자',
      text: '개인정보가 어디까지 제공되는지 이해하기 어려웠어요.',
      top: '10%',
      left: '67%',
    },
    {
      name: '구독 서비스 이용자',
      text: '자동 결제 조건이 숨어 있을까 봐 불안했어요.',
      top: '48%',
      left: '18%',
    },
    {
      name: '플랫폼 이용자',
      text: '서비스 변경 후에도 동의한 걸로 간주된다는 문장이 찝찝했어요.',
      top: '56%',
      left: '48%',
    },
  ]

  return (
    <section className="relative w-full min-h-[88vh] bg-[#F7F7F8] py-28 overflow-hidden">
      <div className="relative z-20 mx-auto mb-14 max-w-3xl px-6 text-center">
        <span className="text-[10px] font-black tracking-widest text-sky-600 uppercase">
          USER PAIN POINT
        </span>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-900">
          약관, 정말 이해하고 동의하고 있나요?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-relaxed text-stone-500">
          환불 제한, 자동 결제, 개인정보 제공 같은 중요한 조건은 대부분 긴 문장 속에 숨어 있습니다.
        </p>
      </div>

      <div className="relative mx-auto h-[58vh] w-full max-w-7xl px-4">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredIdx(idx)}
            onHoverEnd={() => setHoveredIdx(null)}
            style={{
              top: review.top,
              left: review.left,
              zIndex: hoveredIdx === idx ? 50 : 10,
            }}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute min-w-[280px] max-w-[330px] cursor-pointer rounded-[28px] border border-stone-200 bg-white p-6 text-left shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm">
                👤
              </div>

              <div>
                <p className="mb-1 text-[10px] font-black text-sky-600">
                  {review.name}
                </p>
                <p className="text-sm font-bold leading-relaxed text-stone-800">
                  “{review.text}”
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 bg-white shadow-[5px_5px_5px_rgba(0,0,0,0.02)]" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default IssuesSection