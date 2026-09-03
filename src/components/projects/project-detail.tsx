import Link from "next/link";
import ProjectTags from "@/components/projects/project-tags";
import ProjectChapter from "@/components/projects/project-chapter";
import ProjectFigure from "@/components/projects/project-figure";
import ProjectArchitecture from "@/components/projects/project-architecture";
import type { Project } from "@/data/projects";

type ProjectDetailProps = {
  project: Project;
  nextProject: Project;
};

export default function ProjectDetail({ project, nextProject }: ProjectDetailProps) {
  const architectureAfterChapters = project.architecture?.placement === "after-chapters";
  const architectureContents = project.architecture ? [{ id: "project-architecture", label: "설계와 동작 흐름" }] : [];
  const contents = [
    { id: "project-overview", label: "프로젝트 소개" },
    ...(project.contributions ? [{ id: "project-role", label: "내가 맡은 일" }] : []),
    ...(!architectureAfterChapters ? architectureContents : []),
    ...project.chapters.map((chapter) => ({ id: chapter.id, label: chapter.nav })),
    ...(architectureAfterChapters ? architectureContents : []),
  ];

  return (
    <main id="main-content" className="project-detail project-type">
      <div className="project-detail-inner">
        <nav className="project-breadcrumb" aria-label="프로젝트 경로">
          <Link href="/#projects">프로젝트 목록</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>

        <header className="project-detail-header">
          <p className="project-category">{project.category}</p>
          <div className="project-title-layout">
            <div>
              <h1>{project.name}</h1>
              <p className="project-headline">{project.headline}</p>
            </div>
            {(project.focus || project.period) && (
              <dl className="project-header-facts">
                {project.focus && <div><dt>담당 역할</dt><dd>{project.focus}</dd></div>}
                {project.period && <div><dt>진행 기간</dt><dd>{project.period}</dd></div>}
              </dl>
            )}
          </div>
          <div className="project-header-bottom">
            <ProjectTags tags={project.tags} />
            {project.links.length > 0 && (
              <div className="project-resources" aria-label="프로젝트 관련 링크">
                {project.links.map((link) => (
                  <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (새 탭에서 열림)</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="project-detail-grid">
          <nav className="project-contents" aria-label="페이지 목차">
            <p>목차</p>
            <ol>
              {contents.map((item) => (
                <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
              ))}
            </ol>
          </nav>
          <article className="project-story" aria-label={`${project.name} 상세 설명`}>
            <section className="project-overview" aria-labelledby="project-overview">
              <h2 id="project-overview">프로젝트 소개</h2>
              <div className="project-prose">
                {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {project.cover && <ProjectFigure figure={project.cover} eager />}
            </section>

            {project.contributions && (
              <section className="project-contributions" aria-labelledby="project-role">
                <h2 id="project-role">내가 맡은 일</h2>
                <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            )}

            {project.architecture && !architectureAfterChapters && (
              <ProjectArchitecture architecture={project.architecture} />
            )}

            {project.chapters.map((chapter) => <ProjectChapter key={chapter.id} chapter={chapter} />)}
            {project.architecture && architectureAfterChapters && (
              <ProjectArchitecture architecture={project.architecture} />
            )}
          </article>
        </div>

        <nav className="project-pagination" aria-label="다른 프로젝트 살펴보기">
          <Link className="project-back" href="/#projects">프로젝트 목록으로 돌아가기</Link>
          <Link className="project-next" href={`/projects/${nextProject.slug}`}>
            <span>다음 프로젝트</span>
            <strong>{nextProject.name} <span aria-hidden="true">→</span></strong>
          </Link>
        </nav>
      </div>
    </main>
  );
}
