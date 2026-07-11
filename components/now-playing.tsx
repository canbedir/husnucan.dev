"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiSpotify } from "react-icons/si";
import type { NowPlaying as NowPlayingData } from "@/lib/spotify";

const POLL_MS = 30000;

export function NowPlaying() {
  const [track, setTrack] = useState<NowPlayingData>({ isPlaying: false });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const data = (await res.json()) as NowPlayingData;
        if (active) setTrack(data);
      } catch {
        // ignore transient errors; keep the last known state
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <AnimatePresence>
      {track.isPlaying && (
        <motion.a
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, x: -8 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="absolute left-full top-1/2 z-10 ml-3 flex max-w-[220px] -translate-y-1/2 items-center gap-2.5 rounded-full border border-border bg-card/90 py-1.5 pr-4 pl-1.5 shadow-sm backdrop-blur-sm"
        >
          {/* little tail pointing back at the avatar */}
          <span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rotate-45 border-b border-l border-border bg-card" />

          {track.albumImageUrl ? (
            <motion.span
              className="relative block size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            >
              <Image
                src={track.albumImageUrl}
                alt=""
                fill
                className="object-cover"
              />
            </motion.span>
          ) : (
            <SiSpotify className="size-8 shrink-0 text-[#1DB954]" />
          )}

          <span className="flex min-w-0 flex-col leading-tight">
            <span className="flex items-center gap-1.5">
              <SiSpotify className="size-3 shrink-0 text-[#1DB954]" />
              <span className="truncate text-sm font-semibold">
                {track.title}
              </span>
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {track.artist}
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
