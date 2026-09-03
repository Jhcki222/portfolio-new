import type { Project } from "./types";

export const knowwhohow: Project = {
  slug: "knowwhohow",
  name: "노후하우",
  category: "시니어 자산 설계 서비스",
  headline: "자산을 모아 보고 금융상품을 추천받는 시니어 자산 관리 서비스",
  summary: "시니어를 위한 자산 관리·금융상품 추천 서비스입니다. 모의 마이데이터 환경과 DB 이중화를 구성하고, RAG 기반 금융상품 추천을 구현했습니다.",
  focus: "PL · 백엔드 · AI · 인프라 · 프론트엔드",
  tags: ["Spring Boot", "RAG", "Airflow", "FastAPI", "Next.js", "MySQL", "MongoDB", "HAProxy", "AWS"],
  links: [{ label: "GitHub", url: "https://github.com/Fisa5-Main-Project" }],
  overview: [
    "시니어가 자산·부채·연금을 한눈에 확인하고 금융상품을 추천받는 서비스입니다. 마이데이터 표준 API 명세를 참고해 모의 마이데이터 환경을 직접 구성하고, 인증부터 자산 조회·포트폴리오 생성까지 연결했습니다.",
    "기술 리더로 요구사항과 API·서버 구조를 정리했습니다. 백엔드와 AI 기능을 구현하고 프론트엔드와 인프라를 연결했습니다.",
  ],
  contributions: [
    "메인·인증·리소스 서버로 모의 마이데이터 환경 구성, OAuth2 인증과 개인정보 암호화 구현",
    "MySQL Master/Slave DB 이중화, HAProxy와 트랜잭션 속성을 이용한 읽기·쓰기 라우팅",
    "금융상품 Hybrid Search·재랭킹, 관리자 통계와 채팅 로그의 교차 저장소 조회 개선",
    "AWS·온프레미스 연결, Jenkins·SonarQube·JaCoCo를 이용한 CI 구성",
    "공통 코드 컨벤션과 PR 리뷰 기준 정리, 클라이언트·백엔드·AI 서버 코드 검토",
  ],
  cover: {
    src: "/projects/knowwhohow/cover.png", width: 1920, height: 1080,
    alt: "노후하우 서비스 로고와 모바일 자산 포트폴리오 화면",
    caption: "노후하우의 자산 관리와 금융상품 추천 화면",
  },
  architecture: {
    placement: "after-chapters",
    title: "온프레미스와 AWS를 연결한 하이브리드 구성",
    paragraphs: [
      "클라이언트, 메인 백엔드, AI 서버, 모의 마이데이터 인증·리소스 서버로 구성했습니다. 서비스 서버는 AWS에, 마이데이터와 데이터 수집·CI 환경은 온프레미스에 두고 터널링으로 연결했습니다.",
      "사용자 정보는 MySQL, 채팅 로그는 MongoDB에 저장했습니다. 금융상품은 Airflow가 미리 수집·전처리·임베딩해 MongoDB Atlas에 적재하고, 추천 요청 시 이 데이터를 검색합니다.",
    ],
    figures: [
      {
        src: "/projects/knowwhohow/on-premise-architecture.png", width: 3652, height: 1822,
        alt: "온프레미스의 Nginx·인증 서버·리소스 서버와 HAProxy 뒤의 MySQL Master·Slave, Jenkins·SonarQube와 Airflow 구성",
        caption: "온프레미스: 모의 마이데이터 인증·리소스 서버, MySQL Master/Slave와 HAProxy, 상품 수집·CI 환경",
      },
      {
        src: "/projects/knowwhohow/aws-cloud-architecture.png", width: 1378, height: 897,
        alt: "AWS VPC 안의 공개 서브넷 Nginx와 비공개 서브넷의 Spring 메인 서버, FastAPI AI 서버, Next.js 프론트엔드 및 RDS 구성",
        caption: "AWS: 공개 서브넷의 진입 경로와 비공개 서브넷의 메인·AI·프론트엔드 서버를 분리한 구성",
      },
    ],
  },
  chapters: [
    {
      id: "mydata", nav: "모의 마이데이터 환경 구성",
      title: "모의 마이데이터 환경 구성과 DB 이중화",
      blocks: [
        {
          heading: "메인·인증·리소스 서버를 직접 구성",
          paragraphs: [
            "마이데이터 표준 API 명세와 가이드라인을 분석해, 동의한 사용자의 금융 정보를 조회하는 모의 환경을 만들었습니다. 인증 서버는 본인 인증과 동의·토큰 발급을, 리소스 서버는 자산·부채·연금 조회를 담당하도록 분리했습니다.",
            "메인 서버는 리소스 서버에서 받은 데이터를 정규화·재동기화하고, 자산에서 부채를 차감한 순자산과 연동 상태를 갱신합니다. 이 데이터를 포트폴리오와 AI 추천에 활용했습니다.",
          ],
        },
        {
          heading: "암호화와 사용자 식별",
          paragraphs: [
            "인증 서버의 사용자와 리소스 서버의 자산·부채·연금 소유자를 연결해야 했습니다. 이름·전화번호·CI는 원본 복원과 동일 값 검색이 모두 필요해 암호화한 원문과 검색용 식별값을 분리했습니다.",
          ],
        },
        {
          heading: "OAuth2 인증과 사용자별 조회",
          paragraphs: [
            "Spring Authorization Server로 OAuth2 Authorization Code 흐름과 동의 화면을 만들고 RSA·JWK 기반 JWT를 발급했습니다. 리소스 서버는 토큰의 CI를 복호화한 뒤 HMAC-SHA256으로 내부 사용자 ID를 구하고, Repository 조회 조건에 넣었습니다.",
            "이름·전화번호·CI는 랜덤 IV를 사용하는 AES/GCM으로 암호화했습니다. 동일 값 검색에는 별도 HMAC-SHA256 컬럼과 인덱스를 사용하고, JPA AttributeConverter로 저장·조회 과정에 암복호화를 적용했습니다.",
          ],
        },
        {
          heading: "토큰 갱신과 오류 처리",
          paragraphs: [
            "Access Token은 expires_in에 맞춘 TTL로 Redis에 저장하고 Refresh Token은 RDB에 보관했습니다. 리소스 서버가 401을 반환하면 토큰 갱신 후 한 번 재호출하고, 갱신 실패와 서버 오류는 서로 다른 도메인 예외로 처리했습니다.",
          ],
        },
        {
          heading: "Master/Slave 이중화와 읽기·쓰기 분리",
          paragraphs: [
            "모의 마이데이터의 MySQL을 Master/Slave로 이중화하고 HAProxy를 통해 DB 트래픽을 분산했습니다. 데이터 변경은 Master가, 빈번한 조회는 Slave가 맡도록 읽기와 쓰기 경로를 나눴습니다.",
            "인증·리소스 서버에 AbstractRoutingDataSource와 LazyConnectionDataSourceProxy를 적용했습니다. 실제 커넥션이 필요한 시점의 트랜잭션 속성을 확인해 readOnly 조회는 Slave로, 쓰기 트랜잭션은 Master로 연결하도록 구성했습니다.",
          ],
        },
      ],
    },
    {
      id: "recommendation-search", nav: "AI 금융상품 추천",
      title: "RAG 기반 금융상품 추천과 검색 고도화",
      blocks: [
        {
          heading: "자산 상황에 맞춘 추천 결과",
          paragraphs: [
            "사용자의 자산 정보와 목표를 바탕으로 금융상품을 추천합니다. 추천 카드에는 상품의 핵심 혜택과 사용자별 추천 이유를 보여주고, 원래 상품 페이지로 이동할 수 있는 링크를 함께 제공합니다.",
          ],
          figure: {
            src: "/projects/knowwhohow/service-recommendation.png", width: 3840, height: 2160,
            alt: "자산 포트폴리오에서 예금·펀드·연금저축 상품의 핵심 혜택, 추천 이유와 상품 페이지 링크를 보여주는 노후하우 화면",
            caption: "금융상품 추천 결과: 상품별 핵심 혜택과 추천 이유를 표시하고 상세 상품 페이지로 연결합니다.",
          },
        },
        {
          heading: "벡터 유사도만으로 부족했던 검색",
          paragraphs: [
            "추천 대상은 연금저축 297개, 펀드 971개, 예·적금 58개로 총 1,326개였습니다. 상품 설명의 벡터 유사도만으로는 사용자의 자산 상황과 상품 조건을 충분히 반영하기 어려웠습니다.",
          ],
        },
        {
          heading: "메타데이터 필터와 재랭킹 적용",
          paragraphs: [
            "상품마다 다른 필드를 저장하고 Vector Search를 사용할 수 있는 MongoDB Atlas를 선택했습니다. 사용자 정보를 텍스트로 정리해 상품과 같은 차원으로 임베딩하고, 유사도 검색에 메타데이터 필터를 결합했습니다. 후보를 재랭킹하고 StateGraph에서 검증·전처리한 뒤 RAG 응답에 사용했습니다.",
            "후보 수와 재랭킹 범위를 조절하며 품질과 지연 시간을 비교했습니다. 좋아요·싫어요는 상품 ID에 연결해 비선호 상품을 제외하고 선호 상품의 우선순위를 높였습니다.",
            "Airflow DAG는 매일 새벽에 상품 추출·전처리·임베딩·적재를 실행합니다. 만료 상품 삭제와 누락 임베딩 재처리도 별도 단계로 구성했습니다.",
          ],
        },
        {
          heading: "내부 검색 실험 결과",
          paragraphs: [
            "내부 추천 검색 실험에서 Recall@10은 0.68에서 0.85로, NDCG@10은 0.64에서 0.79로 높아졌습니다. 이후 후보와 재랭킹 범위를 조정해 Recall@10 0.85를 유지하면서 평균 검색 응답 시간을 약 50% 줄였습니다.",
          ],
        },
      ],
      metrics: {
        caption: "추천 검색 고도화 전후",
        columns: ["평가 지표", "개선 전", "개선 후"],
        rows: [["Recall@10", "0.68", "0.85"], ["NDCG@10", "0.64", "0.79"]],
        note: "프로젝트 내부 비교 실험 수치입니다. Recall은 관련 상품을 찾은 비율, NDCG는 관련 상품을 상위에 배치한 정도를 평가합니다.",
      },
      figure: {
        src: "/projects/knowwhohow/data-pipeline.png", width: 3840, height: 2160,
        alt: "금융상품을 추출·전처리·임베딩·적재하고 만료 상품과 누락 임베딩을 처리하는 Airflow DAG",
        caption: "상품 수집, 만료 상품 삭제와 누락 임베딩 재처리를 수행하는 Airflow DAG",
      },
    },
    {
      id: "database-queries", nav: "반복 DB 조회 개선",
      title: "항목별 DB 호출을 배치 조회로 변경",
      blocks: [
        {
          heading: "사용자마다 반복되는 조회",
          paragraphs: [
            "관리자 화면은 사용자별 메시지·AI 응답 수, 좋아요·싫어요 수, 최근 활동 내역을 제공합니다. 기존에는 MySQL에서 사용자 목록을 조회한 뒤 Python 반복문 안에서 사용자별 MongoDB 통계를 개별 조회하고, 채팅 로그 API에서도 사용자 이름을 가져오기 위해 MySQL 연결과 조회를 반복했습니다. 그 결과 사용자 수가 늘어날수록 DB 호출 횟수가 함께 증가하는 N+1과 유사한 비효율이 발생했습니다.",
          ],
        },
        {
          heading: "페이지 단위 집계와 ID 기반 연결",
          paragraphs: [
            "현재 페이지의 user_id를 모아 MongoDB의 $match·$in으로 범위를 제한했습니다. $group과 조건부 합계로 사용자·AI 메시지 수를 일괄 집계하고 피드백도 별도로 집계한 뒤, 사용자 ID를 키로 하는 Dictionary로 목록과 연결했습니다.",
            "채팅 로그는 MongoDB 집계 결과의 사용자 ID를 모아 MySQL의 WHERE IN으로 이름을 한 번에 조회했습니다. ID와 이름의 Map을 만들어, 두 API의 반복문에서는 추가 DB 호출 없이 조회 결과만 조합하도록 바꿨습니다.",
          ],
        },
      ],
    },
  ],
};
