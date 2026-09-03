import Image from "next/image";
import type { ProjectFigure as Figure } from "@/data/project-details/types";

export default function ProjectFigure({ figure, eager = false }: { figure: Figure; eager?: boolean }) {
  return (
    <figure className={`project-figure${figure.portrait ? " project-figure-portrait" : ""}`}>
      <a href={figure.src} target="_blank" rel="noopener noreferrer" className="project-figure-link">
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          loading={eager ? "eager" : "lazy"}
          sizes={figure.portrait
            ? "(max-width: 600px) calc(100vw - 40px), 580px"
            : "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), 880px"}
        />
        <span className="project-figure-open">
          이미지 크게 보기 <span aria-hidden="true">↗</span>
          <span className="sr-only"> (새 탭에서 열림)</span>
        </span>
      </a>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
