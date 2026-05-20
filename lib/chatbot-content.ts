import type { Locale } from "@/lib/locale";
import { STOPSCROLL_CONTACT_EMAIL } from "@/lib/site";

export type ChatbotChoice = {
  id: string;
  label: string;
  reply: string;
  /** Node to show choices from after this reply; omit to only offer « back to menu » */
  next?: string;
  href?: string;
  hrefLabel?: string;
};

export type ChatbotNode = {
  intro?: string;
  choices: ChatbotChoice[];
};

export type ChatbotContent = {
  bubbleText: string;
  panelTitle: string;
  fabAria: string;
  closeAria: string;
  dismissBubbleAria: string;
  backToMenu: string;
  contactCta: string;
  welcome: string;
  menuPrompt: string;
  typingHint: string;
  nodes: Record<string, ChatbotNode>;
};

const fr: ChatbotContent = {
  bubbleText: "Vous avez une question ?",
  panelTitle: "Assistant StopScroll",
  fabAria: "Ouvrir l’assistant StopScroll",
  closeAria: "Fermer l’assistant",
  dismissBubbleAria: "Masquer le message",
  backToMenu: "Autre question",
  contactCta: "Écrire au projet",
  welcome:
    "Bonjour ! Je peux vous orienter sur StopScroll, le jeu de cartes, les règles ou la prévention numérique.",
  menuPrompt: "Que souhaitez-vous savoir ?",
  typingHint: "Rédaction en cours…",
  nodes: {
    menu: {
      choices: [
        {
          id: "about",
          label: "C’est quoi StopScroll ?",
          reply:
            "StopScroll est un projet pédagogique inter-écoles (HEFP, CEFF Industrie, DIVTEC Porrentruy, Lycée technique de Bienne). L’objectif : sensibiliser aux réseaux sociaux par le jeu et l’humour, sans culpabiliser.",
          next: "about_more",
        },
        {
          id: "game",
          label: "Comment fonctionne le jeu ?",
          reply:
            "C’est un jeu de cartes type « Maître du Feed » : un Post est lu, chacun joue un Commentaire anonyme, le maître choisit le plus drôle. On remporte des Posts ; le joueur avec le plus de Posts gagne.",
          next: "game_more",
        },
        {
          id: "rules",
          label: "Règles du jeu",
          reply:
            "Le jeu se joue à partir de 3 joueurs (modes solo et 2 joueurs aussi). Une partie dure environ 20 à 45 minutes, dès 15 ans. Les règles complètes sont détaillées sur une page dédiée.",
          next: "rules_more",
        },
        {
          id: "prevention",
          label: "Prévention & écrans",
          reply:
            "L’idée n’est pas d’interdire les réseaux, mais de reprendre le contrôle : plages sans écran, notifications limitées, intention avant d’ouvrir une app, retirer les apps addictives de l’accueil…",
          next: "prevention_more",
        },
        {
          id: "contact",
          label: "Contacter l’équipe",
          reply:
            "Pour une question précise ou suivre le projet, utilisez le formulaire de contact sur le site ou écrivez-nous par e-mail.",
          next: "contact_more",
        },
      ],
    },
    about_more: {
      intro: "Sur le projet :",
      choices: [
        {
          id: "about_goal",
          label: "Quels sont les objectifs ?",
          reply:
            "Questionner notre rapport aux réseaux, proposer une sensibilisation ludique et accessible, et ouvrir le dialogue grâce à l’humour plutôt qu’au discours moralisateur.",
        },
        {
          id: "about_who",
          label: "Pour qui ?",
          reply:
            "Élèves, enseignants et toute personne qui veut réfléchir à son usage des réseaux sociaux de façon concrète.",
        },
        {
          id: "about_schools",
          label: "Quelles écoles ?",
          reply:
            "HEFP (porteur), CEFF Industrie, DIVTEC Porrentruy et le Lycée technique de Bienne collaborent sur le projet.",
        },
      ],
    },
    game_more: {
      intro: "Sur le jeu :",
      choices: [
        {
          id: "game_players",
          label: "Combien de joueurs ?",
          reply:
            "3 joueurs ou plus en mode classique. Des variantes solo (« Survie du Feed ») et à 2 joueurs sont aussi prévues.",
        },
        {
          id: "game_time",
          label: "Durée & âge",
          reply: "Comptez 20 à 45 minutes par partie. Le jeu est pensé à partir de 15 ans.",
        },
        {
          id: "game_goal",
          label: "But pédagogique",
          reply:
            "Faire prendre conscience des excès des interactions en ligne en rejouant des situations absurdes inspirées du web.",
        },
        {
          id: "game_section",
          label: "Voir la section « Notre jeu »",
          reply: "La page d’accueil détaille le déroulement et des exemples de cartes.",
          href: "/#notre-jeu",
          hrefLabel: "Aller à Notre jeu",
        },
      ],
    },
    rules_more: {
      intro: "Règles & modes :",
      choices: [
        {
          id: "rules_turn",
          label: "Déroulement d’un tour",
          reply:
            "Le Maître du Feed pioche et lit un Post. Les autres déposent un Commentaire anonyme. Il lit tout à voix haute, choisit son favori : ce joueur garde le Post.",
        },
        {
          id: "rules_win",
          label: "Comment gagner ?",
          reply: "Celui qui accumule le plus de cartes Post remportées gagne la partie.",
        },
        {
          id: "rules_page",
          label: "Règles complètes (PDF web)",
          reply: "Tout est expliqué pas à pas sur la page Règles du jeu.",
          href: "/regles-du-jeu",
          hrefLabel: "Lire les règles",
        },
      ],
    },
    prevention_more: {
      intro: "Prévention :",
      choices: [
        {
          id: "prev_tips",
          label: "Conseils anti-scroll",
          reply:
            "Fixez des plages sans écran, coupez les notifications non essentielles, posez-vous une intention avant d’ouvrir une app, utilisez un minuteur de 15 minutes par session.",
        },
        {
          id: "prev_signs",
          label: "Signaux d’alerte",
          reply:
            "Perte de la notion du temps en ligne, réflexe de déverrouiller le téléphone, difficulté à se concentrer sans stimulation constante.",
        },
        {
          id: "prev_section",
          label: "Section Prévention",
          reply: "Retrouvez ces messages sur la page d’accueil, section Prévention.",
          href: "/#prevention",
          hrefLabel: "Voir la prévention",
        },
      ],
    },
    contact_more: {
      intro: "Contact :",
      choices: [
        {
          id: "contact_form",
          label: "Formulaire sur le site",
          reply: "Descendez jusqu’à la section Contact pour envoyer un message à l’équipe.",
          href: "/#contact",
          hrefLabel: "Aller au formulaire",
        },
        {
          id: "contact_email",
          label: "E-mail du projet",
          reply: `Vous pouvez aussi nous écrire à ${STOPSCROLL_CONTACT_EMAIL}.`,
          href: `mailto:${STOPSCROLL_CONTACT_EMAIL}`,
          hrefLabel: STOPSCROLL_CONTACT_EMAIL,
        },
        {
          id: "contact_faq",
          label: "FAQ du site",
          reply: "La FAQ en bas de page regroupe d’autres réponses fréquentes.",
          href: "/#faq",
          hrefLabel: "Voir la FAQ",
        },
      ],
    },
  },
};

const en: ChatbotContent = {
  bubbleText: "Got a question?",
  panelTitle: "StopScroll Assistant",
  fabAria: "Open StopScroll assistant",
  closeAria: "Close assistant",
  dismissBubbleAria: "Dismiss message",
  backToMenu: "Another question",
  contactCta: "Email the team",
  welcome:
    "Hi! I can help with StopScroll, the card game, rules, or digital wellbeing tips.",
  menuPrompt: "What would you like to know?",
  typingHint: "Typing…",
  nodes: {
    menu: {
      choices: [
        {
          id: "about",
          label: "What is StopScroll?",
          reply:
            "StopScroll is an inter-school educational project (HEFP, CEFF Industrie, DIVTEC Porrentruy, Bienne technical high school). It raises awareness about social media through play and humor — without shaming users.",
          next: "about_more",
        },
        {
          id: "game",
          label: "How does the game work?",
          reply:
            "It’s a card game like “Feed Master”: one Post is read, everyone plays an anonymous Comment, the master picks the funniest. You collect Posts; most Posts wins.",
          next: "game_more",
        },
        {
          id: "rules",
          label: "Game rules",
          reply:
            "Play from 3 players (solo and 2-player modes too). A game lasts about 20–45 minutes, ages 15+. Full rules are on a dedicated page.",
          next: "rules_more",
        },
        {
          id: "prevention",
          label: "Prevention & screens",
          reply:
            "The goal isn’t to ban social media but to regain control: screen-free slots, fewer notifications, intention before opening an app, move addictive apps off the home screen…",
          next: "prevention_more",
        },
        {
          id: "contact",
          label: "Contact the team",
          reply:
            "For a specific question or project updates, use the site contact form or email us.",
          next: "contact_more",
        },
      ],
    },
    about_more: {
      intro: "About the project:",
      choices: [
        {
          id: "about_goal",
          label: "What are the goals?",
          reply:
            "Question our relationship with networks, offer playful accessible awareness, and open dialogue through humor rather than guilt.",
        },
        {
          id: "about_who",
          label: "Who is it for?",
          reply:
            "Students, teachers, and anyone who wants to reflect on social media use in a practical way.",
        },
        {
          id: "about_schools",
          label: "Which schools?",
          reply:
            "HEFP (lead), CEFF Industrie, DIVTEC Porrentruy, and Bienne technical high school collaborate on the project.",
        },
      ],
    },
    game_more: {
      intro: "About the game:",
      choices: [
        {
          id: "game_players",
          label: "How many players?",
          reply:
            "3 or more in classic mode. Solo (“Feed Survival”) and 2-player variants are also planned.",
        },
        {
          id: "game_time",
          label: "Duration & age",
          reply: "Allow 20–45 minutes per game. Designed for ages 15+.",
        },
        {
          id: "game_goal",
          label: "Educational goal",
          reply:
            "Build awareness of excessive online interactions by replaying absurd situations inspired by the web.",
        },
        {
          id: "game_section",
          label: "See “Our game” section",
          reply: "The homepage explains the flow and shows sample cards.",
          href: "/#notre-jeu",
          hrefLabel: "Go to Our game",
        },
      ],
    },
    rules_more: {
      intro: "Rules & modes:",
      choices: [
        {
          id: "rules_turn",
          label: "How a turn works",
          reply:
            "Feed Master draws and reads a Post. Others submit an anonymous Comment. They read all aloud and pick a favorite; that player keeps the Post.",
        },
        {
          id: "rules_win",
          label: "How to win?",
          reply: "Whoever collects the most Post cards wins.",
        },
        {
          id: "rules_page",
          label: "Full rules online",
          reply: "Step-by-step rules are on the Game rules page.",
          href: "/regles-du-jeu",
          hrefLabel: "Read the rules",
        },
      ],
    },
    prevention_more: {
      intro: "Prevention:",
      choices: [
        {
          id: "prev_tips",
          label: "Anti-scroll tips",
          reply:
            "Set screen-free times, mute non-essential notifications, decide why you open an app, use a 15-minute session timer.",
        },
        {
          id: "prev_signs",
          label: "Warning signs",
          reply:
            "Losing track of time online, unlocking your phone on autopilot, struggling to focus without constant stimulation.",
        },
        {
          id: "prev_section",
          label: "Prevention section",
          reply: "Find these messages on the homepage Prevention section.",
          href: "/#prevention",
          hrefLabel: "View prevention",
        },
      ],
    },
    contact_more: {
      intro: "Contact:",
      choices: [
        {
          id: "contact_form",
          label: "Site contact form",
          reply: "Scroll to the Contact section to message the team.",
          href: "/#contact",
          hrefLabel: "Go to contact form",
        },
        {
          id: "contact_email",
          label: "Project email",
          reply: `You can also write to ${STOPSCROLL_CONTACT_EMAIL}.`,
          href: `mailto:${STOPSCROLL_CONTACT_EMAIL}`,
          hrefLabel: STOPSCROLL_CONTACT_EMAIL,
        },
        {
          id: "contact_faq",
          label: "Site FAQ",
          reply: "The FAQ at the bottom of the page answers other common questions.",
          href: "/#faq",
          hrefLabel: "View FAQ",
        },
      ],
    },
  },
};

const de: ChatbotContent = {
  bubbleText: "Haben Sie eine Frage?",
  panelTitle: "StopScroll-Assistent",
  fabAria: "StopScroll-Assistent öffnen",
  closeAria: "Assistent schließen",
  dismissBubbleAria: "Nachricht ausblenden",
  backToMenu: "Weitere Frage",
  contactCta: "Team kontaktieren",
  welcome:
    "Hallo! Ich helfe bei Fragen zu StopScroll, dem Kartenspiel, den Regeln oder digitaler Prävention.",
  menuPrompt: "Wobei kann ich helfen?",
  typingHint: "Antwort wird geschrieben…",
  nodes: {
    menu: {
      choices: [
        {
          id: "about",
          label: "Was ist StopScroll?",
          reply:
            "StopScroll ist ein schulübergreifendes Bildungsprojekt (HEFP, CEFF Industrie, DIVTEC Porrentruy, Technische Schule Biel). Ziel: Sensibilisierung für soziale Medien durch Spiel und Humor — ohne Schuldgefühle.",
          next: "about_more",
        },
        {
          id: "game",
          label: "Wie funktioniert das Spiel?",
          reply:
            "Ein Kartenspiel à la «Feed-Meister»: ein Post wird vorgelesen, alle legen einen anonymen Kommentar, der Meister wählt den lustigsten. Posts sammeln — die meisten Posts gewinnen.",
          next: "game_more",
        },
        {
          id: "rules",
          label: "Spielregeln",
          reply:
            "Ab 3 Spielern (auch Solo- und 2-Spieler-Modi). Etwa 20–45 Minuten, ab 15 Jahren. Die vollständigen Regeln stehen auf einer eigenen Seite.",
          next: "rules_more",
        },
        {
          id: "prevention",
          label: "Prävention & Bildschirmzeit",
          reply:
            "Es geht nicht um ein Verbot, sondern um Kontrolle: bildschirmfreie Zeiten, weniger Benachrichtigungen, Absicht vor dem App-Öffnen, süchtig machende Apps vom Startbildschirm entfernen…",
          next: "prevention_more",
        },
        {
          id: "contact",
          label: "Team kontaktieren",
          reply:
            "Für konkrete Fragen oder Projekt-Updates nutzen Sie das Kontaktformular oder schreiben Sie uns per E-Mail.",
          next: "contact_more",
        },
      ],
    },
    about_more: {
      intro: "Zum Projekt:",
      choices: [
        {
          id: "about_goal",
          label: "Welche Ziele?",
          reply:
            "Den Umgang mit Netzwerken hinterfragen, spielerisch sensibilisieren und durch Humor statt Moralpredigt ins Gespräch kommen.",
        },
        {
          id: "about_who",
          label: "Für wen?",
          reply:
            "Schüler, Lehrpersonen und alle, die ihren Medienkonsum praxisnah reflektieren möchten.",
        },
        {
          id: "about_schools",
          label: "Welche Schulen?",
          reply:
            "HEFP (Träger), CEFF Industrie, DIVTEC Porrentruy und die Technische Schule Biel arbeiten zusammen.",
        },
      ],
    },
    game_more: {
      intro: "Zum Spiel:",
      choices: [
        {
          id: "game_players",
          label: "Wie viele Spieler?",
          reply:
            "3 oder mehr im Klassik-Modus. Solo («Feed-Überleben») und 2-Spieler-Varianten sind ebenfalls vorgesehen.",
        },
        {
          id: "game_time",
          label: "Dauer & Alter",
          reply: "Rechnen Sie mit 20–45 Minuten pro Partie. Ab 15 Jahren gedacht.",
        },
        {
          id: "game_goal",
          label: "Pädagogisches Ziel",
          reply:
            "Bewusstsein für exzessive Online-Interaktionen durch absurde, am Web inspirierte Situationen.",
        },
        {
          id: "game_section",
          label: "Abschnitt «Unser Spiel»",
          reply: "Die Startseite erklärt den Ablauf und zeigt Beispielkarten.",
          href: "/#notre-jeu",
          hrefLabel: "Zu Unser Spiel",
        },
      ],
    },
    rules_more: {
      intro: "Regeln & Modi:",
      choices: [
        {
          id: "rules_turn",
          label: "Ablauf einer Runde",
          reply:
            "Der Feed-Meister zieht und liest einen Post. Die anderen legen einen anonymen Kommentar. Alles wird vorgelesen, ein Favorit gewählt — dieser Spieler behält den Post.",
        },
        {
          id: "rules_win",
          label: "Wie gewinnt man?",
          reply: "Wer die meisten Post-Karten gesammelt hat, gewinnt.",
        },
        {
          id: "rules_page",
          label: "Vollständige Regeln",
          reply: "Schritt für Schritt auf der Seite Spielregeln.",
          href: "/regles-du-jeu",
          hrefLabel: "Regeln lesen",
        },
      ],
    },
    prevention_more: {
      intro: "Prävention:",
      choices: [
        {
          id: "prev_tips",
          label: "Tipps gegen Scrollen",
          reply:
            "Bildschirmfreie Zeiten, unnötige Benachrichtigungen aus, Absicht vor dem Öffnen einer App, 15-Minuten-Timer pro Session.",
        },
        {
          id: "prev_signs",
          label: "Warnsignale",
          reply:
            "Zeitgefühl verlieren, Handy reflexhaft entsperren, Schwierigkeit sich ohne ständige Reize zu konzentrieren.",
        },
        {
          id: "prev_section",
          label: "Präventions-Abschnitt",
          reply: "Diese Inhalte finden Sie auf der Startseite unter Prävention.",
          href: "/#prevention",
          hrefLabel: "Zur Prävention",
        },
      ],
    },
    contact_more: {
      intro: "Kontakt:",
      choices: [
        {
          id: "contact_form",
          label: "Kontaktformular",
          reply: "Scrollen Sie zum Kontakt-Abschnitt, um dem Team zu schreiben.",
          href: "/#contact",
          hrefLabel: "Zum Formular",
        },
        {
          id: "contact_email",
          label: "Projekt-E-Mail",
          reply: `Sie können uns auch unter ${STOPSCROLL_CONTACT_EMAIL} erreichen.`,
          href: `mailto:${STOPSCROLL_CONTACT_EMAIL}`,
          hrefLabel: STOPSCROLL_CONTACT_EMAIL,
        },
        {
          id: "contact_faq",
          label: "FAQ der Website",
          reply: "Die FAQ am Seitenende beantwortet weitere häufige Fragen.",
          href: "/#faq",
          hrefLabel: "FAQ ansehen",
        },
      ],
    },
  },
};

export function getChatbotContent(locale: Locale): ChatbotContent {
  if (locale === "en") return en;
  if (locale === "de") return de;
  return fr;
}
