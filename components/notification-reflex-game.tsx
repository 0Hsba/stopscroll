"use client";

import { Bell, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

import { iconStroke } from "@/components/section-icon-badge";

type GameStatus = "idle" | "playing" | "done";

type GameNotif = {
  sender: string;
  message: string;
  shouldIgnore: boolean;
};

export type NotificationGameLabels = {
  title: string;
  intro: string;
  start: string;
  restart: string;
  ignore: string;
  open: string;
  score: string;
  notifLabel: string;
  correct: string;
  wrong: string;
  finalGood: string;
  finalOk: string;
  finalBad: string;
};

type Props = {
  labels: NotificationGameLabels;
  pool: GameNotif[];
};

export function NotificationReflexGame({ labels, pool }: Props) {
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [gameDeck, setGameDeck] = useState<GameNotif[]>([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const startGame = () => {
    const ignores = pool.filter((n) => n.shouldIgnore);
    const opens = pool.filter((n) => !n.shouldIgnore);
    const deck = [
      ...[...ignores].sort(() => Math.random() - 0.5).slice(0, 5),
      ...[...opens].sort(() => Math.random() - 0.5).slice(0, 3),
    ].sort(() => Math.random() - 0.5);
    setGameDeck(deck);
    setGameIndex(0);
    setGameScore(0);
    setLastCorrect(null);
    setGameStatus("playing");
  };

  const answerNotif = (ignore: boolean) => {
    if (gameStatus !== "playing" || lastCorrect !== null) return;
    const current = gameDeck[gameIndex];
    if (!current) return;
    const correct = ignore === current.shouldIgnore;
    setLastCorrect(correct);
    setGameScore((s) => Math.max(0, s + (correct ? 10 : -5)));
    const isLast = gameIndex >= gameDeck.length - 1;
    window.setTimeout(() => {
      if (isLast) setGameStatus("done");
      else {
        setGameIndex((i) => i + 1);
        setLastCorrect(null);
      }
    }, 450);
  };

  const currentNotif = gameDeck[gameIndex] ?? null;
  const gameTotal = gameDeck.length || 8;
  const gameMaxScore = gameTotal * 10;
  const gameFinalLabel =
    gameScore >= Math.round(gameMaxScore * 0.75)
      ? labels.finalGood
      : gameScore >= Math.round(gameMaxScore * 0.4)
        ? labels.finalOk
        : labels.finalBad;

  return (
    <div className="rounded-xl border border-[#E86B00]/25 bg-[#0b1325]/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#ffb074]" strokeWidth={iconStroke} aria-hidden />
          <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-white">{labels.title}</h4>
        </div>
        {gameStatus === "playing" ? (
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
            <span className="rounded-full border border-white/10 bg-[#111827] px-2 py-1">
              {labels.notifLabel} {gameIndex + 1}/{gameTotal}
            </span>
            <span className="rounded-full bg-[#E86B00]/20 px-2.5 py-1 text-[#ffd2aa]">
              {labels.score} : {gameScore}
            </span>
          </div>
        ) : null}
        {gameStatus === "done" ? (
          <span className="rounded-full bg-[#E86B00]/20 px-2.5 py-1 text-[11px] font-semibold text-[#ffd2aa]">
            {labels.score} : {gameScore}/{gameMaxScore}
          </span>
        ) : null}
      </div>

      {gameStatus === "idle" ? (
        <div className="mt-3">
          <p className="text-sm leading-relaxed text-slate-300">{labels.intro}</p>
          <button
            type="button"
            onClick={startGame}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E86B00] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-14px_rgba(232,107,0,0.9)]"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={iconStroke} aria-hidden />
            {labels.start}
          </button>
        </div>
      ) : null}

      {gameStatus === "playing" && currentNotif ? (
        <div className="mt-3 space-y-3">
          <div
            className={`relative overflow-hidden rounded-xl border bg-[#111827] p-3 transition-all duration-200 ${
              lastCorrect === true
                ? "border-emerald-400/60 ring-2 ring-emerald-400/30"
                : lastCorrect === false
                  ? "border-rose-400/60 ring-2 ring-rose-400/30"
                  : "border-white/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#E86B00]/15 text-[#ffd2aa]">
                <Bell className="h-4 w-4" strokeWidth={iconStroke} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{currentNotif.sender}</p>
                <p className="text-sm leading-snug text-slate-300">{currentNotif.message}</p>
              </div>
            </div>
            {lastCorrect !== null ? (
              <p
                className={`mt-2 text-xs font-semibold ${
                  lastCorrect ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {lastCorrect ? labels.correct : labels.wrong}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => answerNotif(true)}
              disabled={lastCorrect !== null}
              className="rounded-lg border border-[#E86B00]/45 bg-[#E86B00]/15 px-3 py-2 text-sm font-bold text-[#ffd2aa] transition hover:border-[#E86B00] hover:bg-[#E86B00]/25 disabled:opacity-60"
            >
              {labels.ignore}
            </button>
            <button
              type="button"
              onClick={() => answerNotif(false)}
              disabled={lastCorrect !== null}
              className="rounded-lg border border-white/15 bg-[#111827] px-3 py-2 text-sm font-bold text-slate-200 transition hover:border-white/35 disabled:opacity-60"
            >
              {labels.open}
            </button>
          </div>
        </div>
      ) : null}

      {gameStatus === "done" ? (
        <div className="mt-3">
          <p className="text-base font-extrabold text-white">{gameFinalLabel}</p>
          <button
            type="button"
            onClick={startGame}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#E86B00]/40 bg-[#E86B00]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[#ffd2aa] transition hover:border-[#E86B00] hover:bg-[#E86B00]/20"
          >
            <RefreshCw className="h-3 w-3" strokeWidth={iconStroke} aria-hidden />
            {labels.restart}
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Pools de notifications par langue (réutilisés dans le panneau prévention). */
export function getNotificationPool(locale: "fr" | "en" | "de"): GameNotif[] {
  if (locale === "fr") {
    return [
      { sender: "Instagram", message: "Ton ami a posté une photo 📸", shouldIgnore: true },
      { sender: "TikTok", message: "Cette vidéo virale t'attend 🔥", shouldIgnore: true },
      { sender: "Snap", message: "3 nouveaux snaps 👻", shouldIgnore: true },
      { sender: "Shein", message: "-70% pendant 30 min 🛍️", shouldIgnore: true },
      { sender: "Duolingo", message: "Maintiens ta série de 12 jours 🦉", shouldIgnore: true },
      { sender: "Netflix", message: "On reprend ta série là où tu étais ?", shouldIgnore: true },
      { sender: "Maman ❤️", message: "Appelle-moi quand tu peux", shouldIgnore: false },
      { sender: "Banque", message: "⚠️ Activité inhabituelle détectée", shouldIgnore: false },
      { sender: "Médecin", message: "Rappel : RDV demain à 14h", shouldIgnore: false },
      { sender: "Sœur", message: "Urgence, appelle-moi 🚨", shouldIgnore: false },
    ];
  }
  if (locale === "de") {
    return [
      { sender: "Instagram", message: "Dein Freund hat ein Foto gepostet 📸", shouldIgnore: true },
      { sender: "TikTok", message: "Dieses virale Video wartet 🔥", shouldIgnore: true },
      { sender: "Snap", message: "3 neue Snaps 👻", shouldIgnore: true },
      { sender: "Shein", message: "-70% für 30 Min 🛍️", shouldIgnore: true },
      { sender: "Duolingo", message: "Halte deine 12-Tage-Serie 🦉", shouldIgnore: true },
      { sender: "Netflix", message: "Weiterschauen, wo du warst?", shouldIgnore: true },
      { sender: "Mama ❤️", message: "Ruf mich an, wenn du kannst", shouldIgnore: false },
      { sender: "Bank", message: "⚠️ Ungewöhnliche Aktivität erkannt", shouldIgnore: false },
      { sender: "Arzt", message: "Erinnerung: Termin morgen 14 Uhr", shouldIgnore: false },
      { sender: "Schwester", message: "Notfall, ruf mich an 🚨", shouldIgnore: false },
    ];
  }
  return [
    { sender: "Instagram", message: "Your friend posted a photo 📸", shouldIgnore: true },
    { sender: "TikTok", message: "This viral video is waiting 🔥", shouldIgnore: true },
    { sender: "Snap", message: "3 new snaps 👻", shouldIgnore: true },
    { sender: "Shein", message: "-70% for 30 min 🛍️", shouldIgnore: true },
    { sender: "Duolingo", message: "Keep your 12-day streak 🦉", shouldIgnore: true },
    { sender: "Netflix", message: "Continue your show where you left off?", shouldIgnore: true },
    { sender: "Mom ❤️", message: "Call me when you can", shouldIgnore: false },
    { sender: "Bank", message: "⚠️ Unusual activity detected", shouldIgnore: false },
    { sender: "Doctor", message: "Reminder: appointment tomorrow at 2pm", shouldIgnore: false },
    { sender: "Sister", message: "Emergency, call me 🚨", shouldIgnore: false },
  ];
}
