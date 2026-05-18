import { useState } from 'react'

type BadgeStatus = '위험' | '주의' | '정상'

interface RowData {
  category: string
  serviceA: BadgeStatus
  serviceB: BadgeStatus
}

const riskColors = {
  위험: '#ef4444',
  주의: '#f59e0b',
  정상: '#22c55e',
}

function CompareTable() {
  const [serviceA] = useState('쿠팡 플레이')
  const [serviceB] = useState('넷플릭스')

  const rows: RowData[] = [
    { category: '자동결제', serviceA: '위험', serviceB: '주의' },
    { category: '개인정보 활용', serviceA: '위험', serviceB: '위험' },
    { category: '환불 면책', serviceA: '주의', serviceB: '정상' },
    { category: '콘텐츠 저작권', serviceA: '정상', serviceB: '주의' },
    { category: '계정 해지', serviceA: '주의', serviceB: '정상' },
  ]

  return (
    <div
      className="p-8 rounded-3xl mt-12 font-['Pretendard'] text-white"
      style={{
        background: 'rgba(30, 30, 35, 0.75)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      }}
    >
      {/* 내부 타이틀 */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white">동종 서비스 약관 비교</h3>
          <p className="text-xs text-gray-400">유사한 서비스의 약관을 비교하여 인사이트를 얻으세요</p>
        </div>
        <button className="px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/10 text-gray-300">
          비교 대상 선택 ▾
        </button>
      </div>

      {/* 테이블 영역 */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-gray-400 text-xs">
            <th className="pb-3 w-1/3">카테고리</th>
            <th className="pb-3 w-1/3">쿠팡 플레이</th>
            <th className="pb-3 w-1/3">넷플릭스</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-white/5">
              <td className="py-4 text-gray-300">{row.category}</td>
              <td className="py-4 font-semibold" style={{ color: riskColors[row.serviceA] }}>{row.serviceA}</td>
              <td className="py-4 font-semibold" style={{ color: riskColors[row.serviceB] }}>{row.serviceB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompareTable