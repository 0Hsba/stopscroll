import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Fredoka, Geist_Mono, Lilita_One } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lilitaOne = Lilita_One({
  variable: "--font-lilita-one",
  subsets: ["latin"],
  weight: "400",
});

import { ChatbotWidget } from "@/components/chatbot-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/dictionaries";
import { parseLocale } from "@/lib/locale";
import { SITE_NAME_SHORT, SITE_URL, SOCIAL_PREVIEW_IMAGE_PATH } from "@/lib/site";


export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value);
  const d = getDictionary(locale);
  const ogLocale =
    locale === "fr" ? "fr_FR" : locale === "de" ? "de_DE" : "en_US";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: d.meta.title,
      template: `%s | ${SITE_NAME_SHORT}`,
    },
    description: d.meta.description,
    applicationName: SITE_NAME_SHORT,
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "fr" ? ["en_US", "de_DE"] : locale === "de" ? ["fr_FR", "en_US"] : ["fr_FR", "de_DE"],
      url: SITE_URL,
      siteName: SITE_NAME_SHORT,
      title: d.meta.title,
      description: d.meta.description,
      images: [
        {
          url: SOCIAL_PREVIEW_IMAGE_PATH,
          alt: `${SITE_NAME_SHORT} · Projet HEFP`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: [SOCIAL_PREVIEW_IMAGE_PATH],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a1f2e",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value);
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistMono.variable} ${fredoka.variable} ${lilitaOne.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      {/* Script synchrone dans <head> : s'exécute avant TOUT le reste, avant que
          le navigateur restaure la position de scroll. C'est le seul endroit fiable. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              history.scrollRestoration='manual';
              try {
                var t = localStorage.getItem('ss-theme');
                var theme = t === 'light' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
                if (theme === 'light') {
                  document.documentElement.classList.add('light-theme');
                } else {
                  document.documentElement.classList.remove('light-theme');
                }
                var d = localStorage.getItem('ss-dyslexic');
                if (d === '1') {
                  document.documentElement.classList.add('ss-dyslexic');
                }
              } catch(e){}
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SmoothScrollProvider>
            <ScrollToTop />
            <SiteHeader locale={locale} dict={dict} />
            <main className="flex-1">{children}</main>
            <SiteFooter dict={dict} />
            <ChatbotWidget locale={locale} />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
