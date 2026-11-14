import Image from "next/image";
import { Container } from "./primitives";
import { getPortfolioGroups } from "@/lib/store-products";

export async function Portfolio() {
  const groups = await getPortfolioGroups();

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <Container>
        <header className="max-w-3xl">
          <span data-reveal="up" className="font-mono-label text-fg-40">
            05 — Portfolio
          </span>
          <h2
            data-reveal="up"
            className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
          >
            Productos Caissa
          </h2>
        </header>

        {groups.length ? (
          <>
            <nav
              aria-label="Categorías del portfolio"
              className="mt-8 flex flex-wrap gap-2"
            >
              {groups.map((group) => (
                <a
                  key={group.slug}
                  href={`#portfolio-${group.slug}`}
                  className="rounded-full border border-line px-4 py-2 text-sm text-fg-70 transition-colors hover:border-fg-40 hover:text-fg"
                >
                  {group.name}
                </a>
              ))}
            </nav>

            {groups.map((group) => (
              <section
                key={group.slug}
                id={`portfolio-${group.slug}`}
                className="mt-14 scroll-mt-28 first:mt-12 md:mt-20"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {group.name}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-8">
                  {group.products.map((product, index) => {
                    const image = product.images?.[0];
                    const imageSrc = image?.thumbnail ?? image?.src;

                    return (
                      <article
                        key={product.id}
                        data-reveal="up"
                        style={{ ["--reveal-delay" as string]: `${(index % 4) * 70}ms` }}
                        className="min-w-0"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt={image?.alt || product.name}
                              fill
                              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                              className="object-contain p-3 transition-transform duration-700 ease-[var(--ease-out-quart)] hover:scale-[1.03] sm:p-5"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-black/45">
                              Imagen no disponible
                            </div>
                          )}
                        </div>
                        <h4 className="mt-3 text-sm font-semibold leading-snug text-fg sm:mt-4 sm:text-base">
                          {product.name}
                        </h4>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        ) : (
          <p className="mt-8 text-sm text-fg-60">
            El catálogo de productos no está disponible en este momento.
          </p>
        )}
      </Container>
    </section>
  );
}
