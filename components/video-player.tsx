"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  cta: string;
  title: string;
}

export function VideoPlayer({ cta, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-5 mx-auto aspect-[9/16] w-full max-w-[min(100%,340px)] overflow-hidden rounded-2xl border border-[#E86B00]/15 bg-[radial-gradient(ellipse_at_20%_20%,rgba(232,107,0,0.14),transparent_55%),#0a0f1e] relative">
      {playing ? (
        <iframe
          src="https://www.youtube.com/embed/DQ7ssxgruD8?autoplay=1&loop=1&playlist=DQ7ssxgruD8"
          title={title}
          allow="autoplay; fullscreen"
          className="h-full w-full"
        />
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