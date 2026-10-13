import Image from "next/image";
import { Container } from "./primitives";
import { NewsletterForm } from "./newsletter-form";
import { EMPRESAS_URL, TIENDA_URL, WHATSAPP_URL } from "@/lib/links";

const COLUMNS = [
  {
    title: "Productos",
    links: [
      { label: "Agendas", href: "#categorias" },
      { label: "Calendarios", href: "#categorias" },
      { label: "Cuadernos", href: "#categorias" },
      { label: "Botellas", href: "#categorias" },
    ],
  },
  {
    title: "Canales",
    links: [
      { label: "Tienda online", href: TIENDA_URL, external: true },
      { label: "Venta a empresas", href: EMPRESAS_URL, external: true },
      { label: "Revendedores", href: WHATSAPP_URL, external: true },
    ],
  },
  {
    title: "Caissa",
    links: [
      { label: "Historia", href: "#historia" },
      { label: "Galería", href: "#galeria" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="pt-16 pb-8 md:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          {/* Brand */}
          <div className="max-w-sm">
            <span className="font-display text-2xl font-bold lowercase tracking-tight">
              caissa
            </span>
            <p className="mt-4 text-sm leading-relaxed text-fg-80">
              Agendas, calendarios y cuadernos personalizables. Fabricamos en
              Argentina desde 1977.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="font-mono-label text-fg-40">Newsletter</p>
              <NewsletterForm />
            </div>

            {/* Legal badges */}
            <div className="mt-8 flex items-end gap-6">
              <figure className="flex flex-col items-center gap-2">
                <Image
                  src="/images/footer/data-fiscal.webp"
                  alt="Data Fiscal AFIP"
                  width={72}
                  height={72}
                  className="rounded-md bg-white p-1"
                />
                <figcaption className="font-mono-label text-[0.5rem] tracking-[0.15em] text-fg-40">
                  Data Fiscal
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center gap-2">
                <Image
                  src="/images/footer/footer-cace.png"
                  alt="CACE — Cámara Argentina de Comercio Electrónico"
                  width={80}
                  height={72}
                  className="h-[72px] w-auto object-contain"
                />
                <figcaption className="font-mono-label text-[0.5rem] tracking-[0.15em] text-fg-40">
                  Miembro CACE
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:gap-x-20">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-mono-label text-fg-60">{col.title}</h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={"external" in link && link.external ? "_blank" : undefined}
                        rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                        className="group relative inline-block text-sm text-fg-80 transition-colors duration-300 hover:text-fg"
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-fg transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-x-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-line pt-8 font-mono text-[0.7rem] tracking-wider text-fg-50">
          <p>© 2026 AGENCAISSA S.A. — Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
