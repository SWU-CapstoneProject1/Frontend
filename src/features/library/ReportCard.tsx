import { useState } from 'react'

export interface ReportData {
  id: string
  title: string
  date: string
  score: number
  clauseCount: number 
  status: '위험' | '주의' | '정상' 
}

const statusLabels: Record<'위험' | '주의' | '정상', string> = { 
  위험: '위험', 
  주의: '주의', 
  정상: '안전' 
} 

const statusColors: Record<'위험' | '주의' | '정상', string> = { 
  위험: '#ef4444', 
  주의: '#f59e0b', 
  정상: '#22c55e' 
}

interface ReportCardProps {
  data?: ReportData
  isAddCard?: boolean
  onDelete?: (id: string) => void
}

function ReportCard({ data, isAddCard = false, onDelete }: ReportCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (isAddCard) {
    return (
      <div className="relative h-[266px] rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 bg-white/20 border border-white/45 backdrop-blur-md shadow-sm text-ink-soft hover:text-ink">
        <span className="text-3xl">+</span>
        <span className="text-sm font-bold">새 분석 추가</span>
      </div>
    )
  }

  if (!data) return null
  const currentStatus = data.status;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 rounded-3xl h-[266px] flex flex-col justify-between transition-all duration-300"
      style={{
        background: isHovered ? 'rgba(20,20,22,0.65)' : 'rgba(255,255,255,0.22)',
        border: `1px solid ${isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.45)'}`,
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
      }}
    >
      {/* 상단 텍스트 및 뱃지 */}
      <div className="flex justify-between items-start">
        <div>
          <span 
            className="text-[10px] font-bold px-2 py-0.5 rounded" 
            style={{ 
              backgroundColor: `${statusColors[currentStatus]}20`, 
              color: statusColors[currentStatus] 
            }}
          >
            {statusLabels[currentStatus]}
          </span>
          <h4 className="text-lg font-bold mt-1 font-['Pretendard']" style={{ color: isHovered ? '#fff' : '#1a1a1a' }}>
            {data.title}
          </h4>
        </div>
      </div>

      {/* 위험도 프로그레스 바 영역 */}
      <div className="space-y-1">
        <div className="flex text-xs font-medium gap-1" style={{ color: isHovered ? 'rgba(255,255,255,0.7)' : '#666' }}>
          <span>위험도</span>
          <span className="font-bold" style={{ color: statusColors[currentStatus] }}>{data.score}</span>
          <span className="ml-2 text-gray-400">조항 {data.clauseCount}개</span>
        </div>
        
        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${data.score}%`, backgroundColor: statusColors[currentStatus] }} />
        </div>
      </div>

     
      <div className="grid grid-cols-1 pt-2" style={{ borderTop: `1px solid ${isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}` }}>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onDelete?.(data.id); 
          }} 
          className="py-2 rounded-xl text-xs font-bold border text-center text-red-400 border-red-100 hover:bg-red-50/20 bg-red-50/5 transition-colors cursor-pointer"
        >
          🗑️ 삭제하기
        </button>
      </div>
    </div>
  )
}

export default ReportCard