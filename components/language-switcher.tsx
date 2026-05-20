"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { iconStroke } from "@/components/section-icon-badge";
import { useRouter } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/locale";

/** Drapeaux SVG inline — fonctionnent sur tous les OS (y compris Windows). */
function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === "fr") {
    return (
      <svg viewBox="0 0 20 14" className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px]" aria-hidden>
        <rect width="6.67" height="14" fill="#002395" />
        <rect x="6.67" width="6.67" height="14" fill="#fff" />
        <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
      </svg>
    );
  }
  if (locale === "de") {
    return (
      <svg viewBox="0 0 20 14" className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px]" aria-hidden>
        <rect width="20" height="4.67" fill="#000" />
        <rect y="4.67" width="20" height="4.67" fill="#DD0000" />
        <rect y="9.33" width="20" height="4.67" fill="#FFCE00" />
      </svg>
    );
  }
  /* EN — Union Jack simplifie */
  return (
    <svg viewBox="0 0 20 14" className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px]" aria-hidden>
      <rect width="20" height="14" fill="#012169" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#fff" strokeWidth="3" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M10,0 V14 M0,7 H20" stroke="#fff" strokeWidth="5" />
      <path d="M10,0 V14 M0,7 H20" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

type Props = {
  current: Locale;
  /** `light` = pill blanche (barre mobile), `dark` = défaut header desktop / tiroir */
  appearance?: "light" | "dark";
};

export function LanguageSwitcher({ current, appearance = "dark" }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const setLocale = (next: Locale) => {
    if (next === current) { setOpen(false); return; }
    document.cookie = `ss_locale=${next}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    router.refresh();
  };

  const cur = localeLabels[current];
  const buttonAria =
    current === "fr"
      ? `Langue : ${cur.full}`
      : current === "de"
        ? `Sprache: ${cur.full}`
        : `Language: ${cur.full}`;
  const listboxAria =
    current === "fr"
      ? "Sélectionner la langue"
      : current === "de"
        ? "Sprache auswählen"
        : "Select language";

  const triggerClass =
    appearance === "light"
      ? open
        ? "border-[#E86B00]/50 bg-[#E86B00]/10 text-[#c2410c] shadow-[0_8px_20px_-10px_rgba(232,107,0,0.35)]"
        : "border-slate-200/90 bg-white text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:border-[#E86B00]/40 hover:bg-slate-50/90 hover:text-[#E86B00]"
      : open
        ? "border-[#E86B00]/60 bg-[#E86B00]/12 text-[#E86B00]"
        : "border-white/15 bg-[#0b1325]/80 text-slate-300 hover:border-[#E86B00]/40 hover:text-[#E86B00]";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={buttonAria}
        className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-bold tracking-wide transition-all duration-200 ${triggerClass}`}
      >
        <FlagIcon locale={current} />
        <span>{cur.short}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={iconStroke}
          aria-hidden
        />
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label={listboxAria}
        className={`absolute right-0 top-full z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-2xl border border-white/12 bg-[#0b1325] shadow-[0_20px_48px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/5 transition-all duration-200 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="p-1.5">
          {locales.map((loc) => {
            const info = localeLabels[loc];
            const isActive = loc === current;
            return (
              <button
                key={loc}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => setLocale(loc)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-[#E86B00]/15 font-bold text-[#E86B00]"
                    : "font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FlagIcon locale={loc} />
                <span className="flex-1">{info.full}</span>
                {isActive && (
                  <Check className="h-3.5 w-3.5 text-[#E86B00]" strokeWidth={iconStroke} aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
