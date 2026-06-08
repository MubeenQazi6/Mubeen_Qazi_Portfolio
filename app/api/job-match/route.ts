import { buildCandidateContext } from "@/lib/candidateContext";
import { analyzeJobDescriptionFallback, parseAiMatchResult } from "@/lib/jobMatch";
import { NextResponse } from "next/server";

const MAX_JD_LENGTH = 12_000;

const SYSTEM_PROMPT = `You are an expert technical recruiter and hiring analyst. Your job is to compare a job description against a candidate's real profile and produce an honest, recruiter-friendly match analysis.

RULES:
1. Only use facts from the candidate profile provided — never invent skills, projects, or experience.
2. matchPercent must be realistic and evidence-based (not inflated).
3. matchedSkills: skills the candidate clearly has that the JD requires or prefers.
4. missingSkills: important JD requirements the candidate lacks or has limited exposure to.
5. relevantProjects: pick from the candidate's listed projects only; explain WHY each is relevant to this specific JD.
6. relevantExperience: pick from listed roles only; most relevant first.
7. roleFit: "qa" if JD is primarily testing/QA, "development" if primarily dev/engineering, "hybrid" if both or unclear.
8. summary: 2-3 sentences a recruiter can read quickly — professional, specific, honest.

Respond with ONLY valid JSON in this exact shape:
{
  "matchPercent": <number 0-100>,
  "matchedSkills": [<string>],
  "missingSkills": [<string>],
  "relevantProjects": [{ "name": <string>, "reason": <string> }],
  "relevantExperience": [{ "title": <string>, "company": <string> }],
  "roleFit": "qa" | "development" | "hybrid",
  "summary": <string>
}`;

export async function POST(request: Request) {
  let body: { jobDescription?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const jobDescription = body.jobDescription?.trim() ?? "";

  if (jobDescription.length < 30) {
    return NextResponse.json(
      { error: "Please provide a longer job description (at least 30 characters)." },
      { status: 400 },
    );
  }

  if (jobDescription.length > MAX_JD_LENGTH) {
    return NextResponse.json(
      { error: `Job description is too long (max ${MAX_JD_LENGTH} characters).` },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallback = analyzeJobDescriptionFallback(jobDescription);
    return NextResponse.json(fallback);
  }

  const candidateContext = buildCandidateContext();

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `CANDIDATE PROFILE:\n${candidateContext}\n\n---\n\nJOB DESCRIPTION:\n${jobDescription}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      const fallback = analyzeJobDescriptionFallback(jobDescription);
      return NextResponse.json(fallback);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content || typeof content !== "string") {
      throw new Error("Empty AI response");
    }

    const parsed = JSON.parse(content) as Record<string, unknown>;
    const result = parseAiMatchResult(parsed);

    if (!result.summary) {
      result.summary = `Match score: ${result.matchPercent}%. Review matched skills and projects below.`;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Job match error:", error);
    const fallback = analyzeJobDescriptionFallback(jobDescription);
    return NextResponse.json(fallback);
  }
}
