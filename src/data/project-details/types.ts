export type ProjectFigure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  portrait?: boolean;
};

export type ProjectMetrics = {
  caption: string;
  columns: [string, string, string];
  rows: [string, string, string][];
  note: string;
};

export type ProjectChapter = {
  id: string;
  nav: string;
  title: string;
  description?: string;
  blocks: { heading: string; items: string[]; figure?: ProjectFigure }[];
  figure?: ProjectFigure;
  metrics?: ProjectMetrics;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  highlights?: string[];
  focus?: string;
  period?: string;
  tags: string[];
  links: { label: string; url: string }[];
  overview: string[];
  description?: string;
  contributions?: string[];
  cover?: ProjectFigure;
  architecture?: {
    placement?: "before-chapters" | "after-chapters";
    title: string;
    items: string[];
    figures?: ProjectFigure[];
    steps?: { title: string; description: string }[];
  };
  chapters: ProjectChapter[];
};
