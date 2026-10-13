"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Container } from "./primitives"

const FIELDS = [
  {
    id: "nombre",
    label: "Nombre y apellido",
    placeholder: "Ej. María González",
    type: "text",
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "nombre@empresa.com",
    type: "email",
    autoComplete: "email",
  },
] as const

const inputClass =
  "w-full rounded-xl border border-line bg-fg-05 px-4 py-3 text-sm text-fg placeholder:text-fg-30 outline-none transition-[border-color,background-color,box-shadow] duration-300 ease-[var(--ease-out-quart)] focus:border-fg-40 focus:bg-fg-08 focus:shadow-[0_0_0_3px_var(--color-fg-08)]"

const labelClass = "mb-2 block font-mono-label text-fg-40"

export function Contacto() {
  const [sending, setSending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setSending(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.get("nombre"),
          email: data.get("email"),
          mensaje: data.get("mensaje"),
          empresa_web: data.get("empresa_web"),
        }),
      })

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(
          payload?.error ?? "No pudimos enviar tu consulta. Probá de nuevo.",
        )
      }

      form.reset()
      toast.success("¡Gracias por escribirnos!", {
        description:
          "Recibimos tu consulta y te respondemos dentro de las próximas 24 horas hábiles.",
      })
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado. Probá de nuevo.",
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Image + contact details */}
        <div className="relative isolate min-h-[420px] overflow-hidden sm:min-h-[520px] lg:min-h-[640px]">
          <Image
            src="/images/contacto.jpg"
            alt="Persona trabajando en el taller de Caissa"
            fill
            sizes="(max-width:1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/25" />
        </div>

        {/* Form */}
        <div className="py-20 md:py-28">
          <Container className="lg:max-w-[640px] lg:px-12 xl:px-16">
            <span data-reveal="up" className="font-mono-label text-fg-40">
              06 — Contacto
            </span>
            <h2
              data-reveal="up"
              className="mt-5 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-balance [--reveal-delay:80ms]"
            >
              Hablemos de tu próximo pedido
            </h2>
            <p
              data-reveal="up"
              className="mt-5 max-w-md text-sm leading-relaxed text-fg-60 text-pretty [--reveal-delay:160ms]"
            >
              Contanos qué necesitás y te asesoramos según el canal:
              revendedores, tienda online o venta a empresas.
            </p>

            <form
              data-reveal="up"
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-5 [--reveal-delay:240ms]"
            >
              {FIELDS.map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className={labelClass}>
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    required
                    disabled={sending}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="mensaje" className={labelClass}>
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  disabled={sending}
                  placeholder="Contanos qué necesitás…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Honeypot — hidden from real users, catches spam bots. */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="empresa_web">No completar este campo</label>
                <input
                  id="empresa_web"
                  name="empresa_web"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-fg px-7 py-4 text-sm font-semibold text-bg transition-opacity duration-300 ease-[var(--ease-out-quart)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Enviando…" : "Enviar consulta"}
              </button>
            </form>
          </Container>
        </div>
      </div>
    </section>
  )
}
