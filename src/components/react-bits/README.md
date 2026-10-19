# React Bits adaptations

Sources: https://github.com/DavidHDev/react-bits and the official TypeScript/CSS registry at https://reactbits.dev/r/{component}-TS-CSS.json, retrieved 2026-10-19. See the accompanying LICENSE.md for the original terms and copyright notice.

- GooeyNav: original WebGL and contour engine, adapted to Next.js Link and the existing section scroll spy. Six particles, DPR capped at 1.5, no hover loop, idle and hidden-tab suspension. Uses native anchors through Link, including modifier-key navigation and a CSS fallback when WebGL is unavailable.
- TechText: original Canvas 2D glyph rendering on the header wordmark. Hover turns letters into dashed outlines. DPR capped at 1.5, no idle sweep, intro, particle specks, dragging or click kicks. The loop stops after the transition settles and while the tab is hidden. Memoization isolates it from scroll-spy state changes. Server-rendered text remains visible until the first canvas draw.
- LatticeLoader: original CSS cell animation. Mounted only while a request is pending. Timer disabled, including its interval; reduced motion uses static cells.
- StrokeText: adapts the original SVG outline and clipped fill to a mount-only CSS animation. No GSAP, ScrollTrigger, perpetual loop or animation-related React state updates. Keeps server-rendered fallback text and a semantic H1. Browser font measurement is performed on mount and after fonts are ready; no resize observer is required because the SVG scales with the reserved text layout.

The adaptations add no package dependencies. Existing page content and navigation remain server-rendered. The effects decorate the interface and do not gate access to the portfolio or chat.

