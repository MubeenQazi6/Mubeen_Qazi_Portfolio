"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { analyzeJobDescription, type MatchResult } from "@/lib/jobMatch";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

function MatchRing({ percent }: { percent: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const color =
    percent >= 75 ? "text-emerald-400" : percent >= 50 ? "text-accent" : "text-amber-400";

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-700", color)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display text-3xl font-bold", color)}>{percent}%</span>
        <span className="text-xs text-muted">Match</span>
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: MatchResult }) {
  if (result.matchPercent === 0 && result.matchedSkills.length === 0) {
    return (
      <p className="text-center text-muted">{result.summary}</p>
    );
  }

  return (
    <div className="space-y-6">
      <MatchRing percent={result.matchPercent} />
      <p className="text-center text-sm leading-relaxed text-muted">{result.summary}</p>

      {result.matchedSkills.length > 0 ? (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Matching skills</h4>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {result.missingSkills.length > 0 ? (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Skills to discuss</h4>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {result.relevantProjects.length > 0 ? (
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Relevant projects</h4>
          <ul className="space-y-3">
            {result.relevantProjects.map((project) => (
              <li
                key={project.name}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
              >
                {project.url ? (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {project.name} ↗
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{project.name}</span>
                )}
                <p className="mt-1 text-muted">{project.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {result.relevantExperience.length > 0 ? (
        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Relevant experience</h4>
          <ul className="space-y-2 text-sm text-muted">
            {result.relevantExperience.map((exp) => (
              <li key={`${exp.company}-${exp.title}`}>
                <span className="text-foreground">{exp.title}</span> — {exp.company}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function JobMatchBot() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  function handleAnalyze() {
    setResult(analyzeJobDescription(jd));
    setAnalyzed(true);
  }

  return (
    <section
      id="job-match"
      aria-labelledby="job-match-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="job-match"
          label="AI Job Match"
          title="How well do I fit your role?"
          description="Paste a job description below. The bot compares it against my skills, projects, and experience — instantly."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard>
              <label htmlFor="job-description" className="mb-2 block text-sm font-medium text-foreground">
                Job description
              </label>
              <textarea
                id="job-description"
                value={jd}
                onChange={(e) => {
                  setJd(e.target.value);
                  setAnalyzed(false);
                }}
                rows={14}
                className="input-field resize-y font-mono text-sm leading-relaxed"
                placeholder="Paste the full job description here — required skills, responsibilities, tools, domain (fintech, government, Laravel, QA, etc.)..."
              />
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={jd.trim().length < 30}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:opacity-50"
              >
                Analyze Match
              </button>
              <p className="mt-3 text-xs text-muted">
                Runs locally in your browser — no data is sent to any server.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full min-h-[320px]">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Match analysis
              </h3>
              {!analyzed || !result ? (
                <div className="mt-8 flex flex-col items-center justify-center text-center text-muted">
                  <span className="mb-4 text-4xl opacity-40" aria-hidden>
                    🤖
                  </span>
                  <p className="max-w-xs text-sm">
                    Paste a job description and click Analyze Match to see compatibility,
                    matching skills, and relevant projects.
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <ResultPanel result={result} />
                </div>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
