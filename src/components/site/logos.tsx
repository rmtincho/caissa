import Image from "next/image"
import { Container } from "./primitives"

const LOGOS = [
  { src: "/images/carousel-logos/caissa-arcor.svg", alt: "Arcor" },
  { src: "/images/carousel-logos/caissa-avon.svg", alt: "Avon" },
  { src: "/images/carousel-logos/caissa-bayer.svg", alt: "Bayer" },
  { src: "/images/carousel-logos/caissa-cruz.svg", alt: "Cruz" },
  { src: "/images/carousel-logos/caissa-eeuu.svg", alt: "Embajada EEUU" },
  {
    src: "/images/carousel-logos/caissa-escribanos.svg",
    alt: "Colegio de Escribanos",
  },
  { src: "/images/carousel-logos/caissa-galeno.svg", alt: "Galeno" },
  { src: "/images/carousel-logos/caissa-lomas.svg", alt: "Municipio de Lomas" },
  { src: "/images/carousel-logos/caissa-merck.svg", alt: "Merck" },
  { src: "/images/carousel-logos/caissa-pozo.svg", alt: "Pozo de Tigre" },
  { src: "/images/carousel-logos/caissa-toyota.svg", alt: "Toyota" },
]

export function Logos() {
  return (
    <section className="pt-4 pb-20 md:pt-6 md:pb-28">
      <Container>
        <p data-reveal="up" className="text-center font-mono-label text-fg-80">
          Confían en nosotros
        </p>
      </Container>

      <div data-reveal="up" className="mt-10 [--reveal-delay:120ms]">
        <div className="relative w-full max-w-full overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="marquee-track-fast flex w-max items-center gap-12 pr-12 md:gap-20 md:pr-20">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex h-14 shrink-0 items-center"
                aria-hidden={i >= LOGOS.length}
              >
                <Image
                  src={logo.src}
                  alt={i < LOGOS.length ? logo.alt : ""}
                  width={160}
                  height={54}
                  className="h-11 w-auto object-contain invert opacity-80 transition-opacity duration-300 hover:opacity-100 md:h-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}