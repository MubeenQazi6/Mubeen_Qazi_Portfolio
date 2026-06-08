import {
  about,
  certifications,
  education,
  experience,
  personal,
  projects,
  skillGroups,
} from "@/content/portfolio";

/** Full candidate profile sent to the AI for accurate job matching */
export function buildCandidateContext(): string {
  const skills = skillGroups
    .map((g) => `${g.title}: ${g.skills.join(", ")}`)
    .join("\n");

  const exp = experience
    .map(
      (item) =>
        `${item.title} @ ${item.company} (${item.period ?? "N/A"})${item.current ? " [CURRENT ROLE]" : ""}\n${item.highlights.map((h) => `  - ${h}`).join("\n")}`,
    )
    .join("\n\n");

  const projs = projects
    .map(
      (p) =>
        `${p.name} [${p.role === "qa" ? "QA/Testing" : p.role === "development" ? "Development" : "QA + Development"}] — ${p.category}\nSkills: ${p.skills.join(", ")}\n${p.highlights.map((h) => `  - ${h}`).join("\n")}`,
    )
    .join("\n\n");

  const certs = certifications
    .map((c) => `${c.name} — ${c.issuer} (${c.period ?? ""})`)
    .join("\n");

  return `
CANDIDATE: ${personal.name}
PRIMARY ROLE: ${personal.role} (currently active — emphasize SQA/testing)
SECONDARY ROLE: ${personal.roleSecondary}
LOCATION: ${personal.location}
EDUCATION: ${education.degree}, ${education.institution} (${education.period})

PROFESSIONAL SUMMARY:
${about.summary}

KEY HIGHLIGHTS:
${about.highlights.map((h) => `- ${h}`).join("\n")}

SKILLS:
${skills}

EXPERIENCE:
${exp}

PROJECTS:
${projs}

CERTIFICATIONS:
${certs}

MATCHING GUIDELINES FOR AI:
- Mubeen is currently working as Junior SQA Engineer — weight QA/testing skills and fintech/government project experience heavily when the JD is QA-focused.
- Also credit his Software Engineering degree, Laravel/PHP development (CATI internship, personal projects), and frontend work (GMG Solutions) when the JD is developer-focused.
- Be honest: only list skills as "matched" if they appear in the profile above. Do not invent experience.
- matchPercent should reflect real overlap: 85+ only for strong fits, 60-84 moderate, 40-59 partial, below 40 weak.
- relevantProjects must use exact project names from the profile.
- relevantExperience must use exact titles and companies from the profile.
`.trim();
}
