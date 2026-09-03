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
  description: "Java SpringBoot 기반 백엔드 개발자 이종혁의 포트폴리오. 프로젝트, 개발 경험, 기술 스택과 연락처를 한눈에 확인하세요.",
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
