"use client";

import { personal } from "@/content/portfolio";
import Link from "next/link";

const tags = personal.subtitle.split("|").map((t) => t.trim());

const primaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90";

const secondaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-white/10";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:px-8 md:pb-28">
        <p className="hero-animate mb-4 text-sm font-medium uppercase tracking-[0.25em] text-accent">
          {personal.location}
        </p>

        <h1
          id="hero-heading"
          className="hero-animate hero-animate-delay-1 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {personal.name}
        </h1>

        <p className="hero-animate hero-animate-delay-2 mt-4 font-display text-xl font-semibold text-foreground/90 sm:text-2xl md:text-3xl">
          {personal.role}
        </p>

        <div className="hero-animate hero-animate-delay-3 mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="hero-animate hero-animate-delay-3 mt-8 max-w-xl text-lg text-muted">
          Building quality into fintech and government systems through API,
          performance, and functional testing — with a strong foundation in
          Laravel and modern web development.
        </p>

        <div className="hero-animate hero-animate-delay-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="#projects" className={primaryLinkClass}>
            View Projects
          </Link>
          <Link href="#contact" className={secondaryLinkClass}>
            Contact Me
          </Link>
          <Link
            href={personal.resumePath}
            download
            className="inline-flex min-h-11 items-center justify-center px-6 py-2.5 text-sm text-muted hover:text-foreground"
          >
            Download Resume ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
