import type { Project } from "./types";

export const easyreader: Project = {
  "slug": "easyreader",
  "name": "EasyReader",
  "category": "크롬 확장 프로그램, 정보 접근성",
  "headline": "웹페이지 요약과 음성 읽기를 제공하는 크롬 확장 프로그램",
  "summary": "웹페이지를 요약하고 음성 읽기와 화면 조절을 지원하는 크롬 확장 프로그램",
  "focus": "기획과 개발, 웹스토어 배포",
  "tags": [
    "Chrome Extension",
    "React",
    "LLM",
    "Web Speech API"
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
    "크롬 확장 프로그램 프로젝트, Chrome Web Store 등록"
  ],
  "chapters": [
    {
      "id": "page-integration",
      "nav": "요약, 음성 읽기와 배포",
      "title": "읽기 어려운 웹페이지를 요약과 음성으로 제공",
      "blocks": [
        {
          "heading": "본문 처리와 접근성 기능",
          "items": [
            "Content Script에서 추출한 본문을 Service Worker 메시지로 전달하고 React 화면에서 요약 요청과 응답을 처리했습니다.",
            "LLM으로 핵심 내용과 쉬운 표현을 제공하고 Web Speech API TTS로 읽을 수 있도록 했습니다.",
            "고대비 모드와 글자 크기 조절을 추가해 같은 페이지를 읽는 방식을 선택할 수 있도록 했습니다."
          ]
        },
        {
          "heading": "배포 후 개선",
          "items": [
            "Chrome Web Store에 등록했습니다.",
            "사용자 확인 기준 약 100명 규모의 사용 경험과 댓글을 참고해 요약, 고대비 UI와 글자 크기 조절을 개선했습니다."
          ]
        }
      ],
      "description": "웹페이지 읽기에 어려움을 겪는 가족이 본문을 쉽게 확인할 수 있도록 요약과 음성 읽기를 제공했습니다. 사이트마다 본문 구조가 달라 Readability 추출이 실패할 때는 body.innerText를 사용하도록 했습니다. 대체 경로에서는 메뉴 같은 부가 텍스트가 함께 포함될 수 있습니다."
    }
  ],
  "description": "웹페이지 읽기에 어려움을 겪는 가족을 위해 만든 크롬 확장 프로그램입니다. 본문을 요약하고 음성으로 읽거나, 글자 크기와 대비를 조절할 수 있도록 개발했습니다.",
  "cover": {
    "src": "/projects/easyreader/store-listing.png",
    "width": 1485,
    "height": 916,
    "alt": "Easy Reader 웹스토어 등록 화면과 웹페이지 요약, 음성 읽기 기능 미리보기",
    "caption": "Easy Reader 웹스토어 등록 화면"
  },
  "highlights": [
    "본문 추출 실패 시 대체 경로 구성",
    "요약과 음성 읽기, 화면 조절 기능 배포",
    "사용자 약 100명 확보"
  ],
  "contributions": [
    "Readability 기반 본문 추출과 추출 실패 시 대체 경로를 구현했습니다.",
    "확장 프로그램의 메시지 통신에 요약 요청과 음성 읽기를 연결했습니다.",
    "고대비와 글자 크기 조절을 제공하고 배포 후 댓글을 바탕으로 화면을 개선했습니다."
  ],
  "architecture": {
    "title": "웹페이지 본문 추출과 요약 요청",
    "items": [
      "Content Script에서 Readability로 본문 추출, 실패하면 body.innerText 사용",
      "Service Worker 메시지 통신으로 React 화면의 요약 요청과 응답 연결",
      "LLM 요약 결과를 표시하고 Web Speech API로 음성 읽기 제공"
    ]
  }
};

export const cardRecommendation: Project = {
  "slug": "card-recommendation",
  "name": "신용카드 추천 챗봇",
  "category": "우리FISA, 백엔드 성능 비교",
  "headline": "사용자 조건에 맞는 신용카드를 추천하는 챗봇",
  "summary": "사용자 조건에 맞는 신용카드와 추천 이유를 대화로 안내하는 챗봇",
  "focus": "Spring 응답 중계와 RAG 연동, 부하 비교",
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
    "Spring 백엔드와 FastAPI 연동, k6와 Grafana 부하 비교 담당"
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
      "title": "답변 생성 중 토큰 전달과 카드 상세 조회",
      "blocks": [
        {
          "heading": "Spring을 통한 응답 중계",
          "items": [
            "FastAPI의 LangChain RAG 응답을 Spring WebFlux의 WebClient로 받아 SSE로 중계했습니다.",
            "생성 완료 후 카드명을 파싱해 MongoDB에서 상세 정보를 조회하고 JSON으로 전달했습니다.",
            "텍스트 토큰과 카드 상세 정보의 전달 시점을 분리해 답변 전체가 완성되기 전부터 내용을 표시하도록 했습니다."
          ]
        }
      ],
      "description": "클라이언트가 AI 서버를 직접 호출하던 경로를 Spring 서버로 통합했습니다. 생성 중인 답변은 SSE로 전달하고, 생성이 끝나면 추천 카드의 상세 정보를 조회해 같은 응답 과정에서 제공하도록 구성했습니다."
    },
    {
      "id": "io-comparison",
      "nav": "MVC, WebFlux 부하 비교",
      "title": "MVC와 WebFlux의 부하별 자원 사용 비교",
      "blocks": [
        {
          "heading": "Spring MVC",
          "items": [
            "MVC의 JVM 전체 스레드는 200 VU에서 최대 221개, 500 VU에서 약 222개였습니다."
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
            "WebFlux는 200 VU에서 44개, 500 VU에서 59개로 관찰됐습니다.",
            "500 VU에서 JVM 스레드는 약 73.4% 적었지만 평균 응답시간과 처리량은 MVC가 소폭 우세했습니다."
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
        "note": "로컬 DB I/O 비교이며 DB 구성 차이가 있습니다. JVM 전체 스레드 수를 측정한 결과로, LLM 응답속도나 동일 DB 조건의 우열을 뜻하지 않습니다. 스레드 감소율: (222−59)÷222 ≈ 73.4%."
      },
      "description": "응답을 기다리는 요청이 늘어날 때의 자원 사용을 확인하기 위해 MVC와 WebFlux에 DB I/O 부하를 줬습니다. k6 가상 사용자 수를 바꾸며 Grafana의 JVM 전체 스레드 수를 관찰하고 응답시간과 처리량을 함께 비교했습니다."
    }
  ],
  "description": "사용자 조건에 맞는 카드와 추천 이유를 제공하는 챗봇입니다. Spring과 FastAPI를 연결하고, 응답 중계와 MVC, WebFlux 부하 비교를 맡았습니다.",
  "highlights": [
    "Spring 서버를 통한 응답 스트리밍",
    "MVC와 WebFlux의 자원 사용 비교"
  ],
  "contributions": [
    "클라이언트의 AI 직접 호출을 Spring 프록시 경유로 통합했습니다.",
    "RAG 생성 토큰을 SSE로 중계하고 생성 완료 후 추천 카드 상세 정보를 전달했습니다.",
    "MVC와 WebFlux에 DB I/O 부하를 주고 JVM 스레드 수, 응답시간과 처리량을 비교했습니다."
  ]
};

export const delishare: Project = {
  "slug": "delishare",
  "name": "Delishare",
  "category": "배달 공동구매, 매칭 성능 개선",
  "headline": "배달을 함께 주문할 사용자를 연결하는 공동구매 서비스",
  "summary": "같은 브랜드의 배달을 함께 주문할 사용자를 연결하는 공동구매 서비스",
  "focus": "팀장 / 웹 전환과 매칭 로직 개발",
  "tags": [
    "Spring Boot",
    "React",
    "Kotlin",
    "Bloom Filter",
    "JMeter"
  ],
  "links": [],
  "overview": [
    "팀장으로 프론트엔드와 백엔드 개발 참여, Kotlin 앱의 React 웹 전환"
  ],
  "chapters": [
    {
      "id": "matching",
      "nav": "매칭 후보 탐색 줄이기",
      "title": "브랜드별 매칭 후보 탐색 개선",
      "blocks": [
        {
          "heading": "후보 제한과 부하 비교",
          "items": [
            "전체 후보를 비교하던 방식에서 동일 브랜드별 큐를 조회하도록 변경했습니다.",
            "Bloom Filter는 포함 가능성을 확인하는 용도로 사용했습니다. 양성 응답만으로 매칭이 확정되지는 않습니다.",
            "총 3,000건 요청의 평균 응답시간은 1,745ms에서 81ms로 약 95.4% 줄었습니다."
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
        "note": "JMeter 총 요청 3,000건의 평균 비교입니다. 동시 사용자 수나 p95 지표로 해석하지 않으며, Bloom Filter는 오탐 가능한 후보 필터입니다."
      },
      "description": "기존 Gale–Shapley 기반 후보 비교에서는 매칭 대상이 늘면서 비교 비용이 커졌습니다. 같은 브랜드 요청을 큐로 분리해 탐색할 후보를 줄이고 Bloom Filter로 포함 가능성을 확인했습니다. 변경 전후를 JMeter 총 3,000건 요청으로 비교했습니다."
    }
  ],
  "description": "같은 브랜드의 배달을 함께 주문할 사용자를 연결하는 서비스입니다. 앱의 웹 전환 과정에서 매칭 후보 탐색을 수정하고 응답시간을 비교했습니다.",
  "highlights": [
    "Kotlin 앱에서 React 웹으로 전환",
    "브랜드별 큐로 매칭 후보 제한"
  ],
  "contributions": [
    "Kotlin 앱의 기능을 React 웹으로 전환하는 개발에 참여했습니다.",
    "브랜드별 큐와 Bloom Filter로 매칭 후보 탐색 범위를 줄였습니다.",
    "JMeter 총 3,000건 요청으로 변경 전후 평균 응답시간을 비교했습니다."
  ],
  "architecture": {
    "title": "브랜드별 주문 요청 매칭",
    "items": [
      "React 웹 화면 → Spring Boot 매칭 요청 → 동일 브랜드 큐에서 후보 탐색",
      "Bloom Filter는 후보 포함 가능성을 확인하는 필터로 사용"
    ]
  }
};
