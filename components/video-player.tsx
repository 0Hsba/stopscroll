"use client";

import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  cta: string;
  title: string;
}

export function VideoPlayer({ cta, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);

  useEffect(() => {
    if (!playing) return;

    const initPlayer = () => {
      if (!playerRef.current || !window.YT?.Player) return;
      ytPlayerRef.current = new window.YT.Player(playerRef.current, {
        videoId: "DQ7ssxgruD8",
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: "DQ7ssxgruD8",
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (e: any) => {
            // Force la qualité la plus haute disponible
            e.target.setPlaybackQuality("hd1080");
          },
          onPlaybackQualityChange: (e: any) => {
            const q = e.target.getPlaybackQuality();
            // Si YouTube rétrograde sous 720p, on force à nouveau
            if (q === "small" || q === "medium" || q === "large") {
              e.target.setPlaybackQuality("hd1080");
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      // Charge l'API YouTube si pas encore présente
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      ytPlayerRef.current?.destroy?.();
    };
  }, [playing]);

  return (
    <div className="mt-5 mx-auto aspect-[9/16] w-full max-w-[min(100%,340px)] overflow-hidden rounded-2xl border border-[#E86B00]/15 bg-[radial-gradient(ellipse_at_20%_20%,rgba(232,107,0,0.14),transparent_55%),#0a0f1e] relative">
      {playing ? (
        <div ref={playerRef} className="h-full w-full" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[#E86B00]/40 bg-[#0f172a]/95 px-5 py-2.5 text-sm font-semibold text-[#ffd2aa] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:border-[#E86B00]/60 hover:bg-[#E86B00]/12"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E86B00] text-white shadow-[0_0_20px_rgba(232,107,0,0.5)]">
              <Play className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden />
            </span>
            <span>{cta}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Types globaux YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
