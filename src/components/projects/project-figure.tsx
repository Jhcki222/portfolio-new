"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { ProjectFigure as Figure } from "@/data/project-details/types";

export default function ProjectFigure({ figure, eager = false }: { figure: Figure; eager?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const [open, setOpen] = useState(false);

  return (
    <figure className={`project-figure${figure.portrait ? " project-figure-portrait" : ""}`}>
      <button type="button" className="project-figure-link" aria-haspopup="dialog" data-image-src={figure.src} onClick={() => {
        dialog.current?.showModal();
        setOpen(true);
      }}>
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          unoptimized={figure.src.toLowerCase().endsWith(".gif")}
          loading={eager ? "eager" : "lazy"}
          sizes={figure.portrait
            ? "(max-width: 600px) calc(100vw - 40px), 580px"
            : "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), 880px"}
        />
        <span className="project-figure-open">
          이미지 크게 보기 <span aria-hidden="true">↗</span>
        </span>
      </button>
      <dialog
        ref={dialog}
        className="project-image-dialog"
        aria-labelledby={captionId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {open && (
          <div className="project-image-dialog-content">
            <div className="project-image-dialog-header">
              <p id={captionId}>{figure.caption}</p>
              <button type="button" onClick={() => dialog.current?.close()}>닫기</button>
            </div>
            <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} unoptimized />
          </div>
        )}
      </dialog>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
