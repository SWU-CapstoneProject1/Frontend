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