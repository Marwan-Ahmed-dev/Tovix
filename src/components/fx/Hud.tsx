import type { ReactNode } from "react";

/**
 * HUD corner brackets — framing device used around hero and feature frames.
 */
export function HudCorners({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="bracket left-0 top-0 border-l border-t" />
      <span className="bracket right-0 top-0 border-r border-t" />
      <span className="bracket bottom-0 left-0 border-b border-l" />
      <span className="bracket bottom-0 right-0 border-b border-r" />
    </div>
  );
}

/**
 * The brand seam: a red half and a cyan half meeting in the middle.
 */
export function SignalBar({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`split-horizon ${className}`}>
      <span />
      <span />
    </div>
  );
}

type EyebrowProps = {
  children: ReactNode;
  tone?: "red" | "cyan" | "muted";
  className?: string;
  dot?: boolean;
};

export function Eyebrow({ children, tone = "muted", className = "", dot = true }: EyebrowProps) {
  const dotColor =
    tone === "red"
      ? "bg-[var(--red)] shadow-[0_0_10px_rgba(255,26,51,0.9)]"
      : tone === "cyan"
        ? "bg-[var(--cyan)] shadow-[0_0_10px_rgba(0,229,255,0.9)]"
        : "bg-[var(--muted)]";

  const textColor =
    tone === "red"
      ? "text-[var(--red)]"
      : tone === "cyan"
        ? "text-[var(--cyan)]"
        : "text-[var(--muted)]";

  return (
    <p className={`hud flex items-center gap-2.5 ${textColor} ${className}`}>
      {dot ? <span className={`h-[6px] w-[6px] shrink-0 ${dotColor}`} /> : null}
      {children}
    </p>
  );
}
