import Image from "next/image";
import { brand, waChat } from "@/lib/site";

/** Static hero — no animation. Copy on the left, the branded bowl image on the right. */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 pt-12 pb-14 md:pt-14 md:pb-16 grid gap-8 md:gap-8 md:grid-cols-[0.85fr_1.15fr] items-center">
        {/* copy */}
        <div className="order-2 md:order-1">
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
            <span className="block">Stay zen.</span>
            <span className="block">
              Eat <span className="text-marigold">+ve.</span>
            </span>
            <span className="block">Go far.</span>
          </h1>

          <p className="mt-6 text-lg text-ink/70 max-w-md">
            A calm daily breakfast ritual — fresh plant-based bowls, cut every
            morning and delivered to your door in Gachibowli. {brand.subline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="rounded-full bg-marigold text-white px-7 py-3.5 font-semibold shadow-md hover:bg-[#d97b12] transition-colors"
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
          </div>

          <p className="mt-7 text-sm font-medium text-forest/70">
            Plant based · High protein · Mindful living
          </p>
        </div>

        {/* branded bowl image — no frame, blends into the cream page */}
        <div className="order-1 md:order-2">
          <div className="relative w-full aspect-3/2">
            <Image
              src="/assets/hero section bowl image.png"
              alt="A Zenvego bowl packed with steamed sprouts, broccoli, peppers, zucchini, cauliflower and a seed mix"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
