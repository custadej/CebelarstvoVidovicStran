"use client";

import { useState } from "react";
import { localePath, type Lang } from "@/i18n";
import { asset } from "@/lib/site";

type State = "idle" | "sending" | "sent" | "error";

const T = {
  sl: {
    sent: "Hvala, sporočilo je poslano.",
    sentText: (p: string) => `Jože vas pokliče nazaj takoj, ko bo mogel. Če se mudi, pokličite na ${p}.`,
    name: "Ime in priimek",
    phone: "Telefon",
    message: "Sporočilo",
    placeholder: "Npr. koliko matic potrebujete ali kateri med želite.",
    honeypot: "Pustite prazno",
    sending: "Pošiljam …",
    submit: "Pošljite povpraševanje",
    error: "Sporočila ni bilo mogoče poslati. Pokličite na",
    privacy: "Podatke uporabimo samo za odgovor na vaše sporočilo. Več v",
    privacyLink: "obvestilu o zasebnosti",
  },
  en: {
    sent: "Thank you, your message has been sent.",
    sentText: (p: string) => `Jože will call you back as soon as he can. If it is urgent, call ${p}.`,
    name: "Name",
    phone: "Phone",
    message: "Message",
    placeholder: "For example how many queens you need or which honey you would like.",
    honeypot: "Leave empty",
    sending: "Sending …",
    submit: "Send enquiry",
    error: "The message could not be sent. Please call",
    privacy: "We use your details only to reply to your message. More in the",
    privacyLink: "privacy notice",
  },
  de: {
    sent: "Danke, Ihre Nachricht wurde gesendet.",
    sentText: (p: string) => `Jože ruft Sie zurück, sobald er kann. Wenn es eilt, rufen Sie ${p} an.`,
    name: "Name",
    phone: "Telefon",
    message: "Nachricht",
    placeholder: "Zum Beispiel wie viele Königinnen Sie brauchen oder welchen Honig Sie möchten.",
    honeypot: "Leer lassen",
    sending: "Wird gesendet …",
    submit: "Anfrage senden",
    error: "Die Nachricht konnte nicht gesendet werden. Bitte rufen Sie an:",
    privacy: "Wir verwenden Ihre Daten nur, um auf Ihre Nachricht zu antworten. Mehr in der",
    privacyLink: "Datenschutzerklärung",
  },
};

export function ContactForm({ lang, phoneHref, phoneDisplay }: { lang: Lang; phoneHref: string; phoneDisplay: string }) {
  const [state, setState] = useState<State>("idle");
  const t = T[lang];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return;
    setState("sending");
    try {
      const res = await fetch("/api/povprasevanje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl bg-papir p-8 text-smola" role="status">
        <p className="h-card">{t.sent}</p>
        <p className="mt-3">{t.sentText(phoneDisplay)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl bg-vosek p-6 text-smola md:p-8" noValidate={false}>
      <div className="field">
        <label htmlFor="ime">{t.name}</label>
        <input id="ime" name="ime" type="text" autoComplete="name" required maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="telefon">{t.phone}</label>
        <input id="telefon" name="telefon" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} />
      </div>
      <div className="field">
        <label htmlFor="sporocilo">{t.message}</label>
        <textarea id="sporocilo" name="sporocilo" rows={4} required maxLength={2000} placeholder={t.placeholder} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-smola" disabled={state === "sending"}>
        {state === "sending" ? t.sending : t.submit}
      </button>
      {state === "error" ? (
        <p role="alert" className="font-semibold text-panj-rdeca">
          {t.error}{" "}
          <a href={phoneHref} className="link">
            {phoneDisplay}
          </a>
          .
        </p>
      ) : null}
      <p className="text-[0.95rem] opacity-75">
        {t.privacy}{" "}
        <a href={asset(localePath(lang, "/zasebnost/"))} className="link">
          {t.privacyLink}
        </a>
        .
      </p>
    </form>
  );
}
