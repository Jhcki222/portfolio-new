import ProjectFigure from "@/components/projects/project-figure";
import type { Project } from "@/data/project-details/types";

export default function ProjectArchitecture({ architecture }: { architecture: NonNullable<Project["architecture"]> }) {
  return (
    <section className="project-architecture" aria-labelledby="project-architecture">
      <p className="project-section-label">설계와 동작 흐름</p>
      <h2 id="project-architecture">{architecture.title}</h2>
      <div className="project-prose">
        {architecture.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {architecture.steps && (
        <ol className="project-flow">
          {architecture.steps.map((step) => (
            <li key={step.title}><strong>{step.title}</strong><p>{step.description}</p></li>
          ))}
        </ol>
      )}
      {architecture.figures?.map((figure) => <ProjectFigure key={figure.src} figure={figure} />)}
    </section>
  );
}
