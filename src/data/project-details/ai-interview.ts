import type { Project } from "./types";

export const aiInterview: Project = {
  slug: "ai-interview",
  contributionsTitle: "서비스 기능",
  name: "AI 모의 면접 서비스",
  category: "IT 면접 준비",
  headline: "자기소개서에서 질문을 만들고, 답변에 맞춰 이어가는 모의 면접",
  summary: "스터디 질문과 내 답변을 모아 보고, 자기소개서 기반 질문과 꼬리질문으로 연습하는 서비스",
  focus: "질문 보관함, 면접 진행 로직, Python AI 실행 서버",
  tags: ["Next.js", "TypeScript", "Python", "Supabase", "SSE"],
  links: [{ label: "서비스 바로가기", url: "https://aiview-tau.vercel.app/" }],
  overview: ["자기소개서 PDF·DOCX·TXT 기반 질문 생성", "답변 평가에 따른 꼬리질문과 종합 피드백"],
  description: "면접 스터디에서 서로 주고받은 질문이 대화에 묻혀 나중에 다시 찾기 어려웠습니다. 각자의 자기소개서를 읽고 질문을 준비하는 데도 시간이 들었고, 연습 중에는 상대 답변에서 더 물어볼 부분을 바로 짚기가 쉽지 않았습니다. 질문과 답변을 모아 두고, 혼자 연습할 때도 답변에 맞는 꼬리질문을 받을 수 있는 서비스를 만들었습니다.",
  cover: { src: "/projects/ai-interview/home.png", width: 2556, height: 1270, alt: "질문 학습과 AI 모의 면접을 시작하는 대시보드", caption: "메인 화면" },
  highlights: ["질문·답변 보관과 복습", "자기소개서 기반 모의 면접", "답변 평가와 진행 로직 분리"],
  contributions: [
    "스터디에서 다시 보고 싶은 질문과 직접 작성한 답변을 보관하는 기능을 만들었습니다.",
    "자기소개서에서 질문을 뽑고, 답변 평가를 바탕으로 꼬리질문이나 다음 질문을 제안하는 흐름을 구현했습니다.",
    "Next.js와 Python의 역할을 나누고, 모델 응답 검증과 실행 상태 전달을 공통으로 처리했습니다.",
  ],
  chapters: [
    {
      id: "interview-workflow",
      nav: "하네스 워크플로우",
      title: "답변에 따라 면접을 이어가는 하네스",
      description: "면접관은 답변을 듣고 더 물을지 판단합니다. 이 흐름을 구현하려고 모델에는 답변 평가를 맡기고, 어떤 질문을 이어갈지는 검증한 점수와 면접 상태를 바탕으로 코드에서 정했습니다.",
      blocks: [
        {
          heading: "어떤 답변에 꼬리질문을 할지 결정",
          items: [
            "정확성, 논리성, 구체성, 질문 적합성, 실무 적용성의 점수와 근거를 검증합니다. 가장 낮은 점수가 70점 미만이고 꼬리질문을 두 번 미만 사용했다면, 부족한 부분을 다시 묻도록 제안합니다.",
            "모든 지표가 70점 이상이거나 꼬리질문을 두 번 사용했다면 다음 질문을 제안합니다. 더 진행할 질문이 없거나 전체 턴 한도에 도달하면 종합 평가로 넘어갑니다. 제안은 사용자가 확인한 뒤 실행됩니다.",
          ],
        },
      ],
      figure: {
        src: "/projects/ai-interview/harness-workflow.svg",
        width: 880,
        height: 565,
        alt: "문서 분석과 질문 생성, 답변 평가 및 검증을 거쳐 꼬리질문·다음 질문·종합 평가 중 하나를 제안하는 하네스 흐름",
        caption: "문서 입력부터 답변 평가와 다음 단계 제안까지",
      },
    },
    {
      id: "application-questions",
      nav: "면접 설정과 문서 분석",
      title: "자기소개서에서 질문에 쓸 경험 찾기",
      description: "모델과 에이전트 설정을 선택하고 자기소개서와 JD에서 텍스트를 가져옵니다. 추출한 경험·기술·원문 근거는 질문을 만들기 전에 확인하고 고칠 수 있습니다.",
      blocks: [],
      figures: [
        { src: "/projects/ai-interview/agent-settings.png", width: 1120, height: 844, alt: "면접 에이전트와 모델 설정", caption: "면접 에이전트와 모델 설정" },
        { src: "/projects/ai-interview/document-analysis.png", width: 1118, height: 1042, alt: "자기소개서에서 추출한 경험과 기술", caption: "자기소개서에서 추출한 경험과 기술" },
        { src: "/projects/ai-interview/source-evidence.png", width: 1053, height: 1148, alt: "경험별 자기소개서 원문 근거", caption: "경험별 자기소개서 원문 근거" },
      ],
    },
    {
      id: "adaptive-followup",
      nav: "답변과 평가",
      title: "답변을 제출하면 다섯 항목으로 평가",
      description: "답변은 직접 쓰거나 음성으로 입력합니다. 에이전트는 답변을 정확성, 논리성, 구체성, 질문 적합성, 실무 적용성으로 평가합니다. 다섯 항목이 모두 70점 이상이고 남은 질문이 있으면 다음 질문을 제안합니다.",
      blocks: [],
      figures: [
        { src: "/projects/ai-interview/answer-input.png", width: 1096, height: 733, alt: "생성된 질문과 음성 입력을 지원하는 답변란", caption: "생성된 질문과 음성 입력을 지원하는 답변란" },
        { src: "/projects/ai-interview/answer-evaluation.png", width: 1041, height: 1236, alt: "다섯 가지 지표별 점수와 평가 근거", caption: "다섯 가지 지표별 점수와 평가 근거" },
        { src: "/projects/ai-interview/next-question.png", width: 1069, height: 963, alt: "모든 지표가 70점 이상일 때 다음 질문 제안", caption: "모든 지표가 70점 이상일 때 다음 질문 제안" },
      ],
    },
    {
      id: "interview-summary",
      nav: "종합 평가",
      title: "종합 평가에서 다음 연습 항목 확인",
      description: "지금까지의 답변에서 잘한 점과 먼저 보완할 점을 정리하고, 다음 연습에 쓸 학습 계획을 제시합니다.",
      blocks: [],
      figures: [
        { src: "/projects/ai-interview/final-feedback.png", width: 1071, height: 937, alt: "종합 평가와 다음 학습 계획", caption: "종합 평가와 다음 학습 계획" },
      ],
    },
    {
      id: "question-library",
      nav: "질문 학습과 기록",
      title: "기업별 질문 저장과 학습 기록 확인",
      description: "카테고리별로 질문을 찾거나 무작위로 뽑아 연습합니다. 로그인하면 기업별로 질문을 모으고 학습 현황을 확인할 수 있습니다.",
      blocks: [],
      figures: [
        { src: "/projects/ai-interview/categories.png", width: 2544, height: 1260, alt: "카테고리와 난이도로 질문을 찾는 화면", caption: "카테고리별 질문 학습" },
        { src: "/projects/ai-interview/social-login.png", width: 474, height: 631, alt: "Google과 GitHub 로그인 버튼", caption: "소셜 로그인", portrait: true },
        { src: "/projects/ai-interview/random-practice.png", width: 1500, height: 861, alt: "무작위로 뽑은 질문에 답변을 작성하는 화면", caption: "랜덤 질문 연습" },
        { src: "/projects/ai-interview/company-questions.png", width: 1501, height: 1198, alt: "지원 기업과 전형 단계별로 질문을 관리하는 화면", caption: "기업별 질문 관리" },
        { src: "/projects/ai-interview/learning-progress.png", width: 1561, height: 1211, alt: "답변과 복습 상태, 카테고리별 진행률을 보여주는 화면", caption: "학습 현황 관리" },
      ],
    },
  ],
};
