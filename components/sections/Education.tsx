import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/content/portfolio";
import Link from "next/link";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="education"
          label="Education"
          title="Academic background"
        />

        <Reveal>
          <GlassCard className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              {education.period}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
              <Link
                href={education.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {education.institution}
              </Link>
            </h3>
            <p className="mt-2 text-lg text-muted">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.location}</p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
