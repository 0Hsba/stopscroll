"use client";

import { Check, Lightbulb, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { iconStroke } from "@/components/section-icon-badge";
import { PreventionChallenges } from "@/components/prevention-challenges";

type TabId = "triggers" | "actions" | "challenge";

type Props = {
  locale: "fr" | "en" | "de";
};

export function InteractiveAwarenessPanel({ locale }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("triggers");
  const [checked, setChecked] = useState<string[]>([]);
  const [questionIdx, setQuestionIdx] = useState<number>(() => Math.floor(Math.random() * 55));

  const isFr = locale === "fr";
  const isDe = locale === "de";

  const quickQuestions = useMemo<string[]>(() => {
    if (isFr) return [
      "As-tu scrollé sans t'en rendre compte ce matin ?",
      "Combien de fois as-tu déverrouillé ton téléphone aujourd'hui ?",
      "As-tu ouvert une app par habitude plutôt que par besoin réel ?",
      "Quelle activité remplacerait le scroll si ton téléphone n'existait pas ?",
      "As-tu mangé en regardant un écran aujourd'hui ?",
      "As-tu senti le besoin de vérifier tes notifs pendant une conversation ?",
      "Quelle app consomme le plus ton attention en ce moment ?",
      "As-tu dormi avec ton téléphone à portée de main hier soir ?",
      "La dernière fois que tu t'es ennuyé, as-tu pris ton téléphone ?",
      "As-tu déjà raté quelque chose d'important autour de toi à cause du scroll ?",
      "Combien de temps as-tu scrollé avant de trouver quelque chose d'utile ?",
      "Est-ce que tu vérifies ton téléphone dès le réveil ?",
      "As-tu déjà posé ton téléphone et repris moins d'une minute plus tard ?",
      "Connais-tu ton temps d'écran moyen cette semaine ?",
      "As-tu eu du mal à te concentrer à cause de notifications ?",
      "Saurais-tu rester 1h sans regarder ton téléphone maintenant ?",
      "As-tu déjà préféré scroller plutôt que de parler à quelqu'un en face de toi ?",
      "Quel contenu as-tu consommé aujourd'hui et dont tu te souviens vraiment ?",
      "Est-ce que les réseaux sociaux te donnent de l'énergie ou t'en prennent ?",
      "As-tu passé plus d'une heure sur un seul réseau social aujourd'hui ?",
      "Combien d'apps as-tu ouvertes sans raison précise aujourd'hui ?",
      "As-tu déjà scrollé en écoutant quelqu'un te parler ?",
      "Quelle est la première chose que tu fais le matin avec ton téléphone ?",
      "Te souviens-tu de la dernière fois que tu as passé une journée sans réseaux sociaux ?",
      "As-tu déjà reposé ton téléphone parce que tu te sentais épuisé de scroller ?",
      "Est-ce que les notifs de ton téléphone t'interrompent souvent en plein travail ?",
      "As-tu déjà envoyé un message au lieu d'appeler pour éviter une vraie conversation ?",
      "Scroller t'aide-t-il vraiment à te détendre ou c'est juste une habitude ?",
      "Combien de fois par jour consultes-tu tes réseaux en dehors des horaires prévus ?",
      "As-tu déjà oublié pourquoi tu avais pris ton téléphone ?",
      "Quelle émotion ressens-tu juste après avoir beaucoup scrollé ?",
      "Aurais-tu pu faire quelque chose de plus utile avec ce temps de scroll ?",
      "As-tu déjà mis ton téléphone en mode silencieux pendant 1 heure entière ?",
      "Combien de vidéos as-tu regardées en entier aujourd'hui ?",
      "As-tu déjà eu du mal à t'endormir à cause de ton téléphone ?",
      "Est-ce que tu utilises vraiment toutes les apps installées sur ton téléphone ?",
      "Quel objectif te ferait utiliser moins ton téléphone ?",
      "As-tu déjà comparé ta vie à celle que tu vois sur les réseaux sociaux ?",
      "Quel moment de la journée es-tu le plus vulnérable au scroll ?",
      "As-tu un endroit dans ta maison ou ton bureau sans téléphone ?",
      "Sais-tu quelle est l'app sur laquelle tu passes le plus de temps ?",
      "As-tu posé des limites de temps sur certaines apps ?",
      "Est-ce que tu utilises ton téléphone dans les toilettes ?",
      "As-tu déjà cherché à te comparer à des influenceurs en scrollant ?",
      "Quelle habitude digitale voudrais-tu changer en priorité ?",
      "Est-ce que ton téléphone te manque quand tu l'oublies quelque part ?",
      "As-tu déjà répondu à un message en plein milieu d'un repas en famille ?",
      "Combien de notifs as-tu reçues depuis ce matin que tu n'as pas lues ?",
      "Quelle serait ta journée idéale avec un usage limité du téléphone ?",
      "As-tu parlé de tes habitudes de scroll à quelqu'un de ton entourage ?",
      "Est-ce que tu te sens anxieux quand tu n'as pas ton téléphone près de toi ?",
      "As-tu déjà manqué un événement réel parce que tu scrollais ?",
      "Quel contenu sur les réseaux sociaux t'apporte vraiment de la valeur ?",
      "Combien de minutes de scrolling as-tu prévu d'éviter demain ?",
      "As-tu essayé le mode niveaux de gris sur ton téléphone pour scroller moins ?",
    ];
    if (isDe) return [
      "Hast du heute Morgen gescrollt, ohne es zu merken?",
      "Wie oft hast du dein Handy heute entsperrt?",
      "Hast du eine App aus Gewohnheit statt aus echtem Bedarf geöffnet?",
      "Was würdest du tun, wenn es kein Smartphone gäbe?",
      "Hast du heute beim Essen auf einen Bildschirm geschaut?",
      "Hast du während eines Gesprächs dein Handy checken wollen?",
      "Welche App beansprucht gerade am meisten deine Aufmerksamkeit?",
      "Hast du letzte Nacht mit dem Handy in Reichweite geschlafen?",
      "Hast du beim letzten Mal, als du dich langweiltest, nach dem Handy gegriffen?",
      "Hast du wegen Scrollen etwas Wichtiges um dich herum verpasst?",
      "Wie lange hast du gescrollt, bis du etwas Nützliches gefunden hast?",
      "Schaust du direkt nach dem Aufwachen auf dein Handy?",
      "Hast du dein Handy weggelegt und es weniger als eine Minute später wieder genommen?",
      "Kennst du deine durchschnittliche Bildschirmzeit diese Woche?",
      "Hatten Benachrichtigungen deine Konzentration beeinträchtigt?",
      "Könntest du jetzt eine Stunde ohne Handy auskommen?",
      "Hast du schon mal lieber gescrollt als mit jemandem zu reden?",
      "An welche Inhalte von heute erinnerst du dich wirklich?",
      "Geben dir soziale Medien Energie oder nehmen sie sie?",
      "Hast du heute mehr als eine Stunde auf einem sozialen Netzwerk verbracht?",
      "Wie viele Apps hast du heute ohne konkreten Grund geöffnet?",
      "Hast du gescrollt, während jemand mit dir gesprochen hat?",
      "Was ist das Erste, was du morgens mit dem Handy machst?",
      "Erinnerst du dich an den letzten Tag ohne soziale Medien?",
      "Hast du dein Handy wegelegt, weil du vom Scrollen erschöpft warst?",
      "Unterbrechen dich Handy-Benachrichtigungen oft bei der Arbeit?",
      "Hast du schon mal lieber eine Nachricht geschrieben als anzurufen?",
      "Hilft Scrollen dir wirklich zu entspannen oder ist es nur eine Gewohnheit?",
      "Wie oft schaust du außerhalb geplanter Zeiten auf soziale Medien?",
      "Hast du vergessen, warum du das Handy in die Hand genommen hattest?",
      "Was fühlst du, direkt nachdem du lange gescrollt hast?",
      "Hättest du diese Scrollzeit sinnvoller nutzen können?",
      "Hast du dein Handy schon mal eine ganze Stunde lang lautlos gestellt?",
      "Wie viele Videos hast du heute vollständig angesehen?",
      "Hattest du schon Einschlafschwierigkeiten wegen deines Handys?",
      "Nutzt du wirklich alle Apps, die du installiert hast?",
      "Welches Ziel würde dich dazu bringen, dein Handy weniger zu nutzen?",
      "Hast du dein Leben schon mal mit dem auf sozialen Medien verglichen?",
      "Zu welcher Tageszeit bist du am anfälligsten fürs Scrollen?",
      "Hast du einen handyfreien Platz zuhause oder im Büro?",
      "Weißt du, welche App deine meiste Zeit verschlingt?",
      "Hast du Zeitlimits für bestimmte Apps gesetzt?",
      "Nutzt du dein Handy auf der Toilette?",
      "Hast du dich beim Scrollen schon mit Influencern verglichen?",
      "Welche digitale Gewohnheit möchtest du als Erstes ändern?",
      "Vermisst du dein Handy, wenn du es irgendwo vergessen hast?",
      "Hast du beim Familienessen schon auf eine Nachricht geantwortet?",
      "Wie viele ungelesene Benachrichtigungen hast du seit heute Morgen?",
      "Wie sieht dein idealer Tag mit wenig Handynutzung aus?",
      "Hast du mit jemandem über deine Scrollen-Gewohnheiten gesprochen?",
      "Bist du ängstlich, wenn dein Handy nicht in der Nähe ist?",
      "Hast du ein echtes Ereignis verpasst, weil du gescrollt hast?",
      "Welche Inhalte auf sozialen Medien bringen dir wirklich etwas?",
      "Wie viele Minuten Scrollen willst du morgen vermeiden?",
      "Hast du den Graustufen-Modus ausprobiert, um weniger zu scrollen?",
    ];
    return [
      "Did you scroll without noticing this morning?",
      "How many times have you unlocked your phone today?",
      "Did you open an app out of habit rather than real need?",
      "What would you do if smartphones didn't exist?",
      "Did you eat while looking at a screen today?",
      "Did you feel the urge to check notifications during a conversation?",
      "Which app is consuming most of your attention right now?",
      "Did you sleep with your phone within reach last night?",
      "Last time you were bored, did you reach for your phone?",
      "Have you ever missed something important around you because of scrolling?",
      "How long did you scroll before finding something actually useful?",
      "Do you check your phone right after waking up?",
      "Have you put your phone down and picked it back up within a minute?",
      "Do you know your average screen time this week?",
      "Have notifications made it hard to concentrate?",
      "Could you go 1 hour without looking at your phone right now?",
      "Have you ever chosen to scroll instead of talking to someone in person?",
      "What content did you consume today that you actually remember?",
      "Do social media give you energy or drain it?",
      "Did you spend more than an hour on a single social network today?",
      "How many apps did you open today with no specific reason?",
      "Have you ever scrolled while someone was talking to you?",
      "What's the first thing you do with your phone in the morning?",
      "Can you remember the last day you spent without social media?",
      "Have you ever put your phone down because scrolling left you drained?",
      "Do phone notifications often interrupt you mid-task?",
      "Have you ever texted instead of calling to avoid a real conversation?",
      "Does scrolling actually help you relax, or is it just a habit?",
      "How many times a day do you check social media outside of planned times?",
      "Have you ever forgotten why you picked up your phone?",
      "What feeling do you have right after scrolling for a long time?",
      "Could you have done something more useful with that scrolling time?",
      "Have you ever put your phone on silent for a full hour?",
      "How many videos did you watch all the way through today?",
      "Have you ever had trouble sleeping because of your phone?",
      "Do you actually use all the apps installed on your phone?",
      "What goal would motivate you to use your phone less?",
      "Have you ever compared your life to what you see on social media?",
      "What time of day are you most vulnerable to scrolling?",
      "Do you have a phone-free zone at home or at work?",
      "Do you know which app takes the most of your time?",
      "Have you set time limits on certain apps?",
      "Do you use your phone in the bathroom?",
      "Have you ever compared yourself to influencers while scrolling?",
      "Which digital habit do you most want to change first?",
      "Do you miss your phone when you leave it somewhere?",
      "Have you ever replied to a message in the middle of a family meal?",
      "How many unread notifications do you have since this morning?",
      "What would your ideal day look like with limited phone use?",
      "Have you talked to anyone about your scrolling habits?",
      "Do you feel anxious when your phone isn't nearby?",
      "Have you missed a real-life moment because you were scrolling?",
      "What content on social media actually brings you value?",
      "How many minutes of scrolling are you planning to avoid tomorrow?",
      "Have you tried grayscale mode on your phone to scroll less?",
    ];
  }, [isFr, isDe]);

  const nextQuestion = useCallback(() => {
    setQuestionIdx((prev) => {
      let next = Math.floor(Math.random() * quickQuestions.length);
      if (next === prev) next = (next + 1) % quickQuestions.length;
      return next;
    });
  }, [quickQuestions.length]);

  const labels = useMemo(
    () => ({
      title: isFr
        ? "Atelier interactif"
        : isDe
          ? "Interaktiver Workshop"
          : "Interactive workshop",
      subtitle: isFr
        ? "Clique sur les onglets pour explorer des pistes concrètes et construire ton propre plan."
        : isDe
          ? "Klicke auf die Tabs, um konkrete Ideen zu erkunden und deinen eigenen Plan zu erstellen."
          : "Click tabs to explore practical ideas and build your own plan.",
      tabs: [
        {
          id: "triggers" as const,
          label: isFr ? "Déclencheurs" : isDe ? "Auslöser" : "Triggers",
        },
        {
          id: "actions" as const,
          label: isFr ? "Actions rapides" : isDe ? "Schnellaktionen" : "Quick actions",
        },
        {
          id: "challenge" as const,
          label: isFr ? "Mini défis" : isDe ? "Mini-Challenges" : "Mini challenges",
        },
      ],
      checklistHeading: isFr
        ? "Et 3 actions concrètes à valider :"
        : isDe
          ? "Und 3 konkrete Aktionen zum Abhaken:"
          : "And 3 concrete actions to commit to:",
      questionSectionTitle: isFr
        ? "Question du moment"
        : isDe
          ? "Frage des Augenblicks"
          : "Question of the moment",
      nextQuestion: isFr
        ? "Nouvelle question"
        : isDe
          ? "Nächste Frage"
          : "Next question",
      questionCount: isFr
        ? "questions"
        : isDe
          ? "Fragen"
          : "questions",
    }),
    [isFr, isDe],
  );

  const checklist =
    activeTab === "actions"
      ? [
          isFr
            ? "Je désactive 1 notification inutile"
            : isDe
              ? "Ich deaktiviere 1 unnötige Benachrichtigung"
              : "I disable 1 non-essential notification",
          isFr
            ? "Je place 1 app addictive hors écran d'accueil"
            : isDe
              ? "Ich entferne 1 Sucht-App vom Startbildschirm"
              : "I move 1 addictive app off my home screen",
          isFr
            ? "Je définis 1 créneau sans téléphone aujourd'hui"
            : isDe
              ? "Ich lege 1 handyfreies Zeitfenster für heute fest"
              : "I set 1 phone-free slot today",
        ]
      : [];

  return (
    <>
      <div className="mt-8 rounded-2xl border border-[#E86B00]/20 bg-[#0b1325]/85 p-5 shadow-[0_18px_40px_-25px_rgba(0,0,0,0.55)] ring-1 ring-white/5 sm:p-6">
        <h3 className="text-lg font-extrabold text-white">{labels.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{labels.subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {labels.tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                  active
                    ? "border-[#E86B00]/60 bg-[#E86B00]/20 text-[#ffd2aa] shadow-[0_10px_22px_-14px_rgba(232,107,0,0.8)]"
                    : "border-white/15 bg-[#0f172a] text-slate-300 hover:border-[#E86B00]/35 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] p-4">
          <div className="transition-all duration-300 ease-out">
            {activeTab === "triggers" ? (
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  {isFr
                    ? "Scroll automatique dès qu'un moment de vide apparaît."
                    : isDe
                      ? "Automatisches Scrollen sobald eine Pause entsteht."
                      : "Automatic scrolling as soon as a blank moment appears."}
                </li>
                <li>
                  {isFr
                    ? "Notifications qui relancent l'attention en continu."
                    : isDe
                      ? "Benachrichtigungen, die die Aufmerksamkeit laufend neu wecken."
                      : "Notifications that constantly relaunch attention."}
                </li>
                <li>
                  {isFr
                    ? "Recommandations infinies qui prolongent la session."
                    : isDe
                      ? "Endlose Empfehlungen, die die Sitzungsdauer verlängern."
                      : "Infinite recommendations that prolong sessions."}
                </li>
              </ul>
            ) : null}

            {activeTab === "actions" ? (
              <div className="space-y-5">

                {/* Checklist d'actions concrètes */}
                <div>
                  <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                    {labels.checklistHeading}
                  </p>
                  <div className="space-y-2.5">
                    {checklist.map((item) => {
                      const isOn = checked.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setChecked((prev) =>
                              prev.includes(item)
                                ? prev.filter((x) => x !== item)
                                : [...prev, item],
                            )
                          }
                          className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-[#111827] px-3 py-2 text-left text-sm text-slate-200 transition hover:border-[#E86B00]/35"
                        >
                          <span
                            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] ${
                              isOn
                                ? "border-[#E86B00] bg-[#E86B00]/20 text-[#ffd2aa]"
                                : "border-white/20 text-slate-400"
                            }`}
                          >
                            {isOn ? (
                              <Check
                                className="h-3 w-3"
                                strokeWidth={iconStroke}
                                aria-hidden
                              />
                            ) : null}
                          </span>
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Questions aléatoires */}
                <div className="rounded-xl border border-indigo-500/20 bg-[#0b1325]/70 p-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb
                        className="h-4 w-4 text-indigo-300"
                        strokeWidth={iconStroke}
                        aria-hidden
                      />
                      <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
                        {labels.questionSectionTitle}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {quickQuestions.length} {labels.questionCount}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-200 min-h-[3rem]">
                    {quickQuestions[questionIdx % quickQuestions.length]}
                  </p>
                  <button
                    type="button"
                    onClick={nextQuestion}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/35 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-indigo-300 transition hover:border-indigo-400/60 hover:bg-indigo-500/20 hover:text-indigo-200"
                  >
                    <RefreshCw className="h-3 w-3" strokeWidth={iconStroke} aria-hidden />
                    {labels.nextQuestion}
                  </button>
                </div>
              </div>
            ) : null}

            {activeTab === "challenge" ? <PreventionChallenges locale={locale} /> : null}
          </div>
        </div>
      </div>

    </>
  );
}
