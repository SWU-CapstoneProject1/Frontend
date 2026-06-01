import type { KeyIssue, RiskDistribution } from '../types'

import { apiGet } from './client'

// ── API 응답 타입 (백엔드 스펙) ───────────────────────────
interface ApiStatsResponse {
  total_analyses: number
  total_danger: number
  total_services: number
}

// ── 프론트에서 사용할 타입 ────────────────────────────────
export interface DashboardStats {
  totalAnalyses: number
  totalDanger: number
  totalServices: number
}

// ── API 응답 → 프론트 타입 변환 ───────────────────────────
function mapToDashboardStats(data: ApiStatsResponse): DashboardStats {
  return {
    totalAnalyses: data.total_analyses,
    totalDanger: data.total_danger,
    totalServices: data.total_services,
  }
}

// ── Mock 데이터 (KeyIssues, RiskDistribution는 백엔드 미제공) ──
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

// ── API 함수들 ────────────────────────────────────────────

/**
 * 서비스 통계 조회
 * @returns 전체 분석 수, 위험 항목 수, 서비스 수
 */
export async function getStats(): Promise<DashboardStats> {
  const data = await apiGet<ApiStatsResponse>('/api/stats')
  return mapToDashboardStats(data)
}

// TODO: 백엔드에 KeyIssues API 추가되면 실제 호출로 교체
export async function getKeyIssues(): Promise<KeyIssue[]> {
  return Promise.resolve(mockKeyIssues)
}

// TODO: 백엔드에 RiskDistribution API 추가되면 실제 호출로 교체
export async function getRiskDistribution(): Promise<RiskDistribution[]> {
  return Promise.resolve(mockRiskDistribution)
}