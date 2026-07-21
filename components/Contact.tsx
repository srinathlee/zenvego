"use client";

import { brand, waChat } from "@/lib/site";
import { InstagramIcon, FacebookIcon } from "./illustrations/Icons";
import { LeafIcon } from "./illustrations/Icons";
import { Reveal } from "./motion";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs uppercase tracking-widest text-cream/45">{label}</span>
      <span className="text-cream/90">{children}</span>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-forest text-cream">
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid gap-10 lg:grid-cols-2 items-start">
        {/* details */}
        <Reveal>
          <span className="text-sm uppercase tracking-widest text-marigold font-semibold">
            Get in touch
          </span>
          <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl leading-tight">
            Team Zenvego
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Row label="Phone">
              <a href={brand.phoneTel} className="hover:text-marigold transition-colors">
                {brand.phone}
              </a>
            </Row>
            <Row label="Email">
              <a href={`mailto:${brand.email}`} className="hover:text-marigold transition-colors">
                {brand.email}
              </a>
            </Row>
            <Row label="Web">
              <a
                href={`https://${brand.web}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-marigold transition-colors"
              >
                {brand.web}
              </a>
            </Row>
            <Row label="Social">
              <span>{brand.social}</span>
            </Row>
          </div>

          <div className="mt-6">
            <span className="text-xs uppercase tracking-widest text-cream/45">Kitchen</span>
            <p className="mt-1 text-cream/90 max-w-sm">{brand.address}</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {[
              { href: brand.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: brand.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: `https://${brand.web}`, Icon: LeafIcon, label: "Website" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/8 hover:bg-marigold hover:text-white transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* CTA card */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-marigold text-white p-8 md:p-10 relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -right-6 -bottom-8 text-[8rem] opacity-20 select-none">
              🌅
            </div>
            <h3 className="relative font-display text-3xl font-bold leading-tight">
              Start tomorrow morning.
            </h3>
            <p className="relative mt-3 text-white/90 max-w-sm">
              Message us on WhatsApp and we&apos;ll set up your first week of calm,
              nourishing breakfasts — delivered fresh to your door.
            </p>
            <a
              href={waChat("Hi Zenvego! I'd like to start my breakfast subscription tomorrow morning.")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-forest text-cream px-7 py-3.5 font-semibold hover:bg-pine transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
