import type { ServiceAnalysis, AnalysisReport } from '../types'

// ── 홈 화면 최근 분석 mock 데이터 ─────────────────────────
const mockRecentAnalyses: ServiceAnalysis[] = [
  { id: 'toss', name: '토스', initial: 'T', brandColor: 'bg-blue-500', analyzedAt: '3일 전', riskLevel: 'safe', riskPercent: 15 },
  { id: 'notion', name: '노션', initial: 'N', brandColor: 'bg-stone-900', analyzedAt: '3일 전', riskLevel: 'warning', riskPercent: 38 },
  { id: 'baemin', name: '배달의민족', initial: 'B', brandColor: 'bg-teal-500', analyzedAt: '4일 전', riskLevel: 'warning', riskPercent: 62 },
  { id: 'netflix', name: '넷플릭스', initial: 'N', brandColor: 'bg-red-600', analyzedAt: '2시간 전', riskLevel: 'danger', riskPercent: 70 },
  { id: 'spotify', name: '스포티파이', initial: 'S', brandColor: 'bg-green-500', analyzedAt: '5시간 전', riskLevel: 'danger', riskPercent: 85 },
  { id: 'coupang', name: '쿠팡', initial: 'C', brandColor: 'bg-orange-500', analyzedAt: '1주 전', riskLevel: 'safe', riskPercent: 22 },
]

// ── 분석 리포트 mock 데이터 ───────────────────────────────
const mockAnalysisReports: Record<string, AnalysisReport> = {
  netflix: {
    id: 'netflix',
    name: '넷플릭스',
    color: '#E50914',
    initial: 'N',
    riskScore: 72,
    totalClauses: 24,
    riskClauses: 12,
    lastAnalyzed: '2026.04.08 14:30',
    summary: '일방적 약관 변경, 자동 결제 갱신, 콘텐츠 이용 제한 등의 위험 조항이 발견되었습니다.',
    clauses: [
      {
        id: 'c1',
        num: 7,
        title: '환불 정책',
        risk: 'danger',
        text: '모든 판매는 최종적입니다. 부분 구독 기간 또는 사용하지 않은 콘텐츠에 대한 환불이나 크레딧을 제공하지 않습니다. 단, 서비스 장애가 연속 48시간 이상 지속되는 경우에만 일부 보상을 제공할 수 있습니다.',
        aiSummary: '환불 제한 범위가 넓어 소비자에게 불리할 수 있습니다.',
        cases: [
          { title: '서울중앙지법 2023-4829', year: '2023', relevance: 91, result: '부당한 자동 갱신 조항 무효 판결' },
          { title: '대법원 2022-1547', year: '2022', relevance: 87, result: '일방적 약관 변경 불법 판정' },
        ],
      },
      {
        id: 'c2',
        num: 11,
        title: '약관 변경',
        risk: 'danger',
        text: '당사는 언제든지 본 약관을 수정할 권리를 보유합니다. 이메일을 통해 사용자에게 통지하며, 계속 사용하는 것은 수정된 약관의 수락을 의미합니다. 중대한 변경 사항의 경우 최소 30일 전에 통지합니다.',
        aiSummary: '사업자가 일방적으로 약관을 변경할 수 있어 소비자에게 불리합니다. 약관규제법 위반 소지가 있습니다.',
        cases: [
          { title: '서울중앙지법 2023가합12345', year: '2023', relevance: 94, result: '소비자 승소 — 사전 통지 없는 약관 변경은 무효' },
          { title: '대법원 2022다56789', year: '2022', relevance: 88, result: '약관변경 고지 의무 위반 인정' },
        ],
      },
      {
        id: 'c3',
        num: 5,
        title: '계정 보안',
        risk: 'warning',
        text: '귀하는 계정 자격 증명의 기밀성을 유지할 책임이 있습니다. 무단 액세스가 발생하면 즉시 당사에 알려주시기 바랍니다. 계정 공유는 금지되며, 위반 시 계정이 정지될 수 있습니다.',
        aiSummary: '계정 보안 책임이 전적으로 이용자에게 있어 주의가 필요합니다.',
        cases: [],
      },
      {
        id: 'c4',
        num: 3,
        title: '자동 결제 갱신',
        risk: 'danger',
        text: '구독은 자동으로 갱신되며, 해지하지 않는 한 매월 결제가 계속됩니다.',
        aiSummary: '자동 갱신 정보가 불명확하여 소비자가 인지하지 못할 위험이 있습니다.',
        cases: [
          { title: '공정위 의결 2024-001', year: '2024', relevance: 92, result: '자동갱신 고지 미흡 시정 명령' },
        ],
      },
      {
        id: 'c5',
        num: 9,
        title: '개인정보 제3자 제공',
        risk: 'warning',
        text: '서비스 운영을 위해 개인정보를 제3자에게 제공할 수 있습니다.',
        aiSummary: '제3자 제공 범위가 광범위하여 개인정보보호법 준수 여부 확인이 필요합니다.',
        cases: [
          { title: '개인정보위 2024-123', year: '2024', relevance: 85, result: '개인정보 처리 위탁 기준 강화 결정' },
        ],
      },
      {
        id: 'c6',
        num: 14,
        title: '콘텐츠 이용 제한',
        risk: 'warning',
        text: '회사는 콘텐츠를 사전 통지 없이 변경하거나 제거할 수 있습니다.',
        aiSummary: '이용자의 콘텐츠 접근권이 보장되지 않아 불공정 약관 소지가 있습니다.',
        cases: [],
      },
      {
        id: 'c7',
        num: 18,
        title: '면책 조항',
        risk: 'danger',
        text: '서비스 중단으로 발생한 손해에 대해 책임을 지지 않습니다.',
        aiSummary: '전면적 면책은 약관규제법상 불공정 약관에 해당할 수 있습니다.',
        cases: [
          { title: '대법원 2021다11111', year: '2021', relevance: 90, result: '전면 면책 조항 무효 판결' },
        ],
      },
      {
        id: 'c8',
        num: 22,
        title: '분쟁 해결 규정',
        risk: 'safe',
        text: '분쟁은 대한민국 법률에 따라 서울중앙지방법원에서 해결합니다.',
        aiSummary: '적절한 분쟁 해결 규정이 마련되어 있어 소비자 보호에 긍정적입니다.',
        cases: [],
      },
    ],
  },
}

// ── API 함수들 ────────────────────────────────────────────

// 홈 화면 최근 분석 목록 가져오기
export async function getRecentAnalyses(): Promise<ServiceAnalysis[]> {
  // 나중에: return fetch('/api/analyses/recent').then(r => r.json())
  return Promise.resolve(mockRecentAnalyses)
}

// 특정 서비스 분석 리포트 가져오기
export async function getAnalysisReport(id: string): Promise<AnalysisReport | null> {
  // 나중에: return fetch(`/api/analyses/${id}`).then(r => r.json())
  return Promise.resolve(mockAnalysisReports[id] ?? null)
}