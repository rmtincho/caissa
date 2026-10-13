import type { Metadata } from "next";
import { Providers } from "@/components/site/providers";
import { SchemaOrg } from "./schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://caissa.com.ar"),
  icons: { icon: "/favicon-caissa-black.svg" },

  title: "Agendas y Calendarios Personalizados | Caissa — Fabricantes desde 1977",
  description:
    "Fabricante argentino de agendas, calendarios y cuadernos personalizables desde 1977. Tienda online, venta a empresas y programa de revendedores. Envíos a todo el país.",

  openGraph: {
    title: "Agendas y Calendarios Personalizados — Caissa",
    description:
      "Fabricamos agendas, calendarios y cuadernos personalizables en Argentina desde 1977. Tienda online, venta a empresas y revendedores. Envíos a todo el país.",
    url: "https://caissa.com.ar",
    siteName: "Caissa",
    type: "website",
    locale: "es_AR",
    images: [
      {
        // Reemplazar con una imagen 1200×630px diseñada para redes sociales
        url: "/images/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Caissa — Agendas y Calendarios Personalizados, fabricante argentino desde 1977",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Agendas y Calendarios Personalizados | Caissa",
    description:
      "Fabricante argentino desde 1977. Agendas, calendarios y cuadernos con tu logo. Envíos a todo el país.",
    images: ["/images/hero-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="antialiased">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/uga4omf.css" />
      </head>
      <body>
        <SchemaOrg />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}