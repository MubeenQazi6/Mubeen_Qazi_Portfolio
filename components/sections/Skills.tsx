import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillPill } from "@/components/ui/SkillPill";
import { skillGroups } from "@/content/portfolio";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="skills"
          label="Skills"
          title="Tools I use every day"
          description="Grouped by QA, development, and collaboration."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <GlassCard className="h-full">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillPill key={skill} skill={skill} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
