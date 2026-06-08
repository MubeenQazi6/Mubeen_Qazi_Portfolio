import { experience, jobMatchProfile, projects } from "@/content/portfolio";

export type MatchResult = {
  matchPercent: number;
  matchedSkills: string[];
  missingSkills: string[];
  relevantProjects: {
    name: string;
    relevance: number;
    reason: string;
    url?: string;
  }[];
  relevantExperience: {
    title: string;
    company: string;
    relevance: number;
  }[];
  roleFit: "qa" | "development" | "hybrid";
  summary: string;
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s+#.]/g, " ").replace(/\s+/g, " ").trim();
}

function countKeywordHits(text: string, keywords: readonly string[]): number {
  let hits = 0;
  for (const keyword of keywords) {
    if (text.includes(keyword)) hits++;
  }
  return hits;
}

function extractJdSkills(jd: string): string[] {
  const found: string[] = [];
  for (const skill of jobMatchProfile.skills) {
    const score = countKeywordHits(jd, skill.keywords);
    if (score > 0) found.push(skill.name);
  }
  return found;
}

function getCandidateSkills(): Set<string> {
  return new Set(jobMatchProfile.skills.map((s) => s.name));
}

function scoreProjects(jd: string) {
  return projects
    .map((project) => {
      const text = normalize(
        [project.name, project.category, ...project.highlights, ...project.skills].join(" "),
      );
      let score = 0;
      const reasons: string[] = [];

      for (const skill of project.skills) {
        if (jd.includes(skill)) {
          score += skill.length > 8 ? 3 : 2;
        }
      }

      if (jd.includes("fintech") || jd.includes("payment")) {
        if (project.name.toLowerCase().includes("namipay")) {
          score += 8;
          reasons.push("Direct fintech/payment platform experience");
        }
      }
      if (jd.includes("government") || jd.includes("public sector")) {
        if (project.name.toLowerCase().includes("sspa")) {
          score += 8;
          reasons.push("Government digital platform QA experience");
        }
      }
      if (jd.includes("laravel") || jd.includes("php")) {
        if (project.category.toLowerCase().includes("laravel") || project.category.toLowerCase().includes("php")) {
          score += 6;
          reasons.push("Hands-on Laravel/PHP development");
        }
      }
      if (jd.includes("api") || jd.includes("rest")) {
        if (project.role === "qa" || project.role === "both") {
          score += 4;
          reasons.push("API testing and validation experience");
        }
      }

      const reason =
        reasons.length > 0
          ? reasons[0]
          : project.role === "qa"
            ? "QA work aligns with testing requirements"
            : "Development background supports technical understanding";

      return { name: project.name, relevance: score, reason, url: project.url };
    })
    .filter((p) => p.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);
}

function scoreExperience(jd: string) {
  return experience
    .map((item) => {
      const text = normalize(
        [item.title, item.company, ...item.highlights].join(" "),
      );
      let score = 0;

      for (const exp of jobMatchProfile.experienceKeywords) {
        const roleMentioned = exp.keywords.some((k) => jd.includes(k));
        const hasOverlap = exp.keywords.some((k) => text.includes(k));
        if (roleMentioned && hasOverlap) score += 5;
      }

      for (const skill of jobMatchProfile.skills) {
        const jdHas = skill.keywords.some((k) => jd.includes(k));
        const expHas = skill.keywords.some((k) => text.includes(k));
        if (jdHas && expHas) score += 3;
      }

      if (item.current && (jd.includes("qa") || jd.includes("test"))) score += 4;

      return { title: item.title, company: item.company, relevance: score };
    })
    .filter((e) => e.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);
}

function detectRoleFit(jd: string): "qa" | "development" | "hybrid" {
  const qaScore = countKeywordHits(jd, [
    "qa", "quality assurance", "tester", "testing", "sqa", "manual test", "automation test",
  ]);
  const devScore = countKeywordHits(jd, [
    "developer", "development", "engineer", "laravel", "php", "full stack", "backend", "frontend", "programming",
  ]);
  if (qaScore > devScore + 2) return "qa";
  if (devScore > qaScore + 2) return "development";
  return "hybrid";
}

export function analyzeJobDescription(rawJd: string): MatchResult {
  const jd = normalize(rawJd);

  if (jd.length < 30) {
    return {
      matchPercent: 0,
      matchedSkills: [],
      missingSkills: [],
      relevantProjects: [],
      relevantExperience: [],
      roleFit: "hybrid",
      summary: "Please paste a fuller job description (at least a few lines) for an accurate match analysis.",
    };
  }

  const jdSkills = extractJdSkills(jd);
  const candidateSkills = getCandidateSkills();

  const matchedSkills = jdSkills.filter((s) => candidateSkills.has(s));
  const missingSkills = jdSkills.filter((s) => !candidateSkills.has(s));

  const titleBonus = jobMatchProfile.titles.some((t) => jd.includes(normalize(t))) ? 8 : 0;

  const skillScore =
    jdSkills.length > 0 ? (matchedSkills.length / jdSkills.length) * 55 : 25;

  const projectResults = scoreProjects(jd);
  const projectScore = Math.min(projectResults.length * 8, 20);

  const expResults = scoreExperience(jd);
  const expScore = Math.min(expResults.length * 7, 17);

  const roleFit = detectRoleFit(jd);
  const roleBonus = roleFit === "hybrid" ? 5 : roleFit === "qa" ? 4 : 3;

  const rawPercent = Math.round(skillScore + projectScore + expScore + titleBonus + roleBonus);
  const matchPercent = Math.min(Math.max(rawPercent, 15), 98);

  const summaryParts: string[] = [];

  if (matchPercent >= 75) {
    summaryParts.push(
      `Strong match (${matchPercent}%) — Mubeen's ${roleFit === "qa" ? "SQA" : roleFit === "development" ? "development" : "SQA and development"} background aligns well with this role.`,
    );
  } else if (matchPercent >= 50) {
    summaryParts.push(
      `Moderate match (${matchPercent}%) — Several core requirements overlap with Mubeen's experience, with some gaps to note.`,
    );
  } else {
    summaryParts.push(
      `Partial match (${matchPercent}%) — Some relevant skills and project experience exist, but the role emphasizes areas outside the primary profile.`,
    );
  }

  if (matchedSkills.length > 0) {
    summaryParts.push(`Key matching skills: ${matchedSkills.slice(0, 5).join(", ")}.`);
  }
  if (missingSkills.length > 0) {
    summaryParts.push(`Areas to discuss: ${missingSkills.slice(0, 3).join(", ")}.`);
  }

  return {
    matchPercent,
    matchedSkills,
    missingSkills,
    relevantProjects: projectResults,
    relevantExperience: expResults,
    roleFit,
    summary: summaryParts.join(" "),
  };
}
