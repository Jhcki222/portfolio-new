import type { Project } from "./types";

export const collabo: Project = {
  "slug": "collabo",
  "name": "COLLABO",
  "category": "산학협력 졸업 프로젝트, 인플루언서 추천",
  "headline": "광고 조건에 맞는 인플루언서 추천",
  "summary": "브랜드의 광고 조건에 맞는 인플루언서를 찾아주는 AI 추천 서비스",
  "focus": "팀장 / AI, 풀스택 개발",
  "period": "2024.03 — 2024.12",
  "tags": [
    "Spring Boot",
    "JPA",
    "QueryDSL",
    "PostgreSQL",
    "Python",
    "FAISS",
    "RAG"
  ],
  "links": [],
  "overview": [
    "산학협력 졸업 프로젝트",
    "팀장으로 참여하여 AI 기능 구현과 풀스택 개발"
  ],
  "cover": {
    "src": "/projects/collabo/cover.png",
    "width": 1902,
    "height": 892,
    "alt": "COLLABO의 인플루언서 검색 입력창, 조건 필터와 추천 후보 목록",
    "caption": "광고 조건을 입력하고 인플루언서 후보를 탐색하는 COLLABO 메인 화면"
  },
  "architecture": {
    "title": "수집 데이터에서 분석 리포트와 추천 응답까지",
    "figures": [
      {
        "src": "/projects/collabo/architecture.png",
        "width": 950,
        "height": 707,
        "alt": "React, Spring Boot, PostgreSQL 서비스와 Flask의 SQL, FAISS 검색 및 EEVE 모델을 연결한 COLLABO 아키텍처",
        "caption": "SQL 조회와 FAISS 검색 결과를 답변에 반영하는 구조"
      }
    ],
    "items": [
      "데이터 수집: FastAPI 수집 API가 Instagram Graph API에서 게시물과 프로필을 조회해 PostgreSQL에 저장",
      "분석 리포트: React → Spring Boot → JPA 관계 조회와 QueryDSL 집계 → 프로필, 게시물, 해시태그와 반응 지표 DTO",
      "추천 서비스: SQL 조건 조회와 FAISS의 QA 검색 결과를 Flask AI 서버에서 LLM 추천 문맥으로 결합",
      "담당 범위: Spring 백엔드 개발, AI 추천과 React 화면 개발"
    ]
  },
  "chapters": [
    {
      "id": "influencer-report",
      "nav": "분석 리포트 API",
      "title": "후보 비교에 필요한 정보를 리포트 API로 구성",
      "description": "광고주가 후보를 한 화면에서 비교할 수 있게 리포트 API를 만들었습니다. 프로필과 게시물은 따로 저장돼 있어서, 조회할 때 해시태그와 평균 좋아요·댓글 수를 함께 묶었습니다.",
      "blocks": [
        {
          "heading": "관계 모델과 읽기 전용 조회",
          "items": [
            "Influencer를 기준으로 게시물 Media와 수집 시점별 Meta를 연결하고, 게시물의 이미지와 해시태그를 별도 관계로 모델링했습니다.",
            "GET /api/v1/reports/{influencerId}에서 프로필, 게시물, 해시태그, 평균 좋아요와 댓글 수, 업로드 지표를 반환합니다.",
            "ReportService에 @Transactional(readOnly = true)를 적용하고 엔티티를 프로필, 게시물, 해시태그 DTO로 변환했습니다."
          ]
        },
        {
          "heading": "집계와 응답 계약",
          "items": [
            "QueryDSL로 DB 등록일 기준 최근 1년의 게시물을 주차별로 묶고, 게시물이 있는 주를 기준으로 평균 건수를 계산합니다.",
            "게시물은 좋아요와 댓글 수 합으로 정렬하고, 해시태그는 중복을 제거해 리포트에 담았습니다.",
            "ApiResponse와 공통 예외 처리로 응답 형식을 통일하고 존재하지 않는 인플루언서의 조회 오류를 처리했습니다.",
            "연관관계 저장과 조회, 리포트의 프로필 매핑을 확인하는 SpringBootTest 코드를 작성했습니다."
          ]
        }
      ]
    },
    {
      "id": "recommendation-redesign",
      "nav": "RWR에서 RAG로 전환",
      "title": "데이터 수집 제약에 맞춰 추천 구조를 RAG로 변경",
      "blocks": [
        {
          "heading": "초기 알고리즘 구상과 구조 변경",
          "items": [
            "해시태그의 동시 출현 빈도로 그래프를 구성하고 RWR 기반 후보 순위와 평가 코드를 실험했습니다.",
            "팔로워의 성별과 연령 등 수집할 수 있는 데이터가 제한돼 추천 기준을 재정의하고, SQL 후보 조회와 QA 검색 결과를 LLM에 전달하는 구조로 전환했습니다."
          ]
        },
        {
          "heading": "프로필과 게시물 수집",
          "items": [
            "FastAPI의 /update에서 등록된 계정을 조회하고 Instagram Graph API의 business_discovery로 프로필과 최근 게시물을 수집합니다.",
            "게시물의 캡션, 작성일, 좋아요와 댓글 수를 media에 저장하고 팔로워 수와 평균 반응을 수집일별 meta에 기록합니다."
          ]
        },
        {
          "heading": "정형 조건과 자연어 요구 분리",
          "items": [
            "팔로워 수처럼 명확한 조건은 PostgreSQL에서 후보를 조회했습니다.",
            "자연어 요구를 하위 질문으로 분해하고 관련 QA를 FAISS에서 검색했습니다.",
            "SQL 후보와 검색된 QA를 LLM에 함께 전달해 추천 답변을 생성했습니다.",
            "Chart.js로 해시태그, 반응 수, 광고 비율과 팔로워 추이를 표시해 후보를 비교할 수 있도록 했습니다."
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
        "caption": "RAG 추천 검색 개선 전후의 내부 평가",
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
      },
      "description": "Meta Graph API 정책이 바뀌면서 추천에 쓰려던 팔로워 성별과 연령을 수집하기 어려워졌습니다. 팀장으로서 설계를 다시 검토했고, 계속 수집할 수 있는 프로필과 게시물로 추천을 구성했습니다.",
      "outcome": "내부 평가에서 Recall@5는 0.59에서 0.88, nDCG@5는 0.61에서 0.74로 올랐습니다."
    },
    {
      "id": "grounded-answers",
      "nav": "QA 구축과 추천 화면",
      "title": "광고 요구에 맞춘 QA 검색과 후보 비교 화면",
      "blocks": [
        {
          "heading": "검색 자료 구축과 화면 응답",
          "items": [
            "GPT-4o로 인플루언서 특성과 광고 요구를 조합한 QA 1,000건 이상을 구축했습니다.",
            "LangChain과 FAISS로 QA를 검색하고 SQL 후보 데이터와 함께 답변 생성에 사용했습니다.",
            "Lazy Loading과 메모이제이션을 적용해 불필요한 리소스 로딩과 재렌더링을 최소화하고, Lighthouse 기준 LCP를 4.1초에서 2.2초로 약 46% 단축하여 초기 화면 렌더링 성능을 개선했습니다."
          ]
        }
      ],
      "figure": {
        "src": "/projects/collabo/qa-pipeline.png",
        "width": 920,
        "height": 385,
        "alt": "인플루언서 데이터와 QA 예시를 GPT-4o에 제공한 뒤 QA 데이터를 LangChain, FAISS에 연결하는 흐름",
        "caption": "도메인 QA를 구성하고 검색 데이터로 적재한 과정"
      },
      "description": "추천 답변에 캠페인 조건과 후보의 특성을 연결할 근거가 필요해 광고 상황별 질문과 답변을 만들었습니다. 추천 화면에서는 후보별 활동 지표를 바로 비교할 수 있게 했습니다.",
      "outcome": "광고 요구와 인플루언서 특성을 연결한 QA를 1,000건 이상 만들었습니다. 화면 최적화 후 Lighthouse에서 LCP는 4.1초에서 2.2초로 줄었습니다."
    }
  ],
  "description": "광고주가 입력한 캠페인 조건으로 인플루언서를 추천하고, 후보별 게시물과 반응 데이터를 비교하는 산학협력 프로젝트입니다. 백엔드를 개발하고 데이터 수집, 추천 검색과 분석 화면을 연결했습니다.",
  "highlights": [
    "JPA와 QueryDSL 기반 인플루언서 분석 리포트",
    "데이터 수집 제약에 대응한 RWR에서 RAG로의 전환"
  ],
  "contributions": [
    "Spring Boot 백엔드를 개발하며 리포트의 JPA 관계 모델과 조회 로직을 구성하고, PostgreSQL 본문 컬럼의 타입 매핑 문제를 수정했습니다.",
    "초기 RWR 추천 구상을 데이터 수집 제약에 맞춰 RAG로 변경하고, SQL 후보 조회와 FAISS 검색을 결합했습니다.",
    "광고 요구와 인플루언서 특성을 연결하는 QA를 구축하고 추천 문맥에 반영했습니다.",
    "후보별 데이터를 비교하는 React 화면을 개발하고 지연 로딩과 메모이제이션을 적용했습니다."
  ]
};
