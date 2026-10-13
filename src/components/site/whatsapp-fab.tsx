import { WhatsApp } from "./icons"

export function WhatsappFab() {
  return (
    <a
      href="https://wa.me/5491130161508"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-4 right-4 z-40 grid h-16 w-16 place-items-center rounded-full bg-black shadow-lg shadow-black/40 ring-1 ring-white/10 transition-[background-color,box-shadow] duration-300 ease-[var(--ease-out-quart)] hover:bg-neutral-800 hover:shadow-xl md:bottom-8 md:right-8 md:h-[4.5rem] md:w-[4.5rem]"
    >
      <WhatsApp className="h-1/2 w-1/2" />
    </a>
  )
}
