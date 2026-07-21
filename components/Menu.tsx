"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products, priceFor, waLink, type Plan } from "@/lib/site";
import { ProductArt } from "./illustrations/ProductArt";
import { Reveal, RevealGroup, fadeUp } from "./motion";

const hints: Record<Plan, string> = {
  weekly: "6 mornings a week · pause anytime",
  monthly: "Best value · one payment, a month of mornings",
};

export default function Menu() {
  const [plan, setPlan] = useState<Plan>("weekly");
  const per = plan === "weekly" ? "week" : "month";

  return (
    <section id="menu" className="bg-forest text-cream">
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
            The menu
          </span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
            Fresh bowls, every morning.
          </h2>

          {/* plan toggle */}
          <div className="mt-8 inline-flex items-center rounded-full bg-white/10 p-1 border border-white/10">
            {(["weekly", "monthly"] as Plan[]).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={plan === p}
                onClick={() => setPlan(p)}
                className={`rounded-full px-6 py-2 text-sm font-semibold capitalize transition-colors ${
                  plan === p ? "bg-marigold text-white" : "text-cream/70 hover:text-cream"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-cream/60">{hints[plan]}</p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <motion.article
              key={p.key}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col rounded-2xl bg-paper text-ink overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              {/* sand illustration panel */}
              <div className="relative bg-sand px-4 pt-4">
                <span className="absolute top-4 left-4 rounded-full bg-chili text-white text-xs font-bold px-3 py-1 shadow">
                  ₹{priceFor(p, plan)}
                  <span className="font-medium">/{per}</span>
                </span>
                <ProductArt art={p.art} className="w-full h-36" />
              </div>

              <div className="flex flex-col flex-1 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-marigold">
                  {p.tag}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold">{p.name}</h3>

                <ul className="plus-list mt-3 space-y-1.5 text-sm text-ink/70">
                  {p.contents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                {/* nutrition chips */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {[
                    `~${p.kcal} kcal`,
                    `${p.protein}g protein`,
                    `${p.fibre}g fibre`,
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-sand px-3 py-1 font-medium text-forest"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <a
                  href={waLink(p, plan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-5 py-3 text-sm font-semibold hover:bg-pine transition-colors"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.article>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-xs text-cream/50">
          Nutrition values are approximate, per serving.
        </p>
      </div>
    </section>
  );
}
