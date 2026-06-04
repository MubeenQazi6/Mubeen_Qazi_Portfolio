import { cn } from "@/lib/utils";

export function SkillPill({ skill, className }: { skill: string; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/90",
        className,
      )}
    >
      {skill}
    </span>
  );
}
