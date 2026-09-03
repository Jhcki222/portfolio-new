import { collabo } from "./project-details/collabo";
import { knowwhohow } from "./project-details/knowwhohow";
import { pixelArtScaling } from "./project-details/pixel-art-scaling";
import { cardRecommendation, delishare, easyreader } from "./project-details/other-projects";
import type { Project } from "./project-details/types";

export type { Project } from "./project-details/types";

export const projects: Project[] = [
  knowwhohow,
  collabo,
  easyreader,
  pixelArtScaling,
  cardRecommendation,
  delishare,
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
