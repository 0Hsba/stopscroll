"use client";

import { SS_SCROLL_OFFSET, scrollToAnchor } from "@/components/smooth-scroll-provider";

type Props = {
  label: string;
  targetId: string;
  /** Style plein (primaire) ou contour (secondaire). */
  variant?: "primary" | "outline";
  /** Ancrage pour cue curseur onboarding (landing) — aucun impact visuel. */
  cursorCueAnchor?: boolean;
};

export function HeroCtaButton({
  label,
  targetId,
  variant = "primary",
  cursorCueAnchor = false,
}: Props) {
  const raw = targetId.startsWith("#") ? targetId.slice(1) : targetId;
  const id = `#${raw}`;

  return (
    <button
      type="button"
      {...(cursorCueAnchor ? { "data-hero-form-cta": "" } : {})}
      onClick={() => scrollToAnchor(id, { offset: SS_SCROLL_OFFSET })}
      className={
        variant === "outline"
          ? "motion-safe:animate-fade-up motion-safe:animation-delay-400 relative inline-flex min-h-[52px] w-full max-w-[min(100%,20rem)] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-[#E86B00]/80 bg-[#0f172a]/90 px-8 py-3 text-center text-[13px] font-bold uppercase leading-tight tracking-[0.11em] text-[#ffb074] shadow-[0_10px_32px_-10px_rgba(232,107,0,0.22)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#E86B00] hover:bg-[#E86B00]/10 hover:text-[#ffd2aa] hover:shadow-[0_14px_36px_-10px_rgba(232,107,0,0.34)] active:translate-y-[0.5px] motion-reduce:animate-none sm:w-auto"
          : "motion-safe:animate-fade-up motion-safe:animation-delay-300 group relative inline-flex min-h-[52px] w-full max-w-[min(100%,20rem)] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#E86B00] px-10 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_40px_rgba(232,107,0,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(232,107,0,0.45)] motion-reduce:animate-none sm:w-auto"
      }
    >
      <span className="relative z-10">{label}</span>
      {variant === "primary" ? (
        <span
          className="absolute inset-0 translate-y-full bg-white/20 transition duration-500 group-hover:translate-y-0"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
