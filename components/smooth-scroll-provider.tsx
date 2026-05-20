"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

/** Décalage pour le bandeau fixe (~ header). */
export const SS_SCROLL_OFFSET = -88;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "instant" : "smooth";
}

function scrollToY(top: number) {
  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  window.scrollTo({
    top: Math.min(maxScroll, Math.max(0, top)),
    behavior: scrollBehavior(),
  });
}

function elementScrollTop(el: Element, offset: number): number {
  const rect = el.getBoundingClientRect();
  return window.scrollY + rect.top + offset;
}

export function scrollToAnchor(
  selector: string,
  options?: { offset?: number },
) {
  if (typeof document === "undefined") return;
  const id = selector.startsWith("#") ? selector : `#${selector}`;
  const el = document.querySelector(id);
  if (!el) return;
  const offset = options?.offset ?? SS_SCROLL_OFFSET;
  scrollToY(elementScrollTop(el, offset));
}

function HashScrollFollower() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") return;
    const h = window.location.hash;
    if (!h || h === "#") return;
    let attempts = 0;
    let raf = 0;
    let killed = false;
    const tick = () => {
      if (killed) return;
      attempts += 1;
      if (document.querySelector(h) || attempts >= 32) {
        requestAnimationFrame(() => {
          if (killed) return;
          scrollToAnchor(h);
        });
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };
    tick();
    return () => {
      killed = true;
      window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const h = window.location.hash;
      if (!h || pathname !== "/") return;
      scrollToAnchor(h);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}

function ScrollToTopOnPrivacyRoute() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/politique-confidentialite") return;
    const top = () => window.scrollTo(0, 0);
    top();
    const raf = requestAnimationFrame(top);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}

function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    history.scrollRestoration = "manual";

    const resetOnUnload = () => {
      try {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      } catch {
        /* noop */
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      try {
        window.scrollTo(0, 0);
      } catch {
        /* noop */
      }
    };
    window.addEventListener("beforeunload", resetOnUnload);

    if (window.location.hash && window.location.hash !== "#") {
      return () => window.removeEventListener("beforeunload", resetOnUnload);
    }

    const top = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
    };

    top();
    const raf = requestAnimationFrame(top);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("beforeunload", resetOnUnload);
    };
  }, []);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTopOnLoad />
      <HashScrollFollower />
      <ScrollToTopOnPrivacyRoute />
      {children}
    </>
  );
}
