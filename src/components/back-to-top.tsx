"use client";

export default function BackToTop() {
  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="맨 위로 이동"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
