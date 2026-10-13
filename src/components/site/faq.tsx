"use client";

import { useState } from "react";
import { Container } from "./primitives";

const ITEMS = [
  {
    q: "¿Puedo personalizar los productos con el logo de mi empresa?",
    a: "Sí. Imprimimos o grabamos tu logo, colores y acabados en agendas, calendarios, cuadernos y botellas, y te enviamos una prueba antes de producir.",
  },
  {
    q: "¿Cuál es la cantidad mínima de pedido?",
    a: "Trabajamos con mínimos según el artículo. Escribinos y te pasamos el mínimo y la lista de precios mayorista actualizada.",
  },
  {
    q: "¿Cuánto demoran la producción y la entrega?",
    a: "Depende del producto y la cantidad. En promedio, entre 10 y 20 días hábiles desde que aprobás la prueba.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí. Coordinamos envíos a empresas, comercios y domicilios particulares en toda la Argentina.",
  },
  {
    q: "¿Tengo que ser revendedor para comprar?",
    a: "No. Vendemos por tres canales: revendedores (mayorista), tienda online (minorista) y venta a empresas. Elegís el que mejor se adapte a vos.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Transferencia bancaria, tarjetas y otros medios de pago según el canal de compra.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="bg-bg py-20 text-fg md:py-28"
    >
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <span
            data-reveal="up"
            className="font-mono-label text-fg/40"
          >
            05 — FAQ
          </span>
          <h2
            data-reveal="up"
            className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
          >
            Preguntas frecuentes
          </h2>
        </header>

        <div
          data-reveal="up"
          className="mx-auto mt-12 max-w-5xl [--reveal-delay:120ms]"
        >
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="border-b border-fg/10 first:border-t"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span
                      className={`text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl ${
                        isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative flex h-6 w-6 flex-none items-center justify-center text-fg/50 transition-transform duration-[400ms] ease-[var(--ease-out-expo)] group-hover:text-fg ${
                        isOpen ? "rotate-[135deg]" : ""
                      }`}
                    >
                      <span className="absolute h-px w-4 bg-current" />
                      <span className="absolute h-4 w-px bg-current" />
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-7 text-base leading-relaxed text-fg/55 text-pretty">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
