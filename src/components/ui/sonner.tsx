"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={(resolvedTheme as ToasterProps["theme"]) ?? "dark"}
      position="bottom-right"
      className="toaster group"
      style={
        {
          "--normal-bg":
            "color-mix(in oklch, var(--color-fg) 8%, var(--color-bg))",
          "--normal-text": "var(--color-fg)",
          "--normal-border": "var(--color-line)",
          "--border-radius": "0.75rem",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
