// ─────────────────────────────────────────────────────────
// 분석 관련 API
//
// 엔드포인트:
//   GET /api/result/{job_id} — 분석 결과 조회
// ─────────────────────────────────────────────────────────

import { apiGet, ApiError, apiPost } from './client'
import type { AnalysisReport } from '../types'

// ── API 응답 타입 (백엔드 스펙) ───────────────────────────
interface ApiClause {
  id: string
  index: number
  original: string
  risk_level: 'danger' | 'caution' | 'safe'
  summary: string
  precedents: ApiPrecedent[]
}

interface ApiPrecedent {
  case_no: string
  title: string
  date: string
  summary: string
  source_url: string
  similarity: number
}

interface ApiAnalysisResult {
  job_id: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  service_name: string
  risk_score: number
  danger_count: number
  caution_count: number
  safe_count: number
  clauses: ApiClause[]
  precedents: ApiPrecedent[]
}

// ── API 응답 → 프론트 타입 변환  ───────────────────────────
function mapToAnalysisReport(data: ApiAnalysisResult): AnalysisReport {
  return {
    id: data.job_id,
    name: data.service_name || '이름 없는 서비스', 
    color: '#4F46E5',  
    initial: data.service_name?.[0] ?? '?', 
    riskScore: data.risk_score,
    totalClauses: data.clauses?.length ?? 0,
    riskClauses: data.danger_count + data.caution_count,
    lastAnalyzed: new Date().toLocaleString('ko-KR'), 
    summary: `${data.service_name || '본'} 약관의 위험 조항은 총 ${data.danger_count}개, 주의 조항은 ${data.caution_count}개입니다.`, 
    clauses: (data.clauses ?? []).map((c) => ({
      id: c.id,
      num: c.index + 1,
      title: `제 ${c.index + 1} 조`, 
      risk: c.risk_level === 'danger'  ? 'danger'
          : c.risk_level === 'caution' ? 'warning'
          : 'safe',
      text: c.original,
      aiSummary: c.summary ?? '',
      
     
      cases: (c.precedents ?? []).map((p) => ({
        title: p.case_no,
        year: p.date?.slice(0, 4) ?? '',
        relevance: Math.round((p.similarity ?? 0) * 100),
        result: p.summary,
      })),
    })),
  }
}

// ── API 함수들 ────────────────────────────────────────────
/**
 * 분석 결과 조회
 * @param job_id - 분석 요청 시 발급된 job ID
 * @returns 분석 완료 시 AnalysisReport, 아직 분석 중이면 null
 *
 * 사용 예시 (폴링):
 * const data = await getAnalysisReport(job_id)
 * if (!data) // 아직 분석 중 → 재시도
 */
export async function getAnalysisReport(job_id: string): Promise<AnalysisReport | null> {
  try {
    const data = await apiGet<ApiAnalysisResult>(`/api/result/${job_id}`)
    
    // 아직 분석이 끝나지 않은 상태('pending' 또는 'processing')라면 null을 반환해서 프론트가 폴링을 계속하게 만듦
    if (data.status === 'pending' || data.status === 'processing') return null
    
    // 분석이 완전히 완료('done')되면 백엔드 데이터를 프론트 타입으로 가공해서 반환
    return mapToAnalysisReport(data)
  } catch (e) {
    // 404 에러(아직 생성 안 됨 등)가 나도 null을 반환해서 예외 처리
    if (e instanceof ApiError && e.status === 404) return null
    throw e
  }
}

// ── API 요청 타입 ─────────────────────────────────────────
interface AnalyzeRequest {
  service_name: string
  session_key: string
  text: string
}

/**
 * 약관 텍스트 즉시 분석 요청
 * @returns job_id — 이후 getAnalysisReport(job_id) 로 결과 조회
 */
export async function analyzeTerms(body: AnalyzeRequest): Promise<string> {
  const data = await apiPost<{ job_id: string }>('/api/analyze', body)
  return data.job_id
}

// ── URL 분석 요청 타입 ─────────────────────────────────────
interface AnalyzeUrlRequest {
  service_name: string
  session_key: string
  url: string
}

/**
 * URL 입력 분석 요청
 * @param body - 서비스명, 세션키, 약관 URL
 * @returns job_id — 이후 getAnalysisReport(job_id) 로 결과 조회
 */
export async function analyzeUrl(body: AnalyzeUrlRequest): Promise<string> {
  const data = await apiPost<{ job_id: string }>('/api/analyze/url', body)
  return data.job_id
}

// ── 파일 분석 요청 ─────────────────────────────────────────

interface AnalyzeFileResponse {
  job_id: string
  status: string
  message: string
}

/**
 * 파일 업로드 분석 요청 (PDF, 이미지)
 * @param file - 업로드할 파일
 * @param service_name - 서비스 이름
 * @param session_key - 세션 키
 * @returns job_id — 이후 getAnalysisReport(job_id) 로 결과 조회
 */
export async function analyzeFile(
  file: File,
  service_name: string,
  session_key: string,
): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('service_name', service_name)
  formData.append('session_key', session_key)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const res = await fetch(`${baseUrl}/api/analyze/file`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`파일 분석 요청 실패: ${res.status}`)
  }

  const data: AnalyzeFileResponse = await res.json()
  return data.job_id
}

export async function downloadAnalysisPdf(job_id: string): Promise<void> {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/report/${job_id}/pdf`)

  if (!res.ok) throw new ApiError(res.status, 'PDF 다운로드에 실패했습니다.')

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `report_${job_id}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * 보관함 저장
 * @param job_id - 분석 job ID
 * @param session_key - 세션 키
 */
export async function bookmarkAnalysis(job_id: string, session_key: string): Promise<void> {
  await apiPost<{ success: boolean; message: string }>('/api/bookmark', {
    job_id,
    session_key,
  })
}