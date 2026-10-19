export const portfolioIntroduction = [
  "Java·Spring Boot / Python 백엔드·AI 개발",
  "금융상품 RAG · 마이데이터 인증 · 사용자 정보 CDC 구현",
  "부하 테스트 · 데이터 갱신·재처리 검증",
];

type Experience = {
  date: string;
  title: string;
  subtitle: string;
  description: string[];
  highlights?: string[];
  image: string;
  imageAlt: string;
  imageFit?: string;
};

export const experiences: Experience[] = [
  {
    date: "2026.07 -",
    title: "SSAFY 16th",
    subtitle: "Java 전공 트랙",
    description: ["SSAFY 16기 전공 Java 트랙 재학", "Java·Spring Boot·Vue 웹 개발 · AI 학습·평가 실습"],
    highlights: [
      "Qwen 계열 이미지 VQA 파인튜닝·추론 조정: Kaggle Score 0.70837 → 0.96812 (절대 점수 +0.25975, 플랫폼 점수)",
      "전국 관광 정보 웹서비스와 RAG 관광지 추천 챗봇 개발 참여 · AI 온보딩 1등",
      "4명 알고리즘 스터디 운영과 Notion·GitHub 학습 관리·AI 코드 리뷰 서비스 개발",
    ],
    image: "/assets/ssafy1.png",
    imageAlt: "SSAFY 활동 사진",
  },
  {
    date: "2025.07 - 2025.12",
    title: "우리FIS아카데미",
    subtitle: "클라우드서비스 트랙",
    description: ["5기 클라우드서비스 트랙 960시간 수료", "Java·Spring·SQL·Linux · AWS·온프레미스 · 금융 전산 처리 학습"],
    highlights: ["기술세미나 팀장·발표: Vanilla JavaScript Virtual DOM·Diffing 구현과 React 비교 · 우수상", "모의 마이데이터와 금융상품 RAG 기반 노후하우 프로젝트 수행"],
    image: "/assets/woori-fis.png",
    imageAlt: "우리FIS 로고",
    imageFit: "contain",
  },
  {
    date: "2024.03 - 2024.12",
    title: "AI 기반 인플루언서 추천 시스템 졸업 프로젝트",
    subtitle: "팀장 수행",
    description: ["산학협력 프로젝트 팀장 · AI 추천·프론트엔드 개발", "SQL·벡터 검색 RAG · Recall@5 0.59→0.88"],
    image: "/assets/졸업프로젝트1.jpg",
    imageAlt: "졸업 프로젝트 활동 사진",
  },
  {
    date: "2024.03 - 2025.01",
    title: "동국대학교 UMC 6, 7기",
    subtitle: "6기 Web · 7기 Android · Web 스터디 리더",
    description: ["React 스터디·코드 리뷰 운영", "LOCAL MARK UI·결제 API · Run With Me 프론트엔드 조율", "TravelBox Kotlin 앱 개발 참여"],
    image: "/assets/UMC1.jpg",
    imageAlt: "UMC 활동 사진",
  },
  {
    date: "2023.03 - 2023.12",
    title: "코테이토 7기 WEB",
    subtitle: "WEB 파트장",
    description: ["Farmely 프론트엔드 파트장 · 메인·구매 화면 구현", "일정·코드 컨벤션 관리 · 농가 전화 인터뷰·기획 참여"],
    image: "/assets/코테이토1.jpg",
    imageAlt: "코테이토 활동 사진",
  },
];

export const skills: [category: string, items: string[]][] = [
  ["Backend", ["Java", "Spring Boot", "Spring WebFlux", "FastAPI", "MySQL", "MongoDB", "PostgreSQL", "Redis"]],
  ["AI", ["LangChain", "LangGraph", "Vector DB", "LLM", "RAG"]],
  ["Frontend", ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"]],
  ["Data Pipeline", ["Airflow", "Debezium", "Kafka", "SQLAlchemy"]],
  ["DevOps", ["Docker", "AWS", "Jenkins", "ELK", "SonarQube", "Vercel", "k6", "Grafana"]],
];


