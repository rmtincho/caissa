const FAQ_ITEMS = [
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

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://caissa.com.ar/#organization",
      name: "AGENCAISSA S.A.",
      alternateName: "Caissa",
      url: "https://caissa.com.ar",
      logo: {
        "@type": "ImageObject",
        url: "https://caissa.com.ar/logo-caissa.svg",
      },
      foundingDate: "1977",
      description:
        "Fabricante argentino de agendas, calendarios y cuadernos personalizables desde 1977.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressCountry: "AR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hola@caissa.com.ar",
        contactType: "sales",
        areaServed: "AR",
        availableLanguage: "Spanish",
      },
      sameAs: ["https://www.mercadolibre.com.ar/tienda/caissa"],
    },
    {
      "@type": "WebSite",
      "@id": "https://caissa.com.ar/#website",
      url: "https://caissa.com.ar",
      name: "Caissa",
      publisher: { "@id": "https://caissa.com.ar/#organization" },
      inLanguage: "es-AR",
    },
    {
      "@type": "FAQPage",
      "@id": "https://caissa.com.ar/#faq",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
