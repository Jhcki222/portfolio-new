import type { Project } from "./types";

export const collabo: Project = {
  slug: "collabo",
  name: "COLLABO",
  category: "산학협력 졸업 프로젝트 · 인플루언서 추천",
  headline: "광고 조건에 맞는 인플루언서 추천 서비스",
  summary: "광고주에게 인플루언서를 추천하고 후보 데이터를 보여주는 서비스입니다. 팀장으로 AI 추천과 프론트엔드를 맡아, Meta API 정책 변경에 맞춰 SQL·벡터 검색 기반 RAG로 재설계했습니다.",
  focus: "팀장 · AI 엔지니어링 · 프론트엔드",
  period: "2024.03 — 2024.12",
  tags: ["Spring Boot", "React", "Flask", "PostgreSQL", "FAISS", "RAG"],
  links: [{ label: "GitHub", url: "https://github.com/CSID-DGU/2024-1-CECD1-DP-8" }],
  overview: [
    "광고주가 자연어로 캠페인 조건을 입력하면 인플루언서를 추천합니다. 게시물 반응과 팔로워 추이를 함께 보여줘 후보를 비교할 수 있도록 했습니다.",
    "산학협력 졸업 프로젝트의 팀장으로 AI 추천과 프론트엔드를 맡았습니다. API 정책 변경과 팀원 이탈을 겪으며, 협력기업과 매주 기술 검토를 진행해 수집 가능한 데이터에 맞춰 추천 방식을 바꿨습니다.",
  ],
  contributions: [
    "규칙 기반·스태킹 앙상블 추천을 거쳐 SQL과 벡터 검색을 결합한 RAG로 재설계",
    "인플루언서 특성과 광고 요구를 조합한 QA 데이터 1,000건 이상 구축",
    "React 추천 화면과 Chart.js 분석 대시보드 구현, 지연 로딩·메모이제이션 적용",
    "협력기업 기술 검토, 외부 서비스 의존성 리스크 분석과 팀 내 기술 방향 조율",
  ],
  cover: {
    src: "/projects/collabo/cover.png", width: 1902, height: 892,
    alt: "COLLABO의 인플루언서 검색 입력창, 조건 필터와 추천 후보 목록",
    caption: "광고 조건을 입력하고 인플루언서 후보를 탐색하는 COLLABO 메인 화면",
  },
  architecture: {
    title: "SQL과 벡터 검색을 결합한 RAG",
    paragraphs: [
      "React 화면, Spring Boot API 서버, Flask AI 서버로 구성했습니다. Meta Graph API 수집 데이터는 PostgreSQL에 저장하고 QA 데이터는 FAISS로 검색했습니다.",
      "팔로워 수 같은 수치 조건은 SQL로 조회하고, 캠페인 분위기 같은 자연어 요구는 벡터 검색으로 찾았습니다. AI 서버는 두 결과를 함께 사용해 답변을 생성합니다.",
    ],
    figures: [{
      src: "/projects/collabo/architecture.png", width: 950, height: 707,
      alt: "React·Spring Boot·PostgreSQL 서비스와 Flask의 SQL·FAISS 검색 및 EEVE 모델을 연결한 COLLABO 아키텍처",
      caption: "SQL 조회와 FAISS 검색 결과를 답변에 반영하는 구조",
    }],
  },
  chapters: [
    {
      id: "recommendation-redesign", nav: "API 변경과 추천 재설계",
      title: "Meta API 정책 변경에 따른 추천 재설계",
      blocks: [
        {
          heading: "성별·연령 데이터 수집의 제약",
          paragraphs: [
            "팔로워의 성별·연령을 추천에 활용하려 했지만 Meta Graph API 정책 변경으로 수집이 어려워졌습니다. 모델의 입력을 바꿔야 했고, 규칙 기반 추천으로 다양한 광고 요구를 반영하는 데도 한계가 있었습니다.",
          ],
        },
        {
          heading: "규칙 기반 추천에서 RAG로",
          paragraphs: [
            "논문 조사와 협력기업 검토를 거쳐 규칙 기반 추천을 스태킹 앙상블로 확장했고, 이후 광고주의 질문을 확보한 데이터와 연결하는 RAG로 재설계했습니다.",
            "정형 조건은 SQL로 확인하고, 범위가 넓은 자연어 질문은 하위 질문으로 나눠 임베딩 검색에 사용했습니다.",
          ],
        },
        {
          heading: "추천 평가와 후보 비교 화면",
          paragraphs: [
            "프로젝트 내부 평가에서 ROUGE-1과 Recall@k가 30% 이상 개선됐습니다. 후보를 직접 비교할 수 있도록 해시태그, 좋아요·댓글 수, 광고 게시물 비율과 팔로워 추이를 Chart.js로 보여줬습니다.",
          ],
        },
      ],
      figure: {
        src: "/projects/collabo/recommendation.png", width: 1870, height: 797,
        alt: "인플루언서 후보 목록과 팔로워 수·분야 조건을 입력하는 추천 대화 화면",
        caption: "대화로 조건을 입력하는 추천 화면. 개선율은 프로젝트 내부 평가셋과 k 값 기준입니다.",
      },
    },
    {
      id: "grounded-answers", nav: "추천 답변의 근거 구성",
      title: "광고 요구를 반영한 QA 데이터 구축",
      blocks: [
        {
          heading: "후보 정보에 근거한 답변",
          paragraphs: [
            "질문만 전달한 언어 모델은 실제 후보와 무관한 설명을 내놓을 수 있었습니다. 광고 목적·콘텐츠 특성·수치 조건을 후보 정보와 연결할 검색 자료가 필요했습니다.",
          ],
        },
        {
          heading: "QA 1,000건 이상 구축",
          paragraphs: [
            "GPT-4o에 인플루언서 데이터와 질문·답변 예시를 제공해 광고 요구를 조합한 QA 1,000건 이상을 구축했습니다. LangChain으로 FAISS에 연결하고, 질문과 관련된 QA를 검색해 SQL 조회 결과와 함께 답변 생성에 사용했습니다.",
          ],
        },
        {
          heading: "프론트엔드 렌더링 개선",
          paragraphs: [
            "무거운 화면은 지연 로딩으로 분리하고 반복 계산과 렌더링에는 메모이제이션을 적용했습니다. 프로젝트의 Lighthouse 측정 환경에서 초기 렌더링 속도가 40% 개선됐습니다.",
          ],
        },
      ],
      figure: {
        src: "/projects/collabo/qa-pipeline.png", width: 920, height: 385,
        alt: "인플루언서 데이터와 QA 예시를 GPT-4o에 제공한 뒤 QA 데이터를 LangChain·FAISS에 연결하는 흐름",
        caption: "도메인 QA를 구성하고 검색 데이터로 적재한 과정",
      },
    },
  ],
};
