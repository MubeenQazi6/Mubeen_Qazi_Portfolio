import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications } from "@/content/portfolio";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="certifications"
          label="Certifications"
          title="Credentials"
        />

        <Reveal>
          <GlassCard>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-center gap-4 text-lg text-foreground/90"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {cert}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
