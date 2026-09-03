import Link from "next/link";
import { sectionRoutes } from "@/lib/navigation";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>DESIGNED BY LEE JONG HYUCK. © 2026</span>
      <Link href={sectionRoutes.home}>Back to top</Link>
    </footer>
  );
}
