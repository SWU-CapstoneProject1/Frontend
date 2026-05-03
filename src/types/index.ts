// 위험도 레벨 - 우리 시스템 전체에서 쓰는 타입
export type RiskLevel = 'safe' | 'warning' | 'danger'

// 서비스 분석 데이터 한 건
export interface ServiceAnalysis {
  id: string             // 고유 식별자
  name: string           // 서비스 이름 (예: "토스")
  initial: string        // 첫 글자 (예: "T")
  brandColor: string     // 브랜드 컬러 (Tailwind 클래스)
  analyzedAt: string     // 분석 시점 (예: "3일 전")
  riskLevel: RiskLevel   // 위험도
  riskPercent: number    // 위험도 % (15, 38 등)
}

// 주요 이슈
export interface KeyIssue {
  id: string
  title: string         // "일방적 약관 변경"
  count: number         // 342
  trend: number         // +12 또는 -5 (%)
}

// 위험도 분포
export interface RiskDistribution {
  level: RiskLevel      // 'safe' | 'warning' | 'danger'
  label: string         // "위험" / "주의" / "안전"
  count: number         // 847
  percent: number       // 30
}


// ── 분석 페이지용 타입 ────────────────────────────────────

// 판례 하나
export interface AnalysisCase {
  title: string      // "서울중앙지법 2023-4829"
  year: string       // "2023"
  relevance: number  // 관련도 % (91)
  result: string     // "부당한 자동 갱신 조항 무효 판결"
}

// 약관 조항 하나
export interface AnalysisClause {
  id: string           // 고유 식별자
  num: number          // 조항 번호 (7, 11 등)
  title: string        // "환불 정책"
  risk: RiskLevel      // 위험도
  text: string         // 실제 약관 원문 텍스트
  aiSummary: string    // AI가 분석한 요약
  cases: AnalysisCase[] // 관련 판례 목록
}

// 분석 리포트 전체 (분석 페이지에서 쓰임)
export interface AnalysisReport {
  id: string              // 서비스 고유 식별자 (예: "netflix")
  name: string            // 서비스 이름 (예: "넷플릭스")
  color: string           // 브랜드 컬러 (hex)
  initial: string         // 첫 글자 (예: "N")
  riskScore: number       // 전체 위험도 점수 (72)
  totalClauses: number    // 전체 조항 수 (24)
  riskClauses: number     // 위험 조항 수 (12)
  lastAnalyzed: string    // 마지막 분석 일시
  summary: string         // 전체 요약 한 줄
  clauses: AnalysisClause[] // 조항 목록
}