import type { Project } from "./types";

export const easyreader: Project = {
  "slug": "easyreader",
  "name": "EasyReader",
  "category": "크롬 확장 프로그램, 정보 접근성",
  "headline": "웹페이지 요약과 음성 읽기를 제공하는 크롬 확장 프로그램",
  "summary": "웹페이지를 요약하고 음성 읽기와 화면 조절을 지원하는 크롬 확장 프로그램",
  "focus": "개인 기획, Chrome Extension, LLM, TTS, 배포와 피드백",
  "tags": [
    "Chrome Extension",
    "LLM",
    "TTS"
  ],
  "links": [
    {
      "label": "Chrome Web Store",
      "url": "https://chromewebstore.google.com/detail/easy-reader/dgmckhbflcjjmnjoimgkmcljneoddoon?hl=ko"
    },
    {
      "label": "GitHub",
      "url": "https://github.com/fisa-mini-project"
    }
  ],
  "overview": [
    "개인 기획, 개발, 배포, 약 2주 개발"
  ],
  "chapters": [
    {
      "id": "page-integration",
      "nav": "요약, 음성 읽기와 배포",
      "title": "본문 추출, 요약, 음성 읽기 구현",
      "blocks": [
        {
          "heading": "본문 추출, 요약, 읽기",
          "items": [
            "Content Script의 Readability 본문 추출, 실패 시 body.innerText 사용",
            "Service Worker 메시지 통신, React에서 요약 요청, 응답 처리",
            "LLM 쉬운 표현, 핵심 요약, Web Speech API TTS",
            "고대비 모드, 글자 크기 조절"
          ]
        },
        {
          "heading": "배포, 피드백",
          "items": [
            "약 2주 개발 후 Chrome Web Store 등록",
            "약 50명 규모의 사용 경험, 댓글 확인",
            "피드백 기반 요약, 고대비 UI, 가변 글자 크기 개선"
          ]
        }
      ],
      "description": "사이트마다 본문 구조가 달라 추출에 실패하는 경우를 고려했습니다. Readability를 우선 사용하고 대체 경로를 둔 뒤, 요약, TTS, 화면 조절 기능을 연결해 웹스토어에 배포했습니다."
    }
  ],
  "period": "약 2주 개발, 배포 후 개선",
  "description": "웹페이지 읽기에 어려움을 겪는 가족을 위해 만든 크롬 확장 프로그램입니다. 본문을 요약하고 음성으로 읽거나, 글자 크기와 대비를 조절할 수 있도록 개발했습니다.",
  "cover": {
    "src": "/projects/easyreader/store-listing.png",
    "width": 1485,
    "height": 916,
    "alt": "Easy Reader 웹스토어 등록 화면과 웹페이지 요약, 음성 읽기 기능 미리보기",
    "caption": "Easy Reader 웹스토어 등록 화면"
  }
};

export const cardRecommendation: Project = {
  "slug": "card-recommendation",
  "name": "신용카드 추천 챗봇",
  "category": "우리FISA, 백엔드 성능 비교",
  "headline": "사용자 조건에 맞는 신용카드를 추천하는 챗봇",
  "summary": "사용자 조건에 맞는 신용카드와 추천 이유를 대화로 안내하는 챗봇",
  "focus": "WebFlux, SSE, RAG 체인, 부하 테스트",
  "tags": [
    "Spring WebFlux",
    "Spring MVC",
    "Next.js",
    "FastAPI",
    "K6",
    "Grafana"
  ],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/Jhcki222/woori-card-recommendation-system"
    }
  ],
  "overview": [
    "Spring 백엔드, FastAPI, SSE 연동, k6, Grafana 부하 비교"
  ],
  "cover": {
    "src": "/projects/card-recommendation/demo.gif",
    "width": 960,
    "height": 487,
    "alt": "우리카드 추천 챗봇의 실제 시연 화면",
    "caption": "우리카드 추천 챗봇 메인페이지"
  },
  "architecture": {
    "title": "RAG 응답 스트리밍과 카드 상세 조회",
    "figures": [
      {
        "src": "/projects/card-recommendation/streaming-sequence.png",
        "width": 955,
        "height": 818,
        "alt": "Next.js, Spring WebFlux, FastAPI와 MongoDB 사이의 요청, SSE 토큰 전달, 카드 상세 조회 시퀀스",
        "caption": "추천 요청부터 토큰 스트리밍, 카드 상세 JSON 전달과 스트림 종료까지의 흐름"
      }
    ],
    "items": [
      "Next.js → Spring WebFlux, WebClient → FastAPI",
      "RAG 생성 토큰 SSE 중계 → 추천 카드 상세 JSON 전달"
    ]
  },
  "chapters": [
    {
      "id": "streaming-gateway",
      "nav": "AI 응답 대기와 스트리밍",
      "title": "Spring 프록시와 SSE 응답 중계",
      "blocks": [
        {
          "heading": "단일 진입점, SSE",
          "items": [
            "클라이언트 AI 직접 호출 → Spring 프록시 경유로 통합",
            "FastAPI LangChain RAG → WebClient → SSE 중계",
            "생성 완료 후 카드명 파싱 → MongoDB 상세 조회 → JSON 전달"
          ]
        }
      ],
      "description": "클라이언트가 AI 서버를 직접 호출하던 경로를 Spring 서버로 모았습니다. 생성 중인 답변은 SSE로 전달하고, 완료 후 추천 카드 상세 정보를 추가로 조회하도록 구성했습니다."
    },
    {
      "id": "io-comparison",
      "nav": "MVC, WebFlux 부하 비교",
      "title": "MVC와 WebFlux의 부하별 자원 사용 비교",
      "blocks": [
        {
          "heading": "Spring MVC",
          "items": [
            "k6 DB I/O 부하, Grafana JVM 스레드 관찰",
            "200 VU 최대 221개, 500 VU 약 222개"
          ],
          "figure": {
            "src": "/projects/card-recommendation/mvc-jvm-threads.png",
            "width": 1563,
            "height": 622,
            "alt": "MVC의 Grafana JVM 대시보드: 최대 스레드 222개와 주기적으로 발생하는 blocked 상태",
            "caption": "MVC 모니터링 화면. 최대 222개 스레드와 blocked 상태가 관찰됐습니다."
          }
        },
        {
          "heading": "Spring WebFlux",
          "items": [
            "200 VU 44개, 500 VU 59개",
            "500 VU 스레드 수 약 73.4% 감소, 처리량 유사",
            "평균 응답시간, 처리량은 MVC가 소폭 우세"
          ],
          "figure": {
            "src": "/projects/card-recommendation/webflux-jvm-threads.png",
            "width": 1544,
            "height": 608,
            "alt": "WebFlux의 Grafana JVM 대시보드: 최대 44개 스레드와 blocked 상태 0개",
            "caption": "WebFlux 200 VU, JVM 스레드 최대 44개"
          }
        }
      ],
      "metrics": {
        "caption": "DB I/O 부하별 JVM 스레드 수 비교",
        "columns": [
          "가상 사용자 수",
          "Spring MVC",
          "Spring WebFlux"
        ],
        "rows": [
          [
            "200 VU",
            "최대 221개",
            "44개"
          ],
          [
            "500 VU",
            "약 222개",
            "59개"
          ]
        ],
        "note": "로컬 DB I/O 비교, DB 구성 차이 존재, JVM 전체 스레드 지표, 감소율 (222−59)÷222 ≈ 73.4%"
      },
      "description": "외부 응답을 기다리는 요청의 자원 사용을 비교하기 위해 MVC, WebFlux 구현에 DB I/O 부하를 줬습니다. 스레드 수와 응답시간, 처리량을 함께 확인했습니다."
    }
  ],
  "description": "사용자 조건에 맞는 카드와 추천 이유를 제공하는 챗봇입니다. Spring과 FastAPI를 연결하고, 응답 중계와 MVC, WebFlux 부하 비교를 맡았습니다."
};

export const delishare: Project = {
  "slug": "delishare",
  "name": "Delishare",
  "category": "배달 공동구매, 매칭 성능 개선",
  "headline": "배달을 함께 주문할 사용자를 연결하는 공동구매 서비스",
  "summary": "같은 브랜드의 배달을 함께 주문할 사용자를 연결하는 공동구매 서비스",
  "focus": "팀장, 프론트엔드, 백엔드",
  "tags": [
    "Spring Boot",
    "React",
    "Kotlin",
    "Bloom Filter",
    "JMeter"
  ],
  "links": [],
  "overview": [
    "팀장, 프론트엔드, 백엔드, Kotlin → React 웹앱 전환"
  ],
  "chapters": [
    {
      "id": "matching",
      "nav": "매칭 후보 탐색 줄이기",
      "title": "브랜드별 매칭 후보 탐색 개선",
      "blocks": [
        {
          "heading": "후보 탐색 변경, 응답시간 비교",
          "items": [
            "기존 Gale–Shapley 기반 후보 비교: 최악 O(n²)",
            "동일 브랜드별 큐 구성, Bloom Filter로 포함 가능성 확인",
            "JMeter 총 3,000건 요청 평균: 1,745ms → 81ms",
            "평균 응답시간 약 95.4% 단축"
          ]
        }
      ],
      "metrics": {
        "caption": "JMeter 매칭 요청 3,000건 비교",
        "columns": [
          "측정 항목",
          "기존 구현",
          "개선 구현"
        ],
        "rows": [
          [
            "평균 매칭 처리 시간",
            "1,745 ms",
            "81 ms"
          ]
        ],
        "note": "JMeter 총 3,000건 평균 비교, Bloom Filter는 오탐 가능한 후보 필터"
      },
      "description": "기존 매칭의 3,000건 요청 평균 응답시간은 1,745ms였습니다. 동일 브랜드 요청을 큐로 분리해 비교할 후보를 제한하고, Bloom Filter로 포함 가능성을 확인하도록 변경했습니다."
    }
  ],
  "description": "같은 브랜드의 배달을 함께 주문할 사용자를 연결하는 서비스입니다. 앱의 웹 전환 과정에서 매칭 후보 탐색을 수정하고 응답시간을 비교했습니다."
};
