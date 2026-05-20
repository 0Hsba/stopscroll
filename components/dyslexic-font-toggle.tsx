"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ss-dyslexic";

function applyDyslexicFont(enabled: boolean) {
  const root = document.documentElement;
  root.classList.toggle("ss-dyslexic", enabled);
}

type Props = {
  locale: "fr" | "en" | "de";
  /** `light` = barre mobile, `dark` = header desktop */
  appearance?: "light" | "dark";
};

export function DyslexicFontToggle({ locale, appearance = "dark" }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const on = stored === "1";
    setEnabled(on);
    applyDyslexicFont(on);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    applyDyslexicFont(next);
  };

  const label =
    locale === "fr"
      ? "Police dyslexique"
      : locale === "de"
        ? "Legasthenie-Schrift"
        : "Dyslexia font";

  const aria = enabled
    ? locale === "fr"
      ? "Désactiver la police dyslexique"
      : locale === "de"
        ? "Legasthenie-Schrift deaktivieren"
        : "Turn off dyslexia font"
    : locale === "fr"
      ? "Activer la police dyslexique"
      : locale === "de"
        ? "Legasthenie-Schrift aktivieren"
        : "Turn on dyslexia font";

  const buttonClass =
    appearance === "light"
      ? enabled
        ? "border-[#E86B00]/50 bg-[#E86B00]/10 text-[#c2410c]"
        : "border-slate-200/90 bg-white text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:border-[#E86B00]/40 hover:bg-slate-50/90 hover:text-[#E86B00]"
      : enabled
        ? "border-[#E86B00]/60 bg-[#E86B00]/12 text-[#E86B00]"
        : "border-white/15 bg-[#0b1325]/80 text-slate-300 hover:border-[#E86B00]/40 hover:text-[#E86B00]";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={aria}
      title={label}
      className={`inline-flex h-10 items-center rounded-full border px-3 text-xs font-bold tracking-wide transition-all duration-200 ${buttonClass}`}
    >
      {label}
    </button>
  );
}
