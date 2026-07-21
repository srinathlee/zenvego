"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";
import { Reveal } from "./motion";

export default function Faq() {
  /** Only one answer stays open at a time; null means everything is closed. */
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-5 py-20 md:py-28">
      <Reveal className="text-center">
        <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
          FAQ
        </span>
        <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
          Good to know.
        </h2>
      </Reveal>

      <Reveal className="mt-10 divide-y divide-forest/10 rounded-2xl bg-paper border border-forest/8 px-2">
        <div className="divide-y divide-forest/10">
          {faqs.map((f) => {
            const isOpen = open === f.q;
            const panelId = `faq-panel-${f.q.replace(/\W+/g, "-").toLowerCase()}`;

            return (
              <div key={f.q} className="px-4">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.q)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display font-semibold text-lg"
                >
                  {f.q}
                  <span
                    aria-hidden
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-marigold/15 text-marigold text-xl font-bold transition-transform duration-300 ease-out ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* 0fr → 1fr grid row animates to the answer's natural height */}
                <div
                  id={panelId}
                  role="region"
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 -mt-1 text-ink/70 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
