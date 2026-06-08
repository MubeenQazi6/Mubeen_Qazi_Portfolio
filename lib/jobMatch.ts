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
  source?: "ai" | "fallback";
};

type AiMatchPayload = {
  matchPercent?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
  relevantProjects?: { name?: string; reason?: string }[];
  relevantExperience?: { title?: string; company?: string }[];
  roleFit?: string;
  summary?: string;
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^\w\s+#.]/g, " ").replace(/\s+/g, " ").trim();
}

function clampPercent(value: unknown): number {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.min(98, Math.max(0, Math.round(num)));
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function enrichProjectUrl(name: string): string | undefined {
  const normalized = name.toLowerCase();
  return projects.find((p) => {
    const projectName = p.name.toLowerCase();
    const shortName = projectName.split("—")[0].trim();
    return normalized === projectName || normalized.includes(shortName) || projectName.includes(normalized);
  })?.url;
}

export function parseAiMatchResult(payload: AiMatchPayload): MatchResult {
  const roleFitRaw = payload.roleFit?.toLowerCase();
  const roleFit: MatchResult["roleFit"] =
    roleFitRaw === "qa" || roleFitRaw === "development" || roleFitRaw === "hybrid"
      ? roleFitRaw
      : "hybrid";

  const relevantProjects = (payload.relevantProjects ?? [])
    .filter((p) => p.name && p.reason)
    .slice(0, 4)
    .map((p, index) => ({
      name: p.name!.trim(),
      reason: p.reason!.trim(),
      relevance: 100 - index * 10,
      url: enrichProjectUrl(p.name!.trim()),
    }));

  const relevantExperience = (payload.relevantExperience ?? [])
    .filter((e) => e.title && e.company)
    .slice(0, 4)
    .map((e, index) => ({
      title: e.title!.trim(),
      company: e.company!.trim(),
      relevance: 100 - index * 10,
    }));

  return {
    matchPercent: clampPercent(payload.matchPercent),
    matchedSkills: asStringArray(payload.matchedSkills),
    missingSkills: asStringArray(payload.missingSkills),
    relevantProjects,
    relevantExperience,
    roleFit,
    summary: typeof payload.summary === "string" ? payload.summary.trim() : "",
    source: "ai",
  };
}

/** Offline fallback when AI is unavailable */
export function analyzeJobDescriptionFallback(rawJd: string): MatchResult {
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
      source: "fallback",
    };
  }

  const jdSkills: string[] = [];
  for (const skill of jobMatchProfile.skills) {
    if (skill.keywords.some((k) => jd.includes(k))) jdSkills.push(skill.name);
  }

  const candidateSkills = new Set<string>(jobMatchProfile.skills.map((s) => s.name));
  const matchedSkills = jdSkills.filter((s) => candidateSkills.has(s));
  const missingSkills = jdSkills.filter((s) => !candidateSkills.has(s));

  const projectResults = projects
    .map((project) => {
      let score = 0;
      for (const skill of project.skills) {
        if (jd.includes(skill)) score += 2;
      }
      return {
        name: project.name,
        relevance: score,
        reason: `${project.role === "qa" ? "QA" : project.role === "development" ? "Development" : "QA + Dev"} experience relevant to role requirements`,
        url: project.url,
      };
    })
    .filter((p) => p.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  const expResults = experience
    .map((item) => {
      const text = normalize([item.title, item.company, ...item.highlights].join(" "));
      let score = 0;
      for (const skill of jobMatchProfile.skills) {
        const jdHas = skill.keywords.some((k) => jd.includes(k));
        const expHas = skill.keywords.some((k) => text.includes(k));
        if (jdHas && expHas) score += 3;
      }
      if (item.current) score += 2;
      return { title: item.title, company: item.company, relevance: score };
    })
    .filter((e) => e.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  const skillScore = jdSkills.length > 0 ? (matchedSkills.length / jdSkills.length) * 60 : 25;
  const matchPercent = Math.min(90, Math.round(skillScore + projectResults.length * 8 + expResults.length * 5));

  return {
    matchPercent,
    matchedSkills,
    missingSkills,
    relevantProjects: projectResults,
    relevantExperience: expResults,
    roleFit: "hybrid",
    summary: `Estimated match: ${matchPercent}%. Review matched skills and relevant experience below.`,
    source: "fallback",
  };
}
