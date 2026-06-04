import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  id,
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <p
        id={`${id}-label`}
        className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent"
      >
        {label}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
      ) : null}
    </Reveal>
  );
}
