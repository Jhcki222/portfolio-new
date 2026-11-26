import TechnicalText from "@/components/technical-text";
import ProjectFigure from "@/components/projects/project-figure";
import type { ProjectChapter as Chapter } from "@/data/project-details/types";

export default function ProjectChapter({ chapter, prose = false }: { chapter: Chapter; prose?: boolean }) {
  const showStageHeadings = !prose && chapter.stageHeadings !== false;
  return (
    <section className="project-chapter" aria-labelledby={chapter.id}>
      <h2 id={chapter.id}>{chapter.title}</h2>
      {chapter.description && (
        <div>
          {showStageHeadings && chapter.blocks.length > 0 && <h3 className="project-stage-heading">문제 상황</h3>}
          <div className="project-intro project-paragraphs">
            {chapter.description.split("\n\n").map((paragraph) => (
              <p key={paragraph}><TechnicalText text={paragraph} /></p>
            ))}
          </div>
        </div>
      )}
      {showStageHeadings && chapter.blocks.length > 0 && <h3 className="project-stage-heading">해결 과정</h3>}
      <div className="project-chapter-blocks">
        {chapter.blocks.map((block) => (
          <div key={block.heading} className="project-prose">
            {block.heading && (showStageHeadings ? <h4>{block.heading}</h4> : <h3>{block.heading}</h3>)}
            {prose ? block.items.map((item) => (
              <p key={item}><TechnicalText text={item} /></p>
            )) : block.items.length > 0 && (
              <ul className="project-points">
                {block.items.map((item) => <li key={item}><TechnicalText text={item} /></li>)}
              </ul>
            )}
            {block.figure && <ProjectFigure figure={block.figure} />}
          </div>
        ))}
      </div>
      {showStageHeadings && (chapter.metrics || chapter.outcome) && <h3 className="project-stage-heading">결과</h3>}
      {chapter.metrics && (
        <div className="project-metrics">
          <table aria-describedby={chapter.metrics.note ? `${chapter.id}-metric-note` : undefined}>
            <caption>{chapter.metrics.caption}</caption>
            <thead>
              <tr>{chapter.metrics.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {chapter.metrics.rows.map(([label, ...values]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {values.map((value, index) => (
                    <td key={index}>{value && <TechnicalText text={value} />}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {chapter.metrics.note && <p id={`${chapter.id}-metric-note`} className="project-note">{chapter.metrics.note}</p>}
        </div>
      )}
      {chapter.outcome && (
        <div className={showStageHeadings ? "project-outcome project-paragraphs" : "project-prose project-paragraphs project-chapter-summary"}>
          {Array.isArray(chapter.outcome) ? (
            <ul className="project-points">
              {chapter.outcome.map((item) => <li key={item}><TechnicalText text={item} /></li>)}
            </ul>
          ) : chapter.outcome.split("\n\n").map((paragraph) => (
            <p key={paragraph}><TechnicalText text={paragraph} /></p>
          ))}
        </div>
      )}
      {chapter.figure && <ProjectFigure figure={chapter.figure} />}
      {chapter.figures && (
        <div className="project-figure-grid">
          {chapter.figures.map((figure) => <ProjectFigure key={figure.src} figure={figure} />)}
        </div>
      )}
    </section>
  );
}
