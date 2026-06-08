import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { experience } from "@/content/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="experience"
          label="Experience"
          title="Professional journey"
          description="SQA work highlighted first — backed by Laravel, PHP, and frontend development experience."
        />

        <Reveal>
          <GlassCard>
            <div className="relative space-y-10 border-l border-white/15 pl-0 md:space-y-12">
              {experience.map((item) => (
                <TimelineItem key={`${item.company}-${item.title}`} item={item} />
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
