import Link from "next/link";
import CommandBar from "@/components/command-bar";
import StrokeText from "@/components/react-bits/StrokeText";
import { sectionRoutes } from "@/lib/navigation";

export default function HeroSection() {
  return (
    <section id="home" className="hero section" aria-labelledby="home-heading" tabIndex={-1}>
      <div className="hero-glow" aria-hidden="true" />
      <p className="eyebrow">PORTFOLIO / BACKEND ENGINEER</p>
      <h1 id="home-heading" className="hero-title" aria-label="안녕하세요. 백엔드 개발자 이종혁입니다.">
        <span className="hero-title-line" aria-hidden="true"><StrokeText text="안녕하세요." /></span>
        <span className="hero-title-line" aria-hidden="true"><StrokeText text="백엔드 개발자" delay={0.12} /><StrokeText text="이종혁입니다." delay={0.24} /></span>
      </h1>
      <div className="hero-actions">
        <Link className="button button-dark" href={sectionRoutes.projects}>프로젝트 보기</Link>
        <Link className="button button-light" href={sectionRoutes.contact}>연락하기</Link>
      </div>
      <CommandBar />
    </section>
  );
}
