import type { Project } from "./types";

export const easyreader: Project = {
  slug: "easyreader", name: "EasyReader",
  category: "크롬 확장 프로그램 · 정보 접근성",
  headline: "웹페이지 요약과 음성 읽기를 제공하는 크롬 확장 프로그램",
  summary: "웹페이지를 요약하고 음성으로 읽어주는 크롬 확장 프로그램입니다. React UI, LLM 요약과 접근성 기능을 구현해 Chrome Web Store에 등록했습니다.",
  focus: "React 확장 프로그램 · LLM 요약 · 접근성 기능 구현",
  tags: ["React", "Chrome Extension", "LLM", "TTS"],
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
  contributions: [
    "Spring WebFlux 비동기·논블로킹 처리와 SSE 스트리밍 응답 구현",
    "게이트웨이 요청 경로 통합, JSON 카드 정보 기반 프롬프트와 LangChain RAG 체인 구성",
    "Spring MVC·WebFlux 비교 환경을 구성하고 K6·Grafana로 부하 테스트 진행",
  ],
  architecture: {
    title: "RAG 검색과 SSE 응답",
    paragraphs: ["Next.js 요청은 게이트웨이와 Spring 서버를 거쳐 FastAPI로 전달합니다. JSON 카드 정보를 바탕으로 프롬프트와 LangChain RAG 체인을 구성하고, 검색 결과로 생성하는 답변을 SSE로 클라이언트에 보냈습니다."],
    steps: [
      { title: "질문 전달", description: "Next.js → 게이트웨이 → Spring 서버" },
      { title: "검색과 생성", description: "FastAPI·LangChain에서 카드 정보 검색 및 답변 생성" },
      { title: "스트리밍", description: "생성 중인 응답을 SSE로 클라이언트에 전달" },
    ],
  },
  chapters: [
    {
      id: "io-comparison", nav: "MVC·WebFlux 부하 비교",
      title: "외부 응답 대기 중 스레드 사용 비교",
      blocks: [
        { heading: "LLM 응답을 기다리는 동시 요청", paragraphs: ["카드 추천은 외부 응답을 기다리는 구간이 있어, 요청이 몰릴 때 Blocking I/O와 Non-blocking I/O가 스레드를 사용하는 차이를 비교했습니다. MVC와 WebFlux 서버를 각각 구성하고 WebFlux에는 비동기·논블로킹 처리와 SSE를 적용했습니다."] },
        { heading: "단일 서버 과부하 실험", paragraphs: ["K6로 부하를 발생시키고 Grafana에서 스레드 사용과 DB 조회 부하를 관찰했습니다. 프로젝트의 단일 서버 과부하 실험에서 WebFlux의 스레드 가용성이 MVC보다 약 80% 높았습니다."] },
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
