"use client";

import { motion } from "framer-motion";
import { LeafIcon, DumbbellIcon, MindfulIcon } from "./illustrations/Icons";
import { RevealGroup, fadeUp } from "./motion";

const pillars = [
  {
    Icon: LeafIcon,
    title: "Plant Based",
    text: "100% plant-forward mornings — fruit, sprouts, seeds and veggies, nothing artificial.",
  },
  {
    Icon: DumbbellIcon,
    title: "High Protein",
    text: "Real, satisfying fuel that keeps you full and energised well past breakfast.",
  },
  {
    Icon: MindfulIcon,
    title: "Mindful Living",
    text: "A calm, consistent ritual that starts your day grounded, not rushed.",
  },
];

export default function Pillars() {
  return (
    <section className="bg-forest text-cream">
      <div className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl bg-white/5 border border-white/10 p-7 text-center md:text-left"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-marigold/15 text-marigold">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-cream/70 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
