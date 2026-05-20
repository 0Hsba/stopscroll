"use client";

import { useEffect } from "react";

/**
 * Forces the page to start at the top on every load/refresh.
 * Disables the browser's native scroll restoration so it doesn't
 * remember the previous scroll position.
 */
export function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  return null;
}
