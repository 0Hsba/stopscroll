import type { Locale } from "./locale";

/** All page-level content that was previously hardcoded as `isFr ? ... : ...` in page.tsx,
 *  now properly internationalised for all 5 supported locales. */
export type PageSections = {
  why: {
    eyebrow: string;
    title: string;
    videoLabel: string;
    videoTitle: string;
    videoLead: string;
    videoCta: string;
    problemTitle: string;
    problemBody: string;
    statsTitle: string;
    statsItems: [string, string, string];
    solutionTitle: string;
    solutionBody: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    goalsTitle: string;
    goalsBody: string;
    whyTitle: string;
    whyBody: string;
    processTitle: string;
    processSteps: [string, string, string, string, string];
    schoolsTitle: string;
  };
  game: {
    eyebrow: string;
    title: string;
    lead: string;
    howTitle: string;
    step1: string;
    step2: string;
    step3: string;
    pill1: string;
    pill2: string;
    pill3: string;
    infoTitle: string;
    playersLabel: string;
    minutesLabel: string;
    yearsLabel: string;
    goalBody: string;
    formatTitle: string;
    formatItem1: string;
    formatItem2: string;
    formatItem3: string;
    /** Exemples de cartes affichées dans la section jeu */
    exampleCardsTitle: string;
    exampleCards: ReadonlyArray<{ text: string; category: string }>;
  };
  prevention: {
    eyebrow: string;
    title: string;
    lead: string;
    keyTitle: string;
    keyBody: string;
    keyTip: string;
    tipsTitle: string;
    tips: [string, string, string, string, string];
    warningsTitle: string;
    warnings: [string, string, string];
    warningNote: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submitting: string;
    success: string;
    errorGeneric: string;
    validation: { required: string; email: string; };
  };
  demo: {
    eyebrow: string;
    title: string;
    lead: string;
    phase1: { step: string; title: string; body: string; };
    phase2: { step: string; title: string; body: string; };
    phase3: { step: string; title: string; body: string; };
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
    feat1Title: string;
    feat1Body: string;
    feat2Title: string;
    feat2Body: string;
    feat3Title: string;
    feat3Body: string;
    feat4Title: string;
    feat4Body: string;
  };
  /** Cartes flottantes latérales (2 par section) — [left, right] */
  sideCards: {
    why:          [{ text: string; sub: string }, { text: string; sub: string }];
    about:        [{ text: string; sub: string }, { text: string; sub: string }];
    game:         [{ text: string; sub: string }, { text: string; sub: string }];
    demo:         [{ text: string; sub: string }, { text: string; sub: string }];
    testimonials: [{ text: string; sub: string }, { text: string; sub: string }];
    prevention:   [{ text: string; sub: string }, { text: string; sub: string }];
    faq:          [{ text: string; sub: string }, { text: string; sub: string }];
    contact:      [{ text: string; sub: string }, { text: string; sub: string }];
  };
};

// ─── French ──────────────────────────────────────────────────────────────────

const fr: PageSections = {
  why: {
    eyebrow: "Comprendre le problème",
    title: "Pourquoi StopScroll ?",
    videoLabel: "Vidéo",
    videoTitle: "Vidéo explicative",
    videoLead: "Découvrez en quelques minutes le concept et les objectifs de StopScroll.",
    videoCta: "Voir la vidéo",
    problemTitle: "Le problème",
    problemBody: "Le scroll infini capte l'attention, automatise les gestes et réduit notre capacité à prendre du recul.",
    statsTitle: "Statistiques attention",
    statsItems: [
      "Usage quotidien élevé des plateformes",
      "Concentration fragmentée",
      "Surcharge d'informations continue",
    ],
    solutionTitle: "La solution StopScroll",
    solutionBody: "Une approche ludique et critique : on rit des dérives du web pour mieux comprendre leurs mécanismes.",
  },
  about: {
    eyebrow: "Projet inter-écoles",
    title: "À propos",
    body: "StopScroll est développé dans le cadre de la HEFP, avec une collaboration active entre CEFF Industrie, DIVTEC Porrentruy et le Lycée technique de Bienne. Le projet associe étudiants et enseignants pour créer un outil de sensibilisation moderne, crédible et utile.",
    goalsTitle: "Objectifs",
    goalsBody: "Questionner notre rapport aux réseaux sociaux et proposer une sensibilisation ludique, accessible et non culpabilisante.",
    whyTitle: "Importance du sujet",
    whyBody: "Économie de l'attention, addiction numérique et comportements automatiques influencent nos usages quotidiens.",
    processTitle: "Démarche de travail",
    processSteps: [
      "Analyse du problème",
      "Création du concept",
      "Prototypage",
      "Tests utilisateurs",
      "Amélioration continue",
    ],
    schoolsTitle: "Écoles partenaires",
  },
  game: {
    eyebrow: "Notre jeu",
    title: "Le jeu de cartes StopScroll",
    lead: "Un jeu pensé pour les générations élevées aux réseaux sociaux, aux memes et au chaos d'internet. Pose ton téléphone — maintenant, on joue. À partir de 3 joueurs (mode 2 joueurs et mode solo « Survie du Feed » disponibles).",
    howTitle: "Comment jouer",
    step1: "À chaque tour, un joueur devient le Maître du Feed : il pioche une carte Post et la lit à voix haute — ex. : « Le gouvernement annonce une réforme en faisant une danse Fortnite. »",
    step2: "Les autres joueurs possèdent 5 cartes Commentaire et choisissent la réponse la plus drôle, absurde ou parfaite. Les cartes sont ensuite mélangées pour garder l'anonymat.",
    step3: "Le Maître du Feed lit chaque commentaire à voix haute et choisit son préféré. Ce joueur remporte le tour et garde la carte Post. Celui qui en possède le plus à la fin gagne.",
    pill1: "6 catégories de commentaires",
    pill2: "Commentaires anonymes",
    pill3: "Le plus de Posts gagne",
    infoTitle: "Infos pratiques",
    playersLabel: "joueurs",
    minutesLabel: "minutes",
    yearsLabel: "ans",
    goalBody: "Mode solo « Survie du Feed » : accumule un max de points sans perdre tes 3 PSM (Points de Santé Mentale). Attention — deux commentaires de même catégorie sous un même Post = −1 PSM et le Feed devient toxique.",
    formatTitle: "Modes de jeu",
    formatItem1: "Multijoueur : le joueur avec le plus de cartes Post gagne",
    formatItem2: "2 joueurs : pas de points, juste les réponses les plus drôles",
    formatItem3: "Solo : Survie du Feed avec classement final (de Facebook à Zuckerberg)",
    exampleCardsTitle: "Exemples de cartes",
    exampleCards: [
      { text: "POV : t'as oublié de prendre tes cachets ce matin 💊", category: "Troll" },
      { text: "J'ai arrêté de scroller pendant 24h... voilà ce que j'ai vécu 😱", category: "Influenceur" },
      { text: "Ce filtre m'a transformé, je reviens JAMAIS en arrière ✨", category: "Bot" },
      { text: "Rate ce que tu vois dans la rue en story 📸", category: "Spam" },
    ],
  },
  prevention: {
    eyebrow: "Prévention",
    title: "Reprends le contrôle",
    lead: "La prévention ne consiste pas à bannir les réseaux, mais à reprendre le contrôle de son attention.",
    keyTitle: "Message clé",
    keyBody: "Utiliser les réseaux en conscience : l'objectif est de reprendre la main, pas de culpabiliser.",
    keyTip: "3 questions avant d'ouvrir une app : Pourquoi maintenant ? Combien de temps ? Qu'est-ce que je cherche ?",
    tipsTitle: "Conseils anti-scroll",
    tips: [
      "Fixer des plages horaires sans écran",
      "Désactiver les notifications non essentielles",
      "Se poser une intention avant d'ouvrir une app",
      "Retirer les apps addictives de l'écran d'accueil",
      "Minuteur de 15 min par session",
    ],
    warningsTitle: "Signaux d'alerte",
    warnings: [
      "Perte de la notion du temps en ligne",
      "Réflexe automatique de déverrouiller le téléphone",
      "Difficulté à se concentrer sans stimulation",
    ],
    warningNote: "Mini plan : observe 1 semaine, choisis 1 habitude à corriger, puis mesure ton progrès.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Une question ?",
    lead: "On est là. Écris-nous et on te répondra rapidement.",
    nameLabel: "Nom",
    namePlaceholder: "Ton prénom et nom",
    emailLabel: "Email",
    emailPlaceholder: "ton@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Ta question ou ton message…",
    submitLabel: "Envoyer le message",
    submitting: "Envoi en cours…",
    success: "Message envoyé ! Nous vous répondrons rapidement.",
    errorGeneric: "Une erreur est survenue. Réessayez dans un instant.",
    validation: { required: "Champ obligatoire.", email: "Adresse email invalide." },
  },
  demo: {
    eyebrow: "Démonstration",
    title: "Comment se joue une partie ?",
    lead: "Chaque tour en 3 phases simples — une carte Post absurde, des commentaires anonymes, et un Maître du Feed qui tranche.",
    phase1: { step: "Phase 1", title: "Post",       body: "Le Maître du Feed pioche une carte Post et lit son contenu absurde à voix haute, comme un véritable fil de commentaires internet." },
    phase2: { step: "Phase 2", title: "Commentaire", body: "Chaque joueur choisit dans sa main de 5 cartes Commentaire (Troll, Hater, Bot, Boomer, Spam, Influenceur…) la réponse la plus drôle ou absurde, puis la dépose anonymement." },
    phase3: { step: "Phase 3", title: "Maître du Feed", body: "Le Maître du Feed lit tous les commentaires à voix haute et choisit son préféré. Ce joueur remporte la carte Post — et le joueur avec le plus de cartes en fin de partie gagne." },
    stat1Label: "joueurs / partie",
    stat2Label: "min / session",
    stat3Label: "âge minimum",
    stat4Label: "phases de jeu",
    feat1Title: "Pédagogique",
    feat1Body: "Conçu pour les classes, ateliers et groupes de sensibilisation — avec debrief guidé.",
    feat2Title: "Humoristique",
    feat2Body: "L'humour comme levier de prise de conscience — sans culpabiliser, toujours dans l'anonymat.",
    feat3Title: "Multi-modes",
    feat3Body: "Mode classique 3+, mode 2 joueurs et mode solo « Survie du Feed » avec PSM.",
    feat4Title: "Accessible",
    feat4Body: "Simple dès 15 ans — la partie s'arrête au premier fou rire collectif.",
  },
  sideCards: {
    why:          [
      { text: "Pleure plus fort, on t'entend pas depuis le fond de la classe 🗣️",            sub: "Haters purs" },
      { text: "C'est la pire timeline, je veux changer de multivers.",                        sub: "Jargon Gen Z" },
    ],
    about:        [
      { text: "Bonjour, je suis avocat au Bénin et vous avez hérité de 2 millions €. Envoyez RIB. 💼", sub: "Spams & Bots" },
      { text: "Je comprend pas, comment on fait pour partager à mon petit-fils Lucas ???",    sub: "Boomers" },
    ],
    game:         [
      { text: "Sah quel plaisir 🤌",                                                          sub: "Jargon Gen Z" },
      { text: "Même mon chien a un meilleur QI, et il mange ses propres crottes 🐶",          sub: "Haters purs" },
    ],
    demo:         [
      { text: "Incroyable ! J'ai perdu 15 kilos en mangeant uniquement du gravier 🪨✨",     sub: "Spams & Bots" },
      { text: "OMG trop courageux d'oser poster ça sans filtre !! (à part le ring-light 😏)", sub: "Faux influenceurs" },
    ],
    testimonials: [
      { text: "Je préfère boire l'eau des pâtes que d'être d'accord avec toi.",              sub: "Haters purs" },
      { text: "Je fais gagner un iPhone 15 Pro Max, commente ton groupe sanguin et mentionne 50 amis 🩸", sub: "Faux influenceurs" },
    ],
    prevention:   [
      { text: "Nan mais c abusééééééé #chokbardebz",                                          sub: "Jargon internet" },
      { text: "C'est hyper invisibilisant pour les personnes qui n'ont pas internet. Un peu de décence.", sub: "Les indignés" },
    ],
    faq:          [
      { text: "La sélection naturelle a pris beaucoup trop de retard sur ce dossier.",        sub: "Haters purs" },
      { text: "À méditer très profondément... 🥀😔",                                          sub: "Boomers" },
    ],
    contact:      [
      { text: "Frère, efface ça avant que ton futur employeur ne tombe dessus 🗑️",           sub: "Haters purs" },
      { text: "MDRRR J'aurais fais pareil #troppareilquoi 😂",                                sub: "Jargon internet" },
    ],
  },
};

// ─── English ─────────────────────────────────────────────────────────────────

const en: PageSections = {
  why: {
    eyebrow: "Understanding the issue",
    title: "Why StopScroll?",
    videoLabel: "Video",
    videoTitle: "Explainer video",
    videoLead: "Discover StopScroll's concept and goals in a few minutes.",
    videoCta: "Watch the video",
    problemTitle: "The problem",
    problemBody: "Infinite scroll captures attention, automates behavior, and reduces our ability to step back.",
    statsTitle: "Attention stats",
    statsItems: [
      "High daily platform usage",
      "Fragmented concentration",
      "Continuous information overload",
    ],
    solutionTitle: "The StopScroll solution",
    solutionBody: "A playful and critical approach: laugh at online excesses to better understand their mechanisms.",
  },
  about: {
    eyebrow: "Inter-school project",
    title: "About",
    body: "StopScroll is developed within HEFP with active collaboration between CEFF Industrie, DIVTEC Porrentruy and the Technical High School of Biel. Students and teachers co-build a modern and useful awareness project.",
    goalsTitle: "Goals",
    goalsBody: "Question our relationship with social media through playful, accessible, non-blaming awareness.",
    whyTitle: "Why it matters",
    whyBody: "Attention economy, digital addiction and automatic behaviors shape daily usage.",
    processTitle: "Work process",
    processSteps: [
      "Problem analysis",
      "Concept creation",
      "Prototyping",
      "User testing",
      "Continuous improvement",
    ],
    schoolsTitle: "Partner schools",
  },
  game: {
    eyebrow: "Our game",
    title: "The StopScroll Card Game",
    lead: "A game designed for generations raised on social media, memes and internet chaos. Put your phone down — now we play. 3+ players (a 2-player mode and a solo \"Feed Survival\" mode are also available).",
    howTitle: "How to play",
    step1: "Each turn, one player becomes the Feed Master: they draw a Post card and read it aloud — e.g. \"The government opens a TikTok account and announces a reform with a Fortnite dance.\"",
    step2: "All other players hold 5 Comment cards and choose the funniest, most absurd or most fitting reply. Cards are shuffled anonymously before the reveal.",
    step3: "The Feed Master reads every comment aloud and picks their favourite. That player wins the round and keeps the Post card. The player with the most Post cards at the end wins.",
    pill1: "6 comment categories",
    pill2: "Anonymous comments",
    pill3: "Most Posts wins",
    infoTitle: "Practical info",
    playersLabel: "players",
    minutesLabel: "minutes",
    yearsLabel: "years",
    goalBody: "Solo mode \"Feed Survival\": accumulate max points without losing your 3 PSM (Mental Health Points). Warning — two comments from the same category under the same Post = −1 PSM and the Feed turns toxic.",
    formatTitle: "Game modes",
    formatItem1: "Multiplayer: the player with the most Post cards wins",
    formatItem2: "2 players: no points, just the funniest replies",
    formatItem3: "Solo: Feed Survival with a final leaderboard (from Facebook User to Zuckerberg)",
    exampleCardsTitle: "Card examples",
    exampleCards: [
      { text: "POV: you forgot to take your meds this morning 💊", category: "Troll" },
      { text: "I stopped scrolling for 24h... here's what happened 😱", category: "Influencer" },
      { text: "This filter transformed me, I'm NEVER going back ✨", category: "Bot" },
      { text: "Rate what you see on the street in your story 📸", category: "Spam" },
    ],
  },
  prevention: {
    eyebrow: "Prevention",
    title: "Take back control",
    lead: "Prevention is not about banning social media, but about regaining control of attention.",
    keyTitle: "Key message",
    keyBody: "Use social media consciously: the goal is control, not guilt.",
    keyTip: "3 questions before opening an app: Why now? For how long? What am I looking for?",
    tipsTitle: "Anti-scroll tips",
    tips: [
      "Set screen-free time windows",
      "Disable non-essential notifications",
      "Set an intention before opening an app",
      "Remove addictive apps from home screen",
      "Use a 15-min timer per session",
    ],
    warningsTitle: "Warning signs",
    warnings: [
      "Losing track of time online",
      "Automatic reflex to unlock your phone",
      "Difficulty focusing without stimulation",
    ],
    warningNote: "Mini plan: observe for 1 week, pick 1 habit to change, then track progress.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Got a question?",
    lead: "We're here. Write to us and we'll get back to you quickly.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Your question or message…",
    submitLabel: "Send message",
    submitting: "Sending…",
    success: "Message sent! We will get back to you shortly.",
    errorGeneric: "Something went wrong. Please try again in a moment.",
    validation: { required: "This field is required.", email: "Invalid email address." },
  },
  demo: {
    eyebrow: "Demo",
    title: "How does a round work?",
    lead: "Every turn runs in 3 simple phases — one absurd Post card, anonymous comments, and a Feed Master who decides.",
    phase1: { step: "Phase 1", title: "Post",       body: "The Feed Master draws a Post card and reads its absurd content aloud, just like a real internet comment thread." },
    phase2: { step: "Phase 2", title: "Comment",    body: "Each player picks one of their 5 Comment cards (Troll, Hater, Bot, Boomer, Spam, Influencer…) — the funniest or most absurd reply — and submits it anonymously." },
    phase3: { step: "Phase 3", title: "Feed Master", body: "The Feed Master reads every comment aloud and picks their favourite. That player wins the Post card — and the player with the most cards at the end wins." },
    stat1Label: "players / game",
    stat2Label: "min / session",
    stat3Label: "minimum age",
    stat4Label: "game phases",
    feat1Title: "Educational",
    feat1Body: "Built for classrooms, workshops and awareness groups — with a guided debrief.",
    feat2Title: "Humorous",
    feat2Body: "Humor as a lever for awareness — no shame, always anonymous.",
    feat3Title: "Multi-mode",
    feat3Body: "Classic 3+ mode, 2-player mode and solo \"Feed Survival\" mode with Mental Health Points.",
    feat4Title: "Accessible",
    feat4Body: "Easy to learn from age 15 — the game ends at the first collective burst of laughter.",
  },
  sideCards: {
    why:          [
      { text: "Cry harder, they can't even hear you from the back of the class 🗣️",          sub: "Pure Haters" },
      { text: "This is literally the worst timeline, I want to change universes.",            sub: "Gen Z Slang" },
    ],
    about:        [
      { text: "Hello, I am a lawyer from Nigeria and you have inherited $2 million. Please send bank details. 💼", sub: "Spam & Bots" },
      { text: "I don't get it, how do you share this to my grandson Tyler???",                sub: "Boomers" },
    ],
    game:         [
      { text: "This goes so hard 🤌",                                                          sub: "Gen Z Slang" },
      { text: "Even my dog has a higher IQ, and he eats his own poop 🐶",                    sub: "Pure Haters" },
    ],
    demo:         [
      { text: "Incredible! I lost 30 lbs eating nothing but gravel 🪨✨",                     sub: "Spam & Bots" },
      { text: "OMG so brave to post this without a filter!! (except the ring light 😏)",     sub: "Fake Influencers" },
    ],
    testimonials: [
      { text: "I'd rather drink pasta water than agree with you.",                            sub: "Pure Haters" },
      { text: "Giving away an iPhone 15 Pro Max — comment your blood type and tag 50 friends 🩸", sub: "Fake Influencers" },
    ],
    prevention:   [
      { text: "This is literally so unhinged omg #shocking",                                  sub: "Internet Slang" },
      { text: "This is extremely erasing for people without internet access. Have some decency.", sub: "The Outraged" },
    ],
    faq:          [
      { text: "Natural selection has been seriously slacking on this one.",                   sub: "Pure Haters" },
      { text: "Something to ponder very deeply... 🥀😔",                                      sub: "Boomers" },
    ],
    contact:      [
      { text: "Bro, delete that before your future employer sees it 🗑️",                     sub: "Pure Haters" },
      { text: "LMAO I would've done the same #relatable 😂",                                  sub: "Internet Slang" },
    ],
  },
};

// ─── German ──────────────────────────────────────────────────────────────────

const de: PageSections = {
  why: {
    eyebrow: "Das Problem verstehen",
    title: "Warum StopScroll?",
    videoLabel: "Video",
    videoTitle: "Erklärvideo",
    videoLead: "Entdecke in wenigen Minuten das Konzept und die Ziele von StopScroll.",
    videoCta: "Video ansehen",
    problemTitle: "Das Problem",
    problemBody: "Endloses Scrollen fesselt die Aufmerksamkeit, automatisiert Gesten und verringert unsere Fähigkeit, innezuhalten.",
    statsTitle: "Aufmerksamkeitsstatistiken",
    statsItems: [
      "Hohe tägliche Plattformnutzung",
      "Fragmentierte Konzentration",
      "Kontinuierliche Informationsflut",
    ],
    solutionTitle: "Die StopScroll-Lösung",
    solutionBody: "Ein spielerisch-kritischer Ansatz: Wir lachen über Online-Auswüchse, um ihre Mechanismen besser zu verstehen.",
  },
  about: {
    eyebrow: "Schulübergreifendes Projekt",
    title: "Über das Projekt",
    body: "StopScroll wird im Rahmen der HEFP entwickelt, mit aktiver Zusammenarbeit zwischen CEFF Industrie, DIVTEC Porrentruy und dem Technischen Gymnasium Biel. Studierende und Lehrende schaffen gemeinsam ein modernes und nützliches Sensibilisierungsprojekt.",
    goalsTitle: "Ziele",
    goalsBody: "Unser Verhältnis zu sozialen Medien spielerisch, zugänglich und ohne Schuldzuweisungen hinterfragen.",
    whyTitle: "Warum das Thema wichtig ist",
    whyBody: "Aufmerksamkeitsökonomie, digitale Sucht und automatische Verhaltensweisen prägen unsere tägliche Nutzung.",
    processTitle: "Arbeitsprozess",
    processSteps: [
      "Problemanalyse",
      "Konzeptentwicklung",
      "Prototyping",
      "Nutzertests",
      "Kontinuierliche Verbesserung",
    ],
    schoolsTitle: "Partnerschulen",
  },
  game: {
    eyebrow: "Unser Spiel",
    title: "Das StopScroll-Kartenspiel",
    lead: "Ein Spiel für Generationen, die mit sozialen Medien, Memes und Internet-Chaos aufgewachsen sind. Leg dein Handy weg — jetzt wird gespielt. Ab 3 Spielern (2-Spieler-Modus und Solo-Modus 'Feed-Überleben' ebenfalls verfügbar).",
    howTitle: "Wie man spielt",
    step1: "Jede Runde wird ein Spieler zum Feed-Master: Er zieht eine Post-Karte und liest sie laut vor — z. B.: 'Die Regierung eröffnet einen TikTok-Account und kündigt eine Reform mit einem Fortnite-Tanz an.'",
    step2: "Alle anderen Spieler haben 5 Kommentar-Karten und wählen die lustigste, absurdeste oder passendste Antwort. Die Karten werden vor dem Vorlesen anonym gemischt.",
    step3: "Der Feed-Master liest jeden Kommentar laut vor und wählt seinen Liebling. Dieser Spieler gewinnt die Runde und behält die Post-Karte. Der Spieler mit den meisten Karten am Ende gewinnt.",
    pill1: "6 Kommentar-Kategorien",
    pill2: "Anonyme Kommentare",
    pill3: "Die meisten Posts gewinnen",
    infoTitle: "Praktische Infos",
    playersLabel: "Spieler",
    minutesLabel: "Minuten",
    yearsLabel: "Jahre",
    goalBody: "Solo-Modus 'Feed-Überleben': Sammle möglichst viele Punkte, ohne alle 3 PSM (Geistige Gesundheitspunkte) zu verlieren. Achtung — zwei Kommentare der gleichen Kategorie unter demselben Post = -1 PSM und das Feed wird toxisch.",
    formatTitle: "Spielmodi",
    formatItem1: "Mehrspieler: der Spieler mit den meisten Post-Karten gewinnt",
    formatItem2: "2 Spieler: keine Punkte, nur die lustigsten Antworten",
    formatItem3: "Solo: Feed-Überleben mit Abschlussrangliste (von Facebook bis Zuckerberg)",
    exampleCardsTitle: "Kartenbeispiele",
    exampleCards: [
      { text: "POV: Du hast heute Morgen deine Tabletten vergessen 💊", category: "Troll" },
      { text: "Ich habe 24h nicht gescrollt... das ist passiert 😱", category: "Influencer" },
      { text: "Dieser Filter hat mich verwandelt, ich gehe NIE zurück ✨", category: "Bot" },
      { text: "Bewerte was du auf der Straße siehst in deiner Story 📸", category: "Spam" },
    ],
  },
  prevention: {
    eyebrow: "Prävention",
    title: "Hol dir die Kontrolle zurück",
    lead: "Prävention bedeutet nicht, soziale Medien zu verbieten, sondern die eigene Aufmerksamkeit zurückzugewinnen.",
    keyTitle: "Kernbotschaft",
    keyBody: "Soziale Medien bewusst nutzen: Das Ziel ist Kontrolle, nicht Schuldgefühle.",
    keyTip: "3 Fragen vor dem Öffnen einer App: Warum jetzt? Wie lange? Was suche ich?",
    tipsTitle: "Anti-Scroll-Tipps",
    tips: [
      "Bildschirmfreie Zeitfenster festlegen",
      "Nicht-essentielle Benachrichtigungen deaktivieren",
      "Vor dem Öffnen einer App eine Absicht formulieren",
      "Suchterzeugende Apps vom Startbildschirm entfernen",
      "Einen 15-Minuten-Timer pro Session nutzen",
    ],
    warningsTitle: "Warnsignale",
    warnings: [
      "Das Zeitgefühl beim Onlinesein verlieren",
      "Automatischer Reflex, das Handy zu entsperren",
      "Schwierigkeiten, sich ohne Stimulation zu konzentrieren",
    ],
    warningNote: "Mini-Plan: 1 Woche beobachten, 1 Gewohnheit ändern, Fortschritt messen.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Hast du eine Frage?",
    lead: "Wir sind hier. Schreib uns und wir melden uns schnell zurück.",
    nameLabel: "Name",
    namePlaceholder: "Dein Vor- und Nachname",
    emailLabel: "E-Mail",
    emailPlaceholder: "deine@email.com",
    messageLabel: "Nachricht",
    messagePlaceholder: "Deine Frage oder Nachricht…",
    submitLabel: "Nachricht senden",
    submitting: "Wird gesendet…",
    success: "Nachricht gesendet! Wir melden uns bald bei dir.",
    errorGeneric: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
    validation: { required: "Pflichtfeld.", email: "Ungültige E-Mail." },
  },
  demo: {
    eyebrow: "Demo",
    title: "Wie läuft eine Runde ab?",
    lead: "Jede Runde in 3 einfachen Phasen — eine absurde Post-Karte, anonyme Kommentare und ein Feed-Master, der entscheidet.",
    phase1: { step: "Phase 1", title: "Post",       body: "Der Feed-Master zieht eine Post-Karte und liest ihren absurden Inhalt laut vor — wie ein echter Internet-Kommentar-Thread." },
    phase2: { step: "Phase 2", title: "Kommentar",  body: "Jeder Spieler wählt eine seiner 5 Kommentar-Karten (Troll, Hater, Bot, Boomer, Spam, Influencer…) — die lustigste oder absurdeste Antwort — und gibt sie anonym ab." },
    phase3: { step: "Phase 3", title: "Feed-Master", body: "Der Feed-Master liest jeden Kommentar laut vor und wählt seinen Liebling. Dieser Spieler gewinnt die Post-Karte — und wer am Ende die meisten Karten hat, gewinnt." },
    stat1Label: "Spieler / Partie",
    stat2Label: "Min. / Session",
    stat3Label: "Mindestalter",
    stat4Label: "Spielphasen",
    feat1Title: "Pädagogisch",
    feat1Body: "Für Klassen, Workshops und Sensibilisierungsgruppen — mit moderierter Abschlussdiskussion.",
    feat2Title: "Humorvoll",
    feat2Body: "Humor als Bewusstseinshebel — kein Schuldbewusstsein, immer anonym.",
    feat3Title: "Multi-Modus",
    feat3Body: "Klassischer 3+-Modus, 2-Spieler-Modus und Solo-Modus 'Feed-Überleben' mit Geistige-Gesundheits-Punkten.",
    feat4Title: "Zugänglich",
    feat4Body: "Einfach zu erlernen ab 15 Jahren — das Spiel endet beim ersten kollektiven Lacher.",
  },
  sideCards: {
    why:          [
      { text: "Wein lauter, vom hinteren Teil der Klasse hört man dich kaum 🗣️",             sub: "Pure Hater" },
      { text: "Das ist buchstäblich die schlimmste Timeline, ich will das Universum wechseln.", sub: "Gen-Z-Slang" },
    ],
    about:        [
      { text: "Guten Tag, ich bin Anwalt aus Nigeria und Sie haben 2 Mio. € geerbt. Bitte Bankdaten senden. 💼", sub: "Spam & Bots" },
      { text: "Ich verstehe das nicht, wie schickt man das meinem Enkel Leon???",             sub: "Boomers" },
    ],
    game:         [
      { text: "Das geht so hart ab 🤌",                                                        sub: "Gen-Z-Slang" },
      { text: "Sogar mein Hund hat einen höheren IQ, und der frisst seinen eigenen Kot 🐶",  sub: "Pure Hater" },
    ],
    demo:         [
      { text: "Unglaublich! Ich habe 15 kg verloren, indem ich nur Kies gegessen habe 🪸✨", sub: "Spam & Bots" },
      { text: "OMG so mutig das ohne Filter zu posten!! (außer dem Ringlicht 😏)",           sub: "Fake-Influencer" },
    ],
    testimonials: [
      { text: "Ich würde lieber Nudelwasser trinken als dir zuzustimmen.",                    sub: "Pure Hater" },
      { text: "Ich verlose ein iPhone 15 Pro Max — kommentiere deine Blutgruppe und markiere 50 Freunde 🦸", sub: "Fake-Influencer" },
    ],
    prevention:   [
      { text: "Das ist absolut krank omg #unfassbar",                                         sub: "Internet-Slang" },
      { text: "Das ist extrem unsichtbarmachend für Menschen ohne Internet. Haben Sie keinen Anstand.", sub: "Die Empörten" },
    ],
    faq:          [
      { text: "Die natürliche Selektion hat in diesem Fall enormen Rückstand.",               sub: "Pure Hater" },
      { text: "Das sollte man sehr tief überdenken... 🥀😔",                                  sub: "Boomers" },
    ],
    contact:      [
      { text: "Bruder, lösch das bevor dein zukünftiger Arbeitgeber es sieht 🗑️",            sub: "Pure Hater" },
      { text: "LMAO ich hätte das genauso gemacht #zukündigen 😂",                            sub: "Internet-Slang" },
    ],
  },
};

export function getPageSections(locale: Locale): PageSections {
  switch (locale) {
    case "en": return en;
    case "de": return de;
    default:   return fr;
  }
}
