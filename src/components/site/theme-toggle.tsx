"use client";

import { useTheme } from "next-themes";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Cambiar entre tema claro y oscuro"
      title="Cambiar tema"
      className={`relative grid h-9 w-9 place-items-center rounded-full border border-current/25 text-current transition-colors duration-300 ease-[var(--ease-out-quart)] hover:border-current/60 ${className}`}
    >
      {/* Sun — shown in dark mode (tap for light). Hidden once `.light` is set. */}
      <svg
        viewBox="0 0 24 24"
        className="absolute h-[18px] w-[18px] rotate-0 scale-100 opacity-100 transition-all duration-500 ease-[var(--ease-out-expo)] light:-rotate-90 light:scale-0 light:opacity-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon — shown in light mode (tap for dark). */}
      <svg
        viewBox="0 0 24 24"
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] light:rotate-0 light:scale-100 light:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
