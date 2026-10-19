import { experiences, skills, portfolioIntroduction } from "@/data/portfolio";
import { projects } from "@/data/projects";

// Reuse published project data so answers follow portfolio updates.
export const portfolioContext = JSON.stringify({
  profile: {
    name: "이종혁 / Lee Jong Hyuck",
    role: "백엔드 개발자",
    birthDate: "1999.03.24",
    email: "jhcki222@gmail.com",
    github: "https://github.com/Jhcki222",
    introduction: portfolioIntroduction,
    education: "동국대학교 컴퓨터공학과 학사, 2019.03 - 2025.08",
    certificates: ["SQLD", "정보처리기사"],
    publication: {
      title: "Structure-Aware Pixel Art Scaling via Block Size Detection",
      journal: "Applied Sciences, 2026, 공동저자",
      url: "https://www.mdpi.com/2076-3417/16/5/2314",
    },
  },
  experiences: experiences.map(({ date, title, subtitle, description, highlights }) => ({ date, title, subtitle, description, highlights })),
  skills,
  projects: projects.map(({ slug, name, category, headline, summary, focus, period, tags, links, overview, description, contributions, architecture, chapters }) => ({
    url: `/projects/${slug}`, name, category, headline, summary, focus, period, tags, links, overview, description, contributions,
    architecture: architecture && { items: architecture.items, steps: architecture.steps },
    chapters: chapters.map(({ title, description, blocks, metrics }) => ({
      title, description, blocks: blocks.map(({ heading, items }) => ({ heading, items })), metrics,
    })),
  })),
});
