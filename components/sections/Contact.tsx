"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { personal } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { type FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!formEndpoint) {
      setStatus("error");
      setErrorMessage(
        "Form endpoint is not configured. Add NEXT_PUBLIC_FORM_ENDPOINT to .env.local.",
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-label"
      className="section-padding"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          id="contact"
          label="Contact"
          title="Let's connect"
          description="Have a role, project, or collaboration in mind? Send a message."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                />

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="input-field resize-y"
                    placeholder="Tell me about the opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-2.5 text-sm font-medium text-background transition-all hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" ? (
                  <p className="text-sm text-accent" role="status">
                    Thank you! Your message has been sent.
                  </p>
                ) : null}

                {status === "error" ? (
                  <p className="text-sm text-red-400" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <GlassCard className="h-full">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Direct contact
              </h3>
              <ul className="mt-6 space-y-4 text-muted">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-accent">
                    Email
                  </span>
                  <Link
                    href={`mailto:${personal.email}`}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {personal.email}
                  </Link>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-accent">
                    Phone
                  </span>
                  <Link
                    href={`tel:${personal.phone.replace(/\s/g, "")}`}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {personal.phone}
                  </Link>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-accent">
                    WhatsApp
                  </span>
                  <Link
                    href={personal.whatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    Chat on WhatsApp
                  </Link>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-accent">
                    LinkedIn
                  </span>
                  <Link
                    href={personal.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-foreground transition-colors hover:text-accent",
                    )}
                  >
                    Connect on LinkedIn
                  </Link>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-accent">
                    Location
                  </span>
                  <span className="text-foreground">{personal.location}</span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
