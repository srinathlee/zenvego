"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";
import { Reveal, RevealGroup, fadeUp } from "./motion";

export default function Testimonials() {
  return (
    <section className="bg-sand/60">
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
            Loved in Hyderabad
          </span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
            Calm mornings, happy regulars.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="relative rounded-2xl bg-paper p-8 shadow-sm border border-forest/8"
            >
              <span
                aria-hidden
                className="absolute -top-3 left-6 font-display text-6xl leading-none text-marigold/30 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative mt-4 text-ink/80 leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-ink/55">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
        <p className="mt-6 text-xs text-ink/45">
          Testimonials shown are placeholders for the client to replace.
        </p>
      </div>
    </section>
  );
}
