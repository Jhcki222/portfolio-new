export const experiences = [
  {
    date: "2026.07 -",
    title: "SSAFY 16th",
    description: "삼성 청년 SW 아카데미 16기에서 알고리즘과 웹 개발 역량을 확장하고 있습니다.",
  },
  {
    date: "2024.03 - 2024.12",
    title: "AI 기반 인플루언서 추천 시스템 졸업 프로젝트",
    description:
      "팀장으로 Spring Boot API와 RAG 기반 추천 흐름을 설계하고, AI 서비스가 실제 화면과 연결되는 구조를 구현했습니다.",
  },
  {
    date: "2024.03 - 2025.01",
    title: "동국대학교 UMC 6, 7기",
    description: "웹과 AOS 프로젝트에 참여하며 두 개의 프로젝트와 해커톤을 경험하였습니다.",
  },
  {
    date: "2023.03 - 2023.12",
    title: "코테이토 7기 WEB",
    description:
      "프론트엔드 파트장을 맡아 서비스 UI와 결제 기능을 구현하고 프로젝트 진행을 리드했습니다.",
  },
];

export const projects = [
  {
    name: "Structure-Aware Pixel Art Scaling",
    summary:
      "픽셀 아트의 고유 블록 크기를 감지해 색상 팔레트와 격자 구조를 보존하는 무손실 스케일링 알고리즘을 제안하고 논문으로 작성했습니다.",
    tags: ["Paper", "Computer Vision", "Image Processing"],
    links: [{ label: "논문 보기", url: "https://www.mdpi.com/2076-3417/16/5/2314" }],
  },
  {
    name: "EasyReader",
    summary:
      "웹페이지 AI 요약과 음성 읽기(TTS)를 제공하는 크롬 확장 프로그램입니다. 시각장애, 난독증, 저시력 사용자 등 정보 접근이 어려운 사용자를 위한 기능을 구현했습니다.",
    tags: ["Chrome Extension", "TTS", "LLM"],
    links: [
      {
        label: "Chrome Web Store",
        url: "https://chromewebstore.google.com/detail/easy-reader/dgmckhbflcjjmnjoimgkmcljneoddoon?hl=ko",
      },
      { label: "GitHub", url: "https://github.com/fisa-mini-project" },
    ],
  },
  {
    name: "KnowWhoHow",
    summary:
      "시니어 자산 관리 서비스입니다. 자산 추천 기능을 위한 API 서버와 AI 서버를 구축하고 LLM API 모니터링 API를 구현했습니다.",
    tags: ["Spring Boot", "RAG", "AI"],
    links: [{ label: "GitHub", url: "https://github.com/Fisa5-Main-Project" }],
  },
  {
    name: "COLLABO",
    summary:
      "인스타그램 데이터를 기반으로 마케팅 성과를 정량화하고 AI로 최적의 인플루언서를 추천하는 졸업프로젝트입니다.",
    tags: ["Graduation Project", "RAG", "Meta Graph API"],
    links: [
      { label: "GitHub", url: "https://github.com/CSID-DGU/2024-1-CECD1-DP-8" },
      { label: "Deploy", url: "https://cecd-dp.netlify.app/" },
    ],
  },
  {
    name: "TravelBox",
    summary: "여행 기록 서비스입니다. Android 파트에서 캘린더와 일정 관리 기능을 개발했습니다.",
    tags: ["AOS", "Calendar"],
    links: [{ label: "GitHub", url: "https://github.com/TravelBox00" }],
  },
  {
    name: "신용카드 추천 챗봇",
    summary:
      "RAG를 사용한 실시간 카드 추천 시스템입니다. Spring MVC와 Spring WebFlux 서버를 구축해 Blocking I/O와 Non-blocking I/O 성능을 비교하고, 자연어 질문에 맞는 카드를 추천합니다.",
    tags: ["Spring WebFlux", "RAG", "Next.js", "FastAPI"],
    links: [
      { label: "GitHub", url: "https://github.com/Jhcki222/woori-card-recommendation-system" },
    ],
  },
];

export const skills = [
  ["Backend", ["Java", "Spring Boot", "MySQL", "MongoDB", "PostgreSQL", "FastAPI"]],
  ["AI", ["LangChain", "Vector DB", "LLM"]],
  ["Frontend", ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"]],
  ["DevOps", ["Docker", "AWS", "Jenkins", "ELK", "SonarQube", "Vercel"]],
];

export const sectionKeywords = {
  about: ["about", "소개", "프로필", "개발자", "나에 대해서"],
  experience: ["experience", "경험", "활동", "이력", "나의 경험"],
  projects: ["project", "projects", "프로젝트", "작업", "했던 프로젝트"],
  skills: ["skill", "skills", "기술", "스택", "기술 스택"],
  contact: ["contact", "연락", "메일", "github"],
};

export const commandExamples = [
  "나에 대해서",
  "나의 경험을 알려줘",
  "내가 했던 프로젝트들",
  "기술 스택",
];
