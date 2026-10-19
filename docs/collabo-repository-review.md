# COLLABO 저장소 대조

## 검토 범위

- 백엔드: https://github.com/2024-CECD-DP/Server_latest/tree/50bcc4a5e410205c827d7a8f7c5440157e3dd414
- AI: https://github.com/2024-CECD-DP/AI/tree/b0a34aa9119a9feb1a15b6c1894ff964168ca74e
- 공개 기본 브랜치의 코드를 정적으로 검토했다. 애플리케이션, 수집 API와 외부 DB를 실행하지 않았다. 저장소의 스크립트와 노트북도 실행하지 않았다.
- 사용자가 이 대화에서 백엔드 공동개발을 확인했다. 개인 단독 개발이나 각 파일의 단독 작성으로 확대하지 않고 공동개발 범위로 반영했다.
- 이 검토는 포트폴리오 원고 보강이며 외부 저장소의 기능 수정이나 배포를 포함하지 않는다.

## 원고에 반영한 구현

| 내용 | 근거 경로 | 반영 범위 |
| --- | --- | --- |
| 리포트 조회 API | Server_latest: domain/api/report/controller/ReportApiController.java, service/ReportService.java | 프로필, 게시물, 해시태그, 반응 평균과 업로드 관련 집계의 DTO 조합 |
| JPA 모델과 관계 | Server_latest: domain/influencer/entity/Influencer.java, domain/media/entity/Media.java | Influencer–Media/Meta, Media–Image/MediaHashTag 관계 |
| QueryDSL 집계 | Server_latest: domain/media/repository/impl/MediaRepositoryCustomImpl.java | DB createdAt 기준 최근 1년의 활동 주별 건수 평균. 전체 52주나 게시일 postedAt 기준이 아님 |
| 응답과 예외 계약 | Server_latest: global/common/ApiResponse.java, exception/ExceptionAdvice.java | 공통 성공/실패 응답과 사용자 조회 오류 처리 |
| 테스트 코드 | Server_latest: src/test/java/com/cecd/dp/EntityRelationTest.java, api/service/ReportServiceTest.java | 연관관계 저장/조회와 리포트 프로필 이름 검증. 전체 리포트 정확성 또는 테스트 통과 실적은 추가하지 않음 |
| 수집과 저장 | AI: fast_api_server/main.py | /update, Graph API business_discovery, media와 수집일별 meta 저장 |
| 단어 벡터 탐색 | AI: data/w2v_main.py | Word2Vec, KMeans, t-SNE 실험. 서비스에 배포됐다는 주장은 하지 않음 |
| 연관 태그 순위 실험 | AI: temp/graph.py, rwr/rwr.py, rwr/evaluate_rwr.py, rwr/evaluate_average.py | 동시 출현 그래프와 RWR 순위, Precision@K/MRR/MAP/nDCG 계산 코드 존재. 새 성능 수치를 만들지 않음 |

자바 경로는 `src/main/java/com/cecd/dp/`를 기준으로 한다.

## 기존 자료와 구분

LCP 문구의 4.1초→2.2초는 사용자가 이번 대화에서 제공한 값으로 반영했다. 감소율은 약 46.3%로 계산된다. Lighthouse 원본 리포트와 측정 조건은 제공되지 않았으며, 저장소 검토나 이번 포트폴리오 빌드에서 실측한 값이 아니다. 기존 40% 초기 렌더링 문구를 대체하며, 이전 문서의 검증 상태를 이 수치에 적용하지 않는다.

사용자 최신 정정: RWR은 처음 구상했던 알고리즘 솔루션이며 데이터 수집 제약 때문에 RAG로 구조를 변경했다. 공개 원고는 별개의 병렬 추천 기능 대신 초기 RWR 구상 → 데이터 수집 제약 → SQL과 QA 검색 기반 RAG 전환 순서로 통합했다. Word2Vec 등 별도 실험의 나열은 공개 원고에서 제거했다. RAG 평가표를 RWR과 RAG의 직접 비교 결과로 해석하지 않는다.

두 저장소의 검토 버전에서 LangChain/FAISS RAG 구현과 기존 내부 평가 수치를 재현하는 코드는 확인하지 못했다. RAG와 QA 구축, 기존 사용자 확인 지표는 이전 경험은행 근거를 유지한다. 새로 확인한 그래프 실험을 RAG 평가나 후속 배포 성과로 합치지 않았다. 현재 단계의 소스에 맞춰 아키텍처 설명에 수집, 리포트, 추천 경계를 나눴으며, 원본 RAG 아키텍처 이미지는 기존 자료로 보존했다.

## 완료 실적으로 추가하지 않은 항목

- 리포트의 summary와 highResponseTag는 null이며 완료 기능으로 소개하지 않았다.
- 인기 게시물 DTO는 정렬하지만 개수 제한이 없다. 주석의 상위 3개 설명과 주석 처리된 QueryDSL 구현을 실제 동작으로 사용하지 않았다.
- getLatestMeta는 정렬 보장 없이 목록 마지막 원소를 선택하고 빈 목록 보호가 없다. 최신성 보장, 빈 데이터 대응을 구현한 것으로 쓰지 않았다.
- 주차별 평균은 createdAt과 활동 주 수를 사용한다. 게시일 기준 전체 기간의 업로드 주기라고 과장하지 않았다.
- schedule 등록은 있으나 run_pending 호출 또는 별도 실행 루프는 확인되지 않았다. 매일 자동 수집이 검증됐다고 쓰지 않았다.
- 수집 코드는 네트워크 timeout, 재시도, 포괄 예외의 원인 기록, 중복 적재 방지 검증이 부족하다. 운영 안정성 개선 완료로 추가하지 않았다.
- 그래프 작성 예제는 nx.Graph를 사용하므로 방향 그래프 보장을 주장하지 않았다. RWR의 계수 의미도 문서 주석만으로 확정하지 않았다.
- evaluate_rwr의 calculate_precision_recall_f1은 상위 k개 내부에서 정답을 구성해 전체 관련 후보에 대한 Recall@K와 다르다. 해당 함수의 결과를 기존 RAG Recall@5 값의 근거로 사용하지 않았다.
- 분류 노트북도 존재하지만 서비스와의 연결 및 개인 기여를 확인하지 못해 모델 목록이나 정확도 실적을 추가하지 않았다.

## 추가 확인: 초기 Server 저장소의 타입 매핑 수정

- 사용자 제공 저장소: https://github.com/2024-CECD-DP/Server
- 기본 main은 초기 구성만 있으나 origin/dev와 feature/#1에 구현 이력이 있다. 체크아웃하거나 코드를 실행하지 않고 전체 브랜치의 커밋과 Java diff를 확인했다.
- `d0cf5e45bbf160f8f902276097528961cf0d199a`: Media.caption에 @Lob를 추가.
- `816941de731da9d96f1b9b70d15a1d9fc8cb342e`: 커밋 제목에 PostgreSQL에서 @Lob가 text가 아닌 oid로 매핑되는 문제를 명시하고, @Lob를 @Column(columnDefinition="TEXT")로 교체.
- 근거 diff: https://github.com/2024-CECD-DP/Server/commit/816941de731da9d96f1b9b70d15a1d9fc8cb342e
- 공개 원고에는 백엔드 공동개발 중 확인한 구체적인 문제 해결 사례로 추가했다. 커밋 작성자는 Limwngur이며 사용자의 단독 작성이라고 표기하지 않는다.
- 예외 메시지, 저장 실패 건수, 성능 개선 수치, 재현 테스트 통과 결과는 제공되지 않아 추가하지 않았다. 원본 DB를 실행해 재현한 것으로 표현하지 않는다.
- 기존 /api/v1/reports DTO 설명은 Server_latest 기준이다. 초기 Server의 다른 API 구조나 클래스 경로와 혼용하지 않고 caption 매핑의 수정 사례만 보강했다.
- 사용자가 저장소 링크 제거를 요청했으므로 외부 저장소 링크는 공개 프로젝트 데이터에 추가하지 않았다.

## 추가 보강 후보

실제 백엔드를 개선한다면 빈 Meta/이미지 처리, 최신 Meta 명시 정렬, 게시일 집계 기준, 인기 게시물 제한과 테스트부터 확인할 수 있다. 수집기는 실행 스케줄, 요청 timeout, 예외 기록, 중복 저장 방지를 우선 검증할 수 있다. 이는 이번에 수정한 완료 성과가 아닌 검토 후보이며 공개 프로젝트 원고에는 추가하지 않았다.
