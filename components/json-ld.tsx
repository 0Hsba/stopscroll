import { SITE_NAME_FULL, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/locale";

type Props = {
  locale: Locale;
  /** Meta description courante (cohérente avec la balise meta). */
  description: string;
};

/** Données structurées Schema.org : site + organisation (référencement). */
export function JsonLd({ locale, description }: Props) {
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME_FULL,
        url: SITE_URL,
        inLanguage:
          locale === "fr" ? "fr-FR" : locale === "de" ? "de-DE" : "en-US",
        description,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "StopScroll",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-stop-scroll-white.png`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}



