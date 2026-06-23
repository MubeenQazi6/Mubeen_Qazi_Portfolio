"use client";

import { navLinks, personal } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const primaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent/90";

const secondaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-white/10";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollYRef = useRef(0);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMenu]);

  // iOS-safe scroll lock — prevents stuck scroll after menu closes
  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
    const { style } = document.body;

    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "border-b border-accent/30 bg-background/80 shadow-[0_4px_30px_rgba(34,197,94,0.15)] backdrop-blur-xl"
            : "bg-background/20 backdrop-blur-md md:bg-transparent md:backdrop-blur-none",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8"
        >
          <Link
            href="#home"
            className="group relative z-50 flex items-center gap-2"
            onClick={closeMenu}
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent via-[#3b82f6] to-[#8b5cf6] shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]">
              <span className="font-display text-lg font-bold tracking-tight text-background">
                MQ
              </span>
            </span>
            <span className="hidden font-display text-sm font-medium tracking-wide text-muted transition-colors group-hover:text-foreground sm:block">
              Mubeen <span className="text-accent">Qazi</span>
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
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-background/50 md:hidden"
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
      </header>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={closeMenu}
          />

          <div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex animate-[menuSlideIn_0.25s_ease-out] flex-col border-t border-white/10 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
              <ul className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block font-display text-2xl font-medium text-foreground"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 pb-6">
                <Link
                  href={personal.resumePath}
                  download
                  onClick={closeMenu}
                  className={secondaryLinkClass}
                >
                  Download Resume
                </Link>
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className={primaryLinkClass}
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
