// ─────────────────────────────────────────────────────────
// 공통 HTTP 클라이언트
// 모든 API 요청은 이 파일을 통해 이루어집니다!!
//
// 사용법:
//   import { apiGet } from './client'
//   const data = await apiGet<MyType>('/api/something')
// ─────────────────────────────────────────────────────────


const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// ── 공통 에러 클래스 ──────────────────────────────────────
export class ApiError extends Error {
  status: number 

  constructor(status: number, message: string) {
    super(message)
    this.status = status  
    this.name = 'ApiError'
  }
}

// ── 공통 fetch 래퍼 ──────────────────────────────────────
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const errorMessages: Record<number, string> = {
      400: '잘못된 요청입니다.',
      401: '인증이 필요합니다.',
      403: '접근 권한이 없습니다.',
      404: '데이터를 찾을 수 없습니다.',
      500: '서버 오류가 발생했습니다.',
    }
    throw new ApiError(res.status, errorMessages[res.status] ?? `오류가 발생했습니다. (${res.status})`)
  }

  return res.json() as Promise<T>
}

export const apiGet = <T>(path: string) =>
  request<T>(path, { method: 'GET' })

export const apiPost = <T>(
  path: string,
  body: unknown,
) =>
  request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })

export const apiPut = <T>(
  path: string,
  body: unknown,
) =>
  request<T>(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  })