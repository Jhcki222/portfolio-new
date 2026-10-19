# 개발자 이종혁 포트폴리오 Repository

### Production : https://portfolio-new-hazel-six.vercel.app/

### AI 채팅

홈 화면 입력창은 `/api/chat` 서버를 통해 **Groq GPT-OSS 20B → Groq GPT-OSS 120B → Ollama Gemma 4 31B** 순서로 연결합니다. 인증 오류, 모델 오류, 이용 한도, 입력 한도, 서버/네트워크 오류와 비정상 응답에는 다음 모델로 전환합니다. 각 Groq 시도는 최대 10초, Ollama는 최대 16초이며 전체 시도는 36초를 공유합니다. 방문자가 연결을 취소하면 추가 호출하지 않습니다. 모든 모델이 실패할 때만 오류와 재시도 버튼을 표시합니다.

공개 프로필, 경험, 기술 및 `src/data/projects.ts`의 상세 내용을 근거로 답변합니다. 전체 원고 대신 프로젝트 목록과 질문에 관련된 근거를 최대 7KB의 문맥으로 구성합니다. 최근 사용자 질문으로 프로젝트를 찾고 관련 사례를 우선 전달하며, 클라이언트가 보낸 최근 4개 문답 중 이전 대화는 2.5KB 이내의 완전한 문답 쌍만 유지합니다. 마지막 질문은 자르지 않습니다. 답변 생성 한도는 1,000토큰입니다. 대화는 브라우저 메모리에만 보관하며 새로고침하면 초기화됩니다. 질문과 대화 맥락은 답변 생성을 위해 Groq로 전송되며, 자동 전환 시 Ollama Cloud로도 전송됩니다.

1. `.env.example`을 `.env.local`로 복사하고 키를 설정합니다.
2. `npm run dev`로 실행합니다.
3. Vercel 배포 시 아래 환경 변수를 등록하고 재배포합니다. 로컬 `.env.local`은 배포 환경에 자동 적용되지 않습니다.

| 환경 변수 | 용도 | 기본 모델 |
| --- | --- | --- |
| `LLM_API_KEY` | Groq API 키 (우선 사용) | — |
| `LLM_REVIEW_MODEL` | Groq 기본 모델 | `openai/gpt-oss-20b` |
| `LLM_FALLBACK_MODELS` | 쉼표로 구분한 Groq 대체 모델 (빈 값이면 사용 안 함) | `openai/gpt-oss-120b` |
| `OLLAMA_API_KEY` | Ollama Cloud API 키 (자동 대체) | — |
| `OLLAMA_REVIEW_MODEL` | Ollama 모델 | `gemma4:31b` |

키 하나만 등록해도 해당 서비스를 단독으로 사용합니다. 기존 GMS 키는 사용하지 않습니다. 참고: [Groq 지원 모델](https://console.groq.com/docs/models), [Groq 요청 한도](https://console.groq.com/docs/rate-limits), [Ollama Cloud API](https://docs.ollama.com/cloud). 모델 변경은 조직이나 계정 전체의 소진된 한도를 초기화하지 않습니다.

API 키에는 `NEXT_PUBLIC_` 접두사를 붙이지 마세요. `.env.local`은 Git에서 제외됩니다. 서버는 입력 길이와 대화 역할을 검증하며 IP별 분당 10회 요청 제한을 적용합니다. 요청 제한은 서버 인스턴스별 메모리를 사용하므로 다중 인스턴스의 전체 한도가 필요하면 공유 저장소 기반 제한을 추가해야 합니다.

검증: `npm run test:chat` (Node 22.6 이상), `npm run typecheck`, `npm run build`. 페이지 회귀 검증은 서버를 실행한 뒤 `npm run test:routes`로 실행합니다.
