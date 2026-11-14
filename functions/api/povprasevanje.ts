// Cloudflare Pages Function: POST /api/povprasevanje
// Sends the inquiry form to Jože through Resend. Needs these Pages environment variables:
//   RESEND_API_KEY  secret API key from resend.com
//   FORM_FROM       e.g. "Spletna stran <obrazec@cebelarstvo-vidovic.si>" (domain must be verified in Resend)
//   FORM_TO         recipient mailbox
// The form is only rendered when the site is built with NEXT_PUBLIC_FORM_ENABLED=1.

interface Env {
  RESEND_API_KEY?: string;
  FORM_FROM?: string;
  FORM_TO?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  if (!env.RESEND_API_KEY || !env.FORM_FROM || !env.FORM_TO) return json({ ok: false, error: "not_configured" }, 503);

  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "forbidden" }, 403);

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: real visitors never fill this field. Pretend success so bots do not retry.
  if (clean(data.website, 200)) return json({ ok: true });

  const ime = clean(data.ime, 80);
  const telefon = clean(data.telefon, 30);
  const sporocilo = clean(data.sporocilo, 2000);
  if (!ime || !sporocilo || !/^[0-9+()\/\s-]{6,30}$/.test(telefon)) return json({ ok: false, error: "invalid" }, 422);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.FORM_FROM,
      to: [env.FORM_TO],
      subject: `Povpraševanje s spletne strani: ${ime}`,
      text: `Ime in priimek: ${ime}\nTelefon: ${telefon}\n\n${sporocilo}\n\n--\nPoslano z obrazca na cebelarstvo-vidovic.si`,
    }),
  });

  return res.ok ? json({ ok: true }) : json({ ok: false, error: "send_failed" }, 502);
};
