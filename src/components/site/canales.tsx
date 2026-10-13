import Image from "next/image"
import { Container } from "./primitives"
import { ArrowUpRight } from "./icons"
import { EMPRESAS_URL, TIENDA_URL, WHATSAPP_URL } from "@/lib/links"

const CANALES = [
  {
    n: "01",
    title: "Compro para mí",
    body: "Agendas, calendarios y cuadernos con envío a todo el país",
    cta: "Comprar ahora",
    href: TIENDA_URL,
    img: "/images/canales/canal-meli-sm-a.jpg",
    alt: "Productos Caissa listos para la venta online",
    external: true,
  },
  {
    n: "02",
    title: "Venta a empresas (B2B)",
    body: "Personalizamos productos con tu logo para regalos corporativos y merch.",
    cta: "Ver precios",
    href: EMPRESAS_URL,
    img: "/images/canales/canal-empresas.jpg",
    alt: "Kit corporativo personalizado con la marca del cliente",
    external: true,
  },
  {
    n: "03",
    title: "Quiero ser revendedor",
    body: "Precios de fábrica, stock permanente y catálogo actualizado. Ideal para empresas, librerías, papelerías y bazar.",
    cta: "Hablemos",
    href: WHATSAPP_URL,
    img: "/images/canales/canal-revendedores.jpg",
    alt: "Revendedor revisando catálogo mayorista de Caissa",
    external: true,
  },
]

export function Canales() {
  return (
    <section id="canales" className="py-0 md:py-0">
      {/*
      <Container>
        <header>
          <span data-reveal="up" className="font-mono-label text-fg-40">
            01 — Canales
          </span>
          <h2
            data-reveal="up"
            className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
          >
            Tres canales, una misma calidad
          </h2>
          <p
            data-reveal="up"
            className="mt-5 max-w-xl text-base leading-relaxed text-fg-60 text-pretty [--reveal-delay:160ms]"
          >
            Llegamos a empresas, comercios y consumidores finales con el mismo
            estándar de fabricación y la posibilidad de personalizar con tu
            marca.
          </p>
        </header>
      </Container>
      */}
     <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {CANALES.map((c, i) => (
          <a
            key={c.n}
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            data-reveal="up"
            style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
            className="canal-card group relative isolate flex min-h-[150px] flex-col justify-end overflow-hidden rounded-2xl p-6 text-white [-webkit-tap-highlight-color:transparent] outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:min-h-[280px] md:p-10"
          >
            <Image
              src={c.img}
              alt={c.alt}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="-z-20 rounded-2xl object-cover transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-t from-black via-black/55 to-black/10 transition-opacity duration-500 group-hover:from-black group-hover:via-black/40" />

            
            <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.01em] md:mt-3 md:text-[1.75rem]">
              {c.title}
            </h3>
            <p className="mt-2 max-w-[20rem] text-sm leading-snug text-white/70 md:mt-3 md:leading-relaxed">
              {c.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white md:mt-6">
              {c.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}