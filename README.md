# Frontend

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/>

React 기반으로 사용자 인터페이스(UI)를 구현하는 프론트엔드 팀입니다



## 팀원 구성

<div style="overflow-x: auto; white-space: nowrap;">
<table>
  <tr>
    <td align="center">김도연</td>
    <td align="center">이지연</td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/bfa0f759-26cb-433e-b56f-96009de570a7" width="120"><br/>
      <a href="https://github.com/kimdoyeon1234">@kimdoyeon1234</a>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/70847e65-af3f-4f11-ac01-3559e2787b96" width="120"><br/>
      <a href="https://github.com/jiyeoniii">@jiyeoniii</a>
    </td>
  </tr>
</table>
</div>



## Overview

백엔드 API와 연동하여 약관 분석 결과를 시각화하고, 사용자가 불공정 조항을 쉽게 이해할 수 있도록 돕는 프론트엔드 서비스입니다. 글래스모피즘 디자인을 기반으로 조항별 위험도, AI 분석 요약, 관련 판례를 직관적으로 제공합니다.



## Features

- 약관 텍스트 / URL / 파일 입력 기반 분석 요청
- 서비스별 분석 리포트 시각화
- 조항 단위 위험도 표시 (위험 / 주의 / 안전)
- AI 분석 요약 및 관련 판례 연결
- 글로벌 약관 현황 대시보드
- 반응형 글래스모피즘 UI



## Project Structure
````
src/
├── api/                  # API 호출 함수
│   ├── analyses.ts       # 분석 관련 API
│   └── dashboard.ts      # 대시보드 관련 API
│
├── components/           # 공통 컴포넌트
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Badge.tsx     # 위험도 뱃지
│       ├── Button.tsx
│       ├── Card.tsx      # 글래스 카드
│       ├── RiskBar.tsx   # 위험도 프로그레스바
│       ├── SectionHeader.tsx
│       └── Tabs.tsx
│
├── features/             # 화면별 기능 컴포넌트
│   ├── home/             # 홈 화면 컴포넌트
│   └── analysis/         # 분석 페이지 컴포넌트
│       ├── AnalysisHeader.tsx
│       ├── AiSidePanel.tsx
│       ├── CaseCard.tsx
│       ├── ClauseCard.tsx
│       └── ClauseList.tsx
│
├── pages/                # 라우팅 단위 페이지
│   ├── home/
│   │   └── index.tsx
│   └── analysis/
│       └── index.tsx
│
├── types/
│   └── index.ts          # 공통 타입 정의
│
├── router.tsx            # 라우터 설정
├── App.tsx
└── main.tsx

````

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```



## Convention

### 브랜치 전략
````
main
└── develop
├── feat/#기능명(페이지)
└── fix/#버그명

````
### 커밋 메시지
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
style: 스타일 수정
chore: 기타 변경사항

### Import 순서
```tsx
// 1. 외부 라이브러리
import { useState } from 'react'

// 2. type import
import type { AnalysisReport } from '../../types'

// 3. 내부 컴포넌트
import Card from '../../components/ui/Card'

// 4. 내부 함수/API
import { getAnalysisReport } from '../../api/analyses'
```

### 컴포넌트 작성 규칙
- 컴포넌트명은 **PascalCase**
- 파일명은 컴포넌트명과 동일하게
- props 타입은 `interface`로 컴포넌트 위에 선언
- 공통으로 쓰이는 컴포넌트는 `components/ui/`에 위치
- 특정 페이지에서만 쓰이는 컴포넌트는 `features/` 하위에 위치

