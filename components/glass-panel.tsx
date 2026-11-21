import type { HTMLAttributes } from "react";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  intensity?: "soft" | "strong";
};

export default function GlassPanel({ className = "", intensity = "soft", ...props }: GlassPanelProps) {
  return <div
    className={`liquid-glass ${intensity === "strong" ? "liquid-glass-strong" : ""} ${className}`}
    {...props}
  />;
}
