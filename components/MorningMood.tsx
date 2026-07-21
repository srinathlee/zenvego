"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useSpring } from "framer-motion";

/* ------------------------------------------------------------------ *
 * A frame sequence, not a <video>.
 *
 * Seeking an H.264 file lands on the nearest keyframe, so seeking it
 * from a slider stutters. The same 7.6s scrubs perfectly as 46 WebP
 * stills (616KB total, less than a seventh of the mp4) drawn to a
 * canvas — every frame is addressable and nothing decodes twice.
 * ------------------------------------------------------------------ */

export const FRAME_COUNT = 46;
const frameSrc = (i: number) =>
  `/mood/m${String(i + 1).padStart(2, "0")}.webp`;

/** Intrinsic size of the exported frames. */
const W = 480;
const H = 510;

export default function MorningMood({
  /** 0 = the first dull morning, 1 = a month of them. */
  progress,
  className = "",
}: {
  progress: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const drawn = useRef(-1);
  const [ready, setReady] = useState(false);

  const reduced = useReducedMotion();
  // Soft and settling — the face should arrive, not snap.
  const spring = useSpring(0, { stiffness: 90, damping: 22, mass: 0.9 });

  /* Decode every frame up front, then let the spring pick between them. */
  useEffect(() => {
    let alive = true;
    const imgs: HTMLImageElement[] = [];

    Promise.all(
      Array.from({ length: FRAME_COUNT }, (_, i) => {
        const img = new Image();
        img.src = frameSrc(i);
        imgs[i] = img;
        // decode() rejects on some browsers for cached images — ignore.
        return img.decode().catch(() => undefined);
      }),
    ).then(() => {
      if (!alive) return;
      frames.current = imgs;
      setReady(true);
    });

    return () => {
      alive = false;
    };
  }, []);

  /* Paint whichever frame the spring is currently sitting on. */
  useEffect(() => {
    if (!ready) return;

    const paint = (p: number) => {
      const i = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1))),
      );
      if (i === drawn.current) return;
      const ctx = canvas.current?.getContext("2d");
      const img = frames.current[i];
      if (!ctx || !img?.complete) return;
      ctx.drawImage(img, 0, 0, W, H);
      drawn.current = i;
    };

    paint(reduced ? progress : spring.get());
    return spring.on("change", paint);
  }, [ready, reduced, progress, spring]);

  /* Reduced motion gets the destination, not the journey. */
  useEffect(() => {
    if (!reduced) spring.set(progress);
  }, [reduced, spring, progress]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-forest ${className}`}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <canvas
        ref={canvas}
        width={W}
        height={H}
        aria-hidden="true"
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Warm the portrait into the brand instead of letting it sit raw. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(247,241,225,0.16), inset 0 -60px 60px -40px rgba(39,70,31,0.55)",
        }}
      />
    </div>
  );
}
