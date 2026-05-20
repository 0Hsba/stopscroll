"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { iconStroke } from "@/components/section-icon-badge";

type Props = {
  locale: "fr" | "en" | "de";
};

export function ThemeToggle({ locale }: Props) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const rootTheme = document.documentElement.getAttribute("data-theme");
    const stored = window.localStorage.getItem("ss-theme");
    const next =
      rootTheme === "light" || stored === "light" ? "light" : "dark";
    setTheme(next);
  }, []);

  const toggle = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("ss-theme", next);
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    root.classList.toggle("light-theme", next === "light");
  };

  const isDark = theme === "dark";
  const label =
    locale === "fr"
      ? "Changer le thème"
      : locale === "de"
        ? "Design wechseln"
        : "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="ss-theme-toggle inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 transition hover:border-[#E86B00]/50 hover:bg-[#E86B00]/10"
    >
      {isDark ? (
        <Sun className="h-[14px] w-[14px]" strokeWidth={iconStroke} aria-hidden />
      ) : (
        <Moon className="h-[14px] w-[14px]" strokeWidth={iconStroke} aria-hidden />
      )}
    </button>
  );
}
