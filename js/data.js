export const pageRoutes = {
  home: "./index.html",
  about: "./about.html",
  hobbies: "./hobbies.html",
  music: "./music.html",
  experience: "./experience.html",
  projects: "./projects.html",
  skills: "./skills.html",
  contact: "./contact.html",
};

export const experiences = [
  {
    date: "2026.07 -",
    title: "SSAFY 16th",
    description: "삼성 청년 SW 아카데미 16기에서 알고리즘과 웹 개발 역량을 확장하고 있습니다.",
    image: "./assets/ssafy1.png",
    imageAlt: "SSAFY 활동 사진",
  },
  {
    date: "2024.03 - 2024.12",
    title: "AI 기반 인플루언서 추천 시스템 졸업 프로젝트",
    description:
      "Vector DB, 데이터 수집, RAG 기반 추천 흐름을 설계하고 AI 서비스가 실제 화면과 연결되는 구조를 구현했습니다.",
    image: "./assets/졸업프로젝트1.jpg",
    imageAlt: "졸업 프로젝트 활동 사진",
  },
  {
    date: "2024.03 - 2025.01",
    title: "동국대학교 UMC 6, 7기",
    description: "웹과 AOS 프로젝트에 참여하며 팀 개발과 서비스 기획, 구현 과정을 경험했습니다.",
    image: "./assets/UMC1.jpg",
    imageAlt: "UMC 활동 사진",
  },
  {
    date: "2023.03 - 2023.12",
    title: "코테이토 7기 WEB",
    description: "프론트엔드 파트를 맡아 서비스 UI와 결제 기능을 구현하고 프로젝트 진행을 리드했습니다.",
    image: "./assets/코테이토1.jpg",
    imageAlt: "코테이토 활동 사진",
  },
];

export const projects = [
  {
    name: "Structure-Aware Pixel Art Scaling",
    summary:
      "픽셀 아트의 고유 블록 크기를 감지하고 색상 팔레트와 격자 구조를 보존하는 무손실 업스케일링 알고리즘을 제안해 논문으로 작성했습니다.",
    tags: ["Paper", "Computer Vision", "Image Processing"],
    links: [{ label: "논문 보기", url: "https://www.mdpi.com/2076-3417/16/5/2314" }],
  },
  {
    name: "EasyReader",
    summary:
      "웹페이지 AI 요약과 음성 읽기 기능을 제공하는 크롬 확장 프로그램입니다. 정보 접근성을 높이기 위한 기능을 구현했습니다.",
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
      "시니어 자산 관리 서비스입니다. 자산 추천을 위한 API 서버와 AI 서버를 구성하고 LLM API 모니터링 API를 구현했습니다.",
    tags: ["Spring Boot", "RAG", "AI"],
    links: [{ label: "GitHub", url: "https://github.com/Fisa5-Main-Project" }],
  },
  {
    name: "COLLABO",
    summary:
      "인스타그램 데이터를 기반으로 마케팅 성과를 정량화하고 AI로 최적의 인플루언서를 추천하는 졸업 프로젝트입니다.",
    tags: ["Graduation Project", "RAG", "Meta Graph API"],
    links: [{ label: "GitHub", url: "https://github.com/CSID-DGU/2024-1-CECD1-DP-8" }],
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
      "RAG를 사용하는 실시간 카드 추천 시스템입니다. Spring MVC와 WebFlux 서버를 구성해 Blocking I/O와 Non-blocking I/O 성능을 비교했습니다.",
    tags: ["Spring WebFlux", "RAG", "Next.js", "FastAPI"],
    links: [{ label: "GitHub", url: "https://github.com/Jhcki222/woori-card-recommendation-system" }],
  },
];

export const skills = [
  ["Backend", ["Java", "Spring Boot", "MySQL", "MongoDB", "PostgreSQL", "FastAPI"]],
  ["AI", ["LangChain", "Vector DB", "LLM"]],
  ["Frontend", ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"]],
  ["DevOps", ["Docker", "AWS", "Jenkins", "ELK", "SonarQube", "Vercel"]],
];

export const albums = Array.from({ length: 9 }, (_, index) => ({
  image: `./assets/앨범${index + 1}.png`,
  alt: `앨범 커버 ${index + 1}`,
}));

export const sectionKeywords = {
  about: ["about", "소개", "프로필", "나에 대해", "개발자"],
  hobbies: ["hobby", "hobbies", "취미", "여행", "축구", "맛집", "수다"],
  music: ["music", "음악", "음악 취향", "노래", "앨범", "장르"],
  experience: ["experience", "경험", "활동", "이력"],
  projects: ["project", "projects", "프로젝트", "작업", "논문"],
  skills: ["skill", "skills", "기술", "스택", "기술 스택"],
  contact: ["contact", "연락", "메일", "이메일", "github", "깃허브"],
};

export const commandExamples = [
  "나에 대해",
  "나의 취미",
  "음악 취향",
  "경험 알려줘",
  "프로젝트 보기",
  "기술 스택",
  "연락하기",
];
