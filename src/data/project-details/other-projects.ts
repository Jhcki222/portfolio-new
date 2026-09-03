import type { Project } from "./types";

export const easyreader: Project = {
  slug: "easyreader", name: "EasyReader",
  category: "크롬 확장 프로그램 · 정보 접근성",
  headline: "웹페이지 요약과 음성 읽기를 제공하는 크롬 확장 프로그램",
  summary: "웹페이지를 요약하고 음성으로 읽어주는 크롬 확장 프로그램입니다. React UI, LLM 요약과 접근성 기능을 구현해 Chrome Web Store에 등록했습니다.",
  focus: "React 확장 프로그램 · LLM 요약 · 접근성 기능 구현",
  tags: ["Chrome Extension", "LLM", "TTS"],
  links: [
    { label: "Chrome Web Store", url: "https://chromewebstore.google.com/detail/easy-reader/dgmckhbflcjjmnjoimgkmcljneoddoon?hl=ko" },
    { label: "GitHub", url: "https://github.com/fisa-mini-project" },
  ],
  overview: [
    "긴 글이나 작은 글씨를 읽기 어려운 사용자를 위해 만들었습니다. 웹페이지 요약과 함께 TTS, 고대비 모드, 글자 크기 조절을 제공해 읽는 방법을 선택할 수 있도록 했습니다.",
  ],
  contributions: [
    "React UI와 Content Script를 연결해 웹페이지 내용을 요약하는 흐름 구현",
    "Groq·GPT 기반 요약과 JSON 형식 응답을 위한 프롬프트 구성",
    "TTS, 고대비 모드, 글자 크기 조절 기능 구현과 Chrome Web Store 등록",
  ],
  chapters: [
    {
      id: "page-integration", nav: "요약과 읽기 기능",
      title: "페이지 내용 추출과 읽기 기능 구현",
      blocks: [
        { heading: "Content Script와 LLM 요약 연결", paragraphs: ["Content Script를 주입해 현재 페이지의 내용을 읽고 Groq·GPT 기반 LLM에 요약을 요청했습니다. React 화면에서 결과를 사용할 수 있도록 JSON 형식으로 응답하는 프롬프트를 구성했습니다."] },
        { heading: "읽기 방식 선택과 배포", paragraphs: ["저시력·문해력·디지털 접근성을 고려해 WCAG 2.0을 참고하고, 고대비 모드와 글자 크기 조절을 구현했습니다. 화면 읽기가 불편할 때 사용할 TTS를 연결한 뒤 Chrome Web Store에 등록했습니다."] },
      ],
    },
  ],
};

export const cardRecommendation: Project = {
  slug: "card-recommendation", name: "신용카드 추천 챗봇",
  category: "우리FISA · 백엔드 성능 비교",
  headline: "카드 추천 챗봇의 MVC·WebFlux 성능 비교",
  summary: "사용자 요구에 맞는 신용카드를 추천하는 챗봇입니다. RAG·SSE 응답을 구현하고, K6·Grafana로 Spring MVC와 WebFlux의 부하 상황별 스레드 사용을 비교했습니다.",
  focus: "WebFlux · SSE · RAG 체인 · 부하 테스트",
  tags: ["Spring WebFlux", "Spring MVC", "Next.js", "FastAPI", "K6", "Grafana"],
  links: [{ label: "GitHub", url: "https://github.com/Jhcki222/woori-card-recommendation-system" }],
  overview: [
    "카드 추천 답변을 생성하는 동안 SSE로 내용을 전달합니다. 비동기·논블로킹 요청 처리, 게이트웨이, LangChain RAG 체인과 스트리밍 응답을 맡았고, 같은 추천 기능을 Spring MVC와 WebFlux로 구성해 I/O 처리 방식을 비교했습니다.",
  ],
  cover: {
    src: "/projects/card-recommendation/demo.gif", width: 960, height: 487,
    alt: "우리카드 추천 챗봇의 실제 시연 화면",
    caption: "우리카드 추천 챗봇 메인페이지",
  },
  contributions: [
    "Spring WebFlux 비동기·논블로킹 처리와 SSE 스트리밍 응답 구현",
    "게이트웨이 요청 경로 통합, JSON 카드 정보 기반 프롬프트와 LangChain RAG 체인 구성",
    "Spring MVC·WebFlux 비교 환경을 구성하고 K6·Grafana로 부하 테스트 진행",
  ],
  architecture: {
    title: "RAG 응답 스트리밍과 카드 상세 조회",
    paragraphs: [
      "Next.js의 추천 요청을 Spring WebFlux 서버가 받고, WebClient로 FastAPI AI 서버를 호출합니다. FastAPI는 LangChain RAG 체인으로 답변을 생성하고, WebFlux는 SSE로 전달받은 토큰을 클라이언트에 보냅니다.",
      "답변 생성이 끝나면 전체 응답에서 CARD_NAME 목록을 파싱합니다. MongoDB에서 카드 상세 정보를 리액티브 방식으로 조회해 JSON으로 전달한 뒤 스트림을 종료합니다.",
    ],
    steps: [
      { title: "질문 전달", description: "Next.js → Spring WebFlux → WebClient → FastAPI" },
      { title: "토큰 스트리밍", description: "RAG로 생성하는 답변을 SSE로 클라이언트에 전달" },
      { title: "카드 상세 조회", description: "추천 카드명을 파싱하고 MongoDB에서 상세 정보를 조회해 전달" },
    ],
    figures: [
      {
        src: "/projects/card-recommendation/streaming-sequence.png", width: 955, height: 818,
        alt: "Next.js, Spring WebFlux, FastAPI와 MongoDB 사이의 요청·SSE 토큰 전달·카드 상세 조회 시퀀스",
        caption: "추천 요청부터 토큰 스트리밍, 카드 상세 JSON 전달과 스트림 종료까지의 흐름",
      },
    ],
  },
  chapters: [
    {
      id: "io-comparison", nav: "성능 비교",
      title: "성능 비교",
      blocks: [
        {
          heading: "200·500 VU에서 DB I/O 부하 테스트",
          paragraphs: ["Grafana k6로 200 VU와 500 VU의 DB I/O 부하를 발생시키고, Grafana에서 JVM 스레드 수와 상태를 비교했습니다. VU는 동시에 시나리오를 실행하는 가상 사용자를 뜻합니다."],
        },
        {
          heading: "MVC: 스레드 수 증가와 blocked 상태 관찰",
          paragraphs: ["MVC는 200 VU에서 최대 221개, 500 VU에서는 약 222개의 JVM 스레드를 사용했습니다. 부하를 높여도 스레드 수가 비슷하게 유지되어 Tomcat 스레드 풀 상한의 영향을 받은 것으로 보였습니다. blocked 상태의 스레드도 주기적으로 발생했습니다."],
          figure: {
            src: "/projects/card-recommendation/mvc-jvm-threads.png", width: 1563, height: 622,
            alt: "MVC의 Grafana JVM 대시보드: 최대 스레드 222개와 주기적으로 발생하는 blocked 상태",
            caption: "MVC 모니터링 화면. 최대 222개 스레드와 blocked 상태가 관찰됐습니다.",
          },
        },
        {
          heading: "WebFlux: 더 적은 스레드로 유사한 처리량",
          paragraphs: [
            "WebFlux는 200 VU에서 44개, 500 VU에서 59개의 JVM 스레드를 사용했습니다. 처리량과 평균 응답 시간은 MVC가 소폭 우세했지만, WebFlux는 500 VU에서 약 73% 적은 스레드로 유사한 처리량을 기록했습니다.",
          ],
          figure: {
            src: "/projects/card-recommendation/webflux-jvm-threads.png", width: 1544, height: 608,
            alt: "WebFlux의 Grafana JVM 대시보드: 최대 44개 스레드와 blocked 상태 0개",
            caption: "WebFlux 200 VU 모니터링 화면. 최대 44개의 스레드를 사용했습니다.",
          },
        },
      ],
      metrics: {
        caption: "DB I/O 부하별 JVM 스레드 수 비교",
        columns: ["가상 사용자 수", "Spring MVC", "Spring WebFlux"],
        rows: [["200 VU", "최대 221개", "44개"], ["500 VU", "약 222개", "59개"]],
        note: "500 VU 기준 스레드 수 감소율은 (222 − 59) ÷ 222 ≈ 73.4%입니다. 서로 다른 DB와 로컬 테스트 환경에서 측정한 결과로, 프레임워크의 일반적인 성능 차이를 뜻하지 않습니다.",
      },
    },
    {
      id: "framework-selection", nav: "회고",
      title: "회고",
      blocks: [
        {
          heading: "실험에서 충분히 확인하지 못한 부분",
          paragraphs: ["더 많은 변인을 추가해 비교하고 싶었지만, 개인 프로젝트에서 구성할 수 있는 테스트 환경에는 한계가 있었습니다. 서로 다른 DB와 로컬 환경의 영향을 분리하지 못했고 스트리밍 API도 충분히 검증하지 못해, 이번 결과를 일반화할 수는 없습니다."],
        },
        {
          heading: "서비스 특성을 기준으로 프레임워크 선택",
          paragraphs: [
            "WebFlux가 MVC보다 항상 빠른 것은 아니라는 점을 확인했습니다. 기본적인 CRUD와 JPA 중심 서비스라면 MVC가 더 단순하고 빠를 수 있습니다. 외부 API 응답을 오래 기다리거나 I/O 연결을 길게 유지하는 서비스에서는 WebFlux의 적은 스레드로 요청을 처리하는 특성이 유리할 수 있습니다.",
            "스레드 수뿐 아니라 메모리 사용량과 운영 복잡도까지 함께 살펴보고, 서비스의 I/O 패턴을 기준으로 프레임워크를 선택해야 한다고 배웠습니다.",
          ],
        },
      ],
    },
  ],
};

export const delishare: Project = {
  slug: "delishare", name: "Delishare",
  category: "배달 공동구매 · 매칭 성능 개선",
  headline: "함께 주문할 사용자를 연결하는 배달 공동구매 플랫폼",
  summary: "같은 브랜드의 배달을 함께 주문할 사용자를 연결합니다. 팀장으로 앱의 웹 전환과 매칭 개선을 맡아, 3,000건 요청 테스트에서 평균 매칭 시간을 1,745ms에서 81ms로 줄였습니다.",
  focus: "팀장 · 프론트엔드 · 백엔드",
  tags: ["Spring Boot", "React", "Kotlin", "Bloom Filter", "JMeter"],
  links: [],
  overview: [
    "팀장으로 프론트엔드와 백엔드를 맡아 Kotlin 앱을 React 웹앱으로 전환했습니다. 실시간 참여 변화에 대응하도록 매칭 비용을 분석하고 브랜드별 큐와 Bloom Filter를 적용했습니다.",
  ],
  contributions: [
    "Kotlin 기반 앱을 React 웹앱으로 전환",
    "Gale-Shapley 기반 매칭을 분석하고 브랜드별 큐·Bloom Filter를 적용한 구조로 개선",
    "JMeter로 3,000건의 매칭 요청을 보내 개선 전후 평균 처리 시간 비교",
  ],
  chapters: [
    {
      id: "matching", nav: "매칭 구조와 성능 비교",
      title: "브랜드별 큐와 Bloom Filter로 매칭 개선",
      blocks: [
        { heading: "전체 비교를 반복하던 매칭", paragraphs: ["기존 Gale-Shapley 기반 매칭은 시간 복잡도가 O(n²)였고, 실시간으로 참여하는 사용자에 대응하기 어려웠습니다. 전체 비교를 반복하는 비용을 줄이려고 동일 브랜드 요청을 큐로 나누고 Bloom Filter로 포함 여부를 빠르게 확인했습니다."] },
        { heading: "3,000건 요청의 처리 시간 비교", paragraphs: ["JMeter로 매칭 요청 3,000건을 발생시킨 결과, 평균 매칭 처리 시간은 1,745ms에서 81ms로 약 95% 줄었습니다."] },
      ],
      metrics: {
        caption: "JMeter 매칭 요청 3,000건 비교",
        columns: ["측정 항목", "기존 구현", "개선 구현"],
        rows: [["평균 매칭 처리 시간", "1,745 ms", "81 ms"]],
        note: "매칭 요청 총 3,000건의 평균 처리 시간을 비교했습니다.",
      },
    },
  ],
};
