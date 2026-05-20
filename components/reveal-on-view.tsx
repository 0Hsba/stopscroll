"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export type RevealVariant = "fade-up" | "fade" | "slide-left" | "slide-right" | "scale" | "none";

type Props = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
  /** Fraction of element visible before triggering (0–1) */
  threshold?: number;
};

const HIDDEN: Record<RevealVariant, string> = {
  "fade-up":    "translate-y-8 opacity-0 blur-[2px]",
  "fade":       "opacity-0",
  "slide-left": "-translate-x-10 opacity-0",
  "slide-right":"translate-x-10 opacity-0",
  "scale":      "scale-[0.93] opacity-0",
  "none":       "",
};

const VISIBLE: Record<RevealVariant, string> = {
  "fade-up":    "translate-y-0 opacity-100 blur-none",
  "fade":       "opacity-100",
  "slide-left": "translate-x-0 opacity-100",
  "slide-right":"translate-x-0 opacity-100",
  "scale":      "scale-100 opacity-100",
  "none":       "",
};

export function RevealOnView({
  children,
  className = "",
  delayMs = 0,
  variant = "fade-up",
  threshold = 0.06,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (variant === "none") { setVisible(true); return; }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    let timer: number;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Entre dans le viewport → joue l'animation
          timer = window.setTimeout(() => setVisible(true), delayMs);
        } else {
          // Sort du viewport → réinitialise pour rejouer au prochain passage
          clearTimeout(timer);
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );

    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [delayMs, variant, threshold]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:opacity-100 motion-reduce:translate-none motion-reduce:blur-none motion-reduce:scale-100 ${
        visible ? VISIBLE[variant] : HIDDEN[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
