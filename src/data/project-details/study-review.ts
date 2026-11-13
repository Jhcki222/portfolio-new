import type { Project } from "./types";

export const studyReview: Project = {
  "slug": "study-review",
  contributionsTitle: "서비스 기능",
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
  "overview": [],
  "architecture": {
    "title": "풀이 코드 수집부터 AI 리뷰 표시까지",
    "items": [
      "`Notion`, `GitHub API` → `StudySolution` → 제출 현황, 진행률",
      "리뷰 요청 → hash, 정책 버전 캐시 → `LLM` → `JSON` 검증, 코드 줄 표시"
    ]
  },
  "chapters": [
    {
      "id": "study-data",
      "nav": "외부 API와 데이터 통합",
      "title": "Notion과 GitHub에서 제출 코드 찾기",
      "figure": {
        "src": "/projects/study-review/code-viewer.png",
        "width": 1555,
        "height": 851,
        "alt": "SWEA 보급로 문제에서 멤버별 제출 코드를 탭으로 조회하고 AI 리뷰를 요청하는 화면",
        "caption": "문제별 멤버 코드 조회, AI 리뷰 요청"
      },
      "blocks": [
        {
          "heading": "두 곳에 올라온 풀이를 한 화면에 모으기",
          "items": [
            "`Notion` 중첩 블록을 재귀 탐색하고 `next_cursor`로 다음 페이지를 조회했습니다.",
            "`Notion`에 풀이 코드가 없으면 문제 번호를 기준으로 `GitHub`에서 해당 `Java` 파일을 찾았습니다. 어느 쪽에서 가져온 코드든 같은 화면에서 보여줄 수 있도록 코드와 출처를 같은 형식으로 담았습니다.",
            "멤버별 제출 여부를 기준으로 주차별 진행률을 계산했습니다. 조회 결과는 서버에 60초간 저장하고, 같은 조회 요청이 겹치면 진행 중인 `Promise`를 공유해 외부 API 중복 호출을 줄였습니다.",
            "새로 올린 풀이를 바로 확인할 수 있도록 수동 새로고침을 추가했습니다."
          ]
        }
      ],
      "description": "전략과 후기는 `Notion`에, `Java` 코드는 `GitHub`에 올리는 경우가 있었습니다. 매주 누가 어떤 문제를 풀었는지 확인하려고 두 곳을 오갔습니다.",
      "outcome": "문제별 코드와 후기, 멤버별 제출 여부와 주차별 진행률을 한 화면에서 확인할 수 있게 됐습니다."
    },
    {
      "id": "review-control",
      "nav": "AI 사용량과 출력 검증",
      "title": "같은 코드의 리뷰를 재사용하고 지적한 줄 표시",
      "figure": {
        "src": "/projects/study-review/ai-review.png",
        "width": 1449,
        "height": 836,
        "alt": "AI 코드 리뷰의 정답성, 효율, 안정성, 가독성 평가와 복잡도 분석을 보여주는 화면",
        "caption": "AI 코드 리뷰, 항목별 평가와 풀이 분석"
      },
      "blocks": [
        {
          "heading": "같은 코드에 대한 중복 호출 줄이기",
          "items": [
            "같은 코드에 대한 요청이 겹치면 진행 중인 `Promise`를 공유해 모델을 한 번만 호출합니다. 코드의 `SHA-256` 해시와 리뷰 규칙 버전이 모두 같으면 저장해 둔 리뷰를 재사용합니다."
          ]
        },
        {
          "heading": "리뷰에서 지적한 줄을 화면에 표시",
          "items": [
            "모델에는 핵심 지적 2~3개와 각각의 줄 번호, 수정 방법을 요청했습니다.",
            "서버에서 `JSON`의 필수 항목과 지적 유형, 개수, 줄 번호를 확인한 뒤 코드 뷰어에서 해당 줄을 표시합니다."
          ]
        }
      ],
      "description": "스터디원이 풀이를 확인할 때마다 리뷰가 필요한 건 아니었습니다. 피드백이 필요할 때 직접 요청하고, 어떤 줄을 고쳐야 하는지 코드에서 바로 확인할 수 있게 만들었습니다.",
      "outcome": "일관된 기준으로 리뷰를 받을 수 있었고, 스터디원들끼리 놓칠 수 있는 부분을 확인할 수 있었습니다."
    }
  ],
  "description": "6명이 참여한 알고리즘 스터디에서 주차별 문제와 제출 현황을 확인하기 위해 만든 서비스입니다. 스터디원은 Notion과 GitHub에 나뉘어 있던 풀이 코드와 후기를 한 화면에서 보고, 같은 문제에 대한 서로의 접근을 비교할 수 있습니다. 피드백이 필요한 풀이에는 AI 코드 리뷰를 요청하고 지적된 코드 줄을 확인할 수 있습니다.",
  "highlights": [
    "주차별 문제와 멤버별 코드 통합 조회",
    "요청 기반 리뷰와 코드별 결과 재사용"
  ],
  "contributions": [
    "주차별 문제 목록에서 스터디원별 제출 여부와 진행률을 확인할 수 있습니다.",
    "같은 문제에 대한 스터디원들의 풀이 코드와 후기를 한 화면에서 비교할 수 있습니다.",
    "피드백이 필요한 풀이에 AI 리뷰를 요청하고, 개선할 부분을 코드의 해당 줄에서 확인할 수 있습니다."
  ]
};
