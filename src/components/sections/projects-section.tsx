import PortfolioSection from "@/components/portfolio-section";
import ProjectListItem from "@/components/projects/project-list-item";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <PortfolioSection
      id="projects"
      theme="light"
      eyebrow="02 / SELECTED PROJECTS"
      title="Projects"
      className="projects-section project-type"
    >
      <div className="projects-intro">
        <p>직접 만든 서비스와 연구를 소개합니다.</p>
        <span>{projects.length}개의 프로젝트</span>
      </div>
      <ul className="project-list" aria-label="프로젝트 목록">
        {projects.map((project, index) => (
          <ProjectListItem project={project} featured={index < 2} key={project.slug} />
        ))}
      </ul>
    </PortfolioSection>
  );
}
