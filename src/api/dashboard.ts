import type { KeyIssue, RiskDistribution } from '../types'

const mockKeyIssues: KeyIssue[] = [
  { id: '1', title: '일방적 약관 변경', count: 342, trend: 12 },
  { id: '2', title: '환불 정책 제한', count: 289, trend: 8 },
  { id: '3', title: '자동 갱신 불명확', count: 256, trend: -5 },
  { id: '4', title: '개인정보 과다 수집', count: 198, trend: 15 },
  { id: '5', title: '면책 조항 과다', count: 158, trend: -3 },
]

const mockRiskDistribution: RiskDistribution[] = [
  { level: 'danger', label: '위험', count: 847, percent: 30 },
  { level: 'warning', label: '주의', count: 396, percent: 14 },
  { level: 'safe', label: '안전', count: 1604, percent: 56 },
]

export async function getKeyIssues(): Promise<KeyIssue[]> {
  return Promise.resolve(mockKeyIssues)
}

export async function getRiskDistribution(): Promise<RiskDistribution[]> {
  return Promise.resolve(mockRiskDistribution)
}