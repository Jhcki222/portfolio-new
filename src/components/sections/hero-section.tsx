import Link from "next/link";
import CommandBar from "@/components/command-bar";
import { sectionRoutes } from "@/lib/navigation";

export default function HeroSection() {
  return (
    <section id="home" className="hero section" aria-labelledby="home-heading" tabIndex={-1}>
      <div className="hero-glow" aria-hidden="true" />
      <p className="eyebrow">PORTFOLIO / BACKEND ENGINEER</p>
      <h1 id="home-heading">안녕하세요.<br />백엔드 개발자 이종혁입니다.</h1>
      <p className="hero-copy">
        새로운 기술을 빠르게 익혀 문제를 해결하고,<br className="desktop-break" />
        다양한 기술을 적재적소에 사용해 사용자에게 더 큰 가치를 제공하는 서비스를 만들고자 합니다.
      </p>
      <div className="hero-actions">
        <Link className="button button-dark" href={sectionRoutes.projects}>프로젝트 보기</Link>
        <Link className="button button-light" href={sectionRoutes.contact}>연락하기</Link>
      </div>
      <CommandBar />
    </section>
  );
}
