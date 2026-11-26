import type { Project } from "./types";

export const aiInterview: Project = {
  slug: "ai-interview",
  contributionsTitle: "내가 맡은 일",
  name: "AI 모의 면접 서비스",
  category: "IT 면접 준비",
  headline: "자기소개서에서 질문을 만들고, 답변에 맞춰 이어가는 모의 면접",
  summary: "스터디 질문과 내 답변을 모아 보고, 자기소개서 기반 질문과 꼬리질문으로 연습하는 서비스",
  focus: "질문 보관함, 면접 진행 로직, Python AI 실행 서버",
  tags: ["Next.js", "TypeScript", "Python", "Supabase"],
  links: [{ label: "서비스 바로가기", url: "https://aiview-tau.vercel.app/" }],
  overview: [],
  description: "취업 면접 스터디를 하면서 기업별로 주고받은 질문과 답변을 정리하고, 혼자서도 면접을 연습할 수 있도록 개발한 서비스입니다.\n\n평소에는 질문을 기업과 카테고리별로 저장하고, 답변을 작성하거나 복습한 내역을 관리합니다. AI 모의 면접에서는 자기소개서를 업로드하면 주요 경험을 추출하고, 이를 바탕으로 면접 질문을 생성합니다. 사용자의 답변을 평가해 부족한 부분은 꼬리질문으로 이어가며, 면접이 끝나면 전체 답변에서 보완할 점을 정리해 줍니다.",
  cover: { src: "/projects/ai-interview/home.png", width: 2556, height: 1270, alt: "질문 학습과 AI 모의 면접을 시작하는 대시보드", caption: "메인 화면" },
  highlights: ["모델의 답변 평가와 서버의 꼬리질문 결정 분리", "자기소개서 원문을 확인·수정한 뒤 질문 생성"],
  contributions: ["Next.js 기반 면접 연습 화면과 기업별 질문 관리 기능 개발","PDF, DOCX, TXT 자기소개서에서 주요 경험과 원문 근거를 추출하는 문서 분석 기능 구현","문서에서 추출한 내용을 사용자가 확인하고 수정한 뒤 질문 생성에 활용하도록 구성","Python 서버에서 LLM 응답 형식과 필수 데이터를 검증하는 로직 구현","답변 평가 결과와 면접 진행 상태에 따라 꼬리질문, 다음 질문, 종합 평가를 제안하는 워크플로우 개발","답변 평가 및 질문 생성 중 진행 상태를 화면에 표시하고, 사용자가 다음 진행 여부를 선택하도록 구현"],
  architecture: {
    title: "AI 모의 면접 워크플로우",
    items: ["자기소개서 업로드 → 문서 분석 → 추출 결과 확인 및 수정 → 질문 생성 → 답변 입력 → 답변 평가 → 다음 단계 결정 → 종합 평가","AI는 질문 생성과 답변 평가를 담당합니다. 다음 질문으로 넘어갈지, 꼬리질문을 할지는 검증된 평가 결과와 현재 면접 진행 상태를 바탕으로 판단합니다."],
    figures: [{
        src: "/projects/ai-interview/harness-workflow.svg",
        width: 880,
        height: 565,
        alt: "문서 분석과 질문 생성, 답변 평가 및 검증을 거쳐 꼬리질문·다음 질문·종합 평가 중 하나를 제안하는 하네스 흐름",
        caption: "문서 입력부터 답변 평가와 다음 단계 제안까지",
      }],
  },
  chapters: [
    {
      id: "interview-workflow",
      nav: "평가와 진행 로직 분리",
      title: "1. AI 평가와 면접 진행 로직 분리",
      description: "모의 면접에서는 답변이 부족하면 추가 질문을 하고, 충분히 답했다면 다음 질문으로 넘어가야 합니다.\n\n하지만 이 판단까지 모델의 응답에 맡기면 같은 질문을 반복하거나, 정해진 면접 횟수를 넘어가는 상황이 생길 수 있습니다. 모델이 반환한 점수나 평가 근거가 누락될 가능성도 고려해야 했습니다.\n\n그래서 답변을 평가하는 과정과 실제 면접 진행을 결정하는 로직을 분리했습니다.",
      blocks: [
        {
          heading: "답변 평가 결과를 검증한 뒤 다음 단계 결정",
          items: [
            "LLM이 답변을 정확성, 논리성, 구체성, 질문 적합성, 실무 적용성의 5개 항목으로 평가하도록 구성",
            "각 항목의 점수와 평가 근거를 정해진 JSON 구조로 반환하도록 요청",
            "Python 서버에서 필수 필드와 점수 범위 등 평가 결과의 유효성 검증",
            "검증을 통과한 점수와 현재 질문 번호, 꼬리질문 횟수, 전체 면접 진행 상태를 함께 확인",
          ],
        },
        {
          heading: "꼬리질문과 종료 조건을 명시적으로 관리",
          items: [
            "5개 항목 중 최저 점수가 70점 미만이고 꼬리질문 횟수가 2회 미만이면 추가 질문 제안",
            "모든 항목이 70점 이상이거나 꼬리질문을 2회 사용했다면 다음 질문 제안",
            "남은 질문이 없거나 전체 턴 한도에 도달하면 종합 평가 단계로 이동",
            "AI가 제안한 다음 진행 단계는 사용자가 확인한 뒤 실행",
          ],
        },
      ],
      outcome: "답변의 평가 내용은 LLM을 활용하면서도 질문 횟수와 종료 조건은 서버에서 관리하도록 구성했습니다.\n\n특정 항목의 점수가 낮더라도 꼬리질문을 무한히 반복하지 않으며, 사용자가 제안을 확인한 뒤 다음 단계로 넘어가도록 했습니다.",
    },
    {
      id: "application-questions",
      nav: "자기소개서 경험 검증",
      title: "2. 자기소개서에서 추출한 경험 검증",
      description: "자기소개서에는 프로젝트 경험과 역할, 성과가 여러 문단에 나뉘어 작성돼 있습니다. 이 내용을 모델이 잘못 구분하면 실제로 수행하지 않은 역할을 전제로 질문하거나, 중요한 경험을 빠뜨릴 수 있습니다.\n\n추출한 결과를 바로 질문 생성에 사용하지 않고, 사용자가 원문과 비교해 확인하는 단계를 넣었습니다.",
      blocks: [
        {
          heading: "추출한 경험과 원문 근거를 함께 표시",
          items: [
            "PDF, DOCX, TXT 형식의 자기소개서 업로드 지원",
            "문서에서 프로젝트, 기술, 담당 역할 등 면접 질문에 사용할 정보를 추출",
            "각 경험에 해당하는 원문 근거를 함께 표시해 추출 결과를 확인할 수 있도록 구성",
            "잘못 추출된 내용은 사용자가 직접 수정할 수 있도록 처리",
            "확인된 경험을 바탕으로 면접 질문 생성",
          ],
        },
      ],
      outcome: "자기소개서 분석 결과를 사용자가 직접 확인하고 수정한 뒤 면접을 시작할 수 있게 했습니다. 질문이 잘못된 경험을 전제로 생성되는 상황을 줄이기 위한 구조입니다.",
      figures: [
        { src: "/projects/ai-interview/agent-settings.png", width: 1120, height: 844, alt: "면접 에이전트와 모델 설정", caption: "면접 에이전트와 모델 설정" },
        { src: "/projects/ai-interview/document-analysis.png", width: 1118, height: 1042, alt: "자기소개서에서 추출한 경험과 기술", caption: "자기소개서에서 추출한 경험과 기술" },
        { src: "/projects/ai-interview/source-evidence.png", width: 1053, height: 1148, alt: "경험별 자기소개서 원문 근거", caption: "경험별 자기소개서 원문 근거" },
      ],
    },
    {
      id: "adaptive-followup",
      nav: "응답 검증과 진행 상태",
      title: "3. 모델 응답 검증과 진행 상태 관리",
      description: "모델에 JSON 형식으로 답변을 요청하더라도 항상 원하는 데이터가 반환되는 것은 아닙니다. 필수 항목이 빠지거나 예상과 다른 형식이 들어오면 평가 결과를 화면에 표시하거나 다음 질문을 결정하는 과정에서 오류가 발생할 수 있습니다.\n\n또한 문서 분석과 답변 평가에는 시간이 소요되기 때문에, 사용자가 현재 어떤 작업이 진행 중인지 알 수 있어야 했습니다.",
      blocks: [
        {
          heading: "모델의 응답을 그대로 사용하지 않도록 검증",
          items: [
            "질문 생성 및 답변 평가에 필요한 데이터 구조 정의",
            "LLM 응답을 파싱하고 필수 항목과 값의 유효성 확인",
            "검증된 평가 결과만 이후 면접 진행 로직에 전달",
            "평가 데이터와 면접 진행 상태를 구분해 관리",
          ],
        },
        {
          heading: "면접 진행 상태를 화면에 표시",
          items: [
            "문서 분석, 질문 생성, 답변 평가 단계별 진행 상태 표시",
            "사용자가 텍스트 또는 음성으로 답변할 수 있도록 입력 방식 제공",
            "평가가 완료되면 항목별 점수와 근거를 확인하고 다음 진행 여부 선택",
          ],
        },
      ],
      outcome: "모델 응답을 검증한 뒤 화면과 다음 단계 결정에 사용하도록 했습니다. 사용자는 현재 처리 중인 작업과 평가 결과를 확인하면서 면접을 이어갈 수 있습니다.",
      figures: [
        { src: "/projects/ai-interview/answer-input.png", width: 1096, height: 733, alt: "생성된 질문과 음성 입력을 지원하는 답변란", caption: "생성된 질문과 음성 입력을 지원하는 답변란" },
        { src: "/projects/ai-interview/answer-evaluation.png", width: 1041, height: 1236, alt: "다섯 가지 지표별 점수와 평가 근거", caption: "다섯 가지 지표별 점수와 평가 근거" },
        { src: "/projects/ai-interview/next-question.png", width: 1069, height: 963, alt: "모든 지표가 70점 이상일 때 다음 질문 제안", caption: "모든 지표가 70점 이상일 때 다음 질문 제안" },
      ],
    },
    {
      id: "interview-summary",
      nav: "종합 평가",
      title: "4. 면접 종료 후 종합 평가",
      stageHeadings: false,
      description: "면접이 종료되면 각 질문의 답변과 평가 결과를 모아 종합 피드백을 생성합니다.",
      blocks: [
        {
          heading: "",
          items: [
            "질문별 평가 결과를 바탕으로 잘한 점과 부족했던 부분 정리",
            "반복적으로 낮은 평가를 받은 항목 확인",
            "다음 연습에서 보완할 내용을 사용자에게 안내",
          ],
        },
      ],
      outcome: "질문 하나의 점수로 면접 전체를 판단하지 않고, 여러 답변에서 반복되는 문제를 확인할 수 있도록 구성했습니다.",
      figures: [
        { src: "/projects/ai-interview/final-feedback.png", width: 1071, height: 937, alt: "종합 평가와 다음 연습 항목", caption: "종합 평가와 다음 연습 항목" },
      ],
    },
    {
      id: "question-library",
      nav: "질문 저장과 학습 현황",
      title: "5. 기업별 질문 저장과 학습 현황 관리",
      stageHeadings: false,
      description: "AI 모의 면접과 별도로 스터디에서 공유한 질문을 저장하고 복습할 수 있는 기능도 개발했습니다.\n\n면접을 준비하다 보면 같은 질문을 여러 번 받기도 하고, 이전에 작성한 답변을 다시 찾는 일이 많았습니다. 이를 기업과 전형 단계별로 정리하고, 답변 작성 여부와 복습 상태를 확인할 수 있도록 했습니다.",
      blocks: [
        {
          heading: "구현 기능",
          items: [
            "기업, 전형 단계, 카테고리별 면접 질문 등록 및 조회",
            "질문별 답변 작성과 수정, 복습 상태 관리",
            "카테고리와 난이도에 따른 질문 검색",
            "무작위 질문을 선택해 답변을 작성하는 연습 기능",
            "Google 및 GitHub 소셜 로그인",
            "카테고리별 학습 진행률 및 답변 현황 확인",
          ],
        },
      ],
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
