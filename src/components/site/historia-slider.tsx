"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/taller.jpg",
    alt: "Interior del taller de fabricación Caissa — Buenos Aires",
  },
  {
    src: "/images/gal-fedra.jpg",
    alt: "Línea Fedra — Agendas Caissa personalizables 2025",
  },
  {
    src: "/images/gal-kit.jpg",
    alt: "Kit corporativo personalizado Caissa con logo de empresa",
  },
  {
    src: "/images/gal-botellas.jpg",
    alt: "Caissa Botellas Blacksteel de acero inoxidable personalizables",
  },
  {
    src: "/images/hero-agenda.jpg",
    alt: "Agenda Caissa abierta sobre escritorio de madera",
  },
];

export function HistoriaSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % SLIDES.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Imagen ${i + 1}`}
            className={`h-1.5 rounded-full bg-white transition-all duration-300 ease-[var(--ease-out-quart)] ${
              i === current ? "w-5 opacity-100" : "w-1.5 opacity-40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
