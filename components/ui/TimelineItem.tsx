import { type ExperienceItem } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <div className="relative pl-8 md:pl-10">
      <span
        className={cn(
          "absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2",
          item.current
            ? "border-accent bg-accent shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            : "border-white/30 bg-background",
        )}
        aria-hidden
      />
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {item.title}
          </h3>
          <span className="text-accent">
            —{" "}
            {item.companyUrl ? (
              <Link
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground hover:underline"
              >
                {item.company}
              </Link>
            ) : (
              item.company
            )}
          </span>
        </div>
        {item.period || item.location ? (
          <p className="text-sm font-medium text-muted">
            {[item.period, item.location].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        <ul className="mt-3 space-y-2 text-muted">
          {item.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-sm leading-relaxed md:text-base">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
