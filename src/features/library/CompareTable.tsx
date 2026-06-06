import { useState } from 'react'
import type { ReportData } from './ReportCard'

type BadgeStatus = '위험' | '주의' | '정상'

interface CompareTableProps {
  reports: ReportData[] 
}

const riskColors = {
  위험: '#ef4444',
  주의: '#f59e0b',
  정상: '#22c55e',
}

function CompareTable({ reports }: CompareTableProps) {
  
  const [selectedIdA, setSelectedIdA] = useState(reports[0]?.id ?? '')
  const [selectedIdB, setSelectedIdB] = useState(reports[1]?.id ?? '')

  const serviceA = reports.find(r => r.id === selectedIdA);
  const serviceB = reports.find(r => r.id === selectedIdB);

  
  const getStatusByScore = (score: number, offset: number): BadgeStatus => {
    const mockScore = (score + offset) % 100;
    if (mockScore > 65) return '위험'
    if (mockScore > 35) return '주의'
    return '정상'
  }

  // 고정된 카테고리 데이터 구조
  const categories = ['자동결제', '개인정보 활용', '환불 면책', '콘텐츠 저작권', '계정 해지']

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
        <div className="flex gap-2">
          {/* ▾ 서비스 A 선택 셀렉트 박스 */}
          <select 
            value={selectedIdA} 
            onChange={(e) => setSelectedIdA(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/10 text-gray-300 outline-none cursor-pointer"
          >
            {reports.map(r => <option key={r.id} value={r.id} className="text-black">{r.title}</option>)}
          </select>

          {/* ▾ 서비스 B 선택 셀렉트 박스 */}
          <select 
            value={selectedIdB} 
            onChange={(e) => setSelectedIdB(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/10 text-gray-300 outline-none cursor-pointer"
          >
            {reports.map(r => <option key={r.id} value={r.id} className="text-black">{r.title}</option>)}
          </select>
        </div>
      </div>

      {/* 테이블 영역 */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-gray-400 text-xs">
            <th className="pb-3 w-1/3">카테고리</th>
            <th className="pb-3 w-1/3">{serviceA?.title ?? '서비스 A'}</th>
            <th className="pb-3 w-1/3">{serviceB?.title ?? '서비스 B'}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {categories.map((category, index) => {
            const statusA = getStatusByScore(serviceA?.score ?? 0, index * 15)
            const statusB = getStatusByScore(serviceB?.score ?? 0, index * 25)
            
            return (
              <tr key={index} className="hover:bg-white/5">
                <td className="py-4 text-gray-300">{category}</td>
                <td className="py-4 font-semibold" style={{ color: riskColors[statusA] }}>{statusA}</td>
                <td className="py-4 font-semibold" style={{ color: riskColors[statusB] }}>{statusB}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CompareTable