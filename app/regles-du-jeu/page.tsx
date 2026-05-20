import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { iconStroke } from "@/components/section-icon-badge";

import { getDictionary } from "@/lib/dictionaries";
import { parseLocale } from "@/lib/locale";
import { SITE_NAME_SHORT, SITE_URL, SOCIAL_PREVIEW_IMAGE_PATH } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value);
  const d = getDictionary(locale);
  const ogLocale = locale === "fr" ? "fr_FR" : locale === "de" ? "de_DE" : "en_US";
  const pageUrl = `${SITE_URL}/regles-du-jeu`;
  const titles = { fr: "Règles du jeu", en: "Game Rules", de: "Spielregeln" };
  const descs = {
    fr: "Les règles complètes de Stop Scroll : déroulement d'un tour, catégories de cartes, modes solo et 2 joueurs, classement de fin de partie.",
    en: "The complete rules of Stop Scroll: turn structure, card categories, solo and 2-player modes, end-game ranking.",
    de: "Die vollständigen Regeln von Stop Scroll: Spielablauf, Kartenkategorien, Solo- und 2-Spieler-Modus, Endranking.",
  };
  const title = titles[locale] ?? titles.fr;
  const description = descs[locale] ?? descs.fr;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      locale: ogLocale,
      url: pageUrl,
      siteName: SITE_NAME_SHORT,
      title: `${title} | ${SITE_NAME_SHORT}`,
      description,
      images: [{ url: SOCIAL_PREVIEW_IMAGE_PATH, alt: `${SITE_NAME_SHORT} — ${title}` }],
    },
  };
}

// ─── Translations ─────────────────────────────────────────────────────────────

const content = {
  fr: {
    back: "Accueil",
    title: "Règles du jeu",
    subtitle: "Un jeu pensé pour les générations élevées aux réseaux sociaux, aux memes et au chaos d'internet.",
    badge: "Projet HEFP · +15 ans · 3 joueurs ou plus",
    sections: [
      {
        id: "deroulement",
        heading: "Déroulement d'un tour",
        content: [
          "À chaque tour, un joueur devient le Maître du Feed. Il pioche une carte Post et la lit à voix haute.",
          "Exemple : \"Le gouvernement ouvre un compte TikTok et annonce une réforme en faisant une danse Fortnite.\"",
          "Les autres joueurs choisissent la réponse la plus drôle, la plus absurde ou la plus parfaite parmi leurs 5 cartes Commentaire, puis les soumettent anonymement.",
          "Le Maître du Feed lit chaque commentaire à voix haute, comme un vrai fil de commentaires internet, puis choisit son préféré. Le joueur sélectionné remporte le tour et garde la carte Post.",
        ],
      },
      {
        id: "categories",
        heading: "Catégories de cartes",
        content: [
          "Chaque carte Commentaire appartient à une catégorie. Sous un même Post, les commentaires doivent appartenir à des catégories différentes.",
        ],
        list: ["Troll", "Hater", "Spam", "Boomer", "Bot", "Influenceur", "et d'autres…"],
        warning: "Si tu places deux commentaires de la même catégorie sous un même Post : tu perds immédiatement 1 PSM (Point de Santé Mentale) et ce post ne rapporte aucun point. Le feed est devenu toxique.",
      },
      {
        id: "fermer-post",
        heading: "Fermer un Post",
        content: [
          "À tout moment, tu peux décider de fermer un Post. Le Post est retiré du jeu.",
          "Tu gagnes +1 point pour chaque commentaire placé sous ce Post.",
          "Pioche ensuite immédiatement un nouveau Post afin d'en avoir toujours 5 actifs, si le paquet le permet.",
        ],
      },
      {
        id: "fin-de-partie",
        heading: "Fin de partie et classement",
        content: ["La partie n'a pas de limite de tours. Vous pouvez jouer jusqu'à l'épuisement mental, un fou rire collectif, ou jusqu'à ce que quelqu'un replonge sur TikTok."],
        ranking: [
          { range: "0–5 pts", label: "Utilisateur Facebook perdu" },
          { range: "6–10 pts", label: "Chroniquement en ligne" },
          { range: "11–15 pts", label: "Modérateur Reddit sous caféine" },
          { range: "16–20 pts", label: "Algorithme TikTok vivant" },
          { range: "20+ pts", label: "Zuckerberg en personne" },
        ],
      },
      {
        id: "2-joueurs",
        heading: "Partie à 2 joueurs",
        content: [
          "Le mode 2 joueurs se joue de la même manière que le mode multijoueur.",
          "Cependant, il n'y a pas de système de points : le but est simplement de créer les réponses les plus drôles possibles.",
        ],
      },
      {
        id: "solo",
        heading: "Mode Solo — Survie du Feed",
        content: [
          "Objectif : accumuler un maximum de points sans perdre tous tes PSM (Points de Santé Mentale).",
          "Tu commences avec 3 PSM et 5 cartes Post. Le paquet Commentaires est placé au centre de la table.",
          "Choisis l'un de tes 5 Posts actifs. Pioche une carte Commentaire et décide soit de la jouer sous un Post, soit de fermer ce Post.",
          "Les commentaires placés sous un même Post doivent appartenir à des catégories différentes. Sinon, tu perds 1 PSM et le Post ne rapporte aucun point.",
        ],
      },
    ],
    victory: "Le joueur qui possède le plus de cartes gagne la partie.",
  },
  en: {
    back: "Home",
    title: "Game Rules",
    subtitle: "A game designed for generations raised on social media, memes and internet chaos.",
    badge: "HEFP Project · 15+ years · 3+ players",
    sections: [
      {
        id: "turn",
        heading: "How to play a turn",
        content: [
          "Each turn, one player becomes the Feed Master. They draw a Post card and read it aloud.",
          "Example: \"The government opens a TikTok account and announces a reform while doing a Fortnite dance.\"",
          "All other players choose the funniest, most absurd or most fitting response from their 5 Comment cards and submit them anonymously.",
          "The Feed Master reads each comment aloud like a real internet comment thread, then picks their favourite. The selected player wins the round and keeps the Post card.",
        ],
      },
      {
        id: "categories",
        heading: "Card categories",
        content: [
          "Each Comment card belongs to a category. Comments placed under the same Post must belong to different categories.",
        ],
        list: ["Troll", "Hater", "Spam", "Boomer", "Bot", "Influencer", "and more…"],
        warning: "If you place two comments from the same category under the same Post: you immediately lose 1 MSP (Mental Sanity Point) and that Post scores zero points. The feed has gone toxic.",
      },
      {
        id: "close-post",
        heading: "Closing a Post",
        content: [
          "At any time, you can choose to close a Post. The Post is removed from the game.",
          "You gain +1 point for each comment placed under that Post.",
          "Draw a new Post immediately so you always have 5 active Posts (if the deck allows).",
        ],
      },
      {
        id: "end-game",
        heading: "End game and ranking",
        content: ["There is no turn limit. Play until collective mental exhaustion, a group laughing fit, or until someone falls back into their phone."],
        ranking: [
          { range: "0–5 pts", label: "Lost Facebook user" },
          { range: "6–10 pts", label: "Chronically online" },
          { range: "11–15 pts", label: "Caffeine-fuelled Reddit mod" },
          { range: "16–20 pts", label: "Living TikTok algorithm" },
          { range: "20+ pts", label: "Zuckerberg himself" },
        ],
      },
      {
        id: "2-players",
        heading: "2-player mode",
        content: [
          "The 2-player mode works the same way as multiplayer.",
          "However, there is no points system: the goal is simply to create the funniest responses possible.",
        ],
      },
      {
        id: "solo",
        heading: "Solo mode — Feed Survival",
        content: [
          "Goal: accumulate as many points as possible without losing all your MSP (Mental Sanity Points).",
          "You start with 3 MSP and 5 Post cards. The Comment deck is placed in the centre of the table.",
          "Choose one of your 5 active Posts. Draw a Comment card and decide to either play it under a Post or close that Post.",
          "Comments under the same Post must belong to different categories — otherwise you lose 1 MSP and the Post scores no points.",
        ],
      },
    ],
    victory: "The player with the most Post cards wins the game.",
  },
  de: {
    back: "Startseite",
    title: "Spielregeln",
    subtitle: "Ein Spiel für Generationen, die mit sozialen Medien, Memes und dem Internet-Chaos aufgewachsen sind.",
    badge: "HEFP-Projekt · ab 15 Jahren · ab 3 Spielern",
    sections: [
      {
        id: "spielzug",
        heading: "Ablauf eines Spielzugs",
        content: [
          "Jede Runde wird ein Spieler zum Feed-Master. Er zieht eine Post-Karte und liest sie laut vor.",
          "Beispiel: \"Die Regierung eröffnet einen TikTok-Account und kündigt eine Reform mit einem Fortnite-Tanz an.\"",
          "Alle anderen Spieler wählen die lustigste, absurdeste oder passendste Antwort aus ihren 5 Kommentar-Karten und reichen sie anonym ein.",
          "Der Feed-Master liest jeden Kommentar laut vor wie einen echten Internet-Kommentar-Thread und wählt dann seinen Favoriten. Der ausgewählte Spieler gewinnt die Runde und behält die Post-Karte.",
        ],
      },
      {
        id: "kategorien",
        heading: "Kartenkategorien",
        content: [
          "Jede Kommentar-Karte gehört zu einer Kategorie. Kommentare unter demselben Post müssen verschiedenen Kategorien angehören.",
        ],
        list: ["Troll", "Hater", "Spam", "Boomer", "Bot", "Influencer", "und weitere…"],
        warning: "Wenn du zwei Kommentare derselben Kategorie unter denselben Post legst: Du verlierst sofort 1 GGP (Geistige Gesundheitspunkt) und dieser Post bringt keine Punkte. Der Feed ist toxisch geworden.",
      },
      {
        id: "post-schliessen",
        heading: "Einen Post schliessen",
        content: [
          "Du kannst jederzeit entscheiden, einen Post zu schliessen. Der Post wird aus dem Spiel entfernt.",
          "Du erhältst +1 Punkt für jeden Kommentar, der unter diesem Post liegt.",
          "Ziehe sofort eine neue Post-Karte, damit du immer 5 aktive Posts hast (falls der Stapel es erlaubt).",
        ],
      },
      {
        id: "spielende",
        heading: "Spielende und Rangliste",
        content: ["Es gibt kein Rundenlimit. Gespielt wird bis zur kollektiven mentalen Erschöpfung, einem Lachanfall oder bis jemand wieder auf sein Handy verfällt."],
        ranking: [
          { range: "0–5 Pkt.", label: "Verlorener Facebook-Nutzer" },
          { range: "6–10 Pkt.", label: "Chronisch online" },
          { range: "11–15 Pkt.", label: "Reddit-Moderator unter Koffein" },
          { range: "16–20 Pkt.", label: "Lebendiger TikTok-Algorithmus" },
          { range: "20+ Pkt.", label: "Zuckerberg persönlich" },
        ],
      },
      {
        id: "2-spieler",
        heading: "2-Spieler-Modus",
        content: [
          "Der 2-Spieler-Modus funktioniert genauso wie der Mehrspielermodus.",
          "Es gibt jedoch kein Punktesystem: Das Ziel ist einfach, die lustigsten Antworten zu kreieren.",
        ],
      },
      {
        id: "solo",
        heading: "Solo-Modus — Feed-Überleben",
        content: [
          "Ziel: Sammle so viele Punkte wie möglich, ohne alle deine GGP zu verlieren.",
          "Du startest mit 3 GGP und 5 Post-Karten. Der Kommentar-Stapel liegt in der Mitte des Tisches.",
          "Wähle einen deiner 5 aktiven Posts. Ziehe eine Kommentar-Karte und entscheide: Lege sie unter einen Post oder schliesse den Post.",
          "Kommentare unter demselben Post müssen verschiedenen Kategorien angehören — sonst verlierst du 1 GGP und der Post bringt keine Punkte.",
        ],
      },
    ],
    victory: "Der Spieler mit den meisten Post-Karten gewinnt das Spiel.",
  },
} as const;

type Locale = "fr" | "en" | "de";

type Section = {
  id: string;
  heading: string;
  content: readonly string[];
  list?: readonly string[];
  warning?: string;
  ranking?: readonly { range: string; label: string }[];
};

function RulesSection({ section, index }: { section: Section; index: number }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E86B00]/10 text-sm font-bold text-[#E86B00] ring-1 ring-[#E86B00]/20">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-slate-900">{section.heading}</h2>

          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
            {section.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {section.list && (
            <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {section.list.map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E86B00]" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.warning && (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">Attention : </span>{section.warning}
            </div>
          )}

          {section.ranking && (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
              {section.ranking.map((row, i) => (
                <div key={i} className={`flex items-center gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <span className="w-20 shrink-0 font-bold text-[#E86B00]">{row.range}</span>
                  <span className="text-slate-700">{row.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default async function RulesPage() {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get("ss_locale")?.value) as Locale;
  const dict = getDictionary(locale);
  const t = content[locale] ?? content.fr;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <article className="rounded-2xl bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5 sm:p-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E86B00] hover:underline">
          <ArrowLeft className="h-4 w-4" strokeWidth={iconStroke} aria-hidden />
          {t.back}
        </Link>

        <div className="mt-6">
          <SectionEyebrow align="start" tone="light">
            {t.badge}
          </SectionEyebrow>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">{t.title}</h1>
          <p className="mt-2 text-base text-slate-500">{t.subtitle}</p>
        </div>

        {/* Table of contents */}
        <nav className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4" aria-label={locale === "fr" ? "Sommaire" : locale === "de" ? "Inhaltsverzeichnis" : "Table of contents"}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">{locale === "fr" ? "Sommaire" : locale === "de" ? "Inhalt" : "Contents"}</p>
          <ol className="space-y-1">
            {t.sections.map((section, i) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#E86B00] transition-colors">
                  <span className="text-xs font-bold text-[#E86B00]">{i + 1}.</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="mt-10 space-y-10 divide-y divide-slate-100">
          {t.sections.map((section, i) => (
            <div key={section.id} className={i > 0 ? "pt-10" : ""}>
              <RulesSection section={section as Section} index={i} />
            </div>
          ))}
        </div>

        {/* Victory banner */}
        <div className="mt-10 rounded-xl bg-[#E86B00] px-6 py-5 text-center">
          <p className="text-base font-extrabold uppercase tracking-wide text-white">{t.victory}</p>
        </div>

        {/* Back link */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E86B00] hover:underline">
            <ArrowLeft className="h-4 w-4" strokeWidth={iconStroke} aria-hidden />
            {t.back}
          </Link>
        </div>
      </article>
    </div>
  );
}
