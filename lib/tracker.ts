import { products } from "./site";

export type LogValue = string | "skip"; // product key or "skip"
export type TrackerState = {
  logs: Record<string, LogValue>; // { "YYYY-MM-DD": key | "skip" }
  best: number;
};

export const STORAGE_KEY = "zenvego-tracker";

/* ------------------------------------------------------------------ *
 * Persistence
 *
 * This is a self-hosted Next.js site, so we persist to the browser's
 * own localStorage — each visitor's streak lives on their device.
 * (The original brief targeted a Claude artifact using window.storage;
 * for www.zenvego.com the load/save below is the correct swap.)
 * A small in-memory fallback covers SSR and private-mode failures.
 * ------------------------------------------------------------------ */

let memory: TrackerState = { logs: {}, best: 0 };

export function loadState(): TrackerState {
  if (typeof window === "undefined") return { logs: {}, best: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { logs: {}, best: 0 };
    const parsed = JSON.parse(raw) as TrackerState;
    return {
      logs: parsed.logs ?? {},
      best: typeof parsed.best === "number" ? parsed.best : 0,
    };
  } catch {
    return { ...memory };
  }
}

export function saveState(state: TrackerState): void {
  memory = state;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode / quota — keep the in-memory copy */
  }
}

/* ------------------------------------------------------------------ *
 * Date helpers (local calendar days)
 * ------------------------------------------------------------------ */

export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

export function todayKey(): string {
  return dateKey(new Date());
}

/** Last N calendar days ending today, oldest first. */
export function lastNDays(n: number): string[] {
  const today = new Date();
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(dateKey(addDays(today, -i)));
  return out;
}

/* ------------------------------------------------------------------ *
 * Streak + stats
 * ------------------------------------------------------------------ */

/**
 * Consecutive logged (non-skip) days ending today — or ending yesterday
 * if today hasn't been logged yet. A skipped or missed day breaks it.
 */
export function computeStreak(logs: Record<string, LogValue>): number {
  const today = new Date();
  const todayVal = logs[dateKey(today)];

  if (todayVal === "skip") return 0;

  // Start at today if logged, otherwise yesterday (streak may still be alive).
  let cursor = todayVal && todayVal !== "skip" ? today : addDays(today, -1);

  let streak = 0;
  while (true) {
    const v = logs[dateKey(cursor)];
    if (v && v !== "skip") {
      streak++;
      cursor = addDays(cursor, -1);
    } else {
      break;
    }
  }
  return streak;
}

const nutritionByKey = Object.fromEntries(
  products.map((p) => [p.key, { kcal: p.kcal, protein: p.protein, fibre: p.fibre }]),
);

/** Sum nutrition across logged (non-skip) days within the last 7 days. */
export function weekStats(logs: Record<string, LogValue>) {
  return lastNDays(7).reduce(
    (acc, key) => {
      const v = logs[key];
      const n = v && v !== "skip" ? nutritionByKey[v] : undefined;
      if (n) {
        acc.kcal += n.kcal;
        acc.protein += n.protein;
        acc.fibre += n.fibre;
      }
      return acc;
    },
    { kcal: 0, protein: 0, fibre: 0 },
  );
}

export function formatToday(): string {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
