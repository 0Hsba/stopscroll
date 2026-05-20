export type Locale = "fr" | "en" | "de";

export const defaultLocale: Locale = "fr";

export const locales: Locale[] = ["fr", "en", "de"];

export const localeLabels: Record<Locale, { short: string; full: string; flag: string }> = {
  fr: { short: "FR", full: "Français", flag: "🇫🇷" },
  en: { short: "EN", full: "English",  flag: "🇬🇧" },
  de: { short: "DE", full: "Deutsch",  flag: "🇩🇪" },
};

export function parseLocale(raw: string | undefined): Locale {
  if (raw === "en" || raw === "de") return raw;
  return "fr";
}
