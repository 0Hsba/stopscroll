"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

import { iconStroke } from "@/components/section-icon-badge";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  labels: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submitting: string;
    success: string;
    errorGeneric: string;
    validation: {
      required: string;
      email: string;
    };
  };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ labels }: Props) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim())                      errs.name    = labels.validation.required;
    if (!email.trim() || !emailRegex.test(email.trim())) errs.email = labels.validation.email;
    if (!message.trim())                   errs.message = labels.validation.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), website: "" }),
      });
      const data = (await res.json()) as { ok: boolean };
      setStatus(data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-400" strokeWidth={iconStroke} aria-hidden />
        <p className="text-base font-semibold text-white">{labels.success}</p>
      </div>
    );
  }

  const inputClass = "w-full rounded-xl border bg-[#0a0f1e] px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none ring-1 ring-white/[0.04] transition-all duration-200 focus:ring-2 focus:ring-[#E86B00]/20";
  const inputOk    = `${inputClass} border-white/12 focus:border-[#E86B00]/60`;
  const inputErr   = `${inputClass} border-red-400/50 focus:border-red-400/80`;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      {/* Honeypot */}
      <input name="website" type="text" autoComplete="off" className="sr-only" tabIndex={-1} aria-hidden />

      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-slate-300">{labels.nameLabel}</label>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
          className={errors.name ? inputErr : inputOk}
          placeholder={labels.namePlaceholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "err-name" : undefined}
        />
        {errors.name && <p id="err-name" className="text-xs text-red-400">{errors.name}</p>}
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-slate-300">{labels.emailLabel}</label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
          className={errors.email ? inputErr : inputOk}
          placeholder={labels.emailPlaceholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
        />
        {errors.email && <p id="err-email" className="text-xs text-red-400">{errors.email}</p>}
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-slate-300">{labels.messageLabel}</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: "" })); }}
          className={`resize-none ${errors.message ? inputErr : inputOk}`}
          placeholder={labels.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && <p id="err-message" className="text-xs text-red-400">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm text-red-400">
          {labels.errorGeneric}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#E86B00] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(232,107,0,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(232,107,0,0.55)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={iconStroke} aria-hidden />
            {labels.submitting}
          </>
        ) : labels.submitLabel}
      </button>
    </form>
  );
}
