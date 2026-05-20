"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useState } from "react";

import { ChevronRight, Menu, X } from "lucide-react";

import { DyslexicFontToggle } from "@/components/dyslexic-font-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { iconStroke } from "@/components/section-icon-badge";
import { NavSectionLink } from "@/components/nav-section-link";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/locale";

const navLinkClass =
  "text-[13px] font-medium text-slate-300 transition-colors hover:text-[#E86B00] focus-visible:text-[#E86B00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/40 focus-visible:ring-offset-2 rounded-sm";

const MENU_EASE = "cubic-bezier(0.25, 0.9, 0.32, 1)";
const MENU_MS = 320;

const mobileRowClass =
  "ss-mobile-row group flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] font-semibold transition-[color,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/40";

function mobileMenuCopy(locale: Locale) {
  if (locale === "de") {
    return { prefs: "Einstellungen", sections: "Navigation", legal: "Rechtliches" };
  }
  if (locale === "en") {
    return { prefs: "Preferences", sections: "Navigation", legal: "Legal" };
  }
  return { prefs: "Préférences", sections: "Navigation", legal: "Informations" };
}

function MobileRowChevron() {
  return (
    <ChevronRight
      className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-[#E86B00]"
      strokeWidth={iconStroke}
      aria-hidden
    />
  );
}

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** Icône menu : SVG unique, traits fins, transition douce menu ↔ croix. */
function MenuToggleVisual({ open }: { open: boolean }) {
  return (
    <span className="relative block h-[22px] w-[22px] text-current" aria-hidden>
      <Menu
        className="absolute inset-0 origin-center transition-[opacity,transform] motion-reduce:transition-none"
        style={{
          opacity: open ? 0 : 1,
          transform: open ? "scale(0.6) rotate(-90deg)" : "scale(1) rotate(0deg)",
          transitionDuration: `${MENU_MS}ms`,
          transitionTimingFunction: MENU_EASE,
        }}
        strokeWidth={iconStroke}
      />
      <X
        className="absolute inset-0 origin-center transition-[opacity,transform] motion-reduce:transition-none"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) rotate(0deg)" : "scale(0.6) rotate(90deg)",
          transitionDuration: `${MENU_MS}ms`,
          transitionTimingFunction: MENU_EASE,
        }}
        strokeWidth={iconStroke}
      />
    </span>
  );
}

export function SiteHeader({ locale, dict }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const navId = useId();
  const mobileNavLabelId = `${navId}-mobile-nav-label`;
  const navAria =
    locale === "fr"
      ? "Menu principal"
      : locale === "de"
        ? "Hauptnavigation"
        : "Main navigation";

  /* Portail client uniquement : évite mismatch SSR / hydrate ; setState après mount est voulu. */
  // eslint-disable-next-line react-hooks/set-state-in-effect -- hydratation identique serveur/client puis affichage du tiroir côté client
  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const mobileLinks: {
    targetId:
      | "a-propos"
      | "notre-jeu"
      | "prevention"
      | "faq"
      | "contact";
    label: string;
  }[] = [
    { targetId: "a-propos", label: dict.nav.about },
    { targetId: "notre-jeu", label: dict.nav.game },
    { targetId: "prevention", label: dict.nav.prevention },
    { targetId: "faq", label: dict.nav.faq },
    { targetId: "contact", label: dict.nav.contact },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/90 shadow-sm backdrop-blur-md">
      <div className="flex w-full items-center gap-x-12 py-1.5 pl-8 pr-4 sm:py-2 sm:pl-14 sm:pr-8">

        {/* ── Gauche : logo ── */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="relative flex min-w-0 shrink items-center py-0.5"
            aria-label={dict.nav.brand}
            onClick={closeMobile}
          >
            <Image
              src="/logo-stop-scroll-white.png"
              alt={dict.nav.brand}
              width={1000}
              height={1000}
              className="h-[2.5rem] w-auto object-contain object-left sm:h-[3rem] md:h-[3.5rem]"
              priority
              sizes="56px"
            />
          </Link>
        </div>

        {/* ── Centre : navigation (desktop) ── */}
        <nav
          className="hidden lg:flex items-center"
          aria-label={navAria}
        >
          <div className="flex items-center gap-x-6">
            <NavSectionLink targetId="a-propos" className={navLinkClass}>
              {dict.nav.about}
            </NavSectionLink>
            <NavSectionLink targetId="notre-jeu" className={navLinkClass}>
              {dict.nav.game}
            </NavSectionLink>
            <NavSectionLink targetId="prevention" className={navLinkClass}>
              {dict.nav.prevention}
            </NavSectionLink>
            <NavSectionLink targetId="faq" className={navLinkClass}>
              {dict.nav.faq}
            </NavSectionLink>
            <NavSectionLink targetId="contact" className={navLinkClass}>
              {dict.nav.contact}
            </NavSectionLink>
            <Link href="/regles-du-jeu" className={navLinkClass}>
              {dict.nav.rules}
            </Link>
          </div>
        </nav>

        {/* ── Droite : boutons d'interaction ── */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Mobile : langue + menu (pill blanche + cercle hamburger) */}
          <div className="flex items-center gap-2 lg:hidden -mr-0.5 sm:-mr-1">
            <DyslexicFontToggle locale={locale} appearance="light" />
            <LanguageSwitcher current={locale} appearance="light" />
            <button
              type="button"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[color,background-color,border-color,box-shadow] motion-reduce:transition-colors ${
                mobileOpen
                  ? "border-[#E86B00]/50 bg-[#E86B00] text-white shadow-[0_10px_28px_-8px_rgba(232,107,0,0.55)]"
                  : "border-slate-200/90 bg-white text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,1)] hover:border-[#E86B00]/40 hover:bg-slate-50/90 hover:text-[#E86B00] active:scale-[0.95] motion-reduce:active:scale-100"
              }`}
              style={{ transitionDuration: `${MENU_MS}ms`, transitionTimingFunction: MENU_EASE }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-main-nav"
              aria-label={mobileOpen ? dict.nav.menuCloseAria : dict.nav.menuOpenAria}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <MenuToggleVisual open={mobileOpen} />
            </button>
          </div>

          {/* Desktop : thème + langue */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle locale={locale} />
            <DyslexicFontToggle locale={locale} />
            <LanguageSwitcher current={locale} />
          </div>
        </div>

      </div>
    </header>

      {/* Panel mobile : portail sur document.body — sinon backdrop-blur du header
          transforme le fixed en ancrage sur la barre (~60px) et le menu devient invisible. */}
      {portalReady
        ? createPortal(
            <div
              className={`fixed inset-0 z-[100] lg:hidden ${!mobileOpen ? "pointer-events-none" : ""}`}
              {...(!mobileOpen ? { inert: true } : {})}
            >
              <p id={mobileNavLabelId} className="sr-only">
                {navAria}
              </p>
              <div
                className={`ss-mobile-overlay absolute inset-0 backdrop-blur-sm transition-opacity motion-reduce:transition-none ${
                  mobileOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDuration: `${MENU_MS}ms`,
                  transitionTimingFunction: MENU_EASE,
                }}
                onClick={closeMobile}
              />
              <div
                id="mobile-main-nav"
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${navId}-drawer-title`}
                className={`ss-mobile-drawer absolute inset-y-0 right-0 z-[1] flex w-[min(22rem,calc(100vw-1rem))] max-w-full flex-col overflow-hidden border-l transition-[transform,box-shadow] motion-reduce:transform-none motion-reduce:transition-opacity ${
                  mobileOpen ? "translate-x-0" : "translate-x-full shadow-none"
                }`}
                style={{
                  transitionDuration: `${MENU_MS}ms`,
                  transitionTimingFunction: MENU_EASE,
                  paddingTop: "max(0.5rem, env(safe-area-inset-top))",
                  paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
                }}
              >
                <div
                  aria-hidden
                  className="h-0.5 w-full shrink-0 bg-gradient-to-r from-transparent via-[#E86B00] to-transparent"
                />

                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/12 px-4 py-3">
                  <Link
                    href="/"
                    onClick={closeMobile}
                    className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/50"
                  >
                    <Image
                      src="/logo-stop-scroll-white.png"
                      alt=""
                      width={80}
                      height={80}
                      className="h-8 w-auto object-contain"
                      sizes="32px"
                    />
                    <div className="min-w-0">
                      <p
                        id={`${navId}-drawer-title`}
                        className="truncate font-[family-name:var(--font-lilita-one)] text-base leading-none text-[#ffb074]"
                      >
                        {dict.nav.brand}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-slate-500">
                        {dict.nav.menuDrawerEyebrow}
                      </p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={closeMobile}
                    className="ss-mobile-close flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition"
                    aria-label={dict.nav.menuDrawerClose}
                  >
                    <X className="h-4 w-4" strokeWidth={iconStroke} aria-hidden />
                  </button>
                </div>

                <nav
                  aria-label={navAria}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
                >
                  {(() => {
                    const copy = mobileMenuCopy(locale);
                    const stagger = (i: number) => ({
                      transitionProperty: "transform, opacity",
                      transitionDuration: mobileOpen ? `${280 + i * 40}ms` : "160ms",
                      transitionDelay: mobileOpen
                        ? `${50 + i * 36}ms`
                        : `${(mobileLinks.length + 2 - i) * 24}ms`,
                      transitionTimingFunction: MENU_EASE,
                      ...(mobileOpen
                        ? { transform: "translateX(0)", opacity: 1 }
                        : { transform: "translateX(12px)", opacity: 0 }),
                    });

                    return (
                      <>
                        <div
                          className="ss-mobile-drawer-card mb-4 rounded-2xl border p-3 motion-reduce:transition-none"
                          style={stagger(0)}
                        >
                          <p className="mb-2.5 px-1 text-xs font-semibold text-slate-500">
                            {copy.prefs}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <ThemeToggle locale={locale} />
                            <DyslexicFontToggle locale={locale} appearance="light" />
                            <LanguageSwitcher current={locale} />
                          </div>
                        </div>

                        <div
                          className="ss-mobile-drawer-card mb-4 overflow-hidden rounded-2xl border motion-reduce:transition-none"
                          style={stagger(1)}
                        >
                          <p className="ss-mobile-drawer-card-header border-b px-3.5 py-2.5 text-xs font-semibold text-slate-500">
                            {copy.sections}
                          </p>
                          <ul className="flex flex-col gap-0.5 p-1.5">
                            <li>
                              <Link
                                href="/"
                                onClick={closeMobile}
                                tabIndex={mobileOpen ? undefined : -1}
                                className={mobileRowClass}
                              >
                                <span>{dict.nav.home}</span>
                                <MobileRowChevron />
                              </Link>
                            </li>
                            {mobileLinks.map((item) => (
                              <li key={item.targetId}>
                                <NavSectionLink
                                  targetId={item.targetId}
                                  tabIndex={mobileOpen ? undefined : -1}
                                  onAfterNavigate={closeMobile}
                                  className={
                                    item.targetId === "contact"
                                      ? `${mobileRowClass} ss-mobile-row-contact border`
                                      : mobileRowClass
                                  }
                                >
                                  <span>{item.label}</span>
                                  <MobileRowChevron />
                                </NavSectionLink>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div
                          className="ss-mobile-drawer-card rounded-2xl border p-1.5 motion-reduce:transition-none"
                          style={stagger(2)}
                        >
                          <p className="px-2.5 pb-1 pt-1 text-xs font-semibold text-slate-500">
                            {copy.legal}
                          </p>
                          <Link
                            href="/regles-du-jeu"
                            onClick={closeMobile}
                            tabIndex={mobileOpen ? undefined : -1}
                            className={mobileRowClass}
                          >
                            <span>{dict.nav.rules}</span>
                            <MobileRowChevron />
                          </Link>
                        </div>
                      </>
                    );
                  })()}
                </nav>

                <div className="shrink-0 border-t border-white/12 px-4 py-3">
                  <p className="text-center text-[11px] leading-relaxed text-slate-500">
                    {dict.footer.tagline}
                  </p>
                </div>
              </div>

            </div>,
            document.body,
          )
        : null}
    </>
  );
}
