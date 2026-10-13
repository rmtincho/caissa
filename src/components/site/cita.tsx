"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./primitives";

const WORDS = [
  "HECHO",
  "EN",
  "ARGENTINA.",
  "ECO",
  "CUERO.",
  "DISEÑO.",
  "IDENTIDAD.",
];

export function Cita() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setActive(true); observer.disconnect(); }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-hidden py-12 md:py-20">
      <Container className="max-md:px-3">
        <p
          ref={ref}
          className="font-display text-[clamp(2.25rem,11vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em] md:text-[clamp(2rem,4.5vw,3.75rem)] md:leading-[1.06] md:tracking-[-0.03em]"
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="mr-[0.15em] inline-block text-fg md:mr-[0.3em]"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "none" : "translateY(14px)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
                transitionDelay: active ? `${i * 55}ms` : "0ms",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
