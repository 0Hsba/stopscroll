import type { Locale } from "./locale";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    privacy: string;
    about: string;
    game: string;
    prevention: string;
    demo: string;
    faq: string;
    reviews: string;
    brand: string;
    contact: string;
    menuOpenAria: string;
    menuCloseAria: string;
    menuDrawerEyebrow: string;
    menuDrawerClose: string;
    rules: string;
  };
  home: {
    eyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaAbout: string;
    ctaGame: string;
    scrollHint: string;
    heroStepsAriaLabel: string;
    heroSteps: [string, string, string];
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonialsLead: string;
    testimonials: ReadonlyArray<{
      quote: string;
      author: string;
      context: string;
      rating: number;
    }>;
    faqEyebrow: string;
    faqTitle: string;
    faqLead: string;
    faqItems: ReadonlyArray<{ q: string; a: string }>;
    heroCards: {
      topLeft:     { tag: string; text: string; sub: string };
      bottomLeft:  { tag: string; text: string; sub: string };
      topRight:    { tag: string; text: string; sub: string };
      bottomRight: { tag: string; text: string; sub: string };
      mobilePost:  { tag: string; text: string; sub: string };
      mobileReply: { tag: string; text: string; sub: string };
    };
  };
  footer: {
    tagline: string;
    landmarkAriaLabel: string;
    columnBrandHeading: string;
    columnNavigationHeading: string;
    columnContactHeading: string;
    columnLegalHeading: string;
    contactEmailLead: string;
    privacyLabel: string;
    rulesLabel: string;
    contactEmailDisplay: string;
    contactEmailAria: string;
    rights: string;
  };
  privacy: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    updated: string;
    intro: string;
    dataController: {
      heading: string;
      lead: string;
      contactLabel: string;
      emailAria: string;
    };
    sections: Array<{ heading: string; body: string }>;
    contactNote: string;
  };
};

const fr: Dictionary = {
  meta: {
    title: "StopScroll - Sensibilisation à l'économie de l'attention",
    description:
      "StopScroll transforme les dérives des réseaux sociaux en une expérience drôle, critique et pédagogique pour casser les automatismes du scroll infini.",
  },
  nav: {
    home: "Accueil",
    privacy: "Confidentialité",
    about: "À propos",
    game: "Notre jeu",
    prevention: "Prévention",
    demo: "Démo",
    faq: "FAQ",
    reviews: "Avis",
    brand: "StopScroll",
    contact: "Contact",
    menuOpenAria: "Ouvrir le menu de navigation",
    menuCloseAria: "Fermer le menu de navigation",
    menuDrawerEyebrow: "Sur cette page",
    menuDrawerClose: "Fermer",
    rules: "Règles du jeu",
  },
  home: {
    eyebrow: "Réflexe numérique",
    heroTitle: "Arrête de scroller. Commence à réfléchir.",
    heroSubtitle:
      "StopScroll transforme l’absurdité des réseaux sociaux en une expérience drôle, critique et interactive pour questionner nos automatismes numériques.",
    ctaAbout: "Comprendre le projet",
    ctaGame: "Découvrir le jeu",
    scrollHint: "Faire défiler",
    heroStepsAriaLabel: "Le parcours StopScroll en trois étapes",
    heroSteps: ["Observer", "Jouer", "Prendre du recul"],
    testimonialsEyebrow: "Avis",
    testimonialsTitle: "Ce que disent les joueurs",
    testimonialsLead:
      "Retours des étudiants et participants ayant découvert StopScroll",
    testimonials: [
      {
        quote: "J’ai posé mon téléphone pendant toute la partie. C’est la première fois depuis des mois.",
        author: "Élève, 17 ans",
        context: "SESSION CLASSE · CEFF INDUSTRIE",
        rating: 5,
      },
      {
        quote: "On a reconnu nos propres comportements dans les cartes. Ça fait bizarre, mais c’est efficace.",
        author: "Participant atelier",
        context: "RETOUR TERRAIN · DIVTEC",
        rating: 5,
      },
      {
        quote: "C’est le seul jeu où j’ai appris quelque chose sans m’en rendre compte.",
        author: "Étudiante, 2e année",
        context: "TEST UTILISATEUR · HEFP",
        rating: 5,
      },
      {
        quote: "Idéal pour lancer une discussion en classe sans que ça parte en débat moralisant.",
        author: "Enseignant, lycée technique",
        context: "OBSERVATION PÉDAGOGIQUE",
        rating: 4,
      },
      {
        quote: "Le mode solo est addictif. L’ironie n’a pas échappé à mes élèves.",
        author: "Animateur d’atelier",
        context: "DÉCOUVERTE · BIENNE",
        rating: 4,
      },
      {
        quote: "En 20 minutes de jeu, mes étudiants ont plus compris l’économie de l’attention qu’en un cours entier.",
        author: "Formateur HEFP",
        context: "VALIDATION PÉDAGOGIQUE",
        rating: 5,
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Questions fréquentes",
    faqLead:
      "L’essentiel pour comprendre StopScroll, son objectif et son utilisation en classe ou en atelier.",
    faqItems: [
      {
        q: "StopScroll est-il anti réseaux sociaux ?",
        a: "Non. Le projet n’est pas là pour interdire les plateformes, mais pour aider à reprendre du recul face aux automatismes de consommation.",
      },
      {
        q: "Quel est le but du jeu ?",
        a: "Faire émerger une prise de conscience par le rire en rejouant des échanges absurdes inspirés des comportements en ligne.",
      },
      {
        q: "À qui s’adresse StopScroll ?",
        a: "Aux élèves, enseignants et plus largement à toute personne qui souhaite questionner son rapport aux réseaux sociaux de manière accessible.",
      },
      {
        q: "Pourquoi utiliser l’humour pour un sujet sérieux ?",
        a: "Parce que l’humour ouvre le dialogue, réduit la résistance et permet de discuter de mécanismes complexes sans ton culpabilisant.",
      },
      {
        q: "Le projet est-il lié à un cadre scolaire ?",
        a: "Oui. StopScroll est développé dans le cadre de la HEFP en collaboration inter-écoles.",
      },
      {
        q: "Comment suivre l’avancement du projet ?",
        a: "Vous pouvez laisser un message via le formulaire pour être informé des prochaines étapes, démonstrations et contenus pédagogiques.",
      },
    ],
    heroCards: {
      topLeft:     { tag: "Trolls et haters purs",   text: "POV : t'as oublié de prendre tes cachets ce matin 💊",                                   sub: "Trolls et haters purs" },
      bottomLeft:  { tag: "Jargon internet",         text: "Qui a laissé bro cuisiner ?? 💀",                                                              sub: "Jargon Gen Z / Twitter" },
      topRight:    { tag: "Faux influenceurs",       text: "Suite à la polémique, j'annonce une pause des réseaux. (On se revoit dans 4 heures).",         sub: "Faux influenceurs" },
      bottomRight: { tag: "Boomers section com.",    text: "C LA FOTE A L'EUROPE ET AUX ECOLOS TOUT SA !!! bises, Michel 😡",                             sub: "Boomers section com." },
      mobilePost:  { tag: "Jargon",                  text: "RATIO",                                                                                        sub: "Jargon internet" },
      mobileReply: { tag: "Haters",                  text: "Va prendre ta douche frérot 🚿",                                                              sub: "Haters purs" },
    },
  },
  footer: {
    tagline: "StopScroll : rire, recul et attention numérique.",
    landmarkAriaLabel: "Pied de page",
    columnBrandHeading: "À propos",
    columnNavigationHeading: "Navigation",
    columnContactHeading: "Contact",
    columnLegalHeading: "Informations légales",
    contactEmailLead: "Pour toute question liée au projet StopScroll :",
    privacyLabel: "Politique de confidentialité",
    rulesLabel: "Règles du jeu",
    contactEmailDisplay: "info@stop-scroll.com",
    contactEmailAria: "Composer un email à info@stop-scroll.com",
    rights: "© 2026 StopScroll — Projet HEFP. Tous droits réservés.",
  },
  privacy: {
    title: "Politique de confidentialité",
    metaTitle: "Politique de confidentialité",
    metaDescription:
      "Informations sur la collecte et le traitement des données personnelles sur stop-scroll.com, site du projet pédagogique StopScroll (HEFP).",
    updated: "Dernière mise à jour : mai 2026",
    intro:
      "Ce site est un projet pédagogique développé dans le cadre de la HEFP. La présente politique décrit de manière simple et transparente comment vos données sont traitées lorsque vous utilisez le formulaire de contact.",
    dataController: {
      heading: "Responsable du traitement",
      lead:
        "Le projet StopScroll (HEFP) est responsable du traitement des données collectées via ce site. Pour toute question relative à vos données personnelles, contactez-nous par email.",
      contactLabel: "Email de contact",
      emailAria: "Écrire un courriel au projet StopScroll",
    },
    sections: [
      {
        heading: "Données collectées",
        body: "Lorsque vous utilisez le formulaire de contact, nous collectons votre nom, votre adresse email et le contenu de votre message. Ces informations sont nécessaires pour répondre à votre demande.",
      },
      {
        heading: "Cookies",
        body: "Ce site utilise uniquement des cookies essentiels au bon fonctionnement du site (préférences de langue, préférence de thème). Ces cookies ne requièrent pas votre consentement au sens de la loi suisse sur la protection des données (nLPD) car ils sont strictement nécessaires. Si des vidéos de plateformes tierces (YouTube, TikTok) sont intégrées, celles-ci peuvent déposer leurs propres cookies soumis aux politiques de ces services.",
      },
      {
        heading: "Finalité du traitement",
        body: "Vos données sont utilisées uniquement pour répondre à votre message et vous recontacter si nécessaire dans le cadre du projet StopScroll. Elles ne sont ni vendues, ni cédées à des tiers à des fins commerciales.",
      },
      {
        heading: "Hébergement et prestataires",
        body: "Le site est hébergé sur Vercel (infrastructure sécurisée). L’envoi d’emails transactionnels est assuré par Resend. Ces prestataires agissent comme sous-traitants dans le strict cadre de l’opération du service.",
      },
      {
        heading: "Durée de conservation",
        body: "Vos données sont conservées le temps nécessaire au traitement de votre demande, puis supprimées ou anonymisées.",
      },
      {
        heading: "Vos droits",
        body: "Conformément à la loi fédérale sur la protection des données (nLPD), vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous par email.",
      },
      {
        heading: "Sécurité",
        body: "Le site est accessible via HTTPS. L’accès aux données est restreint aux membres du projet. Des validations côté serveur sont en place pour prévenir les abus.",
      },
    ],
    contactNote: "Pour toute question sur vos données personnelles, contactez-nous :",
  },
};

const en: Dictionary = {
  meta: {
    title: "StopScroll - Awareness around attention economy",
    description:
      "StopScroll turns social media absurdities into a playful, critical and educational experience to break infinite-scroll habits.",
  },
  nav: {
    home: "Home",
    privacy: "Privacy",
    about: "About",
    game: "Our game",
    prevention: "Prevention",
    demo: "Demo",
    faq: "FAQ",
    reviews: "Reviews",

    brand: "StopScroll",
    contact: "Contact",

    menuOpenAria: "Open navigation menu",
    menuCloseAria: "Close navigation menu",
    menuDrawerEyebrow: "On this page",
    menuDrawerClose: "Close",
    rules: "Game rules",
  },
  home: {
    eyebrow: "Digital awareness",
    heroTitle: "Stop scrolling. Start thinking.",
    heroSubtitle:
      "StopScroll turns social media absurdities into a fun, critical and interactive experience — to help people question their digital habits and reconnect with each other.",
    ctaAbout: "Understand the project",
    ctaGame: "Discover the game",
    scrollHint: "Scroll",
    heroStepsAriaLabel: "The StopScroll journey in three steps",
    heroSteps: ["Observe", "Play", "Reflect"],
    testimonialsEyebrow: "Reviews",
    testimonialsTitle: "What testers are saying",
    testimonialsLead:
      "Feedback from students and participants who explored StopScroll",
    testimonials: [
      {
        quote: "I put my phone down for the entire game. First time in months.",
        author: "Student, 17",
        context: "CLASS SESSION · CEFF INDUSTRIE",
        rating: 5,
      },
      {
        quote: "We recognized our own behaviors in the cards. Unsettling — but that’s exactly why it works.",
        author: "Workshop participant",
        context: "FIELD FEEDBACK · DIVTEC",
        rating: 5,
      },
      {
        quote: "The only game where I learned something without realizing it.",
        author: "Student, 2nd year",
        context: "USER TEST · HEFP",
        rating: 5,
      },
      {
        quote: "Perfect for sparking a classroom debate without it turning into a lecture.",
        author: "Teacher, technical high school",
        context: "PEDAGOGICAL OBSERVATION",
        rating: 4,
      },
      {
        quote: "The solo mode is addictive. The irony wasn’t lost on my students.",
        author: "Workshop facilitator",
        context: "DISCOVERY · BIEL",
        rating: 4,
      },
      {
        quote: "In 20 minutes of play, my students grasped the attention economy better than in a full lecture.",
        author: "HEFP trainer",
        context: "PEDAGOGICAL VALIDATION",
        rating: 5,
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqLead:
      "Key questions to understand StopScroll, its goals, and how it is used in educational contexts.",
    faqItems: [
      {
        q: "Is StopScroll anti-social-media?",
        a: "No. The project does not aim to ban platforms, but to help users regain perspective on automatic behaviors.",
      },
      {
        q: "What is the game’s objective?",
        a: "To spark awareness through humor by replaying absurd interactions inspired by real online habits.",
      },
      {
        q: "Who is StopScroll for?",
        a: "Students, teachers, and anyone who wants to reflect on social media usage in a practical and accessible way.",
      },
      {
        q: "Why use humor for a serious topic?",
        a: "Because humor lowers resistance and opens discussion around complex attention mechanisms.",
      },
      {
        q: "Is this a school project?",
        a: "Yes. StopScroll is developed in the HEFP context through inter-school collaboration.",
      },
      {
        q: "How can I follow project updates?",
        a: "Use the form to leave a message and receive updates about milestones, demonstrations, and educational resources.",
      },
    ],
    heroCards: {
      topLeft:     { tag: "Trolls & pure haters",   text: "POV: you forgot to take your meds this morning 💊",                                             sub: "Trolls & pure haters" },
      bottomLeft:  { tag: "Gen Z slang",            text: "Who let bro cook?? 💀",                                                                         sub: "Gen Z / Twitter slang" },
      topRight:    { tag: "Fake influencers",       text: "Following the drama, I'm taking a break from social media. (See you in 4 hours.)",             sub: "Fake influencers" },
      bottomRight: { tag: "Boomer comments",        text: "ITS ALL THE FAULT OF THE GOVERNMENT AND THE GREENS!!! just saying, hugs Michel 😡",            sub: "Boomer comments" },
      mobilePost:  { tag: "Slang",                  text: "RATIO",                                                                                         sub: "Internet slang" },
      mobileReply: { tag: "Haters",                 text: "Go touch grass it's free 🌿",                                                                  sub: "Pure haters" },
    },
  },
  footer: {
    tagline: "StopScroll: humor, reflection, and digital awareness.",
    landmarkAriaLabel: "Footer",
    columnBrandHeading: "About",
    columnNavigationHeading: "Navigation",
    columnContactHeading: "Contact",
    columnLegalHeading: "Legal information",
    contactEmailLead: "For any question about the StopScroll project:",
    privacyLabel: "Privacy policy",
    rulesLabel: "Game rules",
    contactEmailDisplay: "info@stop-scroll.com",
    contactEmailAria: "Send an email to info@stop-scroll.com",
    rights: "© 2026 StopScroll — HEFP Project. All rights reserved.",
  },
  privacy: {
    title: "Privacy policy",
    metaTitle: "Privacy policy",
    metaDescription:
      "How StopScroll (HEFP project) handles personal data collected via the contact form on stop-scroll.com.",
    updated: "Last updated: May 2026",
    intro:
      "StopScroll is an educational project developed within the HEFP framework. This policy explains clearly how your personal data is handled when you use the contact form on this site.",
    dataController: {
      heading: "Data controller",
      lead:
        "The StopScroll project (HEFP) is the data controller for information collected through this site. For any question about your personal data, please contact us by email.",
      contactLabel: "Contact email",
      emailAria: "Send an email to the StopScroll project",
    },
    sections: [
      {
        heading: "Data collected",
        body: "When you use the contact form, we collect your name, email address, and message content. This information is needed to respond to your request.",
      },
      {
        heading: "Cookies",
        body: "This site uses only essential cookies required for basic functionality (language preference, theme preference). These cookies do not require your consent under Swiss data protection law (nFADP) as they are strictly necessary. If third-party videos (YouTube, TikTok) are embedded, those platforms may set their own cookies governed by their respective privacy policies.",
      },
      {
        heading: "Purpose",
        body: "Your data is used solely to reply to your message and follow up if needed within the StopScroll project. It is never sold or shared with third parties for commercial purposes.",
      },
      {
        heading: "Hosting and service providers",
        body: "The site is hosted on Vercel. Transactional emails are handled by Resend. Both act as data processors strictly within the scope of operating this service.",
      },
      {
        heading: "Retention",
        body: "Your data is kept only as long as needed to handle your request, then deleted or anonymised.",
      },
      {
        heading: "Your rights",
        body: "Under the Swiss Federal Act on Data Protection (nFADP), you have the right to access, correct, and delete your personal data. To exercise these rights, contact us by email.",
      },
      {
        heading: "Security",
        body: "The site is served over HTTPS. Access to data is limited to project members. Server-side validation is in place to prevent misuse.",
      },
    ],
    contactNote: "For any question about your personal data, contact us at:",
  },
};

// ─── German (DE) ─ spreads from EN ───────────────────────────────────────────
const de: Dictionary = {
  ...en,
  meta: {
    title: "StopScroll - Aufklärung über die Aufmerksamkeitsökonomie",
    description: "StopScroll verwandelt die Absurditäten sozialer Medien in ein witziges, kritisches und pädagogisches Erlebnis, um endloses Scrollen zu durchbrechen.",
  },
  nav: {
    ...en.nav,
    home: "Startseite", privacy: "Datenschutz", about: "Über uns", game: "Unser Spiel",
    prevention: "Prävention", reviews: "Bewertungen", contact: "Kontakt",

    menuOpenAria: "Navigationsmenü öffnen", menuCloseAria: "Navigationsmenü schließen",
    menuDrawerEyebrow: "Auf dieser Seite", menuDrawerClose: "Schließen",
    rules: "Spielregeln",
  },
  home: {
    ...en.home,
    eyebrow: "Digitaler Reflex",
    heroTitle: "Hör auf zu scrollen. Fang an zu denken.",
    heroSubtitle: "StopScroll verwandelt die Absurdität sozialer Medien in ein witziges, kritisches und interaktives Erlebnis, um digitale Gewohnheiten zu hinterfragen.",
    ctaAbout: "Das Projekt verstehen", ctaGame: "Das Spiel entdecken",
    scrollHint: "Scrollen",
    heroStepsAriaLabel: "Der StopScroll-Weg in drei Schritten",
    heroSteps: ["Beobachten", "Spielen", "Reflektieren"],
    testimonialsEyebrow: "Bewertungen", testimonialsTitle: "Was Tester sagen",
    testimonialsLead: "Rückmeldungen von Studierenden und Teilnehmern, die StopScroll entdeckt haben",
    testimonials: [
      { quote: "Ich habe mein Handy die ganze Runde hingelegt. Das erste Mal seit Monaten.", author: "Schüler, 17 Jahre", context: "UNTERRICHTSSESSION · CEFF INDUSTRIE", rating: 5 },
      { quote: "Wir haben unser eigenes Verhalten in den Karten erkannt. Komisch — aber genau das wirkt.", author: "Workshop-Teilnehmer", context: "FELDTEST · DIVTEC", rating: 5 },
      { quote: "Das einzige Spiel, bei dem ich etwas gelernt habe, ohne es zu merken.", author: "Studierende, 2. Jahr", context: "BENUTZERTEST · HEFP", rating: 5 },
      { quote: "Ideal, um eine Klassendiskussion zu starten, ohne dass es zur Moralpredigt wird.", author: "Lehrperson, Technisches Gymnasium", context: "PÄDAGOGISCHE BEOBACHTUNG", rating: 4 },
      { quote: "Der Solo-Modus ist süchtig machend. Die Ironie ist meinen Schülern nicht entgangen.", author: "Workshop-Leiter", context: "ENTDECKUNG · BIEL", rating: 4 },
      { quote: "In 20 Minuten Spielzeit haben meine Studierenden die Aufmerksamkeitsökonomie besser verstanden als in einer ganzen Vorlesung.", author: "HEFP-Trainer", context: "PÄDAGOGISCHE VALIDIERUNG", rating: 5 },
    ],
    faqEyebrow: "FAQ", faqTitle: "Häufig gestellte Fragen",
    faqLead: "Das Wesentliche, um StopScroll, seine Ziele und seinen Einsatz im Unterricht zu verstehen.",
    faqItems: [
      { q: "Ist StopScroll anti-soziale-Medien?", a: "Nein. Das Projekt will keine Plattformen verbieten, sondern helfen, automatische Verhaltensweisen zu hinterfragen." },
      { q: "Was ist das Ziel des Spiels?", a: "Bewusstsein durch Humor wecken, indem absurde Austausche nachgespielt werden, die von echten Online-Gewohnheiten inspiriert sind." },
      { q: "Für wen ist StopScroll gedacht?", a: "Für Schüler, Lehrer und alle, die ihren Umgang mit sozialen Medien auf zugängliche Weise reflektieren möchten." },
      { q: "Warum Humor für ein ernstes Thema?", a: "Weil Humor Widerstände abbaut und komplexe Aufmerksamkeitsmechanismen ohne Schuldgefühle besprechbar macht." },
      { q: "Ist das ein Schulprojekt?", a: "Ja. StopScroll wird im Rahmen der HEFP durch schulübergreifende Zusammenarbeit entwickelt." },
      { q: "Wie kann ich dem Projektverlauf folgen?", a: "Hinterlasse eine Nachricht über das Formular, um Updates über Meilensteine, Demos und pädagogische Inhalte zu erhalten." },
    ],
    heroCards: {
      topLeft:     { tag: "Trolle und Hater",       text: "POV: du hast vergessen deine Tabletten zu nehmen 💊",                                           sub: "Trolle und Hater" },
      bottomLeft:  { tag: "Gen-Z-Slang",            text: "Wer hat bro kochen lassen?? 💀",                                                                sub: "Gen-Z / Twitter-Slang" },
      topRight:    { tag: "Fake-Influencer",        text: "Aufgrund der Kontroverse mache ich eine Pause. (Bis in 4 Stunden.)",                           sub: "Fake-Influencer" },
      bottomRight: { tag: "Boomer-Kommentare",      text: "DAS IST ALLES DIE SCHULD DER REGIERUNG UND DER GRÜNEN!!! mit freundlichen Grüßen, Werner 😡", sub: "Boomer-Kommentare" },
      mobilePost:  { tag: "Slang",                  text: "RATIO",                                                                                         sub: "Internet-Slang" },
      mobileReply: { tag: "Hater",                  text: "Geh mal duschen Bruder 🚿",                                                                    sub: "Pure Hater" },
    },
  },
  footer: {
    tagline: "StopScroll: Lachen, Reflexion und digitale Aufmerksamkeit.",
    landmarkAriaLabel: "Fußzeile",
    columnBrandHeading: "Über uns",
    columnNavigationHeading: "Navigation",
    columnContactHeading: "Kontakt",
    columnLegalHeading: "Rechtliche Hinweise",
    contactEmailLead: "Bei Fragen zum StopScroll-Projekt:",
    privacyLabel: "Datenschutzerklärung",
    rulesLabel: "Spielregeln",
    contactEmailDisplay: "info@stop-scroll.com",
    contactEmailAria: "E-Mail an info@stop-scroll.com schreiben",
    rights: "© 2026 StopScroll — HEFP-Projekt. Alle Rechte vorbehalten.",
  },
  privacy: {
    title: "Datenschutzerklärung",
    metaTitle: "Datenschutz",
    metaDescription: "Wie das StopScroll-Projekt (HEFP) mit personenbezogenen Daten umgeht, die über das Kontaktformular auf stop-scroll.com erhoben werden.",
    updated: "Letzte Aktualisierung: Mai 2026",
    intro: "StopScroll ist ein pädagogisches Projekt im Rahmen der HEFP. Diese Datenschutzerklärung beschreibt einfach und transparent, wie Ihre Daten beim Kontaktformular verarbeitet werden.",
    dataController: {
      heading: "Verantwortlicher",
      lead: "Das StopScroll-Projekt (HEFP) ist Verantwortlicher für die auf dieser Website erhobenen Daten. Bei Fragen zum Datenschutz wenden Sie sich bitte per E-Mail an uns.",
      contactLabel: "Kontakt-E-Mail",
      emailAria: "E-Mail an das StopScroll-Projekt schreiben",
    },
    sections: [
      { heading: "Erhobene Daten", body: "Wenn Sie das Kontaktformular verwenden, erheben wir Ihren Namen, Ihre E-Mail-Adresse und den Inhalt Ihrer Nachricht. Diese Angaben sind erforderlich, um Ihre Anfrage zu bearbeiten." },
      { heading: "Cookies", body: "Diese Website verwendet ausschließlich technisch notwendige Cookies (Spracheinstellung, Thema). Diese erfordern keine Einwilligung gemäß dem Schweizer Datenschutzgesetz (revDSG). Falls Videos von Drittanbieter-Plattformen (YouTube, TikTok) eingebettet sind, können diese eigene Cookies setzen, die deren Datenschutzrichtlinien unterliegen." },
      { heading: "Zweck der Verarbeitung", body: "Ihre Daten werden ausschließlich verwendet, um auf Ihre Nachricht zu antworten und Sie bei Bedarf im Rahmen des StopScroll-Projekts zu kontaktieren. Sie werden weder verkauft noch für kommerzielle Zwecke an Dritte weitergegeben." },
      { heading: "Hosting und Dienstleister", body: "Die Website wird auf Vercel gehostet. Der E-Mail-Versand erfolgt über Resend. Beide agieren als Auftragsverarbeiter im Rahmen des Betriebs dieses Dienstes." },
      { heading: "Aufbewahrungsdauer", body: "Ihre Daten werden nur so lange aufbewahrt, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist, danach gelöscht oder anonymisiert." },
      { heading: "Ihre Rechte", body: "Gemäß dem revidierten Datenschutzgesetz (revDSG) haben Sie das Recht auf Auskunft, Berichtigung und Löschung Ihrer personenbezogenen Daten. Zur Ausübung dieser Rechte kontaktieren Sie uns per E-Mail." },
      { heading: "Sicherheit", body: "Die Website ist über HTTPS erreichbar. Der Datenzugriff ist auf Projektmitglieder beschränkt. Serverseitige Validierungen schützen vor Missbrauch." },
    ],
    contactNote: "Bei Fragen zu Ihren personenbezogenen Daten kontaktieren Sie uns:",
  },
};

export const dictionaries = { fr, en, de } as const;

export function getDictionary(locale: keyof typeof dictionaries): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}
