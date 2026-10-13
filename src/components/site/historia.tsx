import { HistoriaSlider } from "./historia-slider";

export function Historia() {
  return (
    <section id="historia" className="relative">
      <div className="mx-auto grid max-w-[var(--shell)] items-stretch lg:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:py-32 lg:pl-20 lg:pr-16">
          <span data-reveal="up" className="font-mono-label text-fg-40">
            03 — Historia
          </span>
          <h2
            data-reveal="up"
            className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
          >
            Un taller. Tres generaciones.
          </h2>

          <div className="mt-7 flex max-w-xl flex-col gap-5">
            <p
              data-reveal="up"
              className="text-sm leading-relaxed text-fg-60 text-pretty [--reveal-delay:160ms]"
            >
             Somos una empresa familiar argentina que fabrica agendas, cuadernos y calendarios desde 1969. A lo largo de tres generaciones mantuvimos el mismo estándar de fabricación en cada producto. 
             Hoy llegamos a empresas, comercios y consumidores finales, con la posibilidad de personalizar cada pieza con tu marca.
            </p>
            
          </div>
        </div>

        {/* Full-bleed slider column */}
        <div
          data-reveal="right"
          className="relative min-h-[340px] overflow-hidden sm:min-h-[440px] lg:min-h-[560px]"
        >
          <HistoriaSlider />
          {/* Soft seam toward the text column */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-bg to-transparent lg:block" />
        </div>
      </div>
    </section>
  );
}
