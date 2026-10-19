import type { Project } from "./types";

export const knowwhohow: Project = {
  "slug": "knowwhohow",
  "name": "노후하우",
  "category": "시니어 자산 설계 서비스",
  "headline": "모의 마이데이터 기반 자산 관리·금융상품 추천",
  "summary": "모의 마이데이터·금융상품 RAG 개발 · 상품 1,326개 수집 · Recall@10 0.68→0.85 · 사용자 정보 CDC 연동",
  "focus": "PL · 백엔드 · AI · 인프라 · 프론트엔드",
  "tags": [
    "Spring Boot",
    "FastAPI",
    "Kafka",
    "Debezium",
    "Airflow",
    "LangGraph",
    "MongoDB Atlas",
    "MySQL",
    "AWS"
  ],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/Fisa5-Main-Project"
    }
  ],
  "overview": [
    "PL · 백엔드·AI 개발 · 프론트엔드·인프라 구성",
    "사용자 정보 CDC · 작업 재처리 구현"
  ],
  "cover": {
    "src": "/projects/knowwhohow/cover.png",
    "width": 1920,
    "height": 1080,
    "alt": "노후하우 서비스 로고와 모바일 자산 포트폴리오 화면",
    "caption": "노후하우의 자산 관리와 금융상품 추천 화면"
  },
  "architecture": {
    "placement": "after-chapters",
    "title": "온프레미스와 AWS를 연결한 하이브리드 구성",
    "figures": [
      {
        "src": "/projects/knowwhohow/on-premise-architecture.png",
        "width": 3652,
        "height": 1822,
        "alt": "온프레미스의 Nginx·인증 서버·리소스 서버와 HAProxy 뒤의 MySQL Master·Slave, Jenkins·SonarQube와 Airflow 구성",
        "caption": "온프레미스: 모의 마이데이터 인증·리소스 서버, MySQL Master/Slave와 HAProxy, 상품 수집·CI 환경"
      },
      {
        "src": "/projects/knowwhohow/aws-cloud-architecture.png",
        "width": 1378,
        "height": 897,
        "alt": "AWS VPC 안의 공개 서브넷 Nginx와 비공개 서브넷의 Spring 메인 서버, FastAPI AI 서버, Next.js 프론트엔드 및 RDS 구성",
        "caption": "AWS: 공개 서브넷의 진입 경로와 비공개 서브넷의 메인·AI·프론트엔드 서버를 분리한 구성"
      }
    ],
    "items": [
      "AWS 서비스 서버 ↔ 온프레미스 모의 마이데이터·Airflow·CI 환경 터널링",
      "Airflow 상품 수집 → MongoDB Atlas → AI 추천 검색",
      "Debezium·Kafka 기반 사용자 정보 갱신 워커"
    ]
  },
  "chapters": [
    {
      "id": "mydata",
      "nav": "모의 마이데이터 구현",
      "title": "모의 마이데이터 구현",
      "blocks": [
        {
          "heading": "인증·개인정보 처리",
          "items": [
            "표준 API 명세 기반 메인·인증·리소스 3개 서버 구성",
            "Spring Authorization Server · Authorization Code · RSA 서명 JWT 적용",
            "CI 기반 내부 사용자 매핑 · 사용자 ID를 자산 조회 조건에 반영",
            "AES/GCM 암호화 · HMAC-SHA256 검색값 · JPA AttributeConverter 적용",
            "Access Token Redis TTL 관리 · 401 시 토큰 갱신 후 1회 재호출"
          ]
        },
        {
          "heading": "자산 조회·DB 라우팅",
          "items": [
            "자산·부채·연금 정규화 및 재동기화 · 순자산·연동 상태 갱신",
            "MySQL Master/Slave · HAProxy 구성",
            "AbstractRoutingDataSource·LazyConnectionDataSourceProxy로 readOnly 조회/쓰기 라우팅"
          ]
        }
      ],
      "description": "마이데이터 연동을 검증하기 위해 표준 API 명세를 참고한 모의 환경을 구성했습니다. 동의·토큰 발급·자산 조회의 책임을 서버별로 나누고, 인증된 사용자 기준으로 금융정보를 조회하도록 구현했습니다."
    },
    {
      "id": "recommendation-search",
      "nav": "추천 검색 개선",
      "title": "금융상품 검색 개선",
      "blocks": [
        {
          "heading": "Hybrid Search·재랭킹",
          "items": [
            "벡터 검색에 키워드 검색·상품 유형·필수 조건 필터 결합",
            "LangGraph 상품군별 검색 도구 · 사용자 자산·목표 기반 추천 문맥 구성",
            "상품 ID별 좋아요·싫어요 반영 · 혜택·추천 이유·가입 링크 제공",
            "후보 수·재랭킹 범위 조정 → Recall@10 0.85 유지 · 검색시간 42% 단축"
          ],
          "figure": {
            "src": "/projects/knowwhohow/service-recommendation.png",
            "width": 3840,
            "height": 2160,
            "alt": "자산 포트폴리오에서 예금·펀드·연금저축 상품의 핵심 혜택, 추천 이유와 상품 페이지 링크를 보여주는 노후하우 화면",
            "caption": "금융상품 추천: 핵심 혜택 · 추천 이유 · 상세 링크"
          }
        }
      ],
      "metrics": {
        "caption": "추천 검색 고도화 전후",
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
        ],
        "note": "내부 검색 비교 · Recall@10: 관련 상품 검색 · NDCG@10: 상위 순위 품질"
      },
      "description": "기존 벡터 검색의 Recall@10은 0.68, NDCG@10은 0.64였습니다. 상품 설명의 유사도에 상품 유형·필수 조건을 함께 반영하도록 검색을 변경하고, 후보 수와 재랭킹 범위를 조정했습니다."
    },
    {
      "id": "product-pipeline",
      "nav": "만료 상품과 수집 관리",
      "title": "금융상품 1,326개 수집·갱신",
      "blocks": [
        {
          "heading": "Airflow ETL",
          "items": [
            "연금저축 297개 · 펀드 971개 · 예·적금 58개 수집",
            "금융감독원·금융위원회·한국벤처투자 API → 전처리·rag_text → 임베딩·MongoDB 적재",
            "상품군별 수집 · 컬렉션 통합 · 만료 상품 삭제 DAG 분리",
            "임베딩 누락 상품만 backfill · 추천 요청은 Atlas 적재 데이터 검색"
          ]
        }
      ],
      "figure": {
        "src": "/projects/knowwhohow/data-pipeline.png",
        "width": 3840,
        "height": 2160,
        "alt": "금융상품을 추출·전처리·임베딩·적재하고 만료 상품과 누락 임베딩을 처리하는 Airflow DAG",
        "caption": "상품 수집, 만료 상품 삭제와 누락 임베딩 재처리를 수행하는 Airflow DAG"
      },
      "description": "상품을 수집한 뒤에도 판매 종료와 임베딩 누락을 관리해야 했습니다. 추천 요청마다 외부 API를 호출하는 대신, Airflow에서 상품 수집·정리·검색 준비를 처리하도록 분리했습니다."
    },
    {
      "id": "database-queries",
      "nav": "관리자 통계 조회 개선",
      "title": "관리자 통계 API의 반복 조회 제거",
      "blocks": [
        {
          "heading": "페이지 단위 집계·배치 조회",
          "items": [
            "기존: 사용자 목록 조회 후 사용자별 MongoDB 통계·MySQL 이름 조회 반복",
            "페이지 user_id 수집 → MongoDB $match·$in·$group 일괄 집계",
            "사용자 이름은 MySQL WHERE IN으로 일괄 조회",
            "Dictionary·Map으로 결과 조합 → 목록 반복문 내 DB I/O 제거"
          ]
        }
      ],
      "description": "관리자 화면에서 사용자마다 통계와 이름을 추가 조회해, 목록의 사용자 수에 따라 DB 왕복이 늘었습니다. 페이지에 필요한 ID를 먼저 모아 집계·일괄 조회하고 결과를 메모리에서 조합하도록 바꿨습니다."
    },
    {
      "id": "user-state-freshness",
      "nav": "사용자 정보 갱신",
      "title": "사용자 정보 CDC 연동",
      "blocks": [
        {
          "heading": "원천 조회·페르소나 갱신",
          "items": [
            "수동 벡터화 API 갱신 → CDC 자동 갱신·추천 요청 시 MySQL 재조회",
            "REPEATABLE READ로 사용자·자산·목표·키워드 조회 · 동일 요청의 페르소나 재사용",
            "Decimal 금액 · 0/False 반영 · 자산·키워드 정렬로 텍스트 생성 통일"
          ]
        },
        {
          "heading": "CDC·임베딩 워커",
          "items": [
            "MySQL snapshot·binlog → Debezium → Kafka → MongoDB 갱신 큐 → persona worker",
            "이벤트는 갱신 대상 식별에 사용 · 실제 상태는 MySQL 재조회",
            "최신 텍스트 우선 저장 · embedding worker에서 벡터 생성",
            "텍스트 hash·모델 동일 시 재임베딩 생략 · 변경 시 이전 벡터 제거"
          ]
        }
      ],
      "description": "사용자 자산이 바뀌어도 벡터화 API를 다시 호출하기 전까지 이전 페르소나가 남을 수 있었습니다. CDC로 변경을 감지하고, 추천 요청에서는 MySQL을 다시 조회해 그 시점의 사용자 상태를 사용하도록 했습니다."
    },
    {
      "id": "cdc-recovery",
      "nav": "중단과 재처리",
      "title": "CDC 재처리·복구 검증",
      "blocks": [
        {
          "heading": "재전달·동시 갱신 처리",
          "items": [
            "MongoDB 작업 영속 등록 후 Kafka offset 수동 커밋",
            "lease·토큰으로 작업 claim · 프로세스 종료 시 만료 후 재처리",
            "generation·revision·hash 조건부 저장 · 삭제 사용자는 tombstone 처리",
            "형식 오류 메시지 격리 · DB/네트워크 장애는 offset 유지 후 재소비",
            "지수 backoff·jitter·임베딩 회로 차단 · 재처리 CLI·reconcile 제공"
          ]
        },
        {
          "heading": "검증 결과",
          "items": [
            "사용자 정보 갱신·재처리 관련 테스트 98개 통과",
            "로컬 Docker 5개 시나리오: 소비자 중단 · claim 후 강제 종료 · 오류 메시지 · MySQL 복구 · 임베딩 실패 주입",
            "변경 재반영 · lease 만료 후 재처리 · 최신 텍스트 유지·수동 재시도 확인"
          ]
        }
      ],
      "description": "소비자나 워커가 중단되면 같은 이벤트를 다시 받거나 처리 중인 작업이 남을 수 있습니다. 저장 후 offset 커밋, lease 만료 후 재처리, 조건부 저장을 적용하고 중단·재시작 실험으로 확인했습니다."
    },
    {
      "id": "engineering-quality",
      "nav": "코드 리뷰·CI",
      "title": "코드 리뷰·CI",
      "blocks": [
        {
          "heading": "공통 규칙·자동 검증",
          "items": [
            "계층·예외·트랜잭션 공통 규칙 정리",
            "Jenkins·SonarQube·JaCoCo 연동 · 제출 당시 커버리지 85% 이상",
            "3개 백엔드 저장소 Gemini Code Assist PR 리뷰 적용",
            "사용자 시나리오 49/53개(92.5%) · 상품 추천 테스트 14개 통과"
          ]
        }
      ],
      "description": "서버별로 달랐던 계층·예외·트랜잭션 규칙을 정리하고 CI와 PR 리뷰에 반영했습니다. 자동 분석 결과는 팀원이 변경 의도와 실행 결과를 확인한 뒤 적용했습니다."
    }
  ],
  "description": "시니어가 자산·부채·연금을 한곳에서 확인하고 금융상품을 추천받는 서비스입니다. 모의 마이데이터 연동부터 상품 검색, 사용자 정보 갱신까지 개발했습니다."
};
