"use client";

import { navLinks, personal } from "@/content/portfolio";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent via-[#4f46e5] to-accent">
            <span className="font-display text-xs font-bold text-background">MQ</span>
          </span>
          <p className="text-sm text-muted">
            © {year} {personal.name}. All rights reserved.
          </p>
        </div>
        <ul className="flex flex-wrap gap-6">
          {navLinks.slice(1).map((link) => (
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
      </div>
    </footer>
  );
}
