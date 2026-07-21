"use client";

import { motion } from "framer-motion";
import { HeroArt } from "./illustrations/HeroArt";
import { brand, waChat } from "@/lib/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

const line = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, delay: 0.1 + i * 0.12 },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 pt-14 pb-16 md:pt-20 md:pb-24 grid gap-10 md:grid-cols-2 items-center">
        {/* copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-sand text-forest px-4 py-1.5 text-sm font-medium"
          >
            🌅 {brand.positioning}
          </motion.span>

          <h1 className="mt-6 font-display font-extrabold text-6xl md:text-7xl leading-[0.95] tracking-tight">
            {["Stay zen.", "Eat +ve.", "Go far."].map((t, i) => (
              <motion.span
                key={t}
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className="block"
              >
                {t === "Eat +ve." ? (
                  <>
                    Eat{" "}
                    <span className="text-marigold inline-block rotate-[-4deg]">
                      +ve.
                    </span>
                  </>
                ) : (
                  t
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg text-ink/70 max-w-md"
          >
            A calm daily breakfast ritual — fresh plant-based bowls, cut every
            morning and delivered to your door in Gachibowli. {brand.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#menu"
              className="rounded-full bg-marigold text-white px-7 py-3.5 font-semibold shadow-lg shadow-marigold/25 hover:scale-[1.03] transition-transform"
            >
              See the menu
            </a>
            <a
              href={waChat("Hi Zenvego! I'd like to know more about your breakfast plans.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-forest/20 px-7 py-3.5 font-semibold text-forest hover:bg-forest hover:text-cream transition-colors"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-7 text-sm font-medium text-forest/70"
          >
            Plant based · High protein · Mindful living
          </motion.p>
        </div>

        {/* illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeroArt className="w-full max-w-md mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
