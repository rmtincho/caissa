import Image from "next/image";
import { Container } from "./primitives";
import { ArrowUpRight } from "./icons";
import { TIENDA_URL } from "@/lib/links";

type Cat = {
  title: string;
  sub: string;
  img: string;
  alt: string;
  area: string;
  size: "lg" | "xl" | "md";
};

const CATS: Cat[] = [
  {
    title: "Agendas",
    sub: "Diarias, semanales y mensuales",
    img: "/images/cat-agendas.jpg",
    alt: "Agenda diaria abierta mostrando su interior",
    area: "lg:col-span-2 lg:row-start-1",
    size: "lg",
  },
  {
    title: "Botellas",
    sub: "Acero inoxidable 650ml",
    img: "/images/cat-botellas.jpg",
    alt: "Botella térmica de acero inoxidable negra",
    area: "lg:col-start-3 lg:row-span-2",
    size: "xl",
  },
  {
    title: "Calendarios",
    sub: "Para pared y escritorio",
    img: "/images/cat-calendarios.jpg",
    alt: "Calendario de pared con fotografía de paisaje",
    area: "lg:col-start-1 lg:row-start-2",
    size: "md",
  },
  {
    title: "Cuadernos",
    sub: "Tapa dura y flexible",
    img: "/images/cat-cuadernos.jpg",
    alt: "Cuadernos de tapa dura apilados",
    area: "lg:col-start-2 lg:row-start-2",
    size: "md",
  },
];

const TITLE_SIZE: Record<Cat["size"], string> = {
  xl: "text-xl md:text-2xl",
  lg: "text-lg md:text-xl",
  md: "text-base md:text-lg",
};

export function Categorias() {
  return (
    <section id="categorias" className="py-20 md:py-28">
      <Container>
        <header className="max-w-2xl">
          <span data-reveal="up" className="font-mono-label text-fg-40">
            02 — Categorías
          </span>
          <h2
            data-reveal="up"
            className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
          >
            Explorá por categoría.
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1.3fr_1.3fr_1fr] lg:[grid-template-rows:clamp(320px,27vw,420px)_clamp(220px,18.5vw,288px)]">
          {CATS.map((c, i) => (
            <a
              key={c.title}
              href={TIENDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal="scale"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className={`group relative isolate flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-6 text-white ${c.area} ${
                c.size === "xl" ? "min-h-[320px]" : ""
              }`}
            >
              <Image
                src={c.img}
                alt={c.alt}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="-z-20 object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black" />

              <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white opacity-0 transition-all duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />

              <h3
                className={`font-display font-bold uppercase tracking-[0.06em] ${TITLE_SIZE[c.size]}`}
              >
                {c.title}
              </h3>
              <p className="mt-1 text-xs text-white/60">{c.sub}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
