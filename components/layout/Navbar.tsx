"use client";

import { navLinks, personal } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const primaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90";

const secondaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-white/10";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/70 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8"
      >
        <Link
          href="#home"
          className="group relative flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          {/* Gradient border glow container */}
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-[#8b5cf6] to-accent shadow-lg shadow-accent/20 transition-shadow duration-300 group-hover:shadow-accent/40">
            <span className="font-display text-lg font-bold tracking-tight text-background">
              MQ
            </span>
          </span>
          <span className="hidden font-display text-sm font-medium tracking-wide text-muted transition-colors group-hover:text-foreground sm:block">
            Mubeen<span className="text-accent">.</span>Qazi
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href={personal.resumePath} download className={secondaryLinkClass}>
            Download Resume
          </Link>
          <Link href="#contact" className={primaryLinkClass}>
            Contact Me
          </Link>
        </div>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "block h-0.5 w-5 bg-foreground transition-all duration-300",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-foreground transition-all duration-300",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 bg-foreground transition-all duration-300",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pt-24 backdrop-blur-xl transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-2xl font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3">
          <Link
            href={personal.resumePath}
            download
            onClick={() => setOpen(false)}
            className={secondaryLinkClass}
          >
            Download Resume
          </Link>
          <Link href="#contact" onClick={() => setOpen(false)} className={primaryLinkClass}>
            Contact Me
          </Link>
        </div>
      </div>
    </header>
  );
}
