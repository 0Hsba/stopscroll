/** Image Open Graph / aperçu de lien (WhatsApp, etc.) — `public/social preview.png`. */
export const SOCIAL_PREVIEW_IMAGE_PATH = "/social%20preview.png";

/** URL canonique du site (production). Surcharge : `NEXT_PUBLIC_SITE_URL`. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stop-scroll.com"
).replace(/\/$/, "");

export const SITE_NAME_SHORT = "StopScroll";
export const SITE_NAME_FULL = "StopScroll — Projet HEFP";

/** Email de contact du projet StopScroll. */
export const STOPSCROLL_CONTACT_EMAIL = "info@stop-scroll.com";
