"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { steps } from "@/lib/site";
import { Reveal } from "./motion";
import { StopPanel } from "./RouteStops";

/* The road, drawn in a 1200×460 stage. Everything else is measured off it. */
const ROAD =
  "M -70 372 C 90 372 150 274 306 268 S 470 340 604 306 S 792 198 906 226 S 1086 306 1268 262";

/** Where each stop sits along the road, as a fraction of total path length. */
const STOP_T = [0.08, 0.36, 0.64, 0.96];
/** Scroll positions (0–1 through the section) that park the van at each stop. */
const SCROLL_AT = [0.12, 0.36, 0.6, 0.9];
/** Scroll → road position. The flat runs are the dwells: the van parks and works. */
const DRIVE_IN = [0, 0.06, 0.18, 0.3, 0.42, 0.54, 0.66, 0.8, 1];
const DRIVE_OUT = [0, 0.08, 0.08, 0.36, 0.36, 0.64, 0.64, 0.96, 0.96];

/** How close to a stop counts as "parked here". */
const AT_STOP = 0.025;
/** Keep a panel up at least this long, so a fast scroll can't blink past it. */
const MIN_OPEN_MS = 500;

const WHEEL_R = 11;
const WHEEL_CIRC = 2 * Math.PI * WHEEL_R;

type Pt = { x: number; y: number };

/** Icon paths on a 24×24 grid, stroked by whatever the parent <g> sets. */
function RouteIcon({ name }: { name: (typeof steps)[number]["icon"] }) {
  switch (name) {
    case "bowl":
      return (
        <>
          <path d="M3 11h18c0 5-4 9-9 9s-9-4-9-9Z" />
          <path d="M12 8c0-3 2-5 5-5-.4 3-2 4.6-5 5Z" />
          <path d="M12 8c-.6-2.4-2-3.6-4.6-4 .4 2.4 1.8 3.6 4.6 4Z" />
        </>
      );
    case "chat":
      return (
        <>
          <path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3.5 20.5l1.7-4.7A8.4 8.4 0 1 1 21 11.5Z" />
          <path d="M8.6 10.2c.6 2.6 2.6 4.6 5.2 5.2l1.4-1.6 2 1.2" />
        </>
      );
    case "leaf":
      return (
        <>
          <path d="M4 20c0-9 5-14 16-15 0 10-5 15-16 15Z" />
          <path d="M6 18c3-5 6-8 11-10" />
        </>
      );
    case "home":
      return (
        <>
          <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
          <path d="M10 20v-5h4v5" />
        </>
      );
  }
}

/** The zenvego van, drawn facing right with its wheels resting on y = 0. */
function Van({
  bodyRef,
  wheelRefs,
}: {
  bodyRef: React.RefObject<SVGGElement | null>;
  wheelRefs: React.RefObject<(SVGGElement | null)[]>;
}) {
  return (
    <g ref={bodyRef}>
      <ellipse cx="-4" cy="1" rx="48" ry="6" fill="var(--color-forest)" opacity="0.16" />

      {/* cargo box */}
      <rect
        x="-50"
        y="-46"
        width="58"
        height="32"
        rx="6"
        fill="var(--color-paper)"
        stroke="var(--color-forest)"
        strokeWidth="3"
      />
      <rect x="-50" y="-27" width="58" height="7" fill="var(--color-marigold)" opacity="0.9" />
      <rect x="-44" y="-50" width="40" height="5" rx="2.5" fill="var(--color-marigold)" />

      {/* the mark, painted on the side panel */}
      <g transform="translate(-21 -36) scale(0.62)" opacity="0.95">
        <path d="M0 2C-6 0-9-6-9-13c4 1 8 5 9 11 0 1 .3 3 0 4Z" fill="var(--color-pine)" />
        <path d="M1 2c5-2 8-6 8-13-5 1-8 5-9 11 0 1-.3 3 1 2Z" fill="var(--color-moss)" />
        <path
          d="M-14 3C-13 11-7 15 0 15s13-4 14-12"
          fill="none"
          stroke="var(--color-forest)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* cab */}
      <path
        d="M9 -40h15l14 17v7a2 2 0 0 1-2 2H9Z"
        fill="var(--color-forest)"
        stroke="var(--color-forest)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M13 -35h9l10 13H13Z" fill="#cfe3c4" opacity="0.9" />
      <circle cx="36" cy="-18" r="2.6" fill="var(--color-marigold)" />

      {/* wheels */}
      {[-30, 24].map((cx, i) => (
        <g key={cx} transform={`translate(${cx} ${-WHEEL_R})`}>
          <circle r={WHEEL_R} fill="var(--color-forest)" />
          <circle r={WHEEL_R - 4.5} fill="var(--color-paper)" />
          <g
            ref={(el) => {
              wheelRefs.current[i] = el;
            }}
          >
            <path
              d={`M0 ${-WHEEL_R + 3}V${WHEEL_R - 3}M${-WHEEL_R + 3} 0H${WHEEL_R - 3}`}
              stroke="var(--color-forest)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}
    </g>
  );
}

export default function HowItWorks() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<SVGGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const wheelRefs = useRef<(SVGGElement | null)[]>([]);

  const [pins, setPins] = useState<Pt[]>([]);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  /* Which stop we're parked at right now, plus the min-display bookkeeping. */
  const stopRef = useRef(-1);
  const openedAt = useRef(0);
  const closeTimer = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const drive = useTransform(scrollYProgress, DRIVE_IN, DRIVE_OUT);

  /* Place the pins exactly on the road once the path can be measured. */
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setPins(
      STOP_T.map((t) => {
        const p = path.getPointAtLength(t * len);
        return { x: p.x, y: p.y };
      }),
    );
    if (trailRef.current) {
      trailRef.current.style.strokeDasharray = `${len}`;
      trailRef.current.style.strokeDashoffset = `${len}`;
    }
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  /** Open on arrival; on departure, hold the panel for the rest of MIN_OPEN_MS. */
  const setStop = useCallback((i: number) => {
    if (stopRef.current === i) return;
    stopRef.current = i;

    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (i >= 0) {
      openedAt.current = Date.now();
      setOpen(i);
      return;
    }
    const held = Date.now() - openedAt.current;
    closeTimer.current = window.setTimeout(
      () => setOpen(null),
      Math.max(0, MIN_OPEN_MS - held),
    );
  }, []);

  /* Drive: put the van on the road, bank it into the curve, spin the wheels. */
  const place = useCallback(
    (t: number) => {
      const path = pathRef.current;
      if (!path || !truckRef.current) return;

      const len = path.getTotalLength();
      const d = Math.max(0, Math.min(len, t * len));
      const at = path.getPointAtLength(d);
      const ahead = path.getPointAtLength(Math.min(len, d + 2));
      const behind = path.getPointAtLength(Math.max(0, d - 2));
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

      truckRef.current.setAttribute("transform", `translate(${at.x} ${at.y}) rotate(${angle})`);
      /* suspension bob — tiny, just enough to feel like a real road */
      bodyRef.current?.setAttribute("transform", `translate(0 ${Math.sin(d / 26) * 0.9})`);

      const spin = (d / WHEEL_CIRC) * 360;
      for (const w of wheelRefs.current) w?.setAttribute("transform", `rotate(${spin})`);

      if (trailRef.current) trailRef.current.style.strokeDashoffset = `${len - d}`;

      let reached = 0;
      let parked = -1;
      for (let i = 0; i < STOP_T.length; i++) {
        if (t >= STOP_T[i] - 0.03) reached = i;
        if (Math.abs(t - STOP_T[i]) < AT_STOP) parked = i;
      }
      setActive((cur) => (cur === reached ? cur : reached));
      setStop(parked);
    },
    [setStop],
  );

  useMotionValueEvent(drive, "change", place);
  useEffect(() => {
    place(drive.get());
  }, [place, drive]);

  const goTo = useCallback(
    (i: number) => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + travel * SCROLL_AT[i],
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced],
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how"
        ref={sectionRef}
        className="relative h-[300vh] md:h-[380vh]"
        aria-label="How it works"
      >
        <div className="sticky top-0 h-svh flex flex-col overflow-hidden">
          {/* ── heading ───────────────────────────────────────────── */}
          <div className="max-w-6xl w-full mx-auto px-5 pt-24 md:pt-28 shrink-0">
            <Reveal className="max-w-2xl">
              <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
                How it works
              </span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl leading-tight">
                Every bowl takes the same road home.
              </h2>
            </Reveal>
          </div>

          {/* ── the route ─────────────────────────────────────────── */}
          <div className="relative flex-1 min-h-0 w-full">
            <svg
              viewBox="0 0 1200 460"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {/* sun */}
              <circle cx="985" cy="86" r="34" fill="var(--color-marigold)" opacity="0.16" />
              <circle cx="985" cy="86" r="21" fill="var(--color-marigold)" opacity="0.5" />

              {/* rolling hills, back to front */}
              <path
                d="M-40 300c150-70 260 20 420-30s300-90 460-40 300 40 400 10v260h-1280Z"
                fill="var(--color-moss)"
                opacity="0.13"
              />
              <path
                d="M-40 350c180-60 280 30 440-10s280-70 440-30 320 30 420 4v220h-1300Z"
                fill="var(--color-moss)"
                opacity="0.2"
              />

              {/* drifting clouds */}
              {[
                { x: 150, y: 78, s: 1, d: 0 },
                { x: 620, y: 52, s: 0.7, d: 6 },
                { x: 1080, y: 132, s: 0.55, d: 12 },
              ].map((c) => (
                <motion.g
                  key={c.x}
                  transform={`translate(${c.x} ${c.y}) scale(${c.s})`}
                  animate={{ x: [0, 26, 0] }}
                  transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: c.d }}
                >
                  <path
                    d="M0 0h74a17 17 0 0 0 0-34 24 24 0 0 0-44-10A20 20 0 0 0 0 0Z"
                    fill="var(--color-paper)"
                    opacity="0.75"
                  />
                </motion.g>
              ))}

              {/* trees */}
              {[
                { x: 80, y: 300, s: 1 },
                { x: 232, y: 244, s: 0.72 },
                { x: 486, y: 300, s: 0.86 },
                { x: 742, y: 246, s: 0.66 },
                { x: 1010, y: 296, s: 0.8 },
              ].map((t) => (
                <g key={t.x} transform={`translate(${t.x} ${t.y}) scale(${t.s})`}>
                  <path d="M0 0v-26" stroke="var(--color-forest)" strokeWidth="5" strokeLinecap="round" />
                  <circle cy="-38" r="19" fill="var(--color-pine)" opacity="0.85" />
                  <circle cx="-13" cy="-28" r="12" fill="var(--color-moss)" opacity="0.8" />
                  <circle cx="13" cy="-30" r="11" fill="var(--color-moss)" opacity="0.65" />
                </g>
              ))}

              {/* the house at journey's end */}
              <g transform="translate(1120 236)">
                <path
                  d="M-34 0 0-30 34 0v34a3 3 0 0 1-3 3H-31a3 3 0 0 1-3-3Z"
                  fill="var(--color-paper)"
                  stroke="var(--color-forest)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path d="M-42 0 0-36 42 0" fill="none" stroke="var(--color-forest)" strokeWidth="4" strokeLinecap="round" />
                <rect x="-8" y="12" width="16" height="25" rx="2" fill="var(--color-marigold)" />
                <rect x="-26" y="8" width="12" height="12" rx="2" fill="var(--color-moss)" opacity="0.5" />
              </g>

              {/* ── road: shadow, asphalt, travelled trail, centre dashes ── */}
              <path d={ROAD} fill="none" stroke="var(--color-forest)" strokeWidth="30" strokeLinecap="round" opacity="0.1" transform="translate(0 7)" />
              <path ref={pathRef} d={ROAD} fill="none" stroke="var(--color-forest)" strokeWidth="26" strokeLinecap="round" opacity="0.88" />
              <path ref={trailRef} d={ROAD} fill="none" stroke="var(--color-marigold)" strokeWidth="26" strokeLinecap="round" opacity="0.95" />
              <path d={ROAD} fill="none" stroke="var(--color-cream)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="14 18" opacity="0.7" />

              {/* ── stop pins ───────────────────────────────────────── */}
              {pins.map((p, i) => {
                const on = i <= active;
                const here = i === active;
                return (
                  <g key={i} transform={`translate(${p.x} ${p.y})`}>
                    <path d="M0 -6v-46" stroke="var(--color-forest)" strokeWidth="3" strokeLinecap="round" opacity={on ? 0.9 : 0.35} />
                    {here && (
                      <motion.circle
                        cy="-52"
                        r="20"
                        fill="none"
                        stroke="var(--color-marigold)"
                        strokeWidth="2"
                        initial={{ scale: 0.7, opacity: 0.9 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        style={{ transformOrigin: "0px -52px", transformBox: "fill-box" }}
                      />
                    )}
                    <motion.g
                      animate={{ scale: here ? 1.12 : 1, y: here ? -4 : 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      <rect
                        x="-20"
                        y="-72"
                        width="40"
                        height="40"
                        rx="13"
                        fill={on ? "var(--color-marigold)" : "var(--color-paper)"}
                        stroke="var(--color-forest)"
                        strokeWidth="3"
                      />
                      <g
                        transform="translate(-11 -63) scale(0.917)"
                        fill="none"
                        stroke={on ? "var(--color-paper)" : "var(--color-forest)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <RouteIcon name={steps[i].icon} />
                      </g>
                    </motion.g>
                    <circle
                      cy="-52"
                      r="30"
                      fill="transparent"
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Go to step ${i + 1}: ${steps[i].title}`}
                      onClick={() => goTo(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          goTo(i);
                        }
                      }}
                    />
                  </g>
                );
              })}

              {/* ── the van ─────────────────────────────────────────── */}
              <g ref={truckRef}>
                <Van bodyRef={bodyRef} wheelRefs={wheelRefs} />
                {[0, 0.6, 1.2].map((d) => (
                  <motion.circle
                    key={d}
                    cx="-54"
                    cy="-18"
                    r="5"
                    fill="var(--color-moss)"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.4, 0],
                      x: [0, -26, -46],
                      y: [0, -10, -20],
                      scale: [0.5, 1, 1.6],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: d, ease: "easeOut" }}
                  />
                ))}
              </g>
            </svg>

            {/* ── the checkpoint panel ──────────────────────────────── */}
            <div className="absolute inset-0 flex items-start justify-center px-4 sm:px-5 pointer-events-none">
              <AnimatePresence mode="wait">
                {open !== null && (
                  <motion.div
                    key={open}
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                    className="w-full max-w-3xl pointer-events-auto"
                    role="status"
                    aria-live="polite"
                  >
                    <StopPanel index={open} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
