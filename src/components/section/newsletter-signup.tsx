"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail } from "lucide-react";

type Props = { compact?: boolean };

export default function NewsletterSignup({ compact = false }: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Please confirm that you want to receive the newsletter.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
      setStatus("success");
      setMessage("You're on the list. Check your inbox for any confirmation email.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div className={compact ? "w-full" : "mx-auto w-full max-w-2xl"}>
      <div className={`relative overflow-hidden rounded-2xl border bg-card ${compact ? "p-5 sm:p-8" : "p-6 sm:p-10"}`}>
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border bg-background text-primary"><Mail className="size-5" /></div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">The newsletter</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Notes from what I&apos;m building.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Occasional updates on projects, code, self-hosting and things I learn along the way. No spam — just the interesting stuff.</p>

          {status === "success" ? (
            <div role="status" className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
              <p>{message}</p>
            </div>
          ) : (
            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
              <div className="flex min-w-0 items-center gap-1 rounded-full border border-input bg-background p-1.5 shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <label className="sr-only" htmlFor={compact ? "newsletter-email-home" : "newsletter-email-page"}>Email address</label>
                <input id={compact ? "newsletter-email-home" : "newsletter-email-page"} type="email" name="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="h-10 w-0 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/80 sm:px-4" />
                <button type="submit" disabled={status === "loading"} className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5">
                  {status === "loading" ? <LoaderCircle className="size-4 animate-spin" /> : null}
                  <span>{status === "loading" ? "Joining…" : "Subscribe"}</span>
                  {status !== "loading" ? <ArrowRight className="size-4" /> : null}
                </button>
              </div>
              <label className="flex cursor-pointer items-start gap-2 px-1 text-xs leading-relaxed text-muted-foreground">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-0.5 size-3.5 shrink-0 accent-primary" />
                <span>I agree to receive the newsletter by email. I can unsubscribe at any time. Read the <Link href="https://legal.blanke.lol/karin/datenschutz" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">privacy policy</Link>.</span>
              </label>
              {status === "error" && <p role="alert" className="px-1 text-sm text-destructive">{message}</p>}
            </form>
          )}
          <p className="mt-4 text-xs text-muted-foreground">Powered by Loops · Unsubscribe whenever you want.</p>
        </div>
      </div>
    </div>
  );
}
