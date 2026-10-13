import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CAISSA_EMAIL_HEADER_PNG_BASE64 } from "@/lib/email/logo";
import {
  LOGO_CID,
  renderContactConfirmation,
  renderContactNotification,
  type ContactSubmission,
} from "@/lib/email/templates";

// Resend's SDK + the inline-logo Buffer need the Node.js runtime.
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Inline Caissa logo, referenced from the templates as `cid:caissa-logo`. */
const LOGO_ATTACHMENT = {
  filename: "caissa-logo.png",
  content: CAISSA_EMAIL_HEADER_PNG_BASE64,
  contentId: LOGO_CID,
} as const;

type ParseResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; error: string };

function parseSubmission(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Cuerpo de la solicitud inválido." };
  }

  const { nombre, email, mensaje } = body as Record<string, unknown>;

  if (typeof nombre !== "string" || nombre.trim().length < 2) {
    return { ok: false, error: "Ingresá tu nombre y apellido." };
  }
  if (nombre.trim().length > 120) {
    return { ok: false, error: "El nombre es demasiado largo." };
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { ok: false, error: "Ingresá un email válido." };
  }
  if (email.trim().length > 200) {
    return { ok: false, error: "El email es demasiado largo." };
  }
  if (mensaje !== undefined && typeof mensaje !== "string") {
    return { ok: false, error: "Mensaje inválido." };
  }
  if (typeof mensaje === "string" && mensaje.length > 5000) {
    return { ok: false, error: "El mensaje es demasiado largo." };
  }

  return {
    ok: true,
    data: {
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: typeof mensaje === "string" ? mensaje.trim() : undefined,
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "No se pudo leer la solicitud." },
      { status: 400 },
    );
  }

  // Honeypot: real users never fill the hidden "empresa_web" field. Bots do.
  // Pretend success so the bot gets no signal, but send nothing.
  if (
    typeof (body as Record<string, unknown>)?.empresa_web === "string" &&
    (body as Record<string, unknown>).empresa_web !== ""
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseSubmission(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Falta la variable de entorno RESEND_API_KEY.");
    return NextResponse.json(
      { error: "El envío de mensajes no está configurado. Probá más tarde." },
      { status: 500 },
    );
  }

  // CONTACT_FROM_EMAIL must be an address on a domain verified in Resend, e.g.
  // "Caissa <web@caissa.com.ar>". The onboarding fallback only sends in test mode.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Caissa <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? "hola@caissa.com.ar";

  const resend = new Resend(apiKey);
  const notification = renderContactNotification(parsed.data);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
    attachments: [LOGO_ATTACHMENT],
  });

  if (error) {
    console.error("[contact] Resend falló al enviar la notificación:", error);
    return NextResponse.json(
      { error: "No pudimos enviar tu consulta. Probá de nuevo en un momento." },
      { status: 502 },
    );
  }

  // Confirmation auto-reply to the visitor — best-effort, never blocks success.
  try {
    const confirmation = renderContactConfirmation(parsed.data);
    await resend.emails.send({
      from,
      to: parsed.data.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
      attachments: [LOGO_ATTACHMENT],
    });
  } catch (confirmationError) {
    console.error(
      "[contact] No se pudo enviar la confirmación al visitante:",
      confirmationError,
    );
  }

  return NextResponse.json({ ok: true });
}
