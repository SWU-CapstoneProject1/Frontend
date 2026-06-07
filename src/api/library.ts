// ─────────────────────────────────────────────────────────
// 보관함 관련 API
//
// 엔드포인트:
//   GET    /api/history          — 보관함 목록 조회
//   DELETE /api/history/{job_id} — 보관함 항목 삭제
// ─────────────────────────────────────────────────────────

import { apiGet, ApiError } from './client'

// ── API 응답 타입 (백엔드 스펙) ───────────────────────────
export interface HistoryItem {
  job_id: string
  status: string
  service_name: string
  risk_score: number
  danger_count: number
  caution_count: number
  safe_count: number
  clauses: unknown[]
  created_at?: string
}

/**
 * 보관함 목록 조회
 * @param session_key - 세션 키
 * 
 */
export async function getHistory(session_key: string, risk_level?: string): Promise<HistoryItem[]> {
  const params = new URLSearchParams({ session_key })
  if (risk_level) params.append('risk_level', risk_level)

  return apiGet<HistoryItem[]>(`/api/history?${params.toString()}`)
}

/**
 * 보관함 항목 삭제
 * @param job_id - 삭제할 job ID
 */
export async function deleteHistory(job_id: string): Promise<void> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/history/${job_id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new ApiError(res.status, '삭제에 실패했습니다.')
}