import type { Project } from "./types";

export const collabo: Project = {
  "slug": "collabo",
  "name": "COLLABO",
  "category": "산학협력 졸업 프로젝트 · 인플루언서 추천",
  "headline": "SQL·벡터 검색 기반 인플루언서 추천",
  "summary": "SQL·벡터 검색 기반 인플루언서 추천 · QA 1,000건 이상 구축 · Recall@5 0.59→0.88",
  "focus": "팀장 · AI 엔지니어링 · 프론트엔드",
  "period": "2024.03 — 2024.12",
  "tags": [
    "Spring Boot",
    "React",
    "Flask",
    "PostgreSQL",
    "FAISS",
    "RAG"
  ],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/CSID-DGU/2024-1-CECD1-DP-8"
    }
  ],
  "overview": [
    "팀장 · AI 추천·React 화면 개발"
  ],
  "cover": {
    "src": "/projects/collabo/cover.png",
    "width": 1902,
    "height": 892,
    "alt": "COLLABO의 인플루언서 검색 입력창, 조건 필터와 추천 후보 목록",
    "caption": "광고 조건을 입력하고 인플루언서 후보를 탐색하는 COLLABO 메인 화면"
  },
  "architecture": {
    "title": "SQL과 벡터 검색을 결합한 RAG",
    "figures": [
      {
        "src": "/projects/collabo/architecture.png",
        "width": 950,
        "height": 707,
        "alt": "React·Spring Boot·PostgreSQL 서비스와 Flask의 SQL·FAISS 검색 및 EEVE 모델을 연결한 COLLABO 아키텍처",
        "caption": "SQL 조회와 FAISS 검색 결과를 답변에 반영하는 구조"
      }
    ],
    "items": [
      "React → Spring Boot → Flask AI 서버",
      "Meta 데이터: PostgreSQL · QA 검색: FAISS",
      "SQL 정형 조회 + 벡터 검색 결과 → LLM 추천 생성"
    ]
  },
  "chapters": [
    {
      "id": "recommendation-redesign",
      "nav": "API 변경과 추천 재설계",
      "title": "추천 검색 개선: Recall@5 0.59 → 0.88",
      "blocks": [
        {
          "heading": "추천 검색 재설계",
          "items": [
            "Meta API 정책 변경에 따른 성별·연령 feature 수집 제약 대응",
            "팔로워 수 등 정형 조건: PostgreSQL 조회",
            "자연어 요구: 하위 질문 분해·벡터 검색",
            "SQL 후보와 관련 QA를 LLM에 함께 전달",
            "Chart.js로 해시태그·반응 수·광고 비율·팔로워 추이 표시"
          ]
        }
      ],
      "figure": {
        "src": "/projects/collabo/recommendation.png",
        "width": 1870,
        "height": 797,
        "alt": "인플루언서 후보 목록과 팔로워 수·분야 조건을 입력하는 추천 대화 화면",
        "caption": "광고 조건을 입력하고 추천 후보와 데이터를 함께 비교하는 화면"
      },
      "metrics": {
        "caption": "COLLABO 내부 평가 지표별 변화",
        "columns": [
          "평가 지표",
          "개선 전",
          "개선 후"
        ],
        "rows": [
          [
            "Recall@5",
            "0.59",
            "0.88"
          ],
          [
            "ROUGE-1 F1",
            "0.46",
            "0.72"
          ],
          [
            "nDCG@5",
            "0.61",
            "0.74"
          ]
        ],
        "note": "내부 비교 · Recall@5: 후보 검색 · nDCG@5: 상위 순위 · ROUGE-1 F1: 기준 답변 단어 중복도"
      },
      "description": "Meta Graph API 정책 변경으로 팔로워 성별·연령 데이터 수집이 제한됐습니다. 확보 가능한 데이터에 맞춰 추천을 재설계하고, 수치 조건은 SQL로, 자연어 요구는 벡터 검색으로 처리했습니다."
    },
    {
      "id": "grounded-answers",
      "nav": "QA 구축과 추천 화면",
      "title": "QA 1,000건 구축과 화면 최적화",
      "blocks": [
        {
          "heading": "QA 구축·화면 최적화",
          "items": [
            "GPT-4o 기반 인플루언서 특성·광고 요구 QA 1,000건 이상 구축",
            "LangChain·FAISS로 QA 검색 · SQL 후보 데이터와 결합",
            "Lazy Loading·메모이제이션 적용 · Lighthouse 초기 렌더링 40% 개선"
          ]
        }
      ],
      "figure": {
        "src": "/projects/collabo/qa-pipeline.png",
        "width": 920,
        "height": 385,
        "alt": "인플루언서 데이터와 QA 예시를 GPT-4o에 제공한 뒤 QA 데이터를 LangChain·FAISS에 연결하는 흐름",
        "caption": "도메인 QA를 구성하고 검색 데이터로 적재한 과정"
      },
      "description": "광고 요구와 인플루언서 특성을 연결할 QA를 구축해 검색 자료로 사용했습니다. 추천·분석 화면은 지연 로딩과 메모이제이션으로 초기 렌더링을 개선했습니다."
    }
  ],
  "description": "광고주가 입력한 캠페인 조건으로 인플루언서를 추천하고, 후보 데이터를 비교하는 산학협력 프로젝트입니다."
};
