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
  "overview": [],
  "chapters": [
    {
      "id": "page-integration",
      "nav": "웹페이지 요약과 음성 읽기",
      "title": "읽기 어려운 웹페이지를 요약과 음성으로 제공",
      "blocks": [
        {
          "heading": "웹페이지 본문을 가져와 요약하고 읽어주기",
          "items": [
            "Content Script에서 Readability로 본문을 추출했습니다. 추출이 실패하면 body.innerText로 대체해 요약을 요청할 수 있도록 했습니다. 이 경로에서는 메뉴 텍스트도 섞일 수 있습니다.",
            "추출한 본문은 Service Worker 메시지로 전달하고, React 사이드 패널에서 요약을 표시했습니다. Web Speech API로 읽기 기능을 붙이고 글자 크기와 고대비도 조절할 수 있게 했습니다."
          ]
        }
      ],
      "description": "사이트마다 페이지 구조가 달라 요약에 쓸 본문을 추출하는 방식부터 정했습니다."
    },
    {
      "id": "english-support",
      "nav": "v1.4 영어 지원",
      "title": "영어 버전 지원",
      "description": "v1.4부터 사이드 패널에서 한국어와 영어를 바꿔 쓸 수 있습니다. 영어로 전환하면 버튼과 안내 문구, 요약이 영어로 표시됩니다.",
      "blocks": [
        {
          "heading": "영어 사이드 패널",
          "items": [
            "요약 버튼, 상태 안내, 읽기 설정을 영어로 표시합니다.",
            "글자 크기는 네 단계로 조절할 수 있으며 음성 읽기와 고대비 설정도 사이드 패널에서 이용할 수 있습니다."
          ],
          "figure": {
            "src": "/projects/easyreader/english-controls.png",
            "width": 2427,
            "height": 1273,
            "alt": "영어로 표시된 요약 버튼, 음성 읽기, 글자 크기와 고대비 설정",
            "caption": "v1.4 영어 인터페이스와 읽기 설정"
          }
        },
        {
          "heading": "영어 요약 결과",
          "items": [
            "영어 요약은 개요와 핵심 항목으로 나뉩니다. 각 핵심 항목의 원문 발췌를 열어 요약 내용을 확인할 수 있습니다."
          ],
          "figure": {
            "src": "/projects/easyreader/english-summary.png",
            "width": 442,
            "height": 597,
            "alt": "영어 요약의 개요와 핵심 항목이 표시된 좁은 사이드 패널",
            "caption": "영어 요약 결과 확대",
            "portrait": true
          }
        }
      ],
      "figure": {
        "src": "/projects/easyreader/english-side-panel.png",
        "width": 2410,
        "height": 1274,
        "alt": "웹페이지 옆 사이드 패널에 개요, 핵심 항목과 원문 발췌 링크가 표시된 화면",
        "caption": "웹페이지를 보면서 확인하는 영어 요약"
      }
    }
  ],
  "description": "EasyReader는 긴 웹페이지의 핵심 내용을 읽거나 들을 수 있는 크롬 확장 프로그램입니다. 사용자는 보고 있는 페이지 옆에 사이드 패널을 열어 요약을 확인하고, 필요하면 원문 발췌를 펼쳐 볼 수 있습니다. 음성 읽기와 글자 크기, 고대비 설정도 같은 패널에서 이용할 수 있습니다.",
  "cover": {
    "src": "/projects/easyreader/store-listing.png",
    "width": 1485,
    "height": 916,
    "alt": "Easy Reader 웹스토어 등록 화면과 웹페이지 요약, 음성 읽기 기능 미리보기",
    "caption": "Easy Reader 웹스토어 등록 화면"
  },
  "highlights": [
    "Chrome Web Store 설치 800회 돌파",
    "v1.4 한국어·영어 인터페이스 및 요약 지원",
    "음성 읽기, 글자 크기 및 고대비 설정"
  ],
  "contributions": [
    "웹페이지 본문 추출부터 LLM 요약과 결과 표시까지 AI 기능 전반을 직접 구현했습니다.",
    "Readability로 웹페이지 본문을 추출하고, 본문을 찾지 못한 페이지에서는 화면의 텍스트를 가져오도록 대체 경로를 만들었습니다.",
    "Service Worker를 거쳐 요약 요청과 응답을 연결하고, React 사이드 패널에 요약과 원문 발췌를 표시했습니다.",
    "Web Speech API로 음성 읽기를 구현하고 글자 크기와 고대비 설정을 추가했습니다. 배포 후에는 웹스토어 댓글을 바탕으로 화면을 개선했습니다.",
    "Chrome Web Store에 직접 배포해 2026년 11월 10일 기준 누적 설치 846회를 기록했습니다."
  ],
  "architecture": {
    "title": "웹페이지 본문 추출과 요약 요청",
    "items": [
      "Content Script에서 Readability로 본문 추출, 실패하면 body.innerText 사용",
      "Service Worker 메시지 통신으로 React 화면의 요약 요청과 응답 연결",
      "LLM 요약 결과를 표시하고 Web Speech API로 음성 읽기 제공"
    ]
  },
  "overviewFigures": [
    {
      "src": "/projects/easyreader/install-milestone.png",
      "width": 1672,
      "height": 1098,
      "alt": "Chrome Web Store 개발자 대시보드에 표시된 설치 수 846회와 설치 추이",
      "caption": "Chrome Web Store 설치 통계 (2026년 11월 10일까지)"
    }
  ]
};

export const cardRecommendation: Project = {
  "slug": "card-recommendation",
  contributionsTitle: "서비스 기능",
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
  "overview": [],
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
      "title": "답변이 생성되는 동안 SSE로 전달",
      "blocks": [
        {
          "heading": "생성 중인 답변과 카드 상세를 순서대로 전달",
          "items": [
            "FastAPI의 LangChain RAG 응답을 Spring WebFlux의 WebClient로 받아 SSE로 중계했습니다.",
            "생성 완료 후 카드명을 파싱해 MongoDB에서 상세 정보를 조회하고 JSON으로 전달했습니다.",
            "텍스트 토큰과 카드 상세 정보의 전달 시점을 분리해 답변 전체가 완성되기 전부터 내용을 표시하도록 했습니다."
          ]
        }
      ],
      "description": "처음에는 클라이언트가 Spring 서버와 AI 서버를 따로 호출했습니다. 요청을 Spring으로 모으고, 답변은 완성될 때까지 기다리지 않고 생성되는 순서대로 화면에 보냈습니다."
    },
    {
      "id": "io-comparison",
      "nav": "MVC, WebFlux 부하 비교",
      "title": "DB 조회 부하에서 MVC와 WebFlux 비교",
      "blocks": [
        {
          "heading": "Spring MVC",
          "items": [
            "MVC에서는 200 VU부터 JVM 스레드가 221개까지 늘었습니다."
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
            "WebFlux에서는 200 VU에 44개, 500 VU에 59개가 관찰됐습니다."
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
        ]
      },
      "description": "DB 응답을 기다리는 요청이 많아질 때 스레드가 얼마나 늘어나는지 비교했습니다. 로컬에서 k6로 조회 부하를 주고 Grafana에서 JVM 전체 스레드 수, 평균 응답시간, 처리량을 확인했습니다.",
      "outcome": "500 VU에서 JVM 스레드는 MVC 222개, WebFlux 59개였습니다. 평균 응답시간과 처리량은 MVC가 소폭 앞섰습니다. 스레드를 덜 쓰면 응답도 빨라질 줄 알았는데, 이번 실험에서는 두 지표가 다르게 나왔습니다. AI 답변을 스트리밍하는 동안 HTTP 연결을 유지해야 하는 경우에는 WebFlux를 검토하고, 짧은 블로킹 DB 조회가 대부분이라면 MVC도 충분한 선택이라고 생각합니다."
    }
  ],
  "description": "원하는 혜택이나 카드 조건을 대화로 입력하면 신용카드와 추천 이유를 알려 주는 챗봇입니다. 사용자는 답변이 생성되는 동안 추천 이유를 먼저 읽고, 답변이 끝나면 추천 카드의 상세 정보를 확인할 수 있습니다.",
  "highlights": [
    "Spring 서버를 통한 응답 스트리밍",
    "MVC와 WebFlux의 자원 사용 비교"
  ],
  "contributions": [
    "클라이언트 요청을 Spring 서버로 모으고, WebClient로 FastAPI의 추천 응답을 받아 SSE로 전달했습니다.",
    "답변 생성이 끝나면 카드명을 추출해 MongoDB에서 상세 정보를 조회했습니다. 답변과 상세 정보의 전달 시점을 나눠 사용자가 답변을 먼저 읽을 수 있도록 했습니다.",
    "k6로 DB 조회 부하를 주고 Grafana에서 MVC와 WebFlux의 스레드 수, 응답 시간, 처리량을 비교했습니다. 500 VU에서 JVM 스레드는 MVC 222개, WebFlux 59개였고, 평균 응답 시간과 처리량은 MVC가 소폭 앞섰습니다."
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
  "overview": [],
  "chapters": [
    {
      "id": "matching",
      "nav": "매칭 후보 탐색 줄이기",
      "title": "같은 브랜드의 주문끼리 매칭",
      "blocks": [
        {
          "heading": "주문이 들어온 브랜드의 대기열만 확인",
          "items": [
            "주문이 들어오면 해당 브랜드의 대기열에서만 후보를 찾도록 바꿨습니다. 이미 매칭된 주문자인지 확인할 때는 `Bloom Filter`를 먼저 사용했습니다."
          ]
        },
        {
          "heading": "Bloom Filter란?",
          "items": [
            "`Bloom Filter`는 어떤 값이 집합에 들어 있는지 적은 메모리로 빠르게 확인하는 자료구조입니다. 값을 추가할 때 여러 해시가 가리키는 칸을 1로 표시합니다. 조회할 때 0인 칸이 하나라도 있으면 해당 값은 없고, 모두 1이면 들어 있을 가능성이 있습니다. DeliShare에서는 이미 매칭된 주문자를 확인할 때 이 필터를 먼저 사용했습니다."
          ],
          "figure": {
            "src": "/projects/delishare/bloom-filter.png",
            "width": 1446,
            "height": 972,
            "alt": "두 값의 해시가 비트 배열의 여러 칸을 가리키는 그림",
            "caption": ""
          }
        }
      ],
      "metrics": {
        "caption": "JMeter 매칭 요청 3,000건 비교",
        "columns": [
          "측정 항목",
          "기존 속도",
          "개선 속도"
        ],
        "rows": [
          [
            "평균 응답시간",
            "1,745 ms",
            "81 ms"
          ]
        ]
      },
      "description": "기존 `Gale–Shapley` 기반 구현은 주문이 쌓일수록 같은 후보를 여러 번 확인했습니다. 공동 주문은 같은 브랜드끼리만 성립하므로, 처음부터 브랜드가 다른 주문을 비교 대상에서 뺐습니다.",
      "outcome": "변경 전후에 `JMeter`로 매칭 요청을 각각 3,000건 실행했습니다. 평균 응답시간은 1,745ms에서 81ms로 약 95% 줄었습니다."
    }
  ],
  "description": "DeliShare는 같은 브랜드에서 배달을 주문하려는 사람을 모아 공동 주문으로 연결하는 서비스입니다. 사용자가 웹에서 브랜드를 골라 주문을 등록하면, 서비스는 같은 브랜드로 주문을 넣은 사람 중에서 함께 주문할 후보를 찾습니다. 팀장을 맡아 기존 앱을 웹으로 옮기고 매칭 로직을 개선했습니다.",
  "highlights": [
    "매칭 요청 3,000건에서 평균 응답시간 1,745ms → 81ms",
    "브랜드별 대기열과 Bloom Filter 적용"
  ],
  "contributions": [
    "기존 Kotlin 앱을 React 웹으로 옮기는 작업에 참여하고, 공동 주문 화면과 백엔드 매칭 로직을 개발했습니다.",
    "브랜드별 대기열을 두어 같은 브랜드의 주문끼리만 비교하고, 이미 매칭된 주문자를 확인할 때 Bloom Filter를 사용했습니다.",
    "JMeter로 개선 전후 매칭 요청을 각각 3,000건 실행했습니다. 평균 응답 시간은 1,745ms에서 81ms로 줄었습니다."
  ]
};
