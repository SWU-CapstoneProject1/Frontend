import type { ServiceAnalysis } from '../types'

// 임시 데이터 (나중에 API로 대체)
export const recentAnalyses: ServiceAnalysis[] = [
  {
    id: '1',
    name: '토스',
    initial: 'T',
    brandColor: 'bg-blue-500',
    analyzedAt: '3일 전',
    riskLevel: 'safe',
    riskPercent: 15,
  },
  {
    id: '2',
    name: '노션',
    initial: 'N',
    brandColor: 'bg-stone-900',
    analyzedAt: '3일 전',
    riskLevel: 'warning',
    riskPercent: 38,
  },
  {
    id: '3',
    name: '배달의민족',
    initial: 'B',
    brandColor: 'bg-teal-500',
    analyzedAt: '4일 전',
    riskLevel: 'warning',
    riskPercent: 62,
  },
  {
    id: '4',
    name: '넷플릭스',
    initial: 'N',
    brandColor: 'bg-red-600',
    analyzedAt: '2시간 전',
    riskLevel: 'danger',
    riskPercent: 70,
  },
  {
    id: '5',
    name: '스포티파이',
    initial: 'S',
    brandColor: 'bg-green-500',
    analyzedAt: '5시간 전',
    riskLevel: 'danger',
    riskPercent: 85,
  },
  {
    id: '6',
    name: '쿠팡',
    initial: 'C',
    brandColor: 'bg-orange-500',
    analyzedAt: '1주 전',
    riskLevel: 'safe',
    riskPercent: 22,
  },
]


import type { KeyIssue, RiskDistribution } from '../types'

export const keyIssues: KeyIssue[] = [
  { id: '1', title: '일방적 약관 변경', count: 342, trend: 12 },
  { id: '2', title: '환불 정책 제한', count: 289, trend: 8 },
  { id: '3', title: '자동 갱신 불명확', count: 256, trend: -5 },
  { id: '4', title: '개인정보 과다 수집', count: 198, trend: 15 },
  { id: '5', title: '면책 조항 과다', count: 158, trend: -3 },
]

export const riskDistribution: RiskDistribution[] = [
  { level: 'danger', label: '위험', count: 847, percent: 30 },
  { level: 'warning', label: '주의', count: 396, percent: 14 },
  { level: 'safe', label: '안전', count: 1604, percent: 56 },
]