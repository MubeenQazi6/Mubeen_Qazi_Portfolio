import { type ProjectItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const cardClassName = cn(
  "group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300",
  "hover:-translate-y-1.5 hover:scale-[1.01] hover:border-accent/40 hover:bg-white/[0.07]",
  "hover:shadow-[0_8px_40px_rgba(56,189,248,0.12)]",
);

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className={cardClassName}>
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        {project.category}
      </p>
      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
        {project.name}
      </h3>
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
