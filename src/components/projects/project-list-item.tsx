import Image from "next/image";
import Link from "next/link";
import ProjectTags from "@/components/projects/project-tags";
import type { Project } from "@/data/projects";

export default function ProjectListItem({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <li className={featured ? "project-item project-item-featured" : "project-item"}>
      <Link
        className="project-list-link"
        href={`/projects/${project.slug}`}
        aria-label={`${project.name} 소개 보기`}
      >
        {featured && project.cover && (
          <div className="project-preview">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1240px) calc((100vw - 80px) / 2), 568px"
            />
          </div>
        )}
        <div className="project-identity">
          <span className="project-category">{project.category}</span>
          <h3 id={`${project.slug}-title`}>{project.name}</h3>
        </div>
        <div className="project-list-description">
          <p>{project.summary}</p>
          <ProjectTags tags={project.tags.slice(0, 4)} />
        </div>
        <span className="project-open">
          <span>프로젝트 보기</span>
          <span className="project-arrow" aria-hidden="true">→</span>
        </span>
      </Link>
    </li>
  );
}
