"use client";

import { Clock, Smartphone, Target, Timer } from "lucide-react";
import { useMemo, useState } from "react";

import {
  getNotificationPool,
  NotificationReflexGame,
  type NotificationGameLabels,
} from "@/components/notification-reflex-game";
import { iconStroke } from "@/components/section-icon-badge";

type Props = {
  locale: "fr" | "en" | "de";
};

type ScrollChoice = "low" | "mid" | "high" | "very";

export function PreventionChallenges({ locale }: Props) {
  const isFr = locale === "fr";
  const isDe = locale === "de";

  const [openPlan, setOpenPlan] = useState(false);
  const [pickedApps, setPickedApps] = useState<string[]>([]);
  const [pauseLeft, setPauseLeft] = useState<number | null>(null);
  const [scrollChoice, setScrollChoice] = useState<ScrollChoice | null>(null);

  const copy = useMemo(() => {
    if (isFr) {
      return {
        intro: "Choisis un mini défi — chacun dure 1 à 2 minutes.",
        notif: {
          title: "Réflexe anti-notif",
          intro:
            "8 notifications défilent. Ignore le bruit, ouvre seulement l'essentiel.",
          start: "Lancer",
          restart: "Rejouer",
          ignore: "Ignorer",
          open: "Ouvrir",
          score: "Score",
          notifLabel: "Notif",
          correct: "Bon choix !",
          wrong: "Aïe, distraction.",
          finalGood: "Attention de pro 🎯",
          finalOk: "Tu progresses 👀",
          finalBad: "Tes notifs te baladent 😅",
        } satisfies NotificationGameLabels,
        appsTitle: "Audit des apps",
        appsLead: "Coche les apps que tu ouvres « sans réfléchir » :",
        appsDone: (n: number) =>
          n === 0
            ? "Aucune sélection — observe tes gestes aujourd'hui."
            : `${n} app(s) repérée(s). Essaie d'en retirer une de l'écran d'accueil cette semaine.`,
        apps: ["TikTok", "Instagram", "Snap", "YouTube", "X", "Jeux"],
        pauseTitle: "Pause 10 secondes",
        pauseLead: "Pose le téléphone, respire, ne scroll pas.",
        pauseStart: "Lancer la pause",
        pauseRunning: (s: number) => `${s}s — respire`,
        pauseDone: "Bravo, tu as tenu 10 secondes sans scroller.",
        scrollTitle: "Estime ton scroll",
        scrollLead: "À peu près, combien de temps aujourd'hui ?",
        scrollLow: "< 30 min",
        scrollMid: "30 min – 1 h",
        scrollHigh: "1 – 2 h",
        scrollVery: "2 h +",
        scrollTip: {
          low: "Continue comme ça — garde une intention avant chaque ouverture.",
          mid: "Bon repère : fixe un créneau « sans écran » de 20 min ce soir.",
          high: "Beaucoup d'écran : coupe 3 notifications non essentielles maintenant.",
          very: "Gros volume : retire 1 app addictive de l'accueil pendant 48 h.",
        },
        planTitle: "Plan 7 jours",
        planLead: "Objectif : réduire ton scroll de 20 % sur une semaine.",
        planOpen: "Ouvrir le plan guidé",
        planClose: "Fermer",
        planSteps: [
          "1. Note ton temps moyen actuel (réglages ou estimation).",
          "2. Choisis un créneau sans téléphone chaque jour.",
          "3. Désactive les notifications non essentielles.",
          "4. Compare dans 7 jours — ajuste une seule habitude.",
        ],
      };
    }
    if (isDe) {
      return {
        intro: "Wähle eine Mini-Challenge — jeweils 1–2 Minuten.",
        notif: {
          title: "Anti-Benachr.-Reflex",
          intro:
            "8 Benachrichtigungen erscheinen. Lärm ignorieren, Wichtiges öffnen.",
          start: "Starten",
          restart: "Nochmal",
          ignore: "Ignorieren",
          open: "Öffnen",
          score: "Punkte",
          notifLabel: "Benachr.",
          correct: "Gute Wahl!",
          wrong: "Autsch, Ablenkung.",
          finalGood: "Profi-Fokus 🎯",
          finalOk: "Du machst Fortschritte 👀",
          finalBad: "Benachr. steuern dich 😅",
        } satisfies NotificationGameLabels,
        appsTitle: "App-Check",
        appsLead: "Markiere Apps, die du « ohne nachzudenken » öffnest:",
        appsDone: (n: number) =>
          n === 0
            ? "Keine Auswahl — beobachte deine Gesten heute."
            : `${n} App(s) erkannt. Entferne diese Woche eine vom Startbildschirm.`,
        apps: ["TikTok", "Instagram", "Snap", "YouTube", "X", "Spiele"],
        pauseTitle: "10-Sekunden-Pause",
        pauseLead: "Handy hinlegen, atmen, nicht scrollen.",
        pauseStart: "Pause starten",
        pauseRunning: (s: number) => `${s}s — atmen`,
        pauseDone: "Super, 10 Sekunden ohne Scrollen geschafft.",
        scrollTitle: "Scroll schätzen",
        scrollLead: "Ungefähr wie viel heute?",
        scrollLow: "< 30 Min",
        scrollMid: "30 Min – 1 Std",
        scrollHigh: "1 – 2 Std",
        scrollVery: "2 Std +",
        scrollTip: {
          low: "Weiter so — vor jedem Öffnen eine Absicht setzen.",
          mid: "Guter Ansatz: heute Abend 20 Min handyfrei einplanen.",
          high: "Viel Bildschirm: jetzt 3 unnötige Benachr. ausschalten.",
          very: "Sehr viel: eine Sucht-App 48 h vom Startbildschirm entfernen.",
        },
        planTitle: "7-Tage-Plan",
        planLead: "Ziel: Scrollzeit in einer Woche um 20 % senken.",
        planOpen: "Geführten Plan öffnen",
        planClose: "Schließen",
        planSteps: [
          "1. Aktuelle durchschnittliche Zeit notieren.",
          "2. Täglich ein handyfreies Zeitfenster wählen.",
          "3. Nicht-essentielle Benachrichtigungen deaktivieren.",
          "4. Nach 7 Tagen vergleichen — eine Gewohnheit anpassen.",
        ],
      };
    }
    return {
      intro: "Pick a mini challenge — each takes 1–2 minutes.",
      notif: {
        title: "Anti-notification reflex",
        intro: "8 notifications appear. Ignore noise, open what truly matters.",
        start: "Start",
        restart: "Play again",
        ignore: "Ignore",
        open: "Open",
        score: "Score",
        notifLabel: "Notif",
        correct: "Good call!",
        wrong: "Oof, distracted.",
        finalGood: "Pro-level focus 🎯",
        finalOk: "Getting there 👀",
        finalBad: "Notifications run your day 😅",
      } satisfies NotificationGameLabels,
      appsTitle: "App audit",
      appsLead: "Tick apps you open « without thinking »:",
      appsDone: (n: number) =>
        n === 0
          ? "No selection — watch your habits today."
          : `${n} app(s) flagged. Try removing one from your home screen this week.`,
      apps: ["TikTok", "Instagram", "Snap", "YouTube", "X", "Games"],
      pauseTitle: "10-second pause",
      pauseLead: "Put the phone down, breathe, don't scroll.",
      pauseStart: "Start pause",
      pauseRunning: (s: number) => `${s}s — breathe`,
      pauseDone: "Nice — 10 seconds without scrolling.",
      scrollTitle: "Estimate your scroll",
      scrollLead: "Roughly how much today?",
      scrollLow: "< 30 min",
      scrollMid: "30 min – 1 h",
      scrollHigh: "1 – 2 h",
      scrollVery: "2 h +",
      scrollTip: {
        low: "Keep it up — set an intention before opening any app.",
        mid: "Good baseline: block 20 phone-free minutes tonight.",
        high: "Heavy use: turn off 3 non-essential notifications now.",
        very: "Very heavy: remove one addictive app from home for 48 h.",
      },
      planTitle: "7-day plan",
      planLead: "Goal: cut scrolling by 20% over one week.",
      planOpen: "Open guided plan",
      planClose: "Close",
      planSteps: [
        "1. Note your current average screen time.",
        "2. Pick one phone-free slot every day.",
        "3. Disable non-essential notifications.",
        "4. Compare after 7 days — adjust one habit.",
      ],
    };
  }, [isFr, isDe]);

  const toggleApp = (app: string) => {
    setPickedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app],
    );
  };

  const startPause = () => {
    if (pauseLeft !== null) return;
    let left = 10;
    setPauseLeft(left);
    const id = window.setInterval(() => {
      left -= 1;
      if (left <= 0) {
        window.clearInterval(id);
        setPauseLeft(0);
        window.setTimeout(() => setPauseLeft(null), 2000);
      } else {
        setPauseLeft(left);
      }
    }, 1000);
  };

  const notifPool = getNotificationPool(locale);

  return (
    <>
      <p className="text-sm text-slate-300">{copy.intro}</p>

      <div className="mt-4 space-y-4">
        <NotificationReflexGame labels={copy.notif} pool={notifPool} />

        <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-[#ffb074]" strokeWidth={iconStroke} aria-hidden />
            <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
              {copy.appsTitle}
            </h4>
          </div>
          <p className="mt-2 text-sm text-slate-300">{copy.appsLead}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {copy.apps.map((app) => {
              const on = pickedApps.includes(app);
              return (
                <button
                  key={app}
                  type="button"
                  onClick={() => toggleApp(app)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    on
                      ? "border-[#E86B00]/60 bg-[#E86B00]/20 text-[#ffd2aa]"
                      : "border-white/15 bg-[#111827] text-slate-300 hover:border-[#E86B00]/35"
                  }`}
                >
                  {app}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">
            {copy.appsDone(pickedApps.length)}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-[#0b1325]/70 p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-emerald-300" strokeWidth={iconStroke} aria-hidden />
            <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
              {copy.pauseTitle}
            </h4>
          </div>
          <p className="mt-2 text-sm text-slate-300">{copy.pauseLead}</p>
          {pauseLeft === null ? (
            <button
              type="button"
              onClick={startPause}
              className="mt-3 rounded-full bg-emerald-600/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-500"
            >
              {copy.pauseStart}
            </button>
          ) : pauseLeft > 0 ? (
            <p className="mt-3 text-2xl font-black tabular-nums text-emerald-300">
              {copy.pauseRunning(pauseLeft)}
            </p>
          ) : (
            <p className="mt-3 text-sm font-semibold text-emerald-300">{copy.pauseDone}</p>
          )}
        </div>

        <div className="rounded-xl border border-indigo-500/20 bg-[#0b1325]/70 p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-300" strokeWidth={iconStroke} aria-hidden />
            <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
              {copy.scrollTitle}
            </h4>
          </div>
          <p className="mt-2 text-sm text-slate-300">{copy.scrollLead}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                ["low", copy.scrollLow],
                ["mid", copy.scrollMid],
                ["high", copy.scrollHigh],
                ["very", copy.scrollVery],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setScrollChoice(id)}
                className={`rounded-lg border px-2 py-2 text-xs font-bold transition ${
                  scrollChoice === id
                    ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                    : "border-white/15 bg-[#111827] text-slate-300 hover:border-indigo-400/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {scrollChoice ? (
            <p className="mt-3 text-sm leading-relaxed text-indigo-200">
              {copy.scrollTip[scrollChoice]}
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-[#E86B00]/20 bg-[#0b1325]/70 p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#ffb074]" strokeWidth={iconStroke} aria-hidden />
            <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-white">
              {copy.planTitle}
            </h4>
          </div>
          <p className="mt-2 text-sm text-slate-300">{copy.planLead}</p>
          <button
            type="button"
            onClick={() => setOpenPlan(true)}
            className="mt-3 inline-flex rounded-full bg-[#E86B00] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5"
          >
            {copy.planOpen}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[120] grid place-items-center bg-black/55 p-4 transition duration-300 ${
          openPlan ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`w-full max-w-md rounded-2xl border border-[#E86B00]/30 bg-[#0b1325] p-5 shadow-[0_26px_60px_-30px_rgba(0,0,0,0.7)] transition duration-300 ${
            openPlan ? "translate-y-0 scale-100" : "translate-y-2 scale-[0.98]"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-base font-extrabold text-white">{copy.planTitle}</h4>
            <button
              type="button"
              onClick={() => setOpenPlan(false)}
              className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-semibold text-slate-300 transition hover:border-[#E86B00]/45 hover:text-white"
            >
              {copy.planClose}
            </button>
          </div>
          <ol className="mt-3 space-y-2 text-sm text-slate-300">
            {copy.planSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
