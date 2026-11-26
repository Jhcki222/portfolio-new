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
    "title": "데이터 수집부터 추천과 리포트까지",
    "items": [],
    "steps": [
      {
        "title": "데이터 수집",
        "description": "Instagram Graph API → FastAPI 수집 서버 → PostgreSQL. Business Discovery로 프로필과 최근 게시물을 수집합니다. 게시물별 캡션, 작성일, 좋아요와 댓글을 저장하고 팔로워 수와 평균 반응은 수집일별로 기록합니다."
      },
      {
        "title": "인플루언서 추천",
        "description": "사용자 질문 → Flask AI 서버 → Text-to-SQL / FAISS → LLM → 추천 결과. 수치 조건은 SQL로 조회하고, 자연어로 표현된 캠페인 요구는 FAISS에서 유사 사례를 찾습니다. LLM은 후보 정보와 사례를 참고해 추천 이유를 작성합니다."
      },
      {
        "title": "분석 리포트",
        "description": "React → Spring Boot → PostgreSQL. 후보의 프로필과 게시물을 조회하고, 반응 지표와 주차별 활동량, 팔로워 추이를 보여줍니다."
      }
    ],
    "figures": [
      {
        "src": "/projects/collabo/architecture.png",
        "width": 950,
        "height": 707,
        "alt": "데이터 수집, 인플루언서 추천, 분석 리포트가 연결된 COLLABO 아키텍처",
        "caption": "COLLABO 전체 시스템 아키텍처"
      }
    ]
  },
  "chapters": [
    {
      "id": "recommendation-redesign",
      "nav": "Meta API 정책 변경과 추천 재설계",
      "title": "1. Meta Graph API 정책 변경에 따른 추천 시스템 재설계",
      "description": "초기에는 팔로워의 성별과 연령을 추천에 쓰려고 했습니다. 예를 들어 20대 여성을 대상으로 하는 화장품 광고라면, 해당 연령대와 성별의 팔로워 비율이 높은 후보를 찾는 방식이었습니다.\n\n개발 도중 Meta Graph API 정책이 바뀌면서 계획했던 팔로워 인구통계 데이터를 안정적으로 확보하기 어려워졌습니다. 기존 조건을 계속 쓰면 확인할 수 없는 정보로 후보를 평가해야 했기 때문에, 수집 가능한 데이터부터 확인하고 추천 기준을 다시 잡았습니다.",
      "blocks": [
        {
          "heading": "1. 수집 가능한 데이터를 확인하고 추천 조건 재정리",
          "items": [
            "Instagram Graph API의 Business Discovery로 조회 가능한 필드 확인",
            "프로필, 팔로워 수, 게시물 캡션과 반응 지표를 중심으로 데이터 모델 수정",
            "게시물별 캡션, 작성일, 좋아요와 댓글 수를 PostgreSQL에 저장",
            "팔로워 수와 평균 반응은 수집일별로 기록",
            "팔로워 수처럼 수치로 판단할 수 있는 조건과 캠페인 적합성처럼 자연어 해석이 필요한 조건을 구분"
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
          "heading": "2. 부족한 캠페인 사례를 QA 데이터로 보완",
          "items": [
            "프로필과 게시물은 계정의 활동을 보여주지만, 캠페인 요구와 어떻게 연결되는지 설명할 사례는 부족했습니다.",
            "광고 목적과 인플루언서 특성을 조합해 GPT-4o로 질문·답변 1,000건 이상 생성",
            "생성한 QA를 임베딩해 FAISS에 저장하고, 추천 요청과 의미가 비슷한 캠페인 사례를 검색",
            "생성한 데이터는 광고 집행 성과가 아닌 추천 이유를 작성할 때 참고하는 사례로 사용"
          ],
          "figure": {
            "src": "/projects/collabo/qa-pipeline.png",
            "width": 920,
            "height": 385,
            "alt": "인플루언서 정보와 캠페인 요구로 질문·답변을 생성해 FAISS에 적재하는 흐름",
            "caption": "캠페인 QA 생성 및 FAISS 적재 과정"
          }
        },
        {
          "heading": "3. Text-to-SQL과 FAISS를 결합한 Hybrid RAG 구현",
          "items": [
            "예를 들어 ‘팔로워 1만 명 이상이면서 친환경 제품 캠페인에 어울리는 인플루언서’라는 요청에는 수치 조건과 콘텐츠 적합성 조건이 함께 들어 있습니다. 두 조건의 처리 경로를 나눴습니다.",
            "Text-to-SQL로 팔로워 수 같은 정형 조건을 SQL로 변환해 PostgreSQL에서 후보 조회",
            "자연어로 표현된 캠페인 요구는 검색할 수 있는 하위 질문으로 분리",
            "하위 질문을 임베딩해 FAISS에서 유사한 캠페인 QA 검색",
            "DB에서 조회한 후보 정보와 관련 QA를 LLM에 전달해 추천 이유 생성"
          ]
        }
      ],
      "metrics": {
        "caption": "RAG 개선 전후 추천 결과와 답변의 내부 평가",
        "columns": [
          "평가 지표",
          "개선 전",
          "개선 후",
          "개선 폭"
        ],
        "rows": [
          [
            "Recall@5",
            "0.68",
            "**0.85**",
            "+17%p"
          ],
          [
            "ROUGE-1 F1",
            "0.46",
            "**0.72**",
            "+26%p"
          ],
          [
            "nDCG@5",
            "0.61",
            "**0.74**",
            "+13%p"
          ]
        ],
        "note": "Recall@5로 관련 후보가 상위 5개에 얼마나 포함됐는지, nDCG@5로 관련 후보가 얼마나 앞에 나왔는지 봤습니다. ROUGE-1 F1으로는 생성 답변과 기준 답변의 단어 중복 정도를 비교했습니다."
      },
      "outcome": [
        "팔로워 인구통계 데이터를 확보하기 어려워진 뒤에도 프로필과 게시물로 후보를 추천하도록 구조를 바꿨습니다.",
        "수치 조건은 PostgreSQL에서 확인하고, 자연어 캠페인 요구는 FAISS에서 관련 사례를 찾아 함께 처리했습니다."
      ],
      "figure": {
        "src": "/projects/collabo/recommendation.png",
        "width": 1870,
        "height": 797,
        "alt": "캠페인 조건을 입력하고 추천 결과를 확인하는 화면",
        "caption": "캠페인 조건에 따른 인플루언서 추천 결과"
      }
    },
    {
      "id": "influencer-report",
      "nav": "인플루언서 분석 리포트",
      "title": "2. 인플루언서 활동을 비교하는 분석 리포트 개발",
      "description": "후보 이름과 팔로워 수만으로는 최종 후보를 고르기 어려웠습니다. 팔로워 수가 비슷해도 글을 올리는 빈도나 게시물 반응은 다를 수 있기 때문입니다.\n\n당시에는 후보마다 프로필을 열어 최근 게시물을 직접 확인해야 했습니다. 추천 결과에서 바로 활동과 반응을 비교할 수 있도록 분석 리포트를 추가했습니다.",
      "blocks": [
        {
          "heading": "1. 게시물별 반응 지표 집계",
          "items": [
            "Instagram Graph API로 수집한 게시물의 좋아요와 댓글 수 저장",
            "좋아요와 댓글을 합산해 게시물별 반응 지표 계산",
            "반응이 높은 순서로 인기 게시물을 정렬하고, 후보별 평균 반응과 광고 게시물 비율 표시"
          ]
        },
        {
          "heading": "2. 게시물 활동과 팔로워 변화 추이 제공",
          "items": [
            "QueryDSL로 최근 1년간의 게시물을 DB 등록일 기준으로 주차별 집계",
            "게시물이 한 건 이상 등록된 주만 골라 주당 평균 등록 건수 계산",
            "수집일별 팔로워 수와 평균 반응 변화 표시",
            "주간 게시물 수는 DB 등록일을 기준으로 집계해 Instagram에 실제 게시된 날짜와 차이가 날 수 있습니다."
          ]
        },
        {
          "heading": "3. Spring Boot API와 React 대시보드 연결",
          "items": [
            "Spring Boot에서 인플루언서별 통계 조회 API 개발",
            "QueryDSL로 게시물 집계와 조회 조건 구성",
            "React 대시보드에서 인기 게시물, 활동 통계, 팔로워 추이를 시각화",
            "추천 목록에서 후보를 선택하면 해당 계정의 분석 리포트가 열리도록 연결"
          ]
        }
      ],
      "figure": {
        "src": "/projects/collabo/post-report.png",
        "width": 1920,
        "height": 3241,
        "alt": "인플루언서 게시물 분석 및 팔로워 추이 리포트",
        "caption": "게시물 반응과 팔로워 추이 리포트"
      },
      "outcome": [
        "추천 후보의 인기 게시물, 주간 활동량, 팔로워 변화를 한 화면에서 비교할 수 있게 했습니다.",
        "광고주는 후보의 프로필을 각각 열어보지 않고 추천 화면에서 분석 리포트를 확인할 수 있습니다."
      ]
    }
  ],
  "description": "COLLABO는 광고주가 캠페인에 적합한 인플루언서를 찾고, 후보별 활동 내역을 비교할 수 있도록 개발한 산학협력 졸업 프로젝트입니다.\n\n광고주는 원하는 콘텐츠 분야와 팔로워 수, 캠페인 조건을 자연어로 입력할 수 있습니다. 서비스는 조건에 맞는 인플루언서를 검색하고 추천한 이유를 보여줍니다. 후보별 분석 리포트에서는 인기 게시물과 평균 반응, 광고 게시물 비율, 팔로워 변화도 확인할 수 있습니다.\n\n4인 팀의 팀장을 맡아 인플루언서 추천 시스템을 설계하고 Spring Boot 백엔드와 React 분석 대시보드를 개발했습니다. 개발 중 외부 API 정책이 바뀌어 추천 구조를 다시 설계했고, 변경 전후 추천 결과와 답변 품질을 비교했습니다.",
  "highlights": [
    "Meta API 데이터 제약에 대응한 추천 재설계 · Recall@5 0.68 → 0.85",
    "게시물 반응과 활동 지표를 제공하는 분석 리포트 API"
  ],
  "contributions": [
    "4인 팀의 팀장으로 프로젝트 일정 관리, 개발 방향 조율 및 기능 통합",
    "Meta Graph API 정책 변경에 따라 확보 가능한 데이터를 다시 확인하고 추천 구조 재설계",
    "Text-to-SQL과 FAISS 벡터 검색을 결합한 Hybrid RAG 추천 시스템 구현",
    "캠페인 요구와 인플루언서 특성을 조합한 질문·답변 1,000건 이상 생성 및 벡터 인덱싱",
    "Spring Boot와 QueryDSL로 인플루언서 프로필, 게시물 반응, 주간 활동 통계 API 개발",
    "React 기반 인플루언서 분석 대시보드 구현",
    "추천 답변 평가 및 모듈 통합 테스트 수행"
  ]
};
