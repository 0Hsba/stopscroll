import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { iconStroke } from "@/components/section-icon-badge";
import { getDictionary } from "@/lib/dictionaries";
import { parseLocale } from "@/lib/locale";
import {
  STOPSCROLL_CONTACT_EMAIL,
  SITE_NAME_SHORT,
  SITE_URL,
  SOCIAL_PREVIEW_IMAGE_PATH,
} from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value);
  const d = getDictionary(locale);
  const ogLocale =
    locale === "fr" ? "fr_FR" : locale === "de" ? "de_DE" : "en_US";
  const pageUrl = `${SITE_URL}/politique-confidentialite`;
  const ogTitle = `${d.privacy.metaTitle} | ${SITE_NAME_SHORT}`;

  return {
    title: d.privacy.metaTitle,
    description: d.privacy.metaDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      locale: ogLocale,
      url: pageUrl,
      siteName: SITE_NAME_SHORT,
      title: ogTitle,
      description: d.privacy.metaDescription,
      images: [{ url: SOCIAL_PREVIEW_IMAGE_PATH, alt: `${SITE_NAME_SHORT} · ${d.privacy.metaTitle}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: d.privacy.metaDescription,
      images: [SOCIAL_PREVIEW_IMAGE_PATH],
    },
  };
}

export default async function PrivacyPage() {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value);
  const dict = getDictionary(locale);
  const { privacy } = dict;

  const contactHref = `mailto:${STOPSCROLL_CONTACT_EMAIL}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <article className="rounded-2xl bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E86B00] hover:underline">
          <ArrowLeft className="h-4 w-4" strokeWidth={iconStroke} aria-hidden />
          {dict.nav.home}
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold text-slate-900">{privacy.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{privacy.updated}</p>
        <p className="mt-6 text-base leading-relaxed text-slate-700">{privacy.intro}</p>

        <div className="mt-10 flex flex-col gap-8">
          {/* Responsable du traitement */}
          <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-bold text-slate-900">{privacy.dataController.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{privacy.dataController.lead}</p>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{privacy.dataController.contactLabel}</p>
              <a
                href={contactHref}
                className="mt-1 inline-block text-sm font-semibold text-[#E86B00] underline-offset-2 hover:underline break-all"
                aria-label={privacy.dataController.emailAria}
              >
                {STOPSCROLL_CONTACT_EMAIL}
              </a>
            </div>
          </section>

          {/* Sections */}
          {privacy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-base font-bold text-slate-900">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-[#E86B00]/20 bg-orange-50 p-4 text-sm text-slate-700">
          {privacy.contactNote}{" "}
          <a href={contactHref} className="font-semibold text-[#E86B00] hover:underline break-all">
            {STOPSCROLL_CONTACT_EMAIL}
          </a>
        </div>
      </article>
    </div>
  );
}
