import Image from "next/image"
import { Container } from "./primitives"
import { ArgentinaFlag } from "./icons"
import { Canales } from "./canales"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-black text-white sm:justify-end"
    >
      {/* Background photograph */}
      <div className="absolute inset-0 z-0">
        <div className="hero-kenburns absolute inset-0">
          {/*
          <Image
            src="/images/hero-image.jpg"
            alt="Agendas Caissa sobre una superficie de madera"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
           */}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 from-[2%] via-black/40 via-50% to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/45 to-transparent" />
      </div>

      <Container className="relative z-10 pt-24 pb-6 sm:pt-28 sm:pb-16 md:pb-20 md:pt-32">
        {/* Eyebrow badge */}
        
        {/* Display heading */}
        <h1 className="mt-3 font-display text-[clamp(2.25rem,8.5vw,7rem)] font-extrabold leading-[1.0] tracking-[-0.02em] text-white sm:mt-6 sm:text-[clamp(2.75rem,9vw,7rem)]">
          <span className="hero-rise block text-[0.5em] sm:text-[0.4em] [animation-delay:200ms]">
            LANZAMIENTO AGENDAS Y CALENDARIOS 2027
          </span>
          <span className="hero-rise mt-1 flex items-center gap-[0.35em] font-medium text-[0.3em] text-white/70 sm:mt-4 sm:text-[0.3em] [animation-delay:440ms]">
            Fabricantes desde 1977
            <ArgentinaFlag className="h-[0.45em] w-auto shrink-0 rounded-sm" />
            <span className="sr-only">Argentina</span>
          </span>
        </h1>
        <header className="mt-6 max-w-2xl sm:mt-30">
          <span data-reveal="up" className="font-mono-label text-fg-40 is-visible">
            01 — Canales
          </span>
          <h2
            data-reveal="up"
            className="mt-2 font-display text-[clamp(1.25rem,3vw,2.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance [--reveal-delay:80ms] is-visible sm:mt-5"
          >
            Nuestros canales de venta
          </h2>
        </header>
        <Canales />
      </Container>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden h-12 w-px overflow-hidden md:block">
        <span className="scroll-cue block h-full w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}