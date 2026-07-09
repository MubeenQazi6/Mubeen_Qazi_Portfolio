"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(containerRef.current, { autoAlpha: 1 });
      return;
    }

    gsap.fromTo(
      containerRef.current,
      {
        autoAlpha: 0,
        y: 40,
        z: -100,
        rotationX: -15,
      },
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        rotationX: 0,
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse", // Optional: reverse on scroll up
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={cn("will-change-transform", className)}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
