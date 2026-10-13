import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Logos } from "@/components/site/logos";
import { Canales } from "@/components/site/canales";
import { Cita } from "@/components/site/cita";
import { Categorias } from "@/components/site/categorias";
import { Historia } from "@/components/site/historia";
import { Galeria } from "@/components/site/galeria";
import { Faq } from "@/components/site/faq";
import { Contacto } from "@/components/site/contacto";
import { Footer } from "@/components/site/footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { RevealObserver } from "@/components/site/reveal";

// Main Page

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Cita />
        {/* <Categorias /> */}
        <Logos />
        <Historia />
        <Galeria />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}