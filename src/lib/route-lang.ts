import { notFound } from "next/navigation";
import { isLang, type Lang } from "@/i18n";

// The [lang] tree serves only the prefixed languages; Slovenian lives at the root.
export async function langParam(params: Promise<{ lang: string }>): Promise<Exclude<Lang, "sl">> {
  const { lang } = await params;
  if (!isLang(lang) || lang === "sl") notFound();
  return lang;
}
