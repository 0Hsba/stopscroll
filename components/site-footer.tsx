import Image from "next/image";
import Link from "next/link";

import { NavSectionLink } from "@/components/nav-section-link";
import { PrivacyPolicyFooterLink } from "@/components/privacy-policy-footer-link";
import type { Dictionary } from "@/lib/dictionaries";
import { STOPSCROLL_CONTACT_EMAIL } from "@/lib/site";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

const footerLinkCn =
  "inline-block rounded-sm text-[15px] leading-snug text-slate-400 transition-colors hover:text-[#ffb074] focus-visible:text-[#ffb074] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b14]";

type Props = {
  dict: Dictionary;
};

export function SiteFooter({ dict }: Props) {
  const siteLinks = [
    { targetId: "a-propos", label: dict.nav.about },
    { targetId: "notre-jeu", label: dict.nav.game },
    { targetId: "demo", label: dict.nav.demo },
    { targetId: "avis", label: dict.nav.reviews },
    { targetId: "prevention", label: dict.nav.prevention },
    { targetId: "faq", label: dict.nav.faq },
    { targetId: "contact", label: dict.nav.contact },
  ] as const;

  return (
    <footer
      className="ss-footer mt-auto border-t border-white/[0.06]"
      style={{ backgroundColor: "var(--ss-footer-bg)" }}
      aria-label={dict.footer.landmarkAriaLabel}
    >
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-[#E86B00]/50 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="relative block w-fit shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b14]"
              aria-label={dict.nav.brand}
            >
              <Image
                src="/logo-stop-scroll-white.png"
                alt=""
                width={1000}
                height={1000}
                className="h-10 w-auto object-contain object-left sm:h-11"
                sizes="120px"
              />
            </Link>

            <p className="max-w-md text-base leading-relaxed text-slate-400">
              {dict.footer.tagline}
            </p>

            <div className="ss-footer-card max-w-md rounded-2xl border p-5">
              <p className="text-sm leading-relaxed text-slate-500">
                {dict.footer.contactEmailLead}
              </p>
              <a
                href={`mailto:${STOPSCROLL_CONTACT_EMAIL}`}
                className="mt-3 inline-flex items-center gap-2.5 text-base font-semibold text-[#ffb074] transition-colors hover:text-[#ffc896] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b14]"
                aria-label={dict.footer.contactEmailAria}
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                <span>{dict.footer.contactEmailDisplay}</span>
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            <nav aria-labelledby="footer-nav-heading" className="min-w-0">
              <h2
                id="footer-nav-heading"
                className="mb-4 text-sm font-bold text-white"
              >
                {dict.footer.columnNavigationHeading}
              </h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                <li>
                  <Link href="/" className={footerLinkCn}>
                    {dict.nav.home}
                  </Link>
                </li>
                {siteLinks.map((item) => (
                  <li key={item.targetId}>
                    <NavSectionLink
                      targetId={item.targetId}
                      className={footerLinkCn}
                    >
                      {item.label}
                    </NavSectionLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-legal-heading" className="min-w-0">
              <h2
                id="footer-legal-heading"
                className="mb-4 text-sm font-bold text-white"
              >
                {dict.footer.columnLegalHeading}
              </h2>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/regles-du-jeu" className={footerLinkCn}>
                    {dict.footer.rulesLabel}
                  </Link>
                </li>
                <li>
                  <PrivacyPolicyFooterLink className={footerLinkCn}>
                    {dict.footer.privacyLabel}
                  </PrivacyPolicyFooterLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div
        className="border-t px-4 py-5 sm:px-8"
        style={{ borderTopColor: "var(--ss-footer-border)" }}
      >
        <p className="mx-auto max-w-6xl text-center text-sm leading-relaxed text-slate-500">
          {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
