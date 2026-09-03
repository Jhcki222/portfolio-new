import PortfolioSection from "@/components/portfolio-section";
import { skills } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <PortfolioSection id="skills" theme="light" eyebrow="04 / TECH STACK" title="Skills">
      <div className="skill-grid">
        {skills.map(([category, items]) => (
          <article className="skill-card" key={category}>
            <h3>{category}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </PortfolioSection>
  );
}
