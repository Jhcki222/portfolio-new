"use client";

// Adapted from React Bits StrokeText: SVG outline + clipped fill.
// Mount-only CSS animation replaces GSAP/ScrollTrigger for this fixed headline.
import { memo, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import "./StrokeText.css";

function StrokeText({ text, delay = 0 }: { text: string; delay?: number }) {
  const outline = useRef<SVGTextElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const clip = `stroke-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const chars = Array.from(text);

  useEffect(() => {
    let disposed = false;
    const measure = () => {
      if (disposed || !outline.current) return;
      const rect = outline.current.getBBox();
      if (rect.width <= 0) return;
      setBox({ x: rect.x - 2, y: rect.y - 2, width: rect.width + 4, height: rect.height + 4 });
    };
    measure();
    void document.fonts?.ready.then(measure);
    return () => { disposed = true; };
  }, [text]);

  return (
    <span className={`stroke-text${box ? " is-ready" : ""}`} style={{ "--stroke-fill-delay": `${delay + 1.05 + chars.length * 0.022}s` } as CSSProperties}>
      <span className="stroke-text__fallback">{text}</span>
      <svg className="stroke-text__svg" viewBox={box ? `${box.x} ${box.y} ${box.width} ${box.height}` : "0 -110 1800 150"} aria-hidden="true">
        <defs><clipPath id={clip} clipPathUnits="objectBoundingBox"><rect className="stroke-text__wipe" width="1" height="1" /></clipPath></defs>
        <text ref={outline} className="stroke-text__stroke" x="0" y="0" fontSize="100" fontWeight="900" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
          {chars.map((char, index) => <tspan key={index} style={{ "--stroke-delay": `${delay + index * 0.022}s` } as CSSProperties}>{char}</tspan>)}
        </text>
        <text className="stroke-text__fill" x="0" y="0" fontSize="100" fontWeight="900" fill="currentColor" clipPath={`url(#${clip})`}>{text}</text>
      </svg>
    </span>
  );
}

export default memo(StrokeText);
