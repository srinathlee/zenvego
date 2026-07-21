import type { Plan, Product } from "./site";

/* ------------------------------------------------------------------ *
 * Delivery model
 *
 * Zenvego delivers Monday–Saturday — Sundays are off. So a "30 day"
 * plan is 26 mornings at the door, not 30. Every number below is built
 * on actual delivered mornings so the totals match what a subscriber
 * really receives.
 * ------------------------------------------------------------------ */

export const WEEKLY_MORNINGS = 6;
export const MONTHLY_MORNINGS = 26;

export const MIN_DAYS = 1;
export const MAX_DAYS = 90;
export const DAY_PRESETS = [7, 14, 30] as const;

/** Rough real-world equivalents, so grams mean something. */
export const PROTEIN_PER_GLASS_MILK = 8; // g per 250ml glass
export const FIBRE_PER_APPLE = 4.4; // g per medium apple

/* ------------------------------------------------------------------ *
 * Date helpers — local calendar days, "YYYY-MM-DD" keys
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

/**
 * Parse a "YYYY-MM-DD" key as a *local* date. `new Date(key)` would read
 * it as UTC midnight and land on the previous day west of Greenwich.
 */
export function parseKey(key: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Default start — tomorrow morning. */
export function tomorrowKey(): string {
  return dateKey(addDays(new Date(), 1));
}

export function clampDays(n: number): number {
  if (!Number.isFinite(n)) return MIN_DAYS;
  return Math.min(MAX_DAYS, Math.max(MIN_DAYS, Math.round(n)));
}

export function formatDay(key: string): string {
  const d = parseKey(key);
  if (!d) return "—";
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/* ------------------------------------------------------------------ *
 * The plan
 * ------------------------------------------------------------------ */

export type PlanSummary = {
  startLabel: string;
  endLabel: string;
  /** Delivered mornings in the window (Sundays excluded). */
  mornings: number;
  kcal: number;
  protein: number;
  fibre: number;
  milkGlasses: number;
  apples: number;
  weeklyCost: number;
  monthlyCost: number;
  /** Monthly pricing only kicks in from a full month of mornings. */
  monthlyEligible: boolean;
  bestPlan: Plan;
  bestCost: number;
  perMorning: number;
  /** What monthly saves against weekly over the same window. */
  saving: number;
};

/** Delivered mornings across `days` calendar days from `startKey`. */
export function countMornings(startKey: string, days: number): number {
  const start = parseKey(startKey);
  if (!start) return 0;
  let mornings = 0;
  for (let i = 0; i < days; i++) {
    // 0 = Sunday, our one morning off.
    if (addDays(start, i).getDay() !== 0) mornings++;
  }
  return mornings;
}

export function endKey(startKey: string, days: number): string {
  const start = parseKey(startKey);
  if (!start) return startKey;
  return dateKey(addDays(start, days - 1));
}

export function summarise(
  product: Product,
  startKey: string,
  days: number,
): PlanSummary | null {
  if (!parseKey(startKey)) return null;

  const mornings = countMornings(startKey, days);
  const protein = product.protein * mornings;
  const fibre = product.fibre * mornings;

  const weeklyCost = Math.round((product.priceWeek / WEEKLY_MORNINGS) * mornings);
  const monthlyCost = Math.round((product.priceMonth / MONTHLY_MORNINGS) * mornings);
  const monthlyEligible = mornings >= MONTHLY_MORNINGS;

  const bestPlan: Plan = monthlyEligible ? "monthly" : "weekly";
  const bestCost = monthlyEligible ? monthlyCost : weeklyCost;

  return {
    startLabel: formatDay(startKey),
    endLabel: formatDay(endKey(startKey, days)),
    mornings,
    kcal: product.kcal * mornings,
    protein,
    fibre,
    milkGlasses: Math.round(protein / PROTEIN_PER_GLASS_MILK),
    apples: Math.round(fibre / FIBRE_PER_APPLE),
    weeklyCost,
    monthlyCost,
    monthlyEligible,
    bestPlan,
    bestCost,
    perMorning: mornings ? Math.round(bestCost / mornings) : 0,
    saving: Math.max(0, weeklyCost - monthlyCost),
  };
}
