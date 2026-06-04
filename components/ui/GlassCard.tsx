import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
