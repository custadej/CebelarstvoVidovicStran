"use client";

import { useState } from "react";
import { asset } from "@/lib/site";

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm({ phoneHref, phoneDisplay }: { phoneHref: string; phoneDisplay: string }) {
  const [state, setState] = useState<State>("idle");

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
        <p className="h-card">Hvala, sporočilo je poslano.</p>
        <p className="mt-3">Jože vas pokliče nazaj takoj, ko bo mogel. Če se mudi, pokličite na {phoneDisplay}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl bg-vosek p-6 text-smola md:p-8" noValidate={false}>
      <div className="field">
        <label htmlFor="ime">Ime in priimek</label>
        <input id="ime" name="ime" type="text" autoComplete="name" required maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="telefon">Telefon</label>
        <input id="telefon" name="telefon" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} />
      </div>
      <div className="field">
        <label htmlFor="sporocilo">Sporočilo</label>
        <textarea id="sporocilo" name="sporocilo" rows={4} required maxLength={2000} placeholder="Npr. koliko matic potrebujete ali kateri med želite." />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Pustite prazno</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-smola" disabled={state === "sending"}>
        {state === "sending" ? "Pošiljam …" : "Pošljite povpraševanje"}
      </button>
      {state === "error" ? (
        <p role="alert" className="font-semibold text-panj-rdeca">
          Sporočila ni bilo mogoče poslati. Pokličite na{" "}
          <a href={phoneHref} className="link">
            {phoneDisplay}
          </a>
          .
        </p>
      ) : null}
      <p className="text-[0.95rem] opacity-75">
        Podatke uporabimo samo za odgovor na vaše sporočilo. Več v{" "}
        <a href={asset("/zasebnost/")} className="link">
          obvestilu o zasebnosti
        </a>
        .
      </p>
    </form>
  );
}
