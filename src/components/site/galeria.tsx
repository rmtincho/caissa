import Image from "next/image"
import { Container } from "./primitives"

const WORKS = [
  { src: "/images/works/work-1.jpg", alt: "Trabajo personalizado Caissa — muestra 1" },
  { src: "/images/works/work-2.jpg", alt: "Trabajo personalizado Caissa — muestra 2" },
  { src: "/images/works/work-3.jpg", alt: "Trabajo personalizado Caissa — muestra 3" },
  { src: "/images/works/work-4.jpg", alt: "Trabajo personalizado Caissa — muestra 4" },
]

export function Galeria() {
  return (
    <section id="galeria" className="py-20 md:py-28">
      <Container>
        <header className="max-w-3xl">
          <span data-reveal="up" className="font-mono-label text-fg-40">
            04 — Galería
          </span>
          <h2
            data-reveal="up"
            className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
          >
            Trabajos que hablan por sí solos
          </h2>
          <p
            data-reveal="up"
            className="mt-5 text-base text-fg-60 [--reveal-delay:160ms]"
          >
            Una muestra de personalizaciones, kits corporativos y líneas
            propias.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {WORKS.map((work, i) => (
            <figure
              key={work.src}
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="group relative isolate aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-fg-05"
            >
              <Image
                src={work.src}
                alt={work.alt}
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
