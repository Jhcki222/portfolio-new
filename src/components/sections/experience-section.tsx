import PortfolioSection from "@/components/portfolio-section";
import { experiences } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <PortfolioSection id="experience" theme="light" eyebrow="03 / EXPERIENCES" title="Experience">
      <div className="timeline">
        {experiences.map((item) => (
          <article className="timeline-card" key={item.title}>
            <span className="timeline-date">{item.date}</span>
            <div className="timeline-copy">
              <h3>{item.title}</h3>
              {item.subtitle && <p className="timeline-subtitle">{item.subtitle}</p>}
              <ul className="timeline-highlights">{[...item.description, ...(item.highlights ?? [])].map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
            <figure className={`timeline-photo${item.imageFit === "contain" ? " timeline-photo-contain" : ""}`}>
              <img src={item.image} alt={item.imageAlt} />
            </figure>
          </article>
        ))}
      </div>
    </PortfolioSection>
  );
}
