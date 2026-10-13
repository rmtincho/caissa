"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mt-3 text-sm text-fg-60">
        ¡Gracias! Te avisamos cuando haya novedades.
      </p>
    );
  }

  return (
    <form
      className="mt-3 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="tu@email.com"
        className="min-w-0 flex-1 rounded-full border border-line bg-fg-05 px-4 py-2.5 text-sm text-fg placeholder:text-fg-30 outline-none transition-[border-color] duration-300 focus:border-fg-40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition-opacity duration-300 hover:opacity-90"
      >
        Suscribirse
      </button>
    </form>
  );
}
