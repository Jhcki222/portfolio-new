import type { Project } from "./types";

export const collabo: Project = {
  "slug": "collabo",
  "name": "COLLABO",
  "category": "산학협력 졸업 프로젝트, 인플루언서 추천",
  "headline": "캠페인 조건으로 인플루언서를 찾고 비교하는 서비스",
  "summary": "Text-to-SQL과 벡터 검색으로 인플루언서를 추천하고, 게시물과 반응 지표를 리포트로 제공합니다.",
  "focus": "팀장 / AI, 풀스택 개발",
  "period": "2024.03 — 2024.12",
  "tags": [
    "Spring Boot",
    "JPA",
    "QueryDSL",
    "PostgreSQL",
    "Python",
    "FAISS",
    "Text-to-SQL",
    "RAG"
  ],
  "links": [],
  "overview": [],
  "cover": {
    "src": "/projects/collabo/cover.png",
    "width": 1902,
    "height": 892,
    "alt": "COLLABO의 인플루언서 검색 입력창, 조건 필터와 추천 후보 목록",
    "caption": "광고 조건을 입력하고 인플루언서 후보를 탐색하는 COLLABO 메인 화면"
  },
  "architecture": {
    "title": "데이터 수집, 추천, 분석 리포트",
    "figures": [
      {
        "src": "/projects/collabo/architecture.png",
        "width": 950,
        "height": 707,
        "alt": "React, Spring Boot, PostgreSQL 서비스와 Flask의 SQL, FAISS 검색 및 EEVE 모델을 연결한 COLLABO 아키텍처",
        "caption": "PostgreSQL에서 조회한 후보 데이터와 FAISS에서 검색한 캠페인 사례를 추천 답변에 활용했습니다."
      }
    ],
    "items": [
      "FastAPI 수집 서버에서 Instagram Graph API로 프로필과 최근 게시물을 가져와 PostgreSQL에 저장했습니다.",
      "리포트 API는 후보별 프로필과 함께 게시물의 평균 좋아요 수와 댓글 수, 주차별 게시물 건수 등을 제공합니다.",
      "Flask AI 서버는 Text-to-SQL로 조회한 후보 정보와 FAISS에서 찾은 QA를 LLM에 함께 전달합니다."
    ]
  },
  "chapters": [
    {
      "id": "recommendation-redesign",
      "nav": "Text-to-SQL과 RAG",
      "title": "Text-to-SQL과 벡터 검색을 결합한 추천",
      "description": "처음에는 해시태그가 함께 등장하는 빈도로 그래프를 만들고 RWR로 후보 순위를 매기는 방식을 실험했습니다. Meta Graph API 정책 변경으로 팔로워 성별과 연령 등 추천에 활용하려던 데이터를 계속 확보하기 어려워졌습니다. 팀장으로서 추천 기준을 다시 검토하고, 확보할 수 있는 프로필과 게시물 데이터를 중심으로 RAG를 설계했습니다.",
      "blocks": [
        {
          "heading": "수집할 수 있는 데이터로 추천 기준 재구성",
          "items": [
            "Instagram Graph API의 Business Discovery로 등록 계정의 프로필과 최근 게시물을 수집했습니다. 캡션, 작성일, 좋아요와 댓글 수는 게시물 단위로 저장하고 팔로워 수와 평균 반응은 수집일별로 남겼습니다."
          ],
          "figure": {
            "src": "/projects/collabo/collected-influencers.png",
            "width": 1433,
            "height": 747,
            "alt": "소개, 카테고리, 계정 식별자와 이름이 저장된 인플루언서 데이터 테이블",
            "caption": "수집한 인플루언서 프로필 데이터"
          }
        },
        {
          "heading": "Text-to-SQL과 FAISS 검색을 한 답변에 결합",
          "items": [
            "‘팔로워 1만 명 이상’처럼 기준이 명확한 요청은 Text-to-SQL로 조회 조건을 만들어 PostgreSQL에서 후보를 찾았습니다. 수치 조건 충족 여부는 DB 조회 단계에서 판단했습니다.",
            "캠페인에 어울리는 활동이나 콘텐츠처럼 자연어로 표현된 요구는 하위 질문으로 나눴습니다. 각 질문을 임베딩해 FAISS에서 관련 캠페인 QA를 검색했습니다.",
            "SQL로 조회한 후보 데이터와 벡터 검색으로 찾은 QA를 LLM에 함께 전달했습니다. 후보 정보는 DB 조회 결과에서 가져오고, 추천 이유를 설명할 때는 캠페인 사례를 참고하도록 구성했습니다."
          ]
        }
      ],
      "figure": {
        "src": "/projects/collabo/recommendation.png",
        "width": 1870,
        "height": 797,
        "alt": "인플루언서 후보 목록과 팔로워 수, 분야 조건을 입력하는 추천 대화 화면",
        "caption": "광고 조건을 입력하고 추천 후보와 데이터를 함께 비교하는 화면"
      },
      "metrics": {
        "caption": "RAG 개선 전후 추천 결과와 답변의 내부 평가",
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
        ]
      }
    },
    {
      "id": "influencer-report",
      "nav": "분석 리포트 API",
      "title": "후보의 게시물 활동과 반응을 분석하는 리포트 API",
      "description": "광고주가 후보를 검토할 때 팔로워 수와 함께 실제 게시물의 반응도 볼 수 있도록 분석 리포트 API를 개발했습니다.",
      "blocks": [
        {
          "heading": "활동 지표를 계산하는 기준",
          "items": [
            "팔로워 수와 평균 반응은 수집일별로 기록해 추이를 보여 주고, 개별 게시물은 좋아요와 댓글 수를 합산해 반응이 큰 순서로 보여 줬습니다.",
            "QueryDSL로 최근 1년간의 게시물을 DB 등록일 기준으로 주차별 집계했습니다. 전체 건수를 게시물이 한 건 이상 등록된 주의 수로 나눠, 등록이 있었던 주에 평균 몇 건이 쌓였는지 보여 줬습니다."
          ]
        }
      ],
      "figures": [
        {
          "src": "/projects/collabo/post-report.png",
          "width": 1920,
          "height": 3241,
          "alt": "인기 게시물, 광고 게시물 비율, 팔로워 추이가 표시된 리포트",
          "caption": "게시물 분석 리포트"
        },
        {
          "src": "/projects/collabo/hashtag-report.png",
          "width": 1920,
          "height": 2730,
          "alt": "해시태그 사용 빈도와 좋아요·댓글 집계를 보여주는 리포트",
          "caption": "해시태그 분석 리포트"
        }
      ]
    },
    {
      "id": "grounded-answers",
      "nav": "QA 구축과 추천 화면",
      "title": "추천에 참고할 캠페인 사례와 후보 비교 화면",
      "blocks": [
        {
          "heading": "광고 요구와 인플루언서 특성을 연결한 QA",
          "items": [
            "인플루언서 특성과 광고 요구를 조합해 GPT-4o로 QA를 1,000건 이상 만들고, 질문과 관련된 사례를 찾을 수 있도록 FAISS에 적재했습니다."
          ]
        },
        {
          "heading": "후보별 활동 지표 시각화",
          "items": [
            "Chart.js로 해시태그 사용 빈도, 게시물 반응, 광고 게시물 비율과 팔로워 추이를 보여 줬습니다.",
            "해시태그 워드클라우드의 렌더링이 느려 지연 로딩과 메모이제이션을 적용했습니다. 적용 후 Lighthouse로 측정한 대시보드의 LCP는 4.1초에서 2.2초로 줄었습니다."
          ]
        }
      ],
      "figure": {
        "src": "/projects/collabo/qa-pipeline.png",
        "width": 920,
        "height": 385,
        "alt": "인플루언서 데이터와 QA 예시를 GPT-4o에 제공한 뒤 QA 데이터를 LangChain, FAISS에 연결하는 흐름",
        "caption": "도메인 QA를 구성하고 검색 데이터로 적재한 과정"
      }
    }
  ],
  "description": "COLLABO는 광고주가 캠페인에 맞는 인플루언서를 찾고 후보를 비교할 수 있도록 만든 산학협력 졸업 프로젝트입니다. 광고주는 원하는 콘텐츠 분야나 팔로워 수를 문장으로 입력해 후보와 추천 이유를 확인할 수 있습니다. 리포트에서는 후보별 게시물과 반응, 광고 게시물 비율, 팔로워 추이를 살펴볼 수 있습니다. 팀장을 맡아 추천 기능, 백엔드, 인플루언서 대시보드를 개발했습니다.",
  "highlights": [
    "Text-to-SQL과 FAISS를 결합한 인플루언서 추천 RAG",
    "게시물 반응과 활동 지표를 제공하는 분석 리포트 API"
  ],
  "contributions": [
    "Meta Graph API 정책 변경으로 팔로워의 성별과 연령 등을 수집하기 어려워지자, 확보할 수 있는 프로필과 게시물 데이터를 중심으로 추천 구조를 다시 설계했습니다.",
    "Text-to-SQL로 팔로워 수 같은 정형 조건에 맞는 후보를 PostgreSQL에서 조회했습니다. 캠페인 요구와 관련된 사례는 FAISS로 찾아 후보 데이터와 함께 추천 답변에 활용했습니다.",
    "광고 요구와 인플루언서 특성을 연결한 질문·답변 사례를 1,000건 이상 만들고 벡터 검색에 활용했습니다.",
    "Spring Boot로 분석 리포트 API를 개발했습니다. 후보별 게시물 반응과 주간 활동 지표를 집계하고, React로 인플루언서 대시보드를 구현했습니다."
  ]
};
