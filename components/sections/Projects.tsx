import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/content/portfolio";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="projects"
          label="Projects"
          title="Selected work"
          description="Representative systems tested and built across domains."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
