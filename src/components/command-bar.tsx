"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { commandExamples, findCommandSection, navigationSections } from "@/lib/navigation";

export default function CommandBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let exampleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typingTimer: ReturnType<typeof setTimeout>;
    const type = () => {
      const input = inputRef.current;
      if (!input) return;
      if (document.activeElement === input || input.value) {
        typingTimer = setTimeout(type, 500);
        return;
      }
      const example = commandExamples[exampleIndex];
      setPlaceholder(example.slice(0, charIndex));
      let pause = false;
      if (!deleting && charIndex === example.length) {
        deleting = true;
        pause = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        exampleIndex = (exampleIndex + 1) % commandExamples.length;
      }
      charIndex += deleting ? -1 : 1;
      typingTimer = setTimeout(type, pause ? 1200 : deleting ? 42 : 88);
    };
    typingTimer = setTimeout(type, 0);
    return () => clearTimeout(typingTimer);
  }, []);

  useEffect(() => {
    const dismiss = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (formRef.current?.contains(event.target) || suggestionsRef.current?.contains(event.target)) return;
      setSuggestionsVisible(false);
    };
    document.addEventListener("click", dismiss);
    return () => {
      document.removeEventListener("click", dismiss);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = findCommandSection(inputRef.current?.value ?? "");
    if (!href) {
      setSuggestionsVisible(true);
      return;
    }
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setSuggestionsVisible(false);
    setIsNavigating(true);
    navigationTimer.current = setTimeout(() => {
      inputRef.current?.blur();
      if (window.location.hash === href.slice(1)) {
        document.getElementById(href.slice(2))?.scrollIntoView({ block: "start" });
      } else {
        router.push(href);
      }
    }, 180);
    toastTimer.current = setTimeout(() => setIsNavigating(false), 1600);
  }

  return (
    <>
      <div ref={suggestionsRef} id="command-suggestions" className={`command-suggestions${suggestionsVisible ? " is-visible" : ""}`} aria-label="추천 이동 커맨드" inert={!suggestionsVisible}>
        {navigationSections.filter((section) => section.id !== "home").map((section) => (
          <Link href={section.href} key={section.id} onClick={() => setSuggestionsVisible(false)}>{section.label}</Link>
        ))}
      </div>
      <form ref={formRef} className="command-bar" onSubmit={handleSubmit} onKeyDown={(event) => {
        if (event.key === "Escape") setSuggestionsVisible(false);
      }}>
        <label className="sr-only" htmlFor="portfolio-command">이동할 섹션 입력</label>
        <span className="command-plus" aria-hidden="true">Go</span>
        <input ref={inputRef} id="portfolio-command" type="text" autoComplete="off" placeholder={placeholder || "프로젝트 보기"} onFocus={() => setSuggestionsVisible(true)} onClick={() => setSuggestionsVisible(true)} />
        <button type="submit" aria-label="추천 커맨드 열기 또는 입력한 섹션으로 이동" aria-expanded={suggestionsVisible} aria-controls="command-suggestions">→</button>
      </form>
      {isNavigating && createPortal(<div className="toast is-visible" role="status">섹션으로 이동합니다.</div>, document.body)}
    </>
  );
}
