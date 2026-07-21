"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/site";
import { Reveal, RevealGroup, fadeUp } from "./motion";

export default function HowItWorks() {
  return (
    <section id="how" className="max-w-6xl mx-auto px-5 py-20 md:py-28">
      <Reveal className="max-w-2xl">
        <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
          How it works
        </span>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
          From craving to calm, in four steps.
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <motion.div
            key={s.n}
            variants={fadeUp}
            className="rounded-2xl bg-paper border border-forest/8 p-7 shadow-sm"
          >
            <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-forest text-cream font-display font-bold">
              {s.n}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-ink/65 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
