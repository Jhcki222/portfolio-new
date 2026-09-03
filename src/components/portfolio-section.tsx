import type { ReactNode } from "react";

type PortfolioSectionProps = {
  id: string;
  children: ReactNode;
  eyebrow: string;
  title: string;
  theme: "light" | "dark";
  className?: string;
  innerClassName?: string;
  headingClassName?: string;
};

export default function PortfolioSection({
  id,
  children,
  eyebrow,
  title,
  theme,
  className = "",
  innerClassName = "",
  headingClassName = "section-heading",
}: PortfolioSectionProps) {
  return (
    <section
      id={id}
      className={`portfolio-section section-${theme}${className ? ` ${className}` : ""}`}
      aria-labelledby={`${id}-heading`}
      tabIndex={-1}
    >
      <div className={`section-inner${innerClassName ? ` ${innerClassName}` : ""}`}>
        <div className={headingClassName}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
