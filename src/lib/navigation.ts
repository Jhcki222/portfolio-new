export const sectionRoutes = {
  home: "/#home",
  about: "/#about",
  projects: "/#projects",
  experience: "/#experience",
  skills: "/#skills",
  contact: "/#contact",
} as const;

export type SectionId = keyof typeof sectionRoutes;

export const navigationSections = [
  { id: "home", label: "Home", href: sectionRoutes.home },
  { id: "about", label: "About", href: sectionRoutes.about },
  { id: "projects", label: "Projects", href: sectionRoutes.projects },
  { id: "experience", label: "Experience", href: sectionRoutes.experience },
  { id: "skills", label: "Skills", href: sectionRoutes.skills },
  { id: "contact", label: "Contact", href: sectionRoutes.contact },
] as const;

const sectionKeywords = {
  about: ["about", "소개", "프로필", "나에 대해", "개발자"],
  experience: ["experience", "경험", "활동", "이력"],
  projects: ["project", "projects", "프로젝트", "작업", "논문"],
  skills: ["skill", "skills", "기술", "스택", "기술 스택"],
  contact: ["contact", "연락", "메일", "이메일", "github", "깃허브"],
} satisfies Partial<Record<SectionId, string[]>>;

export function findCommandSection(command: string) {
  const value = command.trim().toLowerCase();
  if (!value) return null;
  const target = (Object.keys(sectionKeywords) as (keyof typeof sectionKeywords)[]).find(
    (section) => sectionKeywords[section].some((keyword) => value.includes(keyword)),
  );
  return sectionRoutes[target ?? "projects"];
}

export const commandExamples = ["나에 대해", "경험 알려줘", "프로젝트 보기", "기술 스택", "연락하기"];
