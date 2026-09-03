import ProjectFigure from "@/components/projects/project-figure";
import type { ProjectChapter as Chapter } from "@/data/project-details/types";

export default function ProjectChapter({ chapter }: { chapter: Chapter }) {
  return (
    <section className="project-chapter" aria-labelledby={chapter.id}>
      <h2 id={chapter.id}>{chapter.title}</h2>
      <div className="project-chapter-blocks">
        {chapter.blocks.map((block) => (
          <div key={block.heading} className="project-prose">
            <h3>{block.heading}</h3>
            {block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {block.figure && <ProjectFigure figure={block.figure} />}
          </div>
        ))}
      </div>
      {chapter.metrics && (
        <div className="project-metrics">
          <table aria-describedby={`${chapter.id}-metric-note`}>
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
          <p id={`${chapter.id}-metric-note`} className="project-note">{chapter.metrics.note}</p>
        </div>
      )}
      {chapter.figure && <ProjectFigure figure={chapter.figure} />}
    </section>
  );
}
