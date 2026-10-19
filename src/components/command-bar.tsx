"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { navigationSections } from "@/lib/navigation";
import type { ChatMessage } from "@/lib/chat-service";
import ChatAnswer from "@/components/chat-answer";
import LatticeLoader from "@/components/react-bits/LatticeLoader";

const questions = ["어떤 개발자인가요?", "대표 프로젝트를 소개해 주세요", "사용하는 기술 스택은?", "연락처를 알려주세요"];

export default function CommandBar() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const retryMessages = useRef<ChatMessage[] | null>(null);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, pending, error, open]);

  async function send(question: string, retry = false) {
    if (busy.current || (!retry && !question.trim())) return;
    const next: ChatMessage[] = retry && retryMessages.current
      ? retryMessages.current
      : [...messages.slice(-8), { role: "user", content: question.trim() }];
    busy.current = true;
    retryMessages.current = next;
    setMessages(next);
    setInput("");
    setOpen(true);
    setPending(true);
    setError("");
    controller.current = new AbortController();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: AbortSignal.any([controller.current.signal, AbortSignal.timeout(42_000)]),
      });
      const data = await response.json();
      if (!response.ok || typeof data.reply !== "string") throw new Error(data.error || "답변을 받지 못했습니다. 다시 시도해 주세요.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
      retryMessages.current = null;
    } catch (cause) {
      if (controller.current?.signal.aborted) return;
      setError(cause instanceof Error && cause.name === "TimeoutError" ? "응답이 지연되고 있습니다. 다시 시도해 주세요." : cause instanceof TypeError || cause instanceof SyntaxError ? "서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." : cause instanceof Error ? cause.message : "연결에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  function reset() {
    setMessages([]);
    setError("");
    retryMessages.current = null;
    inputRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="portfolio-chat">
      <nav className="chat-navigation" aria-label="섹션 바로가기">
        {navigationSections.filter(({ id }) => id !== "home").map(({ id, label, href }) => <Link key={id} href={href}>{label}</Link>)}
      </nav>
      {open && <section className="chat-panel" aria-label="이종혁 포트폴리오 챗봇 채팅">
        <header className="chat-panel-header">
          <div><strong>포트폴리오 챗봇</strong><span>공개된 프로필과 프로젝트를 바탕으로 답변해요.</span></div>
          <div className="chat-panel-actions">
            <button type="button" onClick={reset} disabled={pending}>새 대화</button>
            <button type="button" onClick={() => setOpen(false)} aria-label="대화 접기">−</button>
          </div>
        </header>
        <div ref={logRef} className="chat-log" role="log" aria-label="대화 내역" aria-live="polite" aria-relevant="additions text" aria-busy={pending}>
          {messages.length === 0 && <p className="chat-welcome">경험, 기술, 프로젝트 등에 대해 물어보세요.</p>}
          {messages.map(({ role, content }, index) => <div key={index} className={`chat-message chat-message-${role}`}>
            <span className="chat-speaker">{role === "user" ? "방문자" : "포트폴리오 챗봇"}</span>
            {role === "assistant" ? <ChatAnswer content={content} /> : <p>{content}</p>}
          </div>)}
          {pending && <div className="chat-pending"><LatticeLoader label="포트폴리오를 살펴보고 있어요" color="#315f84" pattern="orbit" showTimer={false} cellSize={4} /></div>}
        </div>
        {error && <div className="chat-error" role="alert"><p>{error}</p><button type="button" onClick={() => void send("", true)} disabled={pending}>다시 시도</button><button type="button" onClick={reset}>새 대화</button></div>}
        <p className="chat-disclaimer">AI 답변은 부정확할 수 있어요. 자세한 내용은 프로젝트 페이지에서 확인해 주세요.</p>
      </section>}
      <form className="command-bar" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="portfolio-command">이종혁에 대해 질문하기</label>
        <span className="chat-input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.5a8 8 0 0 1-8 8H4l1.8-3.5A8 8 0 1 1 20 11.5Z" /><path d="M8 10h8M8 13.5h5" /></svg>
        </span>
        <input ref={inputRef} id="portfolio-command" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault(); }} type="text" autoComplete="off" maxLength={2000} placeholder="저에 대해 궁금한 점을 물어보세요" disabled={pending || !!error} onFocus={() => { if (messages.length || error) setOpen(true); }} />
        <button type="submit" disabled={pending || !!error || !input.trim()} aria-label={pending ? "답변 작성 중" : "질문 보내기"}>
          {pending ? <span className="chat-send-lattice" aria-hidden="true"><LatticeLoader label="" showTimer={false} cellSize={3} gap={2} /></span> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 18V6m-5 5 5-5 5 5" /></svg>}
        </button>
      </form>
      <div className="chat-question-list" aria-label="추천 질문">
        {questions.map((question) => <button key={question} type="button" disabled={pending || !!error} onClick={() => void send(question)}>{question}</button>)}
      </div>
    </div>
  );
}
