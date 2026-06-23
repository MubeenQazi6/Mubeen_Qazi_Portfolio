import { type ProjectItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import Link from "next/link";

const cardClassName = cn(
  "group relative overflow-hidden glass-card-3d rounded-2xl p-6 transition-all duration-500",
  "hover:-translate-y-2 hover:scale-[1.02]",
);

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className={cardClassName}>
      <div className="card-shine" aria-hidden />
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        {project.category}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
        {project.url ? (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-accent"
          >
            {project.name}
            <span className="text-sm opacity-60" aria-hidden>
              ↗
            </span>
          </Link>
        ) : (
          project.name
        )}
      </h3>
      <p className="mt-1 text-xs text-muted">
        {project.role === "qa"
          ? "QA & Testing"
          : project.role === "development"
            ? "Software Development"
            : "QA & Development"}
      </p>
      <ul className="mt-4 space-y-2">
        {project.highlights.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-muted transition-colors group-hover:text-foreground/80"
          >
            <span className="text-accent" aria-hidden>
              →
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
