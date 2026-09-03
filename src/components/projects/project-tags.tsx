export default function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="project-tags" aria-label="기술 및 분야">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}
