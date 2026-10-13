/**
 * Caissa contact-form emails.
 *
 * Two templates share one editorial shell (black logo band on a clean light
 * card) so they read as a single, professional brand:
 *   - renderContactNotification → goes to the business with the lead details.
 *   - renderContactConfirmation → auto-reply to the visitor confirming receipt.
 *
 * The Caissa logo is referenced as `cid:caissa-logo`; the API route attaches it
 * inline (see src/lib/email/logo.ts), so it renders without any external host.
 */

export type ContactSubmission = {
  nombre: string;
  email: string;
  mensaje?: string;
};

export const LOGO_CID = "caissa-logo";

/** Brand palette, kept email-safe (hex only). Mirrors src/app/globals.css. */
const C = {
  ink: "#16130f",
  body: "#3d3a35",
  muted: "#8c877d",
  hairline: "#e7e4dd",
  page: "#eceae4",
  card: "#ffffff",
  black: "#000000",
  accent: "#c5402e", // warm red ink seen in the agenda
} as const;

/** Escape user-supplied values before interpolating into HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Preserve line breaks from a textarea inside the HTML body. */
function nl2br(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

type LayoutOptions = {
  preheader: string;
  /** HTML for the white content area, below the logo band. */
  content: string;
};

/**
 * Table-based shell with inline styles for broad email-client support
 * (Gmail, Apple Mail, Outlook). No flexbox/grid, no external CSS.
 */
function layout({ preheader, content }: LayoutOptions): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>Caissa</title>
</head>
<body style="margin:0; padding:0; background-color:${C.page}; -webkit-font-smoothing:antialiased; -webkit-text-size-adjust:100%;">
<div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all; font-size:1px; line-height:1px; color:${C.page};">${escapeHtml(
    preheader,
  )}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.page};">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:${C.card}; border:1px solid ${C.hairline}; border-radius:14px; overflow:hidden; font-family:Helvetica, Arial, sans-serif;">
<!-- Logo band — baked black band image (dark-mode safe), bgcolor as backup -->
<tr>
<td align="center" bgcolor="${C.black}" style="background-color:${C.black}; font-size:0; line-height:0;">
<img src="cid:${LOGO_CID}" alt="Caissa" width="600" height="100" style="display:block; width:100%; max-width:600px; height:auto; border:0; outline:none; text-decoration:none;" />
</td>
</tr>
<!-- Content -->
<tr>
<td style="padding:40px 40px 36px 40px;">
${content}
</td>
</tr>
<!-- Footer -->
<tr>
<td style="padding:24px 40px 32px 40px; border-top:1px solid ${C.hairline};">
<p style="margin:0; font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height:18px; color:${C.muted};">
Caissa — Fábrica de agendas, calendarios y cuadernos personalizables. Argentina desde 1977.
</p>
<p style="margin:8px 0 0 0; font-family:Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:${C.muted}; letter-spacing:1.5px; text-transform:uppercase;">
caissa.com.ar
</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

/** Small monospaced-style eyebrow, matching the site's section labels. */
function eyebrow(text: string): string {
  return `<p style="margin:0 0 14px 0; font-family:Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:2.5px; text-transform:uppercase; color:${C.accent};">${escapeHtml(
    text,
  )}</p>`;
}

function heading(text: string): string {
  return `<h1 style="margin:0; font-family:Helvetica, Arial, sans-serif; font-size:26px; line-height:1.2; font-weight:700; letter-spacing:-0.5px; color:${C.ink};">${escapeHtml(
    text,
  )}</h1>`;
}

/** A labelled data row used in the notification's details block. */
function field(label: string, valueHtml: string): string {
  return `<tr>
<td style="padding:0 0 4px 0; font-family:Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:1.5px; text-transform:uppercase; color:${C.muted};">${escapeHtml(
    label,
  )}</td>
</tr>
<tr>
<td style="padding:0 0 20px 0; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:1.5; color:${C.ink};">${valueHtml}</td>
</tr>`;
}

// ---------------------------------------------------------------------------
// Notification — sent to the business when the form is submitted.
// ---------------------------------------------------------------------------

export function renderContactNotification(data: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const nombre = data.nombre.trim();
  const email = data.email.trim();
  const mensaje = data.mensaje?.trim();

  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: tu consulta en Caissa`,
  )}`;

  const content = `
${eyebrow("Nueva consulta")}
${heading("Llegó una consulta desde el sitio")}
<p style="margin:14px 0 28px 0; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:${C.body};">
Alguien completó el formulario de contacto de caissa.com.ar. Podés responderle directamente a este correo.
</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf9f6; border:1px solid ${C.hairline}; border-radius:10px;">
<tr><td style="padding:24px 24px 4px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${field("Nombre y apellido", escapeHtml(nombre))}
${field(
    "Email",
    `<a href="mailto:${escapeHtml(email)}" style="color:${C.ink}; text-decoration:underline;">${escapeHtml(
      email,
    )}</a>`,
  )}
${field("Mensaje", mensaje ? nl2br(mensaje) : `<span style="color:${C.muted};">— Sin mensaje —</span>`)}
</table>
</td></tr>
</table>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
<tr><td bgcolor="${C.black}" style="border-radius:9999px; background-color:${C.black};">
<a href="${mailto}" style="display:inline-block; padding:14px 30px; font-family:Helvetica, Arial, sans-serif; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:9999px;">
Responder a ${escapeHtml(nombre.split(" ")[0] || "la consulta")}
</a>
</td></tr>
</table>
`;

  const text = [
    "NUEVA CONSULTA — CAISSA",
    "",
    "Llegó una consulta desde el formulario de caissa.com.ar.",
    "",
    `Nombre: ${nombre}`,
    `Email:  ${email}`,
    `Mensaje: ${mensaje || "(sin mensaje)"}`,
    "",
    `Responder: ${email}`,
    "",
    "—",
    "Caissa — Argentina desde 1977 · caissa.com.ar",
  ].join("\n");

  return {
    subject: `Nueva consulta de ${nombre} — Caissa`,
    html: layout({
      preheader: `${nombre} (${email}) escribió desde el formulario de contacto.`,
      content,
    }),
    text,
  };
}

// ---------------------------------------------------------------------------
// Confirmation — auto-reply sent to the visitor.
// ---------------------------------------------------------------------------

export function renderContactConfirmation(data: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const nombre = data.nombre.trim();
  const firstName = nombre.split(" ")[0] || nombre;
  const mensaje = data.mensaje?.trim();

  const content = `
${eyebrow("Consulta recibida")}
${heading(`Gracias por escribirnos, ${firstName}`)}
<p style="margin:14px 0 0 0; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:${C.body};">
Recibimos tu consulta y nuestro equipo te va a responder dentro de las próximas <strong style="color:${C.ink};">24 horas hábiles</strong>. Mientras tanto, podés conocer más sobre nuestros productos y canales de venta en el sitio.
</p>
${
  mensaje
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px; background-color:#faf9f6; border:1px solid ${C.hairline}; border-radius:10px;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px 0; font-family:Helvetica, Arial, sans-serif; font-size:11px; line-height:1; letter-spacing:1.5px; text-transform:uppercase; color:${C.muted};">Tu mensaje</p>
<p style="margin:0; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:${C.ink};">${nl2br(
        mensaje,
      )}</p>
</td></tr>
</table>`
    : ""
}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
<tr><td bgcolor="${C.black}" style="border-radius:9999px; background-color:${C.black};">
<a href="https://caissa.com.ar" style="display:inline-block; padding:14px 30px; font-family:Helvetica, Arial, sans-serif; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:9999px;">
Visitar caissa.com.ar
</a>
</td></tr>
</table>
<p style="margin:28px 0 0 0; font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:1.6; color:${C.body};">
Un saludo,<br />
<strong style="color:${C.ink};">Equipo Caissa</strong>
</p>
`;

  const text = [
    `Gracias por escribirnos, ${firstName}.`,
    "",
    "Recibimos tu consulta y nuestro equipo te va a responder dentro de las próximas 24 horas hábiles.",
    mensaje ? `\nTu mensaje:\n${mensaje}` : "",
    "",
    "Visitá caissa.com.ar para conocer más.",
    "",
    "Un saludo,",
    "Equipo Caissa",
    "",
    "—",
    "Caissa — Argentina desde 1977 · caissa.com.ar",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: "Recibimos tu consulta — Caissa",
    html: layout({
      preheader:
        "Gracias por escribirnos. Te respondemos dentro de las próximas 24 horas hábiles.",
      content,
    }),
    text,
  };
}
