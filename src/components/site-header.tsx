"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigationSections, sectionRoutes, type SectionId } from "@/lib/navigation";
import TechText from "@/components/react-bits/TechText";
import GooeyNav from "@/components/react-bits/GooeyNav";

function HeaderNavigation({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(
    pathname.startsWith("/projects/") ? "projects" : pathname === "/" ? "home" : null,
  );
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = navigationSections.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    if (!sections.length) return;

    let frame: number | null = null;
    const updateActiveSection = () => {
      frame = null;
      const offset = (headerRef.current?.getBoundingClientRect().height ?? 72) + 40;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <Link className="brand" href={sectionRoutes.home} aria-label="홈으로 이동" onClick={() => setIsOpen(false)}>
        <div className="brand-name">
          <span className="brand-text-fallback" aria-hidden="true">LEE JONG HYUCK</span>
          <TechText text="LEE JONG HYUCK" fontSize={18} fontWeight={800} letterSpacing={0.015}
            color="#18232d" accentColor="#315f84" align="left" reach={42} strokeWidth={0.8}
            dashLength={2.5} dashGap={1.5} reveal="letter" specks={0}
            selection={false} labels={false} draggable={false} sweep={false} clickKick={false} intro="none" />
        </div>
      </Link>
      <div
        id="section-tabs"
        className={`section-tabs${isOpen ? " is-open" : ""}`}
      >
        <GooeyNav items={navigationSections}
          activeIndex={Math.max(0, navigationSections.findIndex(({id}) => id === activeSection))}
          onChange={(index) => setActiveSection(navigationSections[index].id)}
          theme="light" color="#243e56" activeTextColor="#ffffff" size="sm" frame={false}
          particleCount={6} animationTime={480} spread={32} wobble={0.3} hoverEffect={false}
          className="header-gooey"
          onNavigate={(event, item) => {
              setIsOpen(false);
              if (
                pathname === "/" &&
                window.location.hash === item.href?.slice(1) &&
                !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
              ) {
                document.getElementById(item.href!.slice(2))?.scrollIntoView({ block: "start" });
              }
          }} />
      </div>
      <button
        className="menu-button"
        type="button"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        aria-controls="section-tabs"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <div className="header-status" aria-label="현재 상태">
        <span>Status: Active</span>
        <span>Response: Ready</span>
      </div>
    </header>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  return <HeaderNavigation key={pathname} pathname={pathname} />;
}
