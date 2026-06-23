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
        "glass-card-3d rounded-2xl p-6 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
