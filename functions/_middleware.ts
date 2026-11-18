// Cloudflare Pages middleware: the first visit to a Slovenian page opens the visitor's language.
//   1. A language chosen in the footer (cookie `lang`, set only by that click) always wins.
//   2. Otherwise by country: SI → Slovenian, DE/AT/CH/LI → German, anywhere else → English.
//      A Slovenian browser abroad keeps Slovenian, a German one gets German.
// Search engines and link previews are never redirected, so all three versions stay indexable (hreflang does the rest).
// Pages it leaves in Slovenian are marked <html data-geo>, so the browser fallback in Shell.tsx does nothing.

interface Context {
  request: Request & { cf?: { country?: string } };
  next: () => Promise<Response>;
}

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|headless/i;
const GERMAN = new Set(["DE", "AT", "CH", "LI"]);
type Lang = "sl" | "en" | "de";

function choose(request: Context["request"]): Lang {
  const accept = (request.headers.get("Accept-Language") ?? "").toLowerCase();
  const first = accept.split(",")[0]?.trim() ?? "";
  const country = request.cf?.country ?? "";
  if (country === "SI" || first.startsWith("sl")) return "sl";
  if (GERMAN.has(country) || first.startsWith("de")) return "de";
  return "en";
}

class MarkGeo {
  element(el: { setAttribute: (name: string, value: string) => void }) {
    el.setAttribute("data-geo", "1");
  }
}

declare const HTMLRewriter: new () => { on: (selector: string, handler: MarkGeo) => { transform: (res: Response) => Response } };

export const onRequest = async ({ request, next }: Context): Promise<Response> => {
  if (request.method !== "GET") return next();
  const url = new URL(request.url);
  const path = url.pathname;
  if (/^\/(en|de)(\/|$)/.test(path) || path.startsWith("/_next/") || path.startsWith("/api/") || /\.[a-z0-9]+$/i.test(path)) return next();
  if (!(request.headers.get("Accept") ?? "").includes("text/html") || BOT.test(request.headers.get("User-Agent") ?? "")) return next();

  const saved = /(?:^|;\s*)lang=(sl|en|de)/.exec(request.headers.get("Cookie") ?? "")?.[1] as Lang | undefined;
  const lang = saved ?? choose(request);
  if (lang !== "sl") {
    return new Response(null, { status: 302, headers: { Location: `/${lang}${path}${url.search}`, "Cache-Control": "private, no-store", Vary: "Cookie, Accept-Language" } });
  }
  const res = await next();
  return new HTMLRewriter().on("html", new MarkGeo()).transform(res);
};
