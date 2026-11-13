import TechnicalText from "@/components/technical-text";
import ProjectFigure from "@/components/projects/project-figure";
import type { ProjectChapter as Chapter } from "@/data/project-details/types";

export default function ProjectChapter({ chapter }: { chapter: Chapter }) {
  return (
    <section className="project-chapter" aria-labelledby={chapter.id}>
      <h2 id={chapter.id}>{chapter.title}</h2>
      {chapter.description && <p className="project-intro"><TechnicalText text={chapter.description} /></p>}
      <div className="project-chapter-blocks">
        {chapter.blocks.map((block) => (
          <div key={block.heading} className="project-prose">
            <h3>{block.heading}</h3>
            {block.items.length > 0 && <p><TechnicalText text={block.items.join(" ")} /></p>}
            {block.figure && <ProjectFigure figure={block.figure} />}
          </div>
        ))}
      </div>
      {chapter.metrics && (
        <div className="project-metrics">
          <table aria-describedby={chapter.metrics.note ? `${chapter.id}-metric-note` : undefined}>
            <caption>{chapter.metrics.caption}</caption>
            <thead>
              <tr>{chapter.metrics.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {chapter.metrics.rows.map(([label, before, after]) => (
                <tr key={label}><th scope="row">{label}</th><td>{before}</td><td>{after}</td></tr>
              ))}
            </tbody>
          </table>
          {chapter.metrics.note && <p id={`${chapter.id}-metric-note`} className="project-note">{chapter.metrics.note}</p>}
        </div>
      )}
      {chapter.outcome && <p className="project-outcome"><TechnicalText text={chapter.outcome} /></p>}
      {chapter.figure && <ProjectFigure figure={chapter.figure} />}
      {chapter.figures && (
        <div className="project-figure-grid">
          {chapter.figures.map((figure) => <ProjectFigure key={figure.src} figure={figure} />)}
        </div>
      )}
    </section>
  );
}
