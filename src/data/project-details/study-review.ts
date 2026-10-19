import type { Project } from "./types";

export const studyReview: Project = {
  "slug": "study-review",
  "name": "알고리즘 스터디 운영 AI 대시보드",
  "category": "개인 개발, 스터디 운영 자동화",
  "headline": "알고리즘 스터디의 제출 현황과 AI 코드 리뷰 관리",
  "summary": "주차별 문제와 멤버별 제출 코드를 모아 보고 AI 리뷰를 요청하는 스터디 대시보드",
  "focus": "개인 설계와 개발 / API 통합과 리뷰 제어",
  "tags": [
    "Next.js",
    "TypeScript",
    "Notion API",
    "GitHub API",
    "LLM"
  ],
  "links": [
    {
      "label": "서비스 바로가기",
      "url": "https://algo-study-agent.vercel.app/"
    }
  ],
  "cover": {
    "src": "/projects/study-review/dashboard.png",
    "width": 1902,
    "height": 916,
    "alt": "주차별 알고리즘 문제 목록과 Notion, GitHub 연결을 제공하는 스터디 통합 관리 대시보드",
    "caption": "주차별 문제 목록, 스터디 통합 관리 대시보드"
  },
  "overview": [
    "6명 알고리즘 스터디 운영을 위한 개인 프로젝트",
    "Vercel 배포, 주차별 문제와 멤버 코드 조회 및 AI 리뷰 제공"
  ],
  "architecture": {
    "title": "외부 데이터 정규화와 요청 기반 AI 리뷰",
    "items": [
      "Notion, GitHub API → StudySolution → 제출 현황, 진행률",
      "리뷰 요청 → hash, 정책 버전 캐시 → LLM → JSON 검증, 코드 줄 표시"
    ]
  },
  "chapters": [
    {
      "id": "study-data",
      "nav": "외부 API와 데이터 통합",
      "title": "두 저장소에 나뉜 제출 코드를 한 화면에 통합",
      "figure": {
        "src": "/projects/study-review/code-viewer.png",
        "width": 1555,
        "height": 851,
        "alt": "SWEA 보급로 문제에서 멤버별 제출 코드를 탭으로 조회하고 AI 리뷰를 요청하는 화면",
        "caption": "문제별 멤버 코드 조회, AI 리뷰 요청"
      },
      "blocks": [
        {
          "heading": "제출 기록 수집과 갱신",
          "items": [
            "Notion 중첩 블록을 재귀 탐색하고 next_cursor로 다음 페이지를 조회했습니다.",
            "코드가 없으면 GitHub 트리와 문제 식별자로 Java 파일을 찾고 StudySolution 타입으로 정규화했습니다.",
            "멤버별 코드 존재 여부로 진행률을 계산하고 60초 서버 캐시와 진행 중 Promise 공유를 적용했습니다.",
            "캐시 시간 안에는 이전 데이터가 표시될 수 있어 refresh로 즉시 동기화할 수 있도록 했습니다."
          ]
        }
      ],
      "description": "Notion에 전략과 후기만 있고 코드는 GitHub에 제출되는 경우가 있어 한 출처만으로는 제출 현황을 확인하기 어려웠습니다. Notion에 코드가 없으면 GitHub에서 찾아 공통 타입으로 정리하고 멤버별 코드와 주차별 진행률을 표시했습니다."
    },
    {
      "id": "review-control",
      "nav": "AI 사용량과 출력 검증",
      "title": "반복 리뷰 호출을 줄이고 코드 근거 표시",
      "figure": {
        "src": "/projects/study-review/ai-review.png",
        "width": 1449,
        "height": 836,
        "alt": "AI 코드 리뷰의 정답성, 효율, 안정성, 가독성 평가와 복잡도 분석을 보여주는 화면",
        "caption": "AI 코드 리뷰, 항목별 평가와 풀이 분석"
      },
      "blocks": [
        {
          "heading": "요청과 캐시 키 관리",
          "items": [
            "문제, 멤버와 코드별로 메모리와 LocalStorage에 리뷰를 저장했습니다.",
            "서버는 SHA-256 코드 hash와 정책 버전을 캐시 키에 반영하고 진행 중 Promise를 공유했습니다.",
            "코드나 리뷰 정책이 바뀌면 이전 결과와 구분해 새 리뷰를 요청하도록 구성했습니다."
          ]
        },
        {
          "heading": "검증한 응답을 코드에 연결",
          "items": [
            "이슈는 2~3개, Java 예시는 최대 1개와 12줄로 제한하고 근거 줄과 수정안을 요구했습니다.",
            "JSON 필드, 유형, 줄 번호와 개수를 검증해 코드 뷰어의 지적 줄과 연결했습니다. 형식 검증은 코드의 정답 여부를 보장하지 않습니다.",
            "약 300줄 상세 페이지를 뷰어, Markdown, Hook, Route Handler와 타입으로 나눴습니다."
          ]
        }
      ],
      "description": "페이지 진입마다 리뷰를 실행하면 같은 코드에도 LLM 요청이 반복됐습니다. 버튼을 눌렀을 때만 요청하고 코드와 정책 버전이 같으면 결과를 재사용하도록 변경했습니다. 리뷰는 JSON 필드와 줄 번호를 검증한 뒤 코드 뷰어에 연결했습니다."
    }
  ],
  "description": "Notion과 GitHub에 나뉜 Java 스터디 기록을 한곳에서 확인하고 AI 코드 리뷰를 요청하는 서비스입니다. 6명 스터디 운영을 위해 개인 개발했습니다.",
  "highlights": [
    "주차별 문제와 멤버별 코드 통합 조회",
    "요청 기반 리뷰와 코드별 결과 재사용"
  ],
  "contributions": [
    "Notion과 GitHub의 제출 코드를 공통 타입으로 정리하고 주차별 제출 현황을 구현했습니다.",
    "서버 캐시와 진행 중 요청 공유로 외부 API 중복 조회를 줄이도록 구성했습니다.",
    "코드별 AI 리뷰 캐시와 JSON 응답 검증을 구현하고 근거 줄을 코드 뷰어에 표시했습니다."
  ]
};
