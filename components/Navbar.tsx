"use client";

import { useEffect, useState } from "react";
import { LogoLockup } from "./illustrations/Logo";
import { waChat } from "@/lib/site";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#streak", label: "Zen Streak" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-forest/10 shadow-sm"
          : "bg-cream/40 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <a href="#top" aria-label="zenvego home">
          <LogoLockup markClass="w-9 h-9" wordClass="text-2xl" />
        </a>

        <div className="hidden min-[940px]:flex items-center gap-7 text-sm font-medium text-forest/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-marigold transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={waChat("Hi Zenvego! I'd like to start a breakfast subscription.")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-forest text-cream px-5 py-2.5 text-sm font-semibold hover:bg-pine transition-colors"
        >
          Order now
        </a>
      </nav>
    </header>
  );
}
