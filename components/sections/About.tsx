import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/content/portfolio";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="about"
          label="About"
          title="SQA Engineer & Software Developer"
          description="Testing-first today, with a solid development foundation from Laravel and full-stack projects."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard>
              <p className="text-lg leading-relaxed text-muted">{about.summary}</p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard>
              <ul className="grid gap-4 sm:grid-cols-2">
                {about.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/90 md:text-base"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
