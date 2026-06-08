"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/content/portfolio";

export function Skills() {
  const [currentTest, setCurrentTest] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const testSuite = useMemo(() => {
    return [
      { name: "Initializing QA Environment...", duration: 25 },
      { name: "Connecting to Laravel Backend...", duration: 42 },
      ...skillGroups.flatMap(group => 
        group.skills.map(skill => ({
          name: `Validating ${skill}`,
          duration: Math.floor(Math.random() * 40) + 10,
        }))
      ),
      { name: "Generating Final Report...", duration: 60 }
    ];
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    if (currentTest < testSuite.length) {
      const timer = setTimeout(() => {
        setCurrentTest((prev) => prev + 1);
      }, testSuite[currentTest].duration * 4 + 50);
      return () => clearTimeout(timer);
    }
  }, [currentTest, isVisible, testSuite]);

  // Auto-scroll terminal to bottom
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentTest]);

  return (
    <section
      id="skills"
      aria-labelledby="skills-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8" ref={sectionRef}>
        <SectionHeader
          id="skills"
          label="Skill Test Pipeline"
          title="CI/CD Automated Execution"
          description="A live demonstration of my skills, running as an automated test suite."
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="ml-2 font-mono text-xs text-muted">pipeline-execution.sh — bash</span>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="h-[350px] overflow-y-auto p-4 font-mono text-xs leading-relaxed md:h-[450px] md:p-6 md:text-sm"
            >
              <div className="flex flex-col gap-1.5">
                <div className="mb-4 text-accent/80">
                  $ ./run-skills-validation.sh --target=mubeen-profile
                </div>
                
                {testSuite.slice(0, currentTest).map((test, i) => (
                  <div key={i} className="flex flex-wrap items-start gap-2">
                    <span className="shrink-0 text-emerald-400">[PASS] ✔️</span>
                    <span className="text-foreground/80">{test.name}</span>
                    <span className="text-muted/60">({test.duration}ms)</span>
                  </div>
                ))}

                {currentTest < testSuite.length && isVisible && (
                  <div className="flex items-center gap-2 text-muted">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
                    Running {testSuite[currentTest].name}...
                  </div>
                )}

                {currentTest === testSuite.length && (
                  <div className="mt-6 animate-[heroFadeUp_0.5s_ease-out_both] rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        🚀
                      </span>
                      <div>
                        <h4 className="font-semibold text-emerald-400">All {testSuite.length}/{testSuite.length} Skill Tests Passed</h4>
                        <p className="mt-1 text-xs text-emerald-400/70">Profile is stable and ready for deployment to your engineering team.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
