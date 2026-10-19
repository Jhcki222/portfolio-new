# 개발자 이종혁 포트폴리오 Repository

### Production : https://portfolio-new-hazel-six.vercel.app/

### AI 채팅

홈 화면 입력창은 `/api/chat` 서버를 통해 **Groq → Ollama Cloud** 순서로 연결합니다. Groq 요청이 실패하거나 12초 이내에 완료되지 않으면 같은 질문과 포트폴리오 자료를 Ollama에 전달합니다. 인증 오류, 모델 오류, 이용 한도, 서버/네트워크 오류, 비정상 응답도 자동 전환 대상입니다. 방문자가 연결을 취소하면 추가 호출하지 않습니다. 두 서비스가 모두 실패할 때만 오류와 재시도 버튼을 표시합니다.

공개 프로필, 경험, 기술 및 `src/data/projects.ts`의 상세 내용을 근거로 답변하며 최근 4개 문답을 함께 전달합니다. 대화는 브라우저 메모리에만 보관하며 새로고침하면 초기화됩니다. 질문과 대화 맥락은 답변 생성을 위해 Groq로 전송되며, 자동 전환 시 Ollama Cloud로도 전송됩니다.

1. `.env.example`을 `.env.local`로 복사하고 키를 설정합니다.
2. `npm run dev`로 실행합니다.
3. Vercel 배포 시 아래 환경 변수를 등록하고 재배포합니다. 로컬 `.env.local`은 배포 환경에 자동 적용되지 않습니다.

| 환경 변수 | 용도 | 기본 모델 |
| --- | --- | --- |
| `LLM_API_KEY` | Groq API 키 (우선 사용) | — |
| `LLM_REVIEW_MODEL` | Groq 모델 | `openai/gpt-oss-120b` |
| `OLLAMA_API_KEY` | Ollama Cloud API 키 (자동 대체) | — |
| `OLLAMA_REVIEW_MODEL` | Ollama 모델 | `gpt-oss:120b` |

키 하나만 등록해도 해당 서비스를 단독으로 사용합니다. 기존 GMS 키는 사용하지 않습니다. `groq/compound-mini`는 지원이 종료되어 사용 가능한 `openai/gpt-oss-120b`로 교체했습니다. 참고: [Groq 지원 종료 안내](https://console.groq.com/docs/compound/systems/compound-mini), [Ollama Cloud API](https://docs.ollama.com/cloud).

API 키에는 `NEXT_PUBLIC_` 접두사를 붙이지 마세요. `.env.local`은 Git에서 제외됩니다. 서버는 입력 길이와 대화 역할을 검증하며 IP별 분당 10회 요청 제한을 적용합니다. Groq는 최대 12초, Ollama는 최대 24초 동안 응답을 기다립니다. 요청 제한은 서버 인스턴스별 메모리를 사용하므로 다중 인스턴스의 전체 한도가 필요하면 공유 저장소 기반 제한을 추가해야 합니다.

검증: `npm run test:chat` (Node 22.6 이상), `npm run typecheck`, `npm run build`. 페이지 회귀 검증은 서버를 실행한 뒤 `npm run test:routes`로 실행합니다.
