import type { Project } from "./types";

export const knowwhohow: Project = {
  "slug": "knowwhohow",
  "name": "노후하우",
  "category": "시니어 자산 설계 서비스",
  "headline": "모의 마이데이터 기반 자산 관리와 금융상품 추천",
  "summary": "개인 자산을 조회하고 노후 준비에 맞는 금융상품을 추천하는 서비스",
  "focus": "PL / 백엔드와 AI 개발, 인프라 설계",
  "tags": [
    "Spring Boot",
    "FastAPI",
    "MySQL",
    "MongoDB Atlas",
    "Airflow",
    "Kafka",
    "Debezium"
  ],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/Fisa5-Main-Project"
    }
  ],
  "overview": [
    "모의 마이데이터와 금융상품 추천을 연결한 팀 프로젝트",
    "PL로 백엔드와 AI 개발, 프론트엔드 연동 및 인프라 설계 참여"
  ],
  "cover": {
    "src": "/projects/knowwhohow/cover.png",
    "width": 1920,
    "height": 1080,
    "alt": "노후하우 서비스 로고와 모바일 자산 포트폴리오 화면",
    "caption": "노후하우의 자산 관리와 금융상품 추천 화면"
  },
  "architecture": {
    "title": "온프레미스와 AWS를 연결한 하이브리드 구성",
    "figures": [
      {
        "src": "/projects/knowwhohow/on-premise-architecture.png",
        "width": 3652,
        "height": 1822,
        "alt": "온프레미스의 Nginx, 인증 서버, 리소스 서버와 HAProxy 뒤의 MySQL Master, Slave, Jenkins, SonarQube와 Airflow 구성",
        "caption": "온프레미스: 모의 마이데이터 인증, 리소스 서버, MySQL Master/Slave와 HAProxy, 상품 수집, CI 환경"
      },
      {
        "src": "/projects/knowwhohow/aws-cloud-architecture.png",
        "width": 1378,
        "height": 897,
        "alt": "AWS VPC 안의 공개 서브넷 Nginx와 비공개 서브넷의 Spring 메인 서버, FastAPI AI 서버, Next.js 프론트엔드 및 RDS 구성",
        "caption": "AWS: 공개 서브넷의 진입 경로와 비공개 서브넷의 메인, AI, 프론트엔드 서버를 분리한 구성"
      }
    ],
    "items": [
      "담당 구성: AWS의 서비스 서버와 온프레미스의 모의 마이데이터, 수집 및 CI 환경을 터널링으로 연결",
      "Spring 메인 서버 → 모의 인증 서버에서 토큰 발급 → 리소스 서버에서 사용자별 자산 조회",
      "Airflow에서 상품 수집과 임베딩을 처리하고 MongoDB Atlas에 적재, FastAPI는 적재된 상품을 검색",
      "사용자 변경은 Debezium → Kafka → MongoDB 작업 큐로 전달, 텍스트 갱신과 임베딩 생성을 별도 워커에서 처리"
    ]
  },
  "chapters": [
    {
      "id": "mydata",
      "nav": "인증과 금융정보 보호",
      "title": "인증 정보로 자산 조회 범위를 제한",
      "blocks": [
        {
          "heading": "사용자 식별과 개인정보 보호",
          "items": [
            "Spring Authorization Server로 Authorization Code 흐름과 RSA 서명 JWT를 구현하고, CI로 내부 사용자를 매핑했습니다.",
            "인증된 사용자 ID를 자산 조회 조건에 반영했습니다. 개인정보는 AES/GCM으로 암호화하고 HMAC-SHA256 검색값을 별도로 저장했습니다.",
            "JPA AttributeConverter로 암복호화를 적용하고, Access Token의 만료를 Redis TTL로 관리했습니다.",
            "401 응답은 토큰 갱신 후 1회 재호출하도록 제한했습니다."
          ]
        },
        {
          "heading": "자산 동기화와 조회 경로",
          "items": [
            "자산, 부채, 연금 데이터를 정규화하고 재동기화 시 순자산과 연동 상태를 갱신했습니다.",
            "MySQL Master/Slave와 HAProxy를 구성하고 AbstractRoutingDataSource, LazyConnectionDataSourceProxy로 readOnly 조회와 쓰기 경로를 나눴습니다."
          ]
        },
        {
          "heading": "변경 검증",
          "items": [
            "Jenkins, SonarQube, JaCoCo를 연동했으며 제출 당시 커버리지는 85% 이상이었습니다.",
            "프로젝트 사용자 시나리오 49/53개(92.5%)와 상품 추천 테스트 14개가 통과했습니다. 서버별 공통 규칙과 3개 백엔드 저장소의 PR 리뷰에 검증 결과를 반영했습니다."
          ]
        }
      ],
      "description": "자산 조회는 토큰에서 확인한 사용자 ID를 기준으로 처리했습니다. 개인정보를 암호화한 뒤에도 사용자 매핑에 필요한 검색은 할 수 있도록 암호문과 검색값을 따로 저장했습니다.",
      "outcome": "자산 조회에 인증된 사용자 ID를 적용해 본인 정보만 조회할 수 있게 했습니다. 개인정보는 AES/GCM으로 암호화해 저장하고, 검색에는 별도로 저장한 HMAC 값을 사용했습니다."
    },
    {
      "id": "recommendation-search",
      "nav": "추천 검색 개선",
      "title": "가입 조건을 반영하는 금융상품 검색",
      "blocks": [
        {
          "heading": "조건 검색과 추천 결과 구성",
          "items": [
            "상품 유형과 필수 조건으로 후보를 제한하고 키워드 검색, 벡터 검색과 재랭킹을 결합했습니다.",
            "LangGraph에서 상품군별 검색 도구를 연결하고 사용자 자산과 목표를 추천 문맥으로 전달했습니다.",
            "추천 결과에 혜택, 추천 이유와 가입 링크를 표시하고 상품 ID별 좋아요와 싫어요를 반영했습니다.",
            "검색 후보 수와 재랭킹 범위를 조정해 Recall@10 0.85를 유지하면서 검색시간을 42% 줄였습니다."
          ],
          "figure": {
            "src": "/projects/knowwhohow/service-recommendation.png",
            "width": 3840,
            "height": 2160,
            "alt": "자산 포트폴리오에서 예금, 펀드, 연금저축 상품의 핵심 혜택, 추천 이유와 상품 페이지 링크를 보여주는 노후하우 화면",
            "caption": "금융상품 추천: 핵심 혜택, 추천 이유, 상세 링크"
          }
        },
        {
          "heading": "만료 상품과 누락 임베딩 처리",
          "items": [
            "연금저축 297개, 펀드 971개, 예금과 적금 58개로 총 1,326개 상품을 수집했습니다.",
            "금융감독원, 금융위원회, 한국벤처투자 API 응답을 전처리하고 rag_text와 임베딩을 MongoDB에 적재했습니다.",
            "상품군별 수집, 컬렉션 통합, 만료 상품 삭제를 Airflow DAG로 분리하고 임베딩 누락 상품만 backfill했습니다.",
            "추천 요청은 적재된 상품을 검색하므로 외부 수집 API 응답을 기다리지 않도록 구성했습니다."
          ],
          "figure": {
            "src": "/projects/knowwhohow/data-pipeline.png",
            "width": 3840,
            "height": 2160,
            "alt": "금융상품을 추출, 전처리, 임베딩, 적재하고 만료 상품과 누락 임베딩을 처리하는 Airflow DAG",
            "caption": "상품 수집, 만료 상품 삭제와 누락 임베딩 재처리를 수행하는 Airflow DAG"
          }
        }
      ],
      "metrics": {
        "caption": "내부 금융상품 검색 비교",
        "columns": [
          "평가 지표",
          "개선 전",
          "개선 후"
        ],
        "rows": [
          [
            "Recall@10",
            "0.68",
            "0.85"
          ],
          [
            "NDCG@10",
            "0.64",
            "0.79"
          ],
          [
            "검색시간 단축률",
            "기준 구현",
            "42% 단축"
          ]
        ]
      },
      "description": "상품 설명이 질문과 비슷해도 사용자가 가입 조건을 충족하지 못하면 추천 후보에서 빼야 했습니다. 그래서 가입 조건으로 먼저 걸러낸 뒤 남은 상품의 순위를 매겼습니다.",
      "outcome": "후보 수와 재랭킹 범위를 조정해 Recall@10 0.85를 유지하면서 검색 시간을 42% 줄였습니다."
    },
    {
      "id": "database-queries",
      "nav": "관리자 통계 조회 개선",
      "title": "사용자별 반복 조회를 페이지 단위 집계로 변경",
      "blocks": [
        {
          "heading": "집계와 이름 조회 분리",
          "items": [
            "MongoDB는 페이지의 user_id를 $match와 $in으로 제한하고 $group으로 통계를 일괄 집계했습니다.",
            "MySQL은 WHERE IN으로 사용자 이름을 일괄 조회하고 Dictionary와 Map으로 통계에 연결했습니다.",
            "사용자 목록의 반복문 안에서 실행되던 DB I/O를 제거했습니다."
          ]
        }
      ],
      "description": "기존에는 목록을 불러온 뒤 사용자마다 MongoDB에서 통계를, MySQL에서 이름을 가져왔습니다. 한 페이지에 N명이 있으면 조회가 2N+1번 발생했습니다.",
      "outcome": "페이지당 DB 조회를 2N+1회에서 3회로 줄였습니다. 사용자 목록 조회, MongoDB 통계 집계, MySQL 이름 조회를 각각 한 번씩 실행합니다."
    },
    {
      "id": "user-state-freshness",
      "nav": "사용자 갱신과 재처리",
      "title": "변경된 사용자 정보 반영과 중단 작업 재처리",
      "description": "자산이 바뀐 뒤 벡터화 API를 다시 호출하기 전까지 추천에 예전 정보가 쓰일 수 있었습니다. 자산 변경을 감지하면 추천용 정보를 갱신하고, 서버가 중간에 멈춰도 작업을 다시 실행할 수 있게 만들었습니다.",
      "blocks": [
        {
          "heading": "자산이 바뀌면 MySQL에서 최신 정보 읽기",
          "items": [
            "Debezium으로 MySQL 변경을 감지하고 Kafka로 전달했습니다. 이벤트에서는 갱신할 사용자 ID를 찾고, 자산과 목표 등 추천에 필요한 정보는 MySQL에서 다시 읽었습니다. 이벤트가 늦게 도착해도 처리 시점의 상태를 읽기 위해서입니다."
          ]
        },
        {
          "heading": "최신 정보 저장과 임베딩을 따로 처리",
          "items": [
            "최신 자산과 목표를 정리한 텍스트를 먼저 저장하고, 벡터는 별도 작업에서 만들었습니다. 이렇게 하면 벡터 생성에 실패해도 사용자 정보 갱신은 끝낼 수 있습니다. 텍스트와 모델이 같으면 기존 벡터를 재사용하고, 내용이 바뀌면 이전 벡터를 제거했습니다."
          ]
        },
        {
          "heading": "서버가 멈춰도 남은 작업 다시 실행",
          "items": [
            "MongoDB 작업 큐에 기록한 뒤 Kafka에 처리 완료를 알렸습니다. 큐에 쓰기 전에 서버가 멈추면 이벤트를 다시 받고, 작업 도중 멈추면 작업을 맡은 시간(lease)이 끝난 뒤 다른 프로세스가 이어서 처리합니다. 저장할 때는 버전을 확인해 늦게 끝난 작업이 최신 정보를 덮어쓰지 않도록 했습니다.",
            "5개 시나리오로 복구를 확인했습니다. 작업 중 프로세스를 강제 종료한 뒤 작업이 다시 실행됐고, 벡터 생성에 실패했을 때는 저장한 텍스트로 임베딩만 다시 시도했습니다."
          ]
        }
      ]
    }
  ],
  "description": "시니어가 자산과 부채, 연금을 한곳에서 확인하고 노후 준비에 맞는 금융상품을 추천받는 서비스입니다. 표준 API 명세를 참고한 모의 마이데이터를 구성하고, 인증부터 자산 조회와 추천에 필요한 데이터 갱신까지 연결했습니다.",
  "highlights": [
    "모의 마이데이터 인증과 자산 조회",
    "금융상품 검색과 변경 데이터 재처리"
  ],
  "contributions": [
    "OAuth2 인증과 사용자별 자산 조회를 구현하고 개인정보 암호화와 조회용 검색값을 분리했습니다.",
    "상품 수집과 검색을 분리하고, 필수 가입 조건을 반영하는 금융상품 추천 검색을 구현했습니다.",
    "사용자 변경을 감지하는 CDC와 영속 작업 큐를 구현하고 중단 후 재처리를 검증했습니다.",
    "관리자 통계의 사용자별 반복 조회를 페이지 단위 집계와 일괄 조회로 변경했습니다."
  ]
};
