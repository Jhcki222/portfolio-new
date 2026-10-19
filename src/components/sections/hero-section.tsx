import Link from "next/link";
import CommandBar from "@/components/command-bar";
import { sectionRoutes } from "@/lib/navigation";

export default function HeroSection() {
  return (
    <section id="home" className="hero section" aria-labelledby="home-heading" tabIndex={-1}>
      <div className="hero-glow" aria-hidden="true" />
      <p className="eyebrow">PORTFOLIO / BACKEND ENGINEER</p>
      <h1 id="home-heading">안녕하세요.<br />백엔드 개발자 이종혁입니다.</h1>
      <ul className="hero-copy hero-facts">
        <li>Java·Spring Boot / Python 백엔드·AI 개발</li>
        <li>금융상품 추천 · 마이데이터 인증 · CDC 파이프라인</li>
      </ul>
      <div className="hero-actions">
        <Link className="button button-dark" href={sectionRoutes.projects}>프로젝트 보기</Link>
        <Link className="button button-light" href={sectionRoutes.contact}>연락하기</Link>
      </div>
      <CommandBar />
    </section>
  );
}
