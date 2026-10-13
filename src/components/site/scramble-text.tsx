"use client";

import { useEffect, useRef, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SKIP = new Set([" ", ".", ",", "—", "·", " "]);

function rand() {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

export function ScrambleText({
  text,
  className,
  speed = 30,
  stagger = 30,
  delay = 0,
}: {
  text: string;
  className?: string;
  /** ms per animation frame */
  speed?: number;
  /** ms between each character revealing */
  stagger?: number;
  /** ms before the animation starts after intersection */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [output, setOutput] = useState(text);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setActive(true);

        timeoutId = setTimeout(() => {
          const chars = text.split("");
          let frame = 0;

          intervalId = setInterval(() => {
            frame++;

            const next = chars.map((c, i) => {
              if (SKIP.has(c)) return c;
              const revealAt = Math.floor((i * stagger) / speed);
              return frame > revealAt + 5 ? c : rand();
            });

            setOutput(next.join(""));

            const done = chars.every((c, i) =>
              SKIP.has(c) ? true : frame > Math.floor((i * stagger) / speed) + 5
            );

            if (done) {
              setOutput(text);
              clearInterval(intervalId);
            }
          }, speed);
        }, delay);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, stagger, delay]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 0.2s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
