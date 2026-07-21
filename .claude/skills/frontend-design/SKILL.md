---
name: frontend-design
description: Design rules for the Zenvego plant-based breakfast brand. Load before building or editing any UI so components follow one consistent, calm, appetizing design system instead of a generic AI look.
---

# Zenvego Frontend Design Skill

Brand: **zenvego** — a plant-based, breakfast-only subscription in Gachibowli, Hyderabad.
Voice: calm, wholesome, energising. Tagline **Stay Zen · Eat +ve · Go Far**; subline
"Nourish your body. Calm your mind." Pillars: Plant Based · High Protein · Mindful Living.
The site should feel like a mindful morning ritual — fresh and premium, never clinical.

## Core principles

1. **Calm, warm, organic.** Cream background, forest-green bands, rounded shapes
   (`rounded-2xl`/`rounded-3xl`/`rounded-full`), wavy dividers — nothing hard-edged or cold.
2. **Illustration, never photos.** All product/brand visuals are original inline SVG
   (bowls, bento trays, bottle, leaf-bowl logo). No stock photos, no external images.
3. **One system, no randomness.** Every color, size, and space comes from the tokens below.
4. **The `+` is the brand.** Use "+" as the bullet marker everywhere (ties to "Eat +ve");
   FAQ toggles are a rotating "+". Keep "+ve" in marigold.
5. **Avoid the generic AI aesthetic.** No default blue, no flat gray card grids, no lifeless
   single-gradient hero. Lead with the leaf-bowl identity, green/cream rhythm, and motion.

## Brand identity

- **Wordmark:** lowercase `zenvego` — "zen" forest, "ve" **marigold**, "go" forest, with a
  tiny sprout on the final "o". Component: `components/illustrations/Logo.tsx`.
- **Mark:** two leaves rising from a smiling bowl arc + an orange seed (`LogoMark`).
- **Tagline separators:** middot `·` (marigold dots on dark).

## Color tokens (defined in app/globals.css @theme)

- `forest` `#27461F` — primary bands + ink on cream.
- `pine` `#33582A`, `moss` `#6D8A57` — green supporting tones.
- `cream` `#F7F1E1` — page background.
- `sand` `#EDE4CC` — chips / illustration panels / soft sections.
- `paper` `#FFFDF4` — cards.
- `marigold` `#E8891D` — accent: "+ve", CTAs, active states, streak number.
- `chili` `#CE4A26` — price pills only.
- `ink` `#20301A` — body text on light.

Rhythm: alternate **cream** and **forest** full-width bands, joined by `WaveDivider`
(`from`=top band, `to`=bottom band). Marigold is the single call-to-action accent.

## Typography

- **Display / headings:** `--font-display` (**Baloo 2**, weights 600–800). Rounded, friendly.
- **Body / UI:** `--font-sans` (**Poppins**, 400–600).
- Scale: hero `text-6xl`→`md:text-7xl`; section title `text-4xl`→`md:text-5xl`;
  card title `text-xl`; body `text-base`/`text-lg`; eyebrow `text-sm uppercase tracking-widest`.

## Spacing & layout (8px grid)

Section padding `py-20 md:py-28`; container `max-w-6xl mx-auto px-5`; cards `p-6`–`p-10`;
gaps `gap-6`. Be generous. Responsive breakpoints: **940px** (nav links hide) and **760px**
(tracker stacks, grids collapse) — plus Tailwind's `sm`/`md`/`lg`.

## Components

- **Buttons:** pill `rounded-full`, `font-semibold`. Primary CTA = `bg-marigold text-white`;
  on dark = `bg-forest text-cream`; secondary = bordered. Always a hover (scale/color).
- **Price pills:** chili-red `rounded-full` on the sand illustration panel.
- **Nutrition chips:** `rounded-full bg-sand text-forest`.
- **Product cards:** sand SVG panel on top → tag (uppercase marigold) → name → `+`-bulleted
  contents (`.plus-list`) → nutrition chips → forest WhatsApp button.
- **Nav:** sticky translucent cream with `backdrop-blur`; forest "Order now" WhatsApp pill.

## Ordering

Every order/CTA button is a WhatsApp deep link `https://wa.me/919052958108?text=…` with a
URL-encoded prefilled message. Item links rebuild live with the Weekly/Monthly toggle. Use the
`waLink` / `waChat` helpers in `lib/site.ts`; never hardcode numbers or messages.

## Motion (Framer Motion — reuse components/motion.tsx)

- Staggered hero headline reveal on load; scroll reveals via `Reveal`/`RevealGroup` (fade+rise,
  `once`); hover lift on cards (`y: -6`, spring); "pop" scale on a new streak stamp.
- Respect `prefers-reduced-motion` (handled globally in globals.css).

## Accessibility & quality bar

Semantic HTML; `aria-pressed` on toggles; `aria-live="polite"` on tracker confirmations;
visible marigold `:focus-visible` outlines; alt/aria-label on SVGs; smooth anchor scroll with
`scroll-margin`. Static content is server-rendered (visible without JS). Aim Lighthouse 90+.
