"use client";

import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { iconStroke } from "@/components/section-icon-badge";
import {
  getChatbotContent,
  type ChatbotChoice,
  type ChatbotContent,
} from "@/lib/chatbot-content";
import type { Locale } from "@/lib/locale";

const BUBBLE_DELAY_MS = 1500;
const CHAR_MS = 16;
const CHAR_MS_PUNCT = 48;

type ChatLine = { role: "bot" | "user"; text: string };

type AfterTyping = {
  choices: ChatbotChoice[];
  link: { href: string; label: string } | null;
};

type Props = {
  locale: Locale;
};

function seedMenu(content: ChatbotContent) {
  return {
    botTexts: [content.welcome, content.menuPrompt],
    choices: content.nodes.menu.choices,
  };
}

function delayForChar(char: string, reducedMotion: boolean) {
  if (reducedMotion) return 0;
  if (char === " " || char === "\n") return CHAR_MS * 0.45;
  if (/[.,!?;:]/.test(char)) return CHAR_MS_PUNCT;
  return CHAR_MS;
}

export function ChatbotWidget({ locale }: Props) {
  const content = getChatbotContent(locale);
  const [open, setOpen] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [lines, setLines] = useState<ChatLine[]>([]);
  const [choices, setChoices] = useState<ChatbotChoice[]>([]);
  const [pendingLink, setPendingLink] = useState<{ href: string; label: string } | null>(
    null,
  );
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const typingToken = useRef(0);
  const afterTypingRef = useRef<AfterTyping | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setBubbleOpen(true), BUBBLE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, typingText, choices, pendingLink, open, isTyping, scrollToBottom]);

  const cancelTyping = useCallback(() => {
    typingToken.current += 1;
    setIsTyping(false);
    setTypingText("");
    afterTypingRef.current = null;
  }, []);

  const finishTyping = useCallback((after: AfterTyping) => {
    setIsTyping(false);
    setTypingText("");
    setChoices(after.choices);
    setPendingLink(after.link);
    afterTypingRef.current = null;
  }, []);

  const runTypewriter = useCallback(
    (messages: string[], after: AfterTyping) => {
      const token = ++typingToken.current;
      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      afterTypingRef.current = after;
      setIsTyping(true);
      setChoices([]);
      setPendingLink(null);
      setTypingText("");

      const typeMessage = (index: number) => {
        if (token !== typingToken.current) return;

        if (index >= messages.length) {
          finishTyping(after);
          return;
        }

        const full = messages[index];
        if (reducedMotion) {
          setLines((prev) => [...prev, { role: "bot", text: full }]);
          setTypingText("");
          typeMessage(index + 1);
          return;
        }

        let charIndex = 0;
        setTypingText("");

        const tick = () => {
          if (token !== typingToken.current) return;

          charIndex += 1;
          setTypingText(full.slice(0, charIndex));

          if (charIndex < full.length) {
            const delay = delayForChar(full.charAt(charIndex - 1), reducedMotion);
            window.setTimeout(tick, delay);
            return;
          }

          setLines((prev) => [...prev, { role: "bot", text: full }]);
          setTypingText("");
          window.setTimeout(() => typeMessage(index + 1), 280);
        };

        tick();
      };

      typeMessage(0);
    },
    [finishTyping],
  );

  const goToMenu = useCallback(() => {
    cancelTyping();
    setLines([]);
    const seed = seedMenu(content);
    runTypewriter(seed.botTexts, { choices: seed.choices, link: null });
  }, [cancelTyping, content, runTypewriter]);

  const openPanel = useCallback(() => {
    setBubbleOpen(false);
    setOpen(true);
    if (!initialized.current) {
      initialized.current = true;
      const seed = seedMenu(content);
      setLines([]);
      runTypewriter(seed.botTexts, { choices: seed.choices, link: null });
    }
  }, [content, runTypewriter]);

  const handleChoice = (choice: ChatbotChoice) => {
    if (isTyping) return;

    const nextNode = choice.next ? content.nodes[choice.next] : undefined;
    const botMessages = [choice.reply, ...(nextNode?.intro ? [nextNode.intro] : [])];

    setLines((prev) => [...prev, { role: "user", text: choice.label }]);

    runTypewriter(botMessages, {
      choices: nextNode?.choices ?? [],
      link:
        choice.href && choice.hrefLabel
          ? { href: choice.href, label: choice.hrefLabel }
          : null,
    });
  };

  const footerDisabled = isTyping;

  return (
    <div className="ss-chatbot-root fixed z-[90] flex flex-col items-end gap-2 pointer-events-none bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))]">
      {open ? (
        <div
          role="dialog"
          aria-labelledby="ss-chatbot-title"
          className="ss-chatbot-panel pointer-events-auto flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0b1325] shadow-[0_20px_56px_-16px_rgba(0,0,0,0.55)] ring-1 ring-white/10 motion-safe:animate-chat-bubble motion-reduce:opacity-100"
        >
          <header className="flex items-start justify-between gap-2 border-b border-white/10 bg-[#0a0f1c] px-4 py-3">
            <div className="min-w-0">
              <p
                id="ss-chatbot-title"
                className="font-[family-name:var(--font-lilita-one)] text-base leading-none text-[#ffb074]"
              >
                {content.panelTitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                cancelTyping();
                setOpen(false);
              }}
              className="ss-chatbot-close flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition"
              aria-label={content.closeAria}
            >
              <X className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex max-h-[min(52vh,22rem)] flex-col gap-3 overflow-y-auto overscroll-contain px-3 py-3"
          >
            {lines.map((line, i) => (
              <div
                key={`${line.role}-${i}-${line.text.slice(0, 24)}`}
                className={`flex ${line.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={
                    line.role === "user"
                      ? "max-w-[88%] rounded-2xl rounded-br-md bg-[#E86B00] px-3 py-2 text-[13px] font-medium leading-snug text-white"
                      : "max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-[#121a2e] px-3 py-2 text-[13px] leading-snug text-slate-200"
                  }
                >
                  {line.text}
                </p>
              </div>
            ))}

            {isTyping ? (
              <div className="flex justify-start">
                <p className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/10 bg-[#121a2e] px-3 py-2 text-[13px] leading-snug text-slate-200">
                  {typingText}
                  <span
                    className="ml-0.5 inline-block w-[2px] animate-pulse text-[#E86B00] motion-reduce:hidden"
                    aria-hidden
                  >
                    |
                  </span>
                </p>
              </div>
            ) : null}

            {pendingLink && !isTyping ? (
              <div className="flex justify-start">
                <Link
                  href={pendingLink.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 rounded-full border border-[#E86B00]/30 bg-[#E86B00]/10 px-3 py-1.5 text-xs font-semibold text-[#ffb074] transition hover:bg-[#E86B00]/18"
                >
                  {pendingLink.label}
                </Link>
              </div>
            ) : null}
          </div>

          <footer className="border-t border-white/10 bg-[#0a0f1c] px-3 py-3">
            {isTyping ? (
              <p className="flex items-center gap-2 px-1 py-1 text-[12px] text-slate-500">
                <span className="inline-flex gap-1" aria-hidden>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#E86B00]/80 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#E86B00]/80 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#E86B00]/80 [animation-delay:240ms]" />
                </span>
                <span>{content.typingHint}</span>
              </p>
            ) : choices.length > 0 ? (
              <ul className="flex flex-col gap-1.5">
                {choices.map((choice) => (
                  <li key={choice.id}>
                    <button
                      type="button"
                      disabled={footerDisabled}
                      onClick={() => handleChoice(choice)}
                      className="w-full rounded-xl border border-white/10 bg-[#121a2e] px-3 py-2.5 text-left text-[13px] font-medium leading-snug text-slate-100 transition hover:border-[#E86B00]/35 hover:bg-[#E86B00]/10 hover:text-[#ffb074] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E86B00]/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {choice.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <button
                type="button"
                disabled={footerDisabled}
                onClick={goToMenu}
                className="w-full rounded-xl border border-[#E86B00]/25 bg-[#E86B00]/10 px-3 py-2.5 text-center text-[13px] font-semibold text-[#ffb074] transition hover:bg-[#E86B00]/16 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {content.backToMenu}
              </button>
            )}
          </footer>
        </div>
      ) : bubbleOpen ? (
        <div className="pointer-events-auto flex items-end gap-2">
          <div
            role="status"
            aria-live="polite"
            className="relative max-w-[min(14rem,calc(100vw-5.5rem))] rounded-2xl border border-white/80 bg-white px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-slate-800 shadow-[0_12px_40px_-14px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.06] motion-safe:animate-chat-bubble motion-reduce:opacity-100"
          >
            <button
              type="button"
              onClick={() => setBubbleOpen(false)}
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-slate-800"
              aria-label={content.dismissBubbleAria}
            >
              <X className="h-3 w-3" strokeWidth={2.5} aria-hidden />
            </button>
            <p className="m-0 pr-1">{content.bubbleText}</p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => (open ? (cancelTyping(), setOpen(false)) : openPanel())}
        className={`pointer-events-auto flex size-[3.25rem] items-center justify-center rounded-full border-[3px] border-white/95 shadow-[0_10px_32px_-8px_rgba(232,107,0,0.55)] motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.06] hover:shadow-[0_14px_40px_-8px_rgba(232,107,0,0.65)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E86B00]/40 motion-reduce:hover:scale-100 sm:size-14 ${
          open
            ? "bg-[#E86B00] text-white"
            : "bg-gradient-to-br from-[#f59e0b] to-[#E86B00] text-white"
        }`}
        aria-label={open ? content.closeAria : content.fabAria}
        aria-expanded={open}
      >
        {open ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={iconStroke} aria-hidden />
        ) : (
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={iconStroke} aria-hidden />
        )}
      </button>
    </div>
  );
}
