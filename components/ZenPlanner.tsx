"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "framer-motion";
import { products, waChat } from "@/lib/site";
import {
  clampDays,
  dateKey,
  DAY_PRESETS,
  MAX_DAYS,
  MIN_DAYS,
  MONTHLY_MORNINGS,
  summarise,
  tomorrowKey,
} from "@/lib/planner";
import { Reveal } from "./motion";
import MorningMood from "./MorningMood";

/** Where the portrait finishes brightening — a full month of mornings. */
const MOOD_FULL_DAYS = 30;

/** Remembers that the visitor has already found the day picker. */
const NUDGE_SEEN = "zenvego:day-nudge-seen";

/** True only after hydration — lets us read the visitor's clock safely. */
const subscribeNoop = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export default function ZenPlanner() {
  const [bowlKey, setBowlKey] = useState("power");
  const [chosenStart, setChosenStart] = useState<string | null>(null);
  const [daysRaw, setDaysRaw] = useState("30");

  // Nothing about a portrait says "this responds to the buttons", so point at
  // them once. The hint retires the moment it's understood, and stays retired.
  const [nudged, setNudged] = useState(
    () => typeof window !== "undefined" && !!localStorage.getItem(NUDGE_SEEN),
  );
  const dismissNudge = useCallback(() => {
    setNudged(true);
    try {
      localStorage.setItem(NUDGE_SEEN, "1");
    } catch {
      // Private mode — a re-shown hint is a nicer failure than a crash.
    }
  }, []);

  // "Tomorrow" depends on the visitor's clock, so the server can't render it.
  const mounted = useMounted();
  const start = chosenStart ?? (mounted ? tomorrowKey() : "");
  const earliest = mounted ? dateKey(new Date()) : undefined;

  const bowl = products.find((p) => p.key === bowlKey) ?? products[0];
  const days = clampDays(parseInt(daysRaw, 10));
  const plan = useMemo(
    () => (start ? summarise(bowl, start, days) : null),
    [bowl, start, days],
  );
  // A one-day window landing on a Sunday delivers nothing.
  const empty = plan?.mornings === 0;

  // The day picker drives the portrait: one dull morning → a bright month.
  const moodProgress = empty
    ? 0
    : Math.min(1, (days - MIN_DAYS) / (MOOD_FULL_DAYS - MIN_DAYS));

  const orderLink = plan && !empty
    ? waChat(
        `Hi Zenvego! I'd like to plan ${plan.mornings} mornings of ${bowl.name} — ${days} days from ${plan.startLabel} to ${plan.endLabel}, on the ${plan.bestPlan} plan (about ₹${plan.bestCost.toLocaleString("en-IN")}). My name is:`,
      )
    : waChat("Hi Zenvego! I'd like to start a breakfast subscription.");

  return (
    <section id="plan" className="max-w-6xl mx-auto px-5 py-20 md:py-28">
      <Reveal className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
          Zen Planner
        </span>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
          See what your mornings add up to.
        </h2>
        <p className="mt-4 text-lg text-ink/65">
          Pick a bowl, pick your days — we&apos;ll show you the protein, fibre
          and calories waiting at the other end.
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-3xl bg-forest text-cream p-6 md:p-10 grid gap-10 lg:grid-cols-2">
          {/* ---------------------------------------------------------- *
           * LEFT — build the plan
           * ---------------------------------------------------------- */}
          <div>
            <Step n="1" title="Pick your bowl" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {products.map((p, i) => {
                const active = p.key === bowlKey;
                const last = i === products.length - 1;
                return (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setBowlKey(p.key)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      last ? "sm:col-span-2" : ""
                    } ${
                      active
                        ? "border-marigold bg-marigold/15"
                        : "border-white/12 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ background: p.dot }}
                    />
                    <span className="flex-1">{p.name}</span>
                    <span className="text-xs text-cream/50">
                      {p.protein}g protein
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <Step n="2" title="Start from" />
              <input
                type="date"
                aria-label="Plan start date"
                value={start}
                min={earliest}
                onChange={(e) => setChosenStart(e.target.value)}
                className="mt-4 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-medium text-cream transition-colors scheme-dark hover:bg-white/10 focus:border-marigold"
              />
            </div>

            <div className="mt-8">
              <Step n="3" title="For how many days" />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {DAY_PRESETS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={days === d}
                    onClick={() => {
                      setDaysRaw(String(d));
                      dismissNudge();
                    }}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      days === d
                        ? "bg-marigold text-white"
                        : "bg-white/10 text-cream/70 hover:text-cream"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
                <label className="flex items-center gap-2 text-sm text-cream/60">
                  <span className="sr-only">Custom number of days</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={MIN_DAYS}
                    max={MAX_DAYS}
                    value={daysRaw}
                    onChange={(e) => {
                      setDaysRaw(e.target.value);
                      dismissNudge();
                    }}
                    onBlur={() => setDaysRaw(String(days))}
                    className="w-20 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-center text-sm font-semibold text-cream transition-colors hover:bg-white/10 focus:border-marigold"
                  />
                  days
                </label>
              </div>

              <AnimatePresence>
                {mounted && !nudged && <DayNudge />}
              </AnimatePresence>

              <p className="mt-4 text-sm text-cream/70" aria-live="polite">
                {plan ? (
                  <>
                    <span className="font-semibold text-cream">
                      {plan.startLabel}
                    </span>{" "}
                    → {plan.endLabel} ·{" "}
                    <span className="font-semibold text-cream">
                      {plan.mornings} mornings
                    </span>{" "}
                    delivered
                  </>
                ) : (
                  "Choose a start date to see your window."
                )}
              </p>
              <p className="mt-1 text-xs text-cream/45">
                We deliver Monday to Saturday — Sundays are your morning off.
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------- *
           * RIGHT — what it adds up to
           * ---------------------------------------------------------- */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-xs uppercase tracking-widest text-cream/50">
              {bowl.name} · {days} {days === 1 ? "day" : "days"}
            </p>

            <div className="mt-4 flex items-start gap-5">
              <figure className="w-[38%] max-w-47.5 shrink-0">
                <MorningMood progress={moodProgress} />
                <figcaption className="mt-2 flex items-baseline justify-between gap-2 text-xs">
                  <span className="text-cream/40">Day 1</span>
                  <span className="font-semibold text-marigold">Day {days}</span>
                </figcaption>
              </figure>

              <div className="min-w-0 flex-1">
                <div className="flex items-end gap-2">
                  <span className="font-display text-5xl font-extrabold leading-none text-marigold sm:text-6xl">
                {plan ? <Counter value={plan.protein} /> : "—"}
                  </span>
                  <span className="mb-1 whitespace-nowrap text-cream/70">
                    g protein
                  </span>
                </div>
                <p className="mt-2 text-sm text-cream/60">
              {plan
                ? `≈ the protein in ${plan.milkGlasses.toLocaleString("en-IN")} glasses of milk`
                : " "}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Tile
                value={plan ? <Counter value={plan.fibre} suffix="g" /> : "—"}
                label="fibre"
              />
              <Tile
                value={plan ? <Counter value={plan.kcal} /> : "—"}
                label="kcal"
              />
              <Tile
                value={plan ? <Counter value={plan.mornings} /> : "—"}
                label="mornings"
              />
            </div>

            {plan && (
              <p className="mt-3 text-xs text-cream/45">
                That&apos;s the fibre of about {plan.apples.toLocaleString("en-IN")}{" "}
                apples, spread across your mornings.
              </p>
            )}

            {/* price */}
            <div className="mt-6 rounded-2xl bg-white/5 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-cream/70 capitalize">
                  {plan ? `${plan.bestPlan} plan` : "Your plan"}
                </span>
                <span className="font-display text-3xl font-bold">
                  {plan ? `₹${plan.bestCost.toLocaleString("en-IN")}` : "—"}
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-4 text-sm text-cream/55">
                <span>per morning</span>
                <span>{plan ? `₹${plan.perMorning}` : "—"}</span>
              </div>

              {plan && empty && (
                <p className="mt-4 rounded-xl bg-white/5 px-4 py-3 text-sm text-cream/75">
                  That window is a Sunday — our one morning off. Add a day or
                  start on Monday.
                </p>
              )}

              {plan && !empty && (
                <p
                  className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                    plan.monthlyEligible
                      ? "bg-marigold/15 text-cream"
                      : "bg-white/5 text-cream/75"
                  }`}
                >
                  {plan.monthlyEligible ? (
                    <>
                      Monthly saves you{" "}
                      <span className="font-semibold">
                        ₹{plan.saving.toLocaleString("en-IN")}
                      </span>{" "}
                      over paying week by week.
                    </>
                  ) : (
                    <>
                      Stretch to {MONTHLY_MORNINGS} mornings and monthly pricing
                      drops this to ₹
                      {Math.round(bowl.priceMonth / MONTHLY_MORNINGS)} a morning.
                    </>
                  )}
                </p>
              )}
            </div>

            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform ${
                empty
                  ? "bg-white/10 text-cream/70 hover:scale-[1.01]"
                  : "bg-marigold text-white hover:scale-[1.02]"
              }`}
            >
              {empty ? "Chat with us on WhatsApp" : "Start this plan on WhatsApp"}
            </a>

            <p className="mt-3 text-xs text-cream/45">
              The portrait is an illustration of the ritual, not a customer photo.
              Nutrition values are approximate, per serving. Pricing is indicative
              — we confirm everything on WhatsApp before you pay.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * A one-time hand-drawn arrow back up at the presets. The portrait reacts to
 * these buttons, but nothing on screen says so — this says so once, then goes.
 */
function DayNudge() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="mt-3 flex items-start gap-2 text-marigold"
    >
      <motion.svg
        viewBox="0 0 52 44"
        aria-hidden="true"
        className="h-8 w-9 shrink-0 -translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        // Drifts along its own direction, so it reads as "up there".
        animate={reduced ? undefined : { x: [0, -5, 0], y: [0, -4, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M48 40C36 39 18 34 11 13" />
        <path d="M4 22 L10 11 L20 16" />
      </motion.svg>

      {/* 30 is already selected, so naming it would be a dead end. */}
      <span className="text-sm font-semibold">
        Try 7 or 14 — watch the mornings change.
      </span>
    </motion.div>
  );
}

function Step({ n, title }: { n: string; title: string }) {
  return (
    <h3 className="flex items-center gap-3 font-display text-xl font-bold">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-marigold text-sm text-white">
        {n}
      </span>
      {title}
    </h3>
  );
}

function Tile({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 p-4 text-center">
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-cream/55">{label}</div>
    </div>
  );
}

/** Rolls a number up to its new value — settles, never distracts. */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const spring = useSpring(0, { stiffness: 120, damping: 24, mass: 0.7 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!reduced) spring.set(value);
  }, [reduced, spring, value]);

  useEffect(() => spring.on("change", (v) => setShown(Math.round(v))), [spring]);

  return (
    <>
      {(reduced ? value : shown).toLocaleString("en-IN")}
      {suffix}
    </>
  );
}
