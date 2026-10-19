import type { Project } from "./types";

export const studyReview: Project = {
  "slug": "study-review",
  "name": "알고리즘 스터디 운영 AI 대시보드",
  "category": "개인 개발 · 스터디 운영 자동화",
  "headline": "4명 알고리즘 스터디의 제출 현황·AI 리뷰 관리",
  "summary": "4명 스터디 제출 현황 통합 · 60초 데이터 캐시 · 요청 공유·코드별 AI 리뷰 캐시",
  "focus": "개인 설계·개발 · 외부 API 통합 · AI 호출·출력 관리",
  "tags": [
    "Next.js",
    "TypeScript",
    "Notion API",
    "GitHub API",
    "LLM",
    "SHA-256"
  ],
  "links": [{ "label": "서비스 바로가기", "url": "https://algo-study-agent.vercel.app/" }],
  "cover": {
    "src": "/projects/study-review/dashboard.png",
    "width": 1902,
    "height": 916,
    "alt": "주차별 알고리즘 문제 목록과 Notion·GitHub 연결을 제공하는 스터디 통합 관리 대시보드",
    "caption": "주차별 문제 목록 · 스터디 통합 관리 대시보드"
  },
  "overview": [
    "외부 API 연동 · Next.js 화면·리뷰 API 구현"
  ],
  "architecture": {
    "title": "외부 데이터 정규화와 요청 기반 AI 리뷰",
    "items": [
      "Notion·GitHub API → StudySolution → 제출 현황·진행률",
      "리뷰 요청 → hash·정책 버전 캐시 → LLM → JSON 검증·코드 줄 표시"
    ]
  },
  "chapters": [
    {
      "id": "study-data",
      "nav": "외부 API와 데이터 통합",
      "title": "Notion·GitHub 제출 기록 통합",
      "figure": {
        "src": "/projects/study-review/code-viewer.png",
        "width": 1555,
        "height": 851,
        "alt": "SWEA 보급로 문제에서 멤버별 제출 코드를 탭으로 조회하고 AI 리뷰를 요청하는 화면",
        "caption": "문제별 멤버 코드 조회 · AI 리뷰 요청"
      },
      "blocks": [
        {
          "heading": "데이터 수집·캐시",
          "items": [
            "Notion 중첩 블록 재귀 탐색 · next_cursor 페이지네이션",
            "코드 미존재 시 GitHub 트리·문제 식별자로 Java 파일 조회",
            "StudySolution 정규화 · 멤버별 코드 기준 진행률 계산",
            "60초 서버 캐시 · 진행 중 Promise 공유 · refresh로 즉시 동기화"
          ]
        }
      ],
      "description": "Notion에 전략·후기만 있고 코드가 GitHub에 올라오는 경우가 있어 두 출처를 함께 조회했습니다. 공통 타입으로 정리한 뒤 제출 현황과 주차별 진행률을 계산했습니다."
    },
    {
      "id": "review-control",
      "nav": "AI 사용량과 출력 검증",
      "title": "AI 리뷰 호출·캐시·응답 검증",
      "figure": {
        "src": "/projects/study-review/ai-review.png",
        "width": 1449,
        "height": 836,
        "alt": "AI 코드 리뷰의 정답성·효율·안정성·가독성 평가와 복잡도 분석을 보여주는 화면",
        "caption": "AI 코드 리뷰 · 항목별 평가와 풀이 분석"
      },
      "blocks": [
        {
          "heading": "호출·캐시 관리",
          "items": [
            "페이지 자동 호출 → 버튼 요청 방식으로 변경",
            "문제·멤버·코드별 메모리·LocalStorage 캐시",
            "서버 SHA-256·정책 버전 키 · 진행 중 Promise 공유"
          ]
        },
        {
          "heading": "출력 검증·화면 분리",
          "items": [
            "코드 근거·수정안 중심 리뷰 · 이슈 2~3개 · Java 예시 최대 1개·12줄",
            "JSON 필드·유형·줄 번호·개수 검증 · 코드 뷰어 지적 줄 표시",
            "약 300줄 상세 페이지 → 뷰어·Markdown·Hook·Route Handler·타입 분리"
          ]
        }
      ],
      "description": "페이지 진입마다 실행되던 AI 리뷰를 버튼 요청으로 바꾸고, 같은 코드의 결과를 재사용하도록 했습니다. 리뷰는 근거 줄과 수정안을 중심으로 구성하고 JSON 검증 후 화면에 표시합니다."
    }
  ],
  "description": "Notion과 GitHub에 나뉜 Java 스터디 기록을 한곳에서 확인하고 AI 코드 리뷰를 요청하는 서비스입니다. 4명 스터디 운영을 위해 개인 개발했습니다."
};
