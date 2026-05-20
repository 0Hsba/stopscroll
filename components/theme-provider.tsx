"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

function resolveTheme(stored: string | null): "light" | "dark" {
  return stored === "light" ? "light" : "dark";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  root.classList.toggle("light-theme", theme === "light");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const stored = window.localStorage.getItem("ss-theme");
    applyTheme(resolveTheme(stored));
  }, []);

  return <>{children}</>;
}
