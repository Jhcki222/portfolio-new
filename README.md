# Lee Jong Hyuck Portfolio

**Next.js 16 App Router, React 19, TypeScript**로 만든 포트폴리오입니다. 소개, 프로젝트, 경험, 기술 스택, 연락처를 메인 페이지에서 살펴보고, 프로젝트 항목을 클릭하면 개별 소개 페이지로 이동합니다.

## 실행

Node.js 20.9 이상이 필요합니다. 이 프로젝트는 Node.js 24에서 검증했습니다.

```bash
npm ci
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

```bash
npm run lint       # ESLint 검사
npm run typecheck  # 경로 타입 생성 및 TypeScript 검사
npm run build      # 프로덕션 빌드
npm start          # 빌드 결과 실행
npm run test:routes # 실행 중인 서버에서 프로젝트 경로 통합 테스트
```

## 구조

```text
src/
├── app/
│   ├── layout.tsx         # 공통 헤더·푸터, 메타데이터, 전역 CSS
│   ├── globals.css        # 스타일, 반응형 규칙, 앵커 이동 간격
│   ├── projects.css       # 프로젝트 목록·상세 디자인
│   ├── page.tsx           # 섹션 컴포넌트를 조합한 단일 페이지
│   ├── projects/[slug]/page.tsx # 프로젝트별 정적 상세 페이지·메타데이터
│   └── not-found.tsx
├── components/
│   ├── sections/         # Hero, About, Projects, Experience, Skills, Contact
│   ├── projects/         # 목록, 상세 조합, 사례 본문·성과 표, 이미지 컴포넌트
│   ├── portfolio-section.tsx  # 공통 섹션 제목·레이아웃
│   ├── site-header.tsx   # 스크롤 위치 표시와 모바일 메뉴
│   ├── site-footer.tsx
│   ├── command-bar.tsx   # 키워드로 섹션 이동
│   └── back-to-top.tsx
├── data/portfolio.ts     # 경험, 기술 스택
├── data/projects.ts      # 프로젝트 등록·정렬·조회
├── data/project-details/ # 프로젝트별 원고와 공통 타입
└── lib/navigation.ts     # 메뉴, 커맨드 키워드와 목적지
public/assets/            # 원본 이미지
public/fonts/             # 로컬 Pretendard 폰트·라이선스
public/projects/          # 상세 본문에서 사용하는 원본 화면·설계 자료
tests/project-pages.test.mjs # 경로·목차 대상·원본 이미지·404·리다이렉트 검사
next.config.ts            # 기존 페이지 주소를 섹션 앵커로 연결
```

## 섹션과 동작

| 섹션 | 주소 | 이전 경로 |
| --- | --- | --- |
| Home | `/#home` | `/index.html` |
| About | `/#about` | `/about`, `/about.html` |
| Projects | `/#projects` | `/projects`, `/projects.html` |
| Experience | `/#experience` | `/experience`, `/experience.html` |
| Skills | `/#skills` | `/skills`, `/skills.html` |
| Contact | `/#contact` | `/contact`, `/contact.html` |

- 이전 경로는 해당 섹션으로 308 리다이렉트됩니다. `/index.html`은 `/`로 연결됩니다.
- 프로젝트 목록 항목 전체는 `/projects/[slug]`로 연결됩니다. 상세 페이지는 소개, 개인 기여, 설계 자료, 문제 해결 사례, 성과 비교를 프로젝트별 자료 범위에 맞춰 제공합니다.
- 6개 상세 페이지는 `generateStaticParams`로 정적으로 생성하며 프로젝트별 제목과 설명을 제공합니다. 등록되지 않은 프로젝트 주소는 404입니다.
- Projects 순서는 노후하우, COLLABO, EasyReader, Structure-Aware Pixel Art Scaling, 신용카드 추천 챗봇, Delishare입니다. 상단 두 프로젝트는 실제 화면을 보여주고 나머지는 간결한 목록으로 표시합니다. TravelBox와 LocalMark는 목록·상세에서 제거했습니다.
- Experience에는 SSAFY 16th와 졸업 프로젝트 사이에 우리FIS아카데미(2025.07~2025.12)를 배치하고 제공된 우리FIS 로고를 사용합니다.
- 노후하우는 모의 마이데이터·DB 이중화, AI 금융상품 추천, 반복 DB 조회 개선, 설계·동작 흐름 순으로 구성합니다. 추천 결과와 온프레미스·AWS 구성도를 함께 제공합니다.
- 상세 본문에는 목차와 원본 이미지 확대 링크를 제공합니다. 목차는 데스크톱에서 고정되고 좁은 화면에서는 본문 위에 배치됩니다. 이미지는 `next/image`로 최적화하며, 소개 이미지만 우선 로드하고 나머지는 지연 로드합니다.
- 취미·음악 페이지와 관련 메뉴·커맨드·데이터·스타일은 삭제했습니다. 해당 경로는 404를 반환합니다.
- 모든 본문은 하나의 `<main>` 안에 의미 있는 `<section>`으로 렌더링됩니다. 섹션 컴포넌트는 서버 컴포넌트이며 빌드 시 정적으로 생성됩니다.
- 메뉴와 버튼은 `next/link`의 해시 링크로 해당 섹션으로 이동합니다. 헤더가 제목을 가리지 않도록 스크롤 간격을 적용했습니다.
- 스크롤 위치에 따라 메뉴의 현재 섹션을 표시하며, 모바일 메뉴와 맨 위로 이동 버튼을 제공합니다.
- 첫 화면은 중앙 정렬 소개와 옅은 파란 배경, 프로젝트·연락 버튼, 키워드로 섹션을 찾는 커맨드 UI로 구성합니다. 빈 입력은 추천 메뉴를 열고, 한국어·영어 키워드로 해당 섹션에 이동합니다.
- 인터랙션 컴포넌트만 클라이언트에서 실행하고, 이벤트와 타이머는 페이지를 떠날 때 정리합니다.

소개·연락처 수정은 `src/components/sections/`, 경험·기술 스택 수정은 `src/data/portfolio.ts`, 프로젝트 원고 수정은 `src/data/project-details/`에서 진행합니다. `src/data/projects.ts`에 프로젝트를 등록하면 목록·상세 주소·다음 프로젝트 링크가 같은 데이터에서 생성됩니다. 공개한 `slug`는 기존 링크가 유지되도록 고정합니다.

섹션 순서는 `src/app/page.tsx`와 `src/lib/navigation.ts`, 기존 디자인은 `src/app/globals.css`, 프로젝트 디자인은 `src/app/projects.css`에서 관리합니다. 프로젝트 영역의 Pretendard는 외부 CDN 요청 없이 로컬에서 제공합니다.

`npm run test:routes`는 기본적으로 `http://127.0.0.1:3000`을 검사합니다. 다른 서버를 검사하려면 `PORTFOLIO_URL` 환경 변수를 설정합니다. 새 프로젝트를 추가할 때는 테스트의 공개 경로 목록도 갱신합니다.

이번 변경에 적용한 디자인 원칙과 스킬 출처는 [프로젝트 디자인 노트](docs/projects-design.md)에 정리했습니다.
상세 원고의 근거 자료와 수치 해석 범위, 추가 확인 항목은 [원고 작성 근거](docs/project-content-sources.md)에 정리했습니다.

배포 시 Next.js를 지원하는 환경에서 `npm run build` 후 `npm start`로 실행합니다. `.html` 리다이렉트를 포함하므로 빌드 폴더를 단순 정적 파일 서버로 제공하는 방식은 사용하지 않습니다.
