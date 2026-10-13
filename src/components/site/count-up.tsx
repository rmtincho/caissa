"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `end` once the element scrolls into view. */
export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1400,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let started = false;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      raf = requestAnimationFrame(() => setValue(end));
      return () => cancelAnimationFrame(raf);
    }

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const run = (start: number) => (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutExpo(t) * end));
      if (t < 1) raf = requestAnimationFrame(run(start));
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          raf = requestAnimationFrame((now) => run(now)(now));
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [end, duration]);

  return (
    <span
      ref={ref}
      className={`relative inline-block tabular-nums ${className}`}
    >
      {/* Ghost reserves the final width so neighbours never shift mid-count. */}
      <span aria-hidden className="invisible">
        {prefix}
        {end}
        {suffix}
      </span>
      <span aria-hidden className="absolute left-0 top-0">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {end}
        {suffix}
      </span>
    </span>
  );
}
