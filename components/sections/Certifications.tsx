import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications } from "@/content/portfolio";
import Link from "next/link";

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
            <ul className="space-y-5">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-start gap-4 text-foreground/90"
                >
                  <span
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-lg font-medium text-foreground">{cert.name}</p>
                    <p className="text-sm text-muted">
                      <Link
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {cert.issuer}
                      </Link>
                      {cert.period ? ` · ${cert.period}` : null}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
