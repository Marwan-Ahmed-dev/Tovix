"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group hud-sm inline-flex items-center gap-2 text-[var(--muted-dim)] transition-colors hover:text-[var(--ink)]"
    >
      Back to signal
      <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
    </button>
  );
}

export default BackToTop;
