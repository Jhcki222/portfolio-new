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
      "nav": "웹페이지 본문 추출 개선",
      "title": "1. 웹페이지마다 다른 HTML 구조로 인한 요약 품질 문제",
      "description": "초기에는 웹페이지의 텍스트를 그대로 가져와 LLM에 전달했습니다. 그런데 사이트마다 HTML 구조가 달라 기사 본문과 관계없는 메뉴, 광고, 추천 게시글까지 함께 추출됐습니다.\n\n이렇게 수집한 텍스트를 요약하면 정작 중요한 본문이 빠지거나, 광고와 메뉴 내용이 요약에 포함되는 문제가 있었습니다.\n\n다양한 웹사이트에서 사용할 수 있는 확장 프로그램인 만큼, 사이트마다 별도로 본문 선택자를 지정하는 방식으로는 해결하기 어려웠습니다.",
      "blocks": [
        {
          "heading": "Mozilla Readability를 활용한 본문 추출",
          "items": [
            "Mozilla의 오픈소스 라이브러리인 Readability를 적용해 DOM에서 본문으로 판단되는 영역 추출",
            "페이지의 메뉴와 광고 등 불필요한 요소가 요약 입력에 포함되는 문제 완화",
            "Readability가 본문을 찾지 못하면 `body.innerText`를 사용하도록 대체 경로 구현",
            "추출한 텍스트를 Content Script에서 Service Worker로 전달하고 LLM 요약 요청 처리",
            "대체 경로에서는 메뉴나 광고가 일부 포함될 수 있지만, 본문 추출에 실패한 페이지에서도 요약을 요청할 수 있도록 했습니다."
          ]
        },
        {
          "heading": "요약 결과를 원문과 함께 확인하도록 구성",
          "items": [
            "LLM 응답을 개요와 핵심 항목으로 나눠 사이드 패널에 표시",
            "핵심 항목마다 관련 원문 발췌를 펼쳐 확인할 수 있도록 구현",
            "요약 내용을 Web Speech API로 읽어주는 기능 추가",
            "글자 크기와 고대비 설정을 같은 패널에서 변경하도록 구성"
          ]
        }
      ],
      "outcome": [
        "HTML 구조가 다른 웹페이지에서 메뉴·광고 등 불필요한 텍스트가 요약에 섞이는 문제를 줄였습니다.",
        "Readability가 본문을 찾지 못하는 페이지에서도 요약을 요청할 수 있게 했습니다.",
        "요약 항목을 읽다가 필요한 부분의 원문을 바로 펼쳐 볼 수 있게 했습니다."
      ]
    },
    {
      "id": "english-support",
      "nav": "영어 지원과 읽기 설정",
      "title": "2. 영어 버전 추가와 웹 접근성 개선",
      "description": "처음 출시한 EasyReader는 사이드 패널의 버튼과 안내 문구가 모두 한국어였습니다.\n\n영어 사용자에게도 서비스를 제공하려면 요약 결과뿐 아니라 버튼과 설정 화면까지 영어로 사용할 수 있어야 했습니다. 또한 글자 크기를 조절하거나 음성으로 내용을 들으려는 사용자가 여러 설정을 쉽게 찾을 수 있도록 화면을 정리할 필요가 있었습니다.",
      "blocks": [
        {
          "heading": "한국어와 영어를 선택할 수 있는 사이드 패널 구현",
          "items": [
            "요약 버튼, 처리 상태, 음성 읽기 및 접근성 설정 문구의 영어 버전 추가",
            "언어 선택에 따라 요약 결과도 한국어 또는 영어로 표시",
            "영어 요약도 개요와 핵심 항목으로 구성하고, 각 항목의 원문 발췌 제공",
            "기존 한국어 기능을 유지하면서 영어 인터페이스를 추가해 v1.4 배포"
          ],
          "figure": {
            "src": "/projects/easyreader/english-controls.png",
            "width": 2427,
            "height": 1273,
            "alt": "영어 요약 버튼과 접근성 설정 화면",
            "caption": "v1.4 영어 인터페이스와 읽기 설정"
          }
        },
        {
          "heading": "",
          "items": [],
          "figure": {
            "src": "/projects/easyreader/english-summary.png",
            "width": 442,
            "height": 597,
            "alt": "영어 요약 결과 및 원문 발췌 화면",
            "caption": "영어 요약 결과 및 원문 발췌",
            "portrait": true
          }
        },
        {
          "heading": "사용자 피드백을 반영한 읽기 설정 개선",
          "items": [
            "Chrome 웹스토어에 등록된 사용자 의견을 확인하고 화면 구성 개선",
            "글자 크기를 네 단계로 변경할 수 있도록 구현",
            "저시력 사용자를 위한 고대비 화면 제공",
            "Web Speech API를 활용한 음성 읽기 기능을 사이드 패널에서 바로 실행하도록 구성"
          ]
        }
      ],
      "outcome": [
        "v1.4부터 한국어와 영어 인터페이스 및 요약 기능을 제공했습니다.",
        "사용자가 글자 크기와 고대비를 설정하고 요약을 음성으로 들을 수 있습니다.",
        "**Chrome 웹스토어 누적 설치 1,200회 이상**을 기록했습니다."
      ],
      "figure": {
        "src": "/projects/easyreader/english-side-panel.png",
        "width": 2410,
        "height": 1274,
        "alt": "영어 사이드 패널에서 요약과 접근성 기능을 사용하는 화면",
        "caption": "웹페이지 옆에서 확인하는 영어 요약"
      }
    }
  ],
  "description": "웹페이지의 글이 너무 길거나 글씨가 작아 읽기 어려운 사람들을 위해 만든 Chrome 확장 프로그램입니다. 고령층이나 저시력 사용자가 웹페이지의 내용을 쉽게 확인할 수 있도록 AI 요약, 음성 읽기, 글자 크기 조절, 고대비 기능을 넣었습니다.\n\n웹페이지를 벗어나지 않고 사이드 패널에서 요약을 읽을 수 있으며, 요약된 내용이 궁금하면 해당 항목의 원문도 펼쳐볼 수 있습니다.\n\nChrome 웹스토어에 직접 출시했으며, 배포 후에도 사용자 피드백을 반영해 기능을 개선하고 영어 버전을 추가했습니다. **현재 누적 설치 1,200회 이상을 기록하고 있습니다.**",
  "cover": {
    "src": "/projects/easyreader/store-listing.png",
    "width": 1485,
    "height": 916,
    "alt": "EasyReader Chrome 웹스토어 등록 화면",
    "caption": "EasyReader 웹스토어 등록 화면"
  },
  "highlights": [
    "Chrome 웹스토어 누적 설치 1,200회 이상",
    "v1.4 한국어·영어 인터페이스 및 요약 지원",
    "본문 추출 실패 시 화면 텍스트로 요약 요청"
  ],
  "contributionsIntro": "팀 프로젝트로 시작했고, 현재는 혼자 유지보수와 기능 개선을 진행하고 있습니다.",
  "contributions": [
    "React와 Chrome Extension Manifest V3 기반 확장 프로그램 개발",
    "Mozilla Readability를 활용한 웹페이지 본문 추출 및 예외 처리 구현",
    "Content Script와 Service Worker 간 메시지 통신, LLM 요약 요청 및 응답 처리",
    "AI 요약 결과와 원문 발췌를 표시하는 사이드 패널 구현",
    "Web Speech API를 이용한 음성 읽기 및 글자 크기, 고대비 설정 개발",
    "한국어와 영어 인터페이스 및 요약 언어 전환 기능 추가",
    "Chrome 웹스토어 출시 및 사용자 피드백을 반영한 지속적인 업데이트"
  ],
  "architecture": {
    "title": "웹페이지 본문 추출부터 AI 요약까지",
    "items": [
      "웹페이지 DOM → Content Script(Readability) → Service Worker → LLM API → React 사이드 패널",
      "Content Script에서 웹페이지의 본문을 추출하고 Service Worker에 전달",
      "Service Worker에서 LLM API 요청과 응답 처리",
      "React 사이드 패널에서 AI 요약과 원문 발췌 표시",
      "Web Speech API로 요약 내용 음성 읽기 제공"
    ]
  },
  "overviewFigures": [
    {
      "src": "/projects/easyreader/install-milestone.png",
      "width": 1237,
      "height": 1073,
      "alt": "2026년 11월 16일까지 Chrome 웹스토어 설치 수 1.01천 회와 설치 추이",
      "caption": "Chrome 웹스토어 설치 통계 · 2026년 11월 16일까지"
    }
  ]
};

export const cardRecommendation: Project = {
  "slug": "card-recommendation",
  contributionsTitle: "내가 맡은 일",
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
    "title": "RAG 추천 응답과 카드 상세 조회",
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
      "Next.js → Spring WebFlux → WebClient → FastAPI(LangChain RAG)",
      "Spring WebFlux → MongoDB(카드 상세 조회)",
      "AI 답변: 생성된 텍스트를 SSE로 전달",
      "답변 완료 후: 카드명을 추출해 MongoDB에서 상세 조회",
      "카드 상세: JSON으로 전달한 뒤 스트림 종료"
    ]
  },
  "chapters": [
    {
      "id": "streaming-gateway",
      "nav": "하나의 SSE 연결로 응답 전달",
      "title": "1. AI 답변과 카드 상세 정보를 하나의 SSE 연결로 전달",
      "description": "초기에는 프런트엔드에서 Spring 서버와 FastAPI를 각각 호출했습니다. AI 답변과 카드 상세를 가져오는 요청이 나뉘어 있어 프런트엔드에서 두 응답의 순서를 관리해야 했습니다.\n\nAI가 답변을 모두 생성할 때까지 기다리면 사용자는 그동안 추천 내용을 확인할 수 없었습니다.",
      "blocks": [
        {
          "heading": "Spring 서버에서 AI 요청과 카드 정보 조회 처리",
          "items": [
            "클라이언트의 추천 요청을 Spring WebFlux 서버에서 받고, WebClient로 FastAPI의 LangChain RAG API 호출",
            "FastAPI가 생성하는 텍스트를 도착하는 대로 SSE로 전달",
            "AI 답변 생성이 끝나면 추천 카드명을 추출해 MongoDB에서 상세 정보 조회",
            "답변 텍스트와 카드 상세 정보를 별도 SSE 이벤트로 구분하고, 카드 상세 JSON을 전달한 뒤 연결 종료"
          ]
        }
      ],
      "outcome": [
        "프런트엔드의 추천 요청을 Spring 서버 하나로 통합",
        "AI가 답변을 생성하는 동안 추천 이유를 화면에 표시",
        "하나의 SSE 연결에서 추천 답변과 카드 혜택·상세 정보를 순서대로 전달"
      ]
    },
    {
      "id": "io-comparison",
      "nav": "MVC·WebFlux DB 조회 부하 비교",
      "title": "2. MVC와 WebFlux의 DB 조회 부하 비교",
      "description": "AI 챗봇은 답변이 생성되는 동안 HTTP 연결을 유지합니다. 동시에 여러 요청이 들어올 때 서버가 스레드를 얼마나 쓰는지도 고려해야 했습니다.\n\nWebFlux가 스레드를 적게 쓰는지, 그 차이가 응답 시간과 처리량에도 나타나는지 확인하려고 두 방식에 같은 DB 조회 부하를 줬습니다.",
      "blocks": [
        {
          "heading": "k6 부하 테스트 및 Grafana 모니터링",
          "items": [
            "로컬에서 Spring MVC와 WebFlux의 DB 조회 API에 k6로 200 VU, 500 VU 부하 적용",
            "Grafana에서 JVM 전체 스레드 수, 평균 응답 시간, 처리량을 확인하고 각 지표 비교"
          ]
        },
        {
          "heading": "Spring MVC 측정 결과",
          "items": [
            "200 VU에서 JVM 전체 스레드는 최대 221개, 500 VU에서는 약 222개였습니다. 일부 스레드가 BLOCKED 상태에 있는 것도 확인했습니다."
          ],
          "figure": {
            "src": "/projects/card-recommendation/mvc-jvm-threads.png",
            "width": 1563,
            "height": 622,
            "alt": "MVC의 Grafana JVM 대시보드. 최대 스레드 222개와 BLOCKED 상태",
            "caption": "MVC 모니터링 화면 · 최대 222개 스레드와 BLOCKED 상태"
          }
        },
        {
          "heading": "Spring WebFlux 측정 결과",
          "items": [
            "같은 조건에서 WebFlux의 JVM 전체 스레드는 200 VU에서 최대 44개, 500 VU에서 59개였습니다."
          ],
          "figure": {
            "src": "/projects/card-recommendation/webflux-jvm-threads.png",
            "width": 1544,
            "height": 608,
            "alt": "WebFlux의 Grafana JVM 대시보드. 200 VU에서 최대 44개 스레드",
            "caption": "WebFlux 200 VU · JVM 스레드 최대 44개"
          }
        }
      ],
      "metrics": {
        "caption": "DB 조회 부하 테스트 결과",
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
        "note": "측정 지표는 JVM 전체 스레드 수입니다."
      },
      "outcome": "500 VU에서 MVC는 약 222개, WebFlux는 59개의 JVM 스레드를 사용했습니다. WebFlux의 스레드 수가 약 73% 적었습니다.\n\n평균 응답 시간과 처리량은 MVC가 소폭 앞섰습니다. WebFlux의 스레드 사용량은 줄었지만, 이번 DB 조회 실험에서 응답 성능까지 개선되지는 않았습니다.\n\n챗봇의 AI 응답 스트리밍에는 WebFlux를 사용했습니다. 일반 DB 조회 API의 경우 I/O 방식과 실제 부하를 확인한 뒤 MVC와 WebFlux 중 어느 쪽이 맞는지 판단해야 한다고 봤습니다."
    }
  ],
  "description": "사용자가 원하는 혜택이나 카드 조건을 입력하면 적합한 신용카드를 찾아 추천하는 AI 챗봇입니다. LangChain RAG로 카드 정보를 검색하고 추천 이유를 생성합니다.\n\n답변은 생성되는 대로 화면에 표시하고, 응답이 끝나면 추천된 카드의 상세 정보를 별도로 보여줍니다.",
  "highlights": [
    "카드 상세 조회를 뒤로 분리하고 답변부터 SSE로 전달",
    "DB 조회 500 VU에서 JVM 스레드 MVC 222개 · WebFlux 59개"
  ],
  "contributions": [
    "Spring WebFlux와 WebClient로 FastAPI의 RAG 응답을 SSE로 중계하는 API 구현",
    "AI 답변에서 카드명을 추출하고 MongoDB에서 카드 상세 정보를 조회하는 로직 개발",
    "SSE 이벤트를 구분해 AI 답변과 카드 상세 정보를 순서대로 전달",
    "k6와 Grafana로 Spring MVC와 WebFlux의 DB 조회 부하 테스트 진행",
    "가상 사용자 수에 따른 JVM 스레드 수, 평균 응답 시간, 처리량 비교 및 결과 분석"
  ]
};

export const delishare: Project = {
  "slug": "delishare",
  "chapterStyle": "prose",
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
            "대기열을 브랜드별로 나눴습니다. 신규 주문이 들어오면 그 브랜드의 대기열에서만 후보를 찾습니다. 탐색을 시작할 때부터 다른 브랜드 주문이 빠져 있어, 확인해야 할 후보가 줄었습니다."
          ]
        },
        {
          "heading": "이미 매칭된 주문자 확인",
          "items": [
            "매칭 여부를 확인할 때는 주문자 ID로 `Bloom Filter`를 먼저 조회했습니다. 해시가 가리키는 비트 중 0이 하나라도 있으면 등록된 적이 없으므로, 매칭 완료 목록을 훑을 필요가 없습니다. 비트가 모두 1이어도 해시가 겹칠 수 있어, 이 경우는 매칭됐다고 확정할 수 없습니다."
          ],
          "figure": {
            "src": "/projects/delishare/bloom-filter.png",
            "width": 1446,
            "height": 972,
            "alt": "두 값의 해시가 비트 배열의 여러 칸을 가리키는 그림",
            "caption": "주문자 ID의 해시가 가리키는 비트로 등록 여부를 확인하는 방식"
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
      "description": "기존 `Gale–Shapley` 기반 구현은 주문이 쌓일수록 매칭 후보를 반복해서 확인했습니다. 공동 주문은 같은 브랜드끼리만 가능한데, 매칭 후보를 찾을 때마다 주문을 다시 비교하는 데 시간이 들었습니다.",
      "outcome": "같은 조건에서 변경 전후로 `JMeter` 매칭 요청을 각각 3,000건 실행했습니다. 평균 응답 시간은 1,745ms에서 81ms로 약 95.4% 줄었습니다."
    }
  ],
  "description": "DeliShare는 같은 브랜드에서 배달을 주문하려는 사람을 연결하는 서비스입니다. 웹에서 브랜드를 골라 주문을 등록하면 같은 브랜드로 주문을 넣은 사람 중 함께 주문할 후보를 찾습니다. 팀장을 맡아 기존 앱을 웹으로 옮기고 매칭 로직을 개선했습니다.",
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
