"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/site";
import {
  computeStreak,
  dateKey,
  formatToday,
  lastNDays,
  loadState,
  saveState,
  todayKey,
  weekStats,
  type TrackerState,
} from "@/lib/tracker";
import { Reveal } from "./motion";

const productByKey = Object.fromEntries(products.map((p) => [p.key, p]));

export default function ZenStreak() {
  const [state, setState] = useState<TrackerState>({ logs: {}, best: 0 });
  const [ready, setReady] = useState(false);
  const [justStamped, setJustStamped] = useState<string | null>(null);
  const [message, setMessage] = useState<{ tone: "log" | "skip"; text: string } | null>(null);

  // Load persisted state on mount (client only).
  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  const today = todayKey();
  const todaysLog = state.logs[today];
  const streak = useMemo(() => computeStreak(state.logs), [state.logs]);
  const stats = useMemo(() => weekStats(state.logs), [state.logs]);
  const days = useMemo(() => lastNDays(7), []);

  function log(value: string) {
    setState((prev) => {
      const logs = { ...prev.logs, [today]: value };
      const nextStreak = computeStreak(logs);
      const best = Math.max(prev.best, nextStreak);
      const next = { logs, best };
      saveState(next);
      return next;
    });

    if (value === "skip") {
      setMessage({
        tone: "skip",
        text: "No worries — tomorrow is a fresh start. Your best streak stays safe. 🌱",
      });
      setJustStamped(null);
    } else {
      const p = productByKey[value];
      // streak after this log
      const nextStreak = computeStreak({ ...state.logs, [today]: value });
      setMessage({
        tone: "log",
        text: `Logged ${p.name} — you added ${p.kcal} kcal · ${p.protein}g protein · ${p.fibre}g fibre to your week. Streak: ${nextStreak} ${nextStreak === 1 ? "day" : "days"}.`,
      });
      setJustStamped(today);
    }
  }

  return (
    <section id="streak" className="max-w-6xl mx-auto px-5 py-20 md:py-28">
      <Reveal className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
          Zen Streak
        </span>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
          Build a mindful-morning habit.
        </h2>
        <p className="mt-4 text-lg text-ink/65">
          One breakfast, one check-in a day. Watch your streak — and your
          nutrition — grow.
        </p>
      </Reveal>

      <Reveal>
        <div className="rounded-3xl bg-forest text-cream p-6 md:p-10 grid gap-10 lg:grid-cols-2">
          {/* LEFT — logging */}
          <div>
            <h3 className="font-display text-2xl font-bold">
              What did you have this morning?
            </h3>
            <p className="mt-1 text-cream/60 text-sm">
              {formatToday()} ·{" "}
              {todaysLog
                ? todaysLog === "skip"
                  ? "Marked as skipped"
                  : `Logged: ${productByKey[todaysLog]?.name}`
                : "Not logged yet"}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {products.map((p) => {
                const active = todaysLog === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => log(p.key)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      active
                        ? "border-marigold bg-marigold/15"
                        : "border-white/12 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ background: p.dot }}
                    />
                    {p.name}
                  </button>
                );
              })}

              <button
                type="button"
                aria-pressed={todaysLog === "skip"}
                onClick={() => log("skip")}
                className={`flex items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-left text-sm font-medium transition-colors sm:col-span-2 ${
                  todaysLog === "skip"
                    ? "border-cream/50 bg-white/10"
                    : "border-white/25 hover:bg-white/5"
                }`}
              >
                <span className="h-3 w-3 shrink-0 rounded-full border border-cream/40" />
                I skipped breakfast today
              </button>
            </div>

            {/* confirmation */}
            <div aria-live="polite" className="mt-5 min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                {message && (
                  <motion.p
                    key={message.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl px-4 py-3 text-sm ${
                      message.tone === "log"
                        ? "bg-marigold/15 text-cream"
                        : "bg-white/8 text-cream/85"
                    }`}
                  >
                    {message.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — progress */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <div className="flex items-end gap-3">
              <span className="font-display text-7xl font-extrabold text-marigold leading-none">
                {streak}
              </span>
              <span className="mb-2 text-cream/70">day streak</span>
            </div>

            {/* 7-day strip */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-cream/50">
                Last 7 days
              </p>
              <div className="mt-3 flex gap-2">
                {days.map((d) => {
                  const v = state.logs[d];
                  const isToday = d === today;
                  const logged = v && v !== "skip";
                  const skipped = v === "skip";
                  const pop = justStamped === d;
                  const label = new Date(d).toLocaleDateString("en-IN", {
                    weekday: "short",
                  });
                  return (
                    <div key={d} className="flex flex-1 flex-col items-center gap-1.5">
                      <motion.div
                        initial={false}
                        animate={pop ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className={`grid aspect-square w-full place-items-center rounded-xl text-lg ${
                          logged
                            ? "bg-marigold/20"
                            : skipped
                              ? "bg-white/5"
                              : "bg-white/[0.03]"
                        } ${isToday ? "ring-2 ring-marigold" : ""}`}
                      >
                        {logged ? (
                          <LeafStamp />
                        ) : skipped ? (
                          <span className="text-cream/40">–</span>
                        ) : (
                          <span className="text-cream/15">·</span>
                        )}
                      </motion.div>
                      <span className="text-[10px] text-cream/45">{label[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* stat tiles */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "kcal", value: stats.kcal },
                { label: "protein", value: `${stats.protein}g` },
                { label: "fibre", value: `${stats.fibre}g` },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/5 p-4 text-center">
                  <div className="font-display text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-cream/55">{s.label} · 7 days</div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-cream/70">
              Best streak so far:{" "}
              <span className="font-semibold text-cream">{state.best} days</span>
            </p>
            <p className="mt-1 text-xs text-cream/45">
              Nutrition values are approximate, per serving.
              {ready ? "" : " Loading your streak…"}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LeafStamp() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="logged" role="img">
      <path d="M4 20C3 12 8 4 20 4c0 12-8 17-16 16Z" fill="var(--color-marigold)" />
      <path
        d="M4 20C7 15 11 11 17 8"
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
