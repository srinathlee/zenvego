"use client";

import { faqs } from "@/lib/site";
import { Reveal } from "./motion";

export default function Faq() {
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
          {faqs.map((f) => (
            <details key={f.q} className="group px-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display font-semibold text-lg list-none marker:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-marigold/15 text-marigold text-xl font-bold transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 -mt-1 text-ink/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
