import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/project-detail";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} | 이종혁 포트폴리오`,
      description: project.summary,
      type: "article",
      locale: "ko_KR",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const nextProject = projects[(index + 1) % projects.length];
  return <ProjectDetail project={project} nextProject={nextProject} />;
}
