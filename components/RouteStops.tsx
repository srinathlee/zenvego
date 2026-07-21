"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products, steps } from "@/lib/site";

/* ─────────────────────────────────────────────────────────────
   The four checkpoint panels. Each one mounts fresh when the van
   parks, so its animation replays every single time.
   ───────────────────────────────────────────────────────────── */

/** 1 — Pick your bowl: the line-up deals itself onto the table. */
function PopBowls() {
  const picks = products.filter((p) => p.image).slice(0, 3);
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      {picks.map((p, i) => (
        <motion.div
          key={p.key}
          initial={{ opacity: 0, y: 34, rotate: i === 0 ? -8 : i === 2 ? 8 : 0 }}
          animate={{ opacity: 1, y: 0, rotate: i === 0 ? -5 : i === 2 ? 5 : 0 }}
          transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 260, damping: 20 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden ring-2 ring-forest/15 shadow-sm bg-sand"
          >
            <Image src={p.image!} alt={p.name} fill sizes="96px" className="object-cover" />
          </motion.div>
          <p className="mt-2 text-[11px] sm:text-xs font-semibold text-forest/80">
            {p.name.replace("Zen ", "").replace(" Bowl", "")}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/** 2 — Subscribe on WhatsApp: a chat that types itself out. */
function PopChat() {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl bg-sand/70 p-3 space-y-2">
      <motion.div
        initial={{ opacity: 0, x: -18, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 22 }}
        className="max-w-[85%] rounded-2xl rounded-tl-md bg-paper px-3 py-2 text-xs text-ink/75 shadow-sm"
      >
        Hi! I&apos;d like the Power Bowl, weekly 🌱
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 22 }}
        className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-[#25d366] px-3 py-2 text-xs text-white shadow-sm"
      >
        You&apos;re all set — ₹599/week. UPI link sent ✅
      </motion.div>

      {/* typing indicator, keeps breathing while you're parked here */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
        className="flex w-fit items-center gap-1 rounded-full bg-paper px-3 py-2 shadow-sm"
      >
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-forest/45"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 1.3 + d * 0.15 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** 3 — Prepped at dawn: ingredients drop into the bowl, on a loop. */
function PopPrep() {
  const bits = [
    { c: "var(--color-chili)", x: -46, d: 0 },
    { c: "var(--color-marigold)", x: -18, d: 0.35 },
    { c: "var(--color-moss)", x: 10, d: 0.7 },
    { c: "var(--color-pine)", x: 38, d: 1.05 },
  ];
  return (
    <svg viewBox="-90 -80 180 130" className="mx-auto h-28 sm:h-32 w-auto" aria-hidden>
      {/* falling pieces */}
      {bits.map((b) => (
        <motion.circle
          key={b.x}
          cx={b.x}
          r="7"
          fill={b.c}
          initial={{ cy: -74, opacity: 0 }}
          animate={{ cy: [-74, 4], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.9,
            delay: b.d,
            ease: "easeIn",
            times: [0, 0.15, 0.85, 1],
          }}
        />
      ))}
      {/* knife-fresh sparkles */}
      {[-58, 0, 58].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} -50v10M${x - 5} -45h10`}
          stroke="var(--color-marigold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 0.5] }}
          transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.55 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
      {/* the bowl catching them */}
      <path
        d="M-62 6h124c0 26-28 44-62 44S-62 32-62 6Z"
        fill="var(--color-paper)"
        stroke="var(--color-forest)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M-62 6h124" stroke="var(--color-forest)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** 4 — Delivered: the box travels to the mat and the door opens. */
function PopHandoff() {
  return (
    <svg viewBox="-100 -70 200 120" className="mx-auto h-28 sm:h-32 w-auto" aria-hidden>
      {/* doorway */}
      <rect x="10" y="-62" width="76" height="98" rx="4" fill="var(--color-sand)" stroke="var(--color-forest)" strokeWidth="4" />
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
        animate={{ scaleX: [1, 1, 0.28, 0.28, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.6, 0.9, 1], ease: "easeInOut" }}
      >
        <rect x="14" y="-58" width="68" height="94" rx="3" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3" />
        <circle cx="24" cy="-8" r="4" fill="var(--color-marigold)" />
      </motion.g>

      {/* doormat */}
      <rect x="-6" y="30" width="66" height="10" rx="4" fill="var(--color-moss)" opacity="0.45" />

      {/* the box arriving */}
      <motion.g
        animate={{ x: [-96, -96, -34, -34, -96], y: [0, 0, 0, 0, 0], opacity: [0, 1, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.08, 0.4, 0.9, 1], ease: "easeInOut" }}
      >
        <rect x="-14" y="6" width="34" height="28" rx="4" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3.5" />
        <path d="M-14 18h34" stroke="var(--color-marigold)" strokeWidth="5" />
        <path d="M3 6v28" stroke="var(--color-forest)" strokeWidth="2" opacity="0.35" />
      </motion.g>

      {/* doorbell ping */}
      <motion.circle
        cx="94"
        cy="-20"
        r="8"
        fill="none"
        stroke="var(--color-marigold)"
        strokeWidth="2.5"
        animate={{ scale: [0.4, 1.8], opacity: [0.9, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, delay: 1.6 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

const PANELS = [PopBowls, PopChat, PopPrep, PopHandoff];

/** The checkpoint panel: step copy on the left, its animation on the right. */
export function StopPanel({ index }: { index: number }) {
  const s = steps[index];
  const Panel = PANELS[index];
  return (
    <div className="rounded-3xl bg-paper/95 backdrop-blur-sm border border-forest/10 shadow-xl shadow-forest/5 p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest text-cream font-display font-bold">
            {s.n}
          </span>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-marigold">
            {s.kicker}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold leading-tight">
          {s.title}
        </h3>
        <p className="mt-2 text-sm text-ink/65 leading-relaxed">{s.text}</p>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[290px] shrink-0 grid place-items-center">
        <Panel />
      </div>
    </div>
  );
}
