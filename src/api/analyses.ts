import type { ServiceAnalysis } from '../types'

const mockRecentAnalyses: ServiceAnalysis[] = [
  { id: '1', name: '토스', initial: 'T', brandColor: 'bg-blue-500', analyzedAt: '3일 전', riskLevel: 'safe', riskPercent: 15 },
  { id: '2', name: '노션', initial: 'N', brandColor: 'bg-stone-900', analyzedAt: '3일 전', riskLevel: 'warning', riskPercent: 38 },
  { id: '3', name: '배달의민족', initial: 'B', brandColor: 'bg-teal-500', analyzedAt: '4일 전', riskLevel: 'warning', riskPercent: 62 },
  { id: '4', name: '넷플릭스', initial: 'N', brandColor: 'bg-red-600', analyzedAt: '2시간 전', riskLevel: 'danger', riskPercent: 70 },
  { id: '5', name: '스포티파이', initial: 'S', brandColor: 'bg-green-500', analyzedAt: '5시간 전', riskLevel: 'danger', riskPercent: 85 },
  { id: '6', name: '쿠팡', initial: 'C', brandColor: 'bg-orange-500', analyzedAt: '1주 전', riskLevel: 'safe', riskPercent: 22 },
]

export async function getRecentAnalyses(): Promise<ServiceAnalysis[]> {
  
  return Promise.resolve(mockRecentAnalyses)
}