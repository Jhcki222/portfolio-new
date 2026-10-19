import type { Metadata } from "next";
import type { ReactNode } from "react";
import BackToTop from "@/components/back-to-top";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";
import "./projects.css";
import "./hero.css";

export const metadata: Metadata = {
  title: { default: "이종혁 | Backend Developer Portfolio", template: "Lee Jong Hyuck | %s" },
  description: "Java·Spring Boot 기반 백엔드 개발자 이종혁의 포트폴리오. AI 검색, CDC 데이터 파이프라인, I/O 성능과 장애 복구를 개선한 프로젝트와 개발 경험을 소개합니다.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">본문으로 이동</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
