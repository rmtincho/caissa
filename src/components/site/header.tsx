"use client"

import { useEffect, useState, type ComponentType, type SVGProps } from "react"
import Image from "next/image"
import { MercadoLibre } from "./icons"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const WA =
  "https://wa.me/5491130161508?text=Quiero%20ser%20revendedor%20de%20Caissa"

type NavItem = {
  label: string
  href: string
  external: boolean
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
}

const NAV: NavItem[] = [
  {
    label: "01. Tienda online",
    href: "https://www.mercadolibre.com.ar/tienda/caissa",
    external: true,
    Icon: MercadoLibre,
  },
  {
    label: "02. Venta a empresas",
    href: "https://www.tienda.caissa.com.ar",
    external: true,
  },
  { label: "03. Revendedores", href: WA, external: true },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  const onHero = !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-out-quart)] ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      } ${onHero ? "text-white" : "text-fg"}`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--shell)] items-center px-5 sm:px-8 md:h-20 md:px-12 lg:px-20">
        {/* Logo — left */}
        <a
          href="#top"
          className="shrink-0 transition-opacity duration-300 hover:opacity-70 lg:w-44"
          aria-label="Caissa — inicio"
        >
          <Image
            src="/logo-caissa.svg"
            alt="Caissa"
            width={120}
            height={32}
            className="h-7 w-auto md:h-8 brightness-0 invert light:brightness-100 light:invert-0"
            priority
          />
        </a>

        {/* Center — desktop nav (always visible) */}
        <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              external={item.external}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right — CTAs (desktop) */}
     <div className="hidden items-center justify-end gap-3 lg:flex lg:w-44">
          <a
            href="#categorias"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-current/30 px-4 py-2.5 text-sm font-semibold leading-none transition-[border-color,opacity] duration-300 ease-[var(--ease-out-quart)] hover:border-current/60 hover:opacity-100"
          >
            <span className="-translate-y-0.5">Ver catálogo</span>
          </a>
          <a
            href="#contacto"
            className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold leading-none transition-opacity duration-300 ease-[var(--ease-out-quart)] hover:opacity-90 ${
              onHero ? "bg-white text-black" : "bg-fg text-bg"
            }`}
          >
            <span className="-translate-y-0.5">Contacto</span>
          </a>
        </div>

        {/* Mobile — hamburger only */}
        <div className="ml-auto flex items-center lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Abrir menú"
              className="relative flex size-10 items-center justify-center"
            >
              <span className="sr-only">Abrir menú</span>
              <span aria-hidden className="flex flex-col items-end gap-[5px]">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full gap-0 border-line bg-bg/95 p-0 text-fg backdrop-blur-2xl sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <SheetDescription className="sr-only">
                Enlaces de navegación principales
              </SheetDescription>

              <nav className="flex flex-col gap-1 px-6 pt-20 pb-8">
                {NAV.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 border-b border-line py-4 font-display text-3xl font-semibold tracking-tight transition-colors hover:text-fg-60"
                    >
                      {item.Icon && (
                        <item.Icon className="h-7 w-auto shrink-0" />
                      )}
                      {item.label}
                    </a>
                  </SheetClose>
                ))}

                <div className="mt-8 flex flex-col gap-3">
                  <SheetClose asChild>
                    <a
                      href="#categorias"
                      className="inline-flex items-center justify-center rounded-full border border-fg-30 px-6 py-3.5 text-center text-base font-semibold leading-none"
                    >
                      Ver catálogo
                    </a>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  href,
  external,
  children,
}: {
  href: string
  external: boolean
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative text-[0.95rem] font-semibold text-current"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:scale-x-100" />
    </a>
  )
}