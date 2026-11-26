import TechnicalText from "@/components/technical-text";
import ProjectFigure from "@/components/projects/project-figure";
import type { Project } from "@/data/project-details/types";

export default function ProjectArchitecture({ architecture }: { architecture: NonNullable<Project["architecture"]> }) {
  return (
    <section className="project-architecture" aria-labelledby="project-architecture">
      <p className="project-section-label">시스템 구성</p>
      <h2 id="project-architecture">{architecture.title}</h2>
      <ul className="project-points">{architecture.items.map((item) => <li key={item}><TechnicalText text={item} /></li>)}</ul>
      {architecture.environments && (
        <div className="project-environments">
          {architecture.environments.map((environment) => (
            <div className="project-environment" key={environment.title}>
              <h3>{environment.title}</h3>
              <ul className="project-points">
                {environment.items.map((item) => <li key={item}><TechnicalText text={item} /></li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
      {architecture.steps && (
        <ol className="project-flow">
          {architecture.steps.map((step) => (
            <li key={step.title}><strong>{step.title}</strong><p><TechnicalText text={step.description} /></p></li>
          ))}
        </ol>
      )}
      {architecture.figures?.map((figure) => <ProjectFigure key={figure.src} figure={figure} />)}
    </section>
  );
}
