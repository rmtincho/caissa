/**
 * Dev-only: renders the contact emails to .design/*.html for visual review.
 * The cid: logo reference is swapped for a data URI so it shows in a browser.
 *   node --experimental-strip-types scripts/preview-emails.mjs
 */
import { writeFile } from "node:fs/promises";
import {
  renderContactNotification,
  renderContactConfirmation,
} from "../src/lib/email/templates.ts";
import { CAISSA_EMAIL_HEADER_PNG_BASE64 } from "../src/lib/email/logo.ts";

const dataUri = `data:image/png;base64,${CAISSA_EMAIL_HEADER_PNG_BASE64}`;
const sample = {
  nombre: "María González",
  email: "maria.gonzalez@empresa.com.ar",
  mensaje:
    "Hola, somos una empresa de 80 personas y queremos regalar agendas personalizadas con nuestro logo para fin de año. ¿Podrían pasarme precios y mínimos?",
};

const notif = renderContactNotification(sample);
const conf = renderContactConfirmation(sample);

await writeFile(
  ".design/email-notif.html",
  notif.html.replaceAll("cid:caissa-logo", dataUri),
);
await writeFile(
  ".design/email-conf.html",
  conf.html.replaceAll("cid:caissa-logo", dataUri),
);
console.log("Wrote .design/email-notif.html and .design/email-conf.html");
