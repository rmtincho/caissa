import type { ReactNode } from "react";

/** Page shell: 1920px max with the Figma 80px gutter, scaled down responsively. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--shell)] px-3 sm:px-8 md:px-12 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}

/** Monospaced uppercase eyebrow, e.g. "01 — Canales". */
export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono-label text-fg-40 ${className}`}>
      {children}
    </span>
  );
}
