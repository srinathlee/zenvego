export type Plan = "weekly" | "monthly";

export const brand = {
  name: "zenvego",
  tagline: "Stay Zen · Eat +ve · Go Far",
  subline: "Nourish your body. Calm your mind.",
  pillars: ["Plant Based", "High Protein", "Mindful Living"],
  positioning: "Breakfast subscription · Gachibowli, Hyderabad",
  whatsapp: "919052958108",
  phone: "90529 58108",
  phoneTel: "+919052958108",
  email: "hello@zenvego.com",
  web: "www.zenvego.com",
  social: "zenvegolife",
  instagram: "https://instagram.com/zenvegolife",
  facebook: "https://facebook.com/zenvegolife",
  address:
    "Flat-202, Floor 2, Shaik Residency, Street 1, Indiranagar, Gachibowli, Hyderabad, Telangana — 500032",
};

export type Product = {
  key: string;
  name: string;
  tag: string; // uppercase
  contents: string[];
  kcal: number;
  protein: number; // grams
  fibre: number; // grams
  priceWeek: number;
  priceMonth: number;
  dot: string; // css color for tracker dot / accents
  art: "fruit" | "power" | "balance" | "signature" | "ragi";
  /**
   * Real product photo in /public/products. When set, the menu card renders
   * this photo; otherwise it falls back to the SVG illustration.
   * Photos are 5:4 to match the card panel exactly (no cropping).
   */
  image?: string;
};

export const products: Product[] = [
  {
    key: "fruit",
    name: "Zen Fruit Bowl",
    tag: "LIGHT & FRESH",
    contents: ["4–6 seasonal fruit varieties", "Cut fresh every morning", "No additives"],
    kcal: 190,
    protein: 2,
    fibre: 5,
    priceWeek: 499,
    priceMonth: 1999,
    dot: "#E8891D",
    art: "fruit",
    image: "/products/zen fruite bowl.png",
  },
  {
    key: "power",
    name: "Zen Power Bowl",
    tag: "PROTEIN PACKED",
    contents: ["Steamed sprouts", "Protein seed mix", "Lightly cooked veggies"],
    kcal: 320,
    protein: 16,
    fibre: 9,
    priceWeek: 599,
    priceMonth: 2199,
    dot: "#CE4A26",
    art: "power",
    image: "/products/zen power bowl.png",
  },
  {
    key: "balance",
    name: "Zen Balance Bowl",
    tag: "BALANCED",
    contents: [
      "4 fruits + 1 exotic fruit",
      "Sprouts",
      "1 veggie (raw / boiled)",
      "Seed mix",
    ],
    kcal: 300,
    protein: 11,
    fibre: 8,
    priceWeek: 699,
    priceMonth: 2499,
    dot: "#6D8A57",
    art: "balance",
    image: "/products/zen balance bowl.png",
  },
  {
    key: "signature",
    name: "Zen Signature Bowl",
    tag: "CHEF'S BEST",
    contents: [
      "4 fruits + 1 exotic fruit",
      "Sprouts",
      "2 veggies",
      "Zenvego Special of the day",
    ],
    kcal: 350,
    protein: 13,
    fibre: 10,
    priceWeek: 799,
    priceMonth: 2999,
    dot: "#33582A",
    art: "signature",
    image: "/products/zen signature bowl.png",
  },
  {
    key: "ragi",
    name: "Ragi Java",
    tag: "CALCIUM RICH",
    contents: [
      "Traditional finger-millet malt",
      "Calcium rich",
      "Warm & wholesome",
    ],
    kcal: 160,
    protein: 4,
    fibre: 3,
    priceWeek: 399,
    priceMonth: 1399,
    dot: "#B98A3C",
    art: "ragi",
    image: "/products/ragi java.png",
  },
];

export function priceFor(p: Product, plan: Plan): number {
  return plan === "weekly" ? p.priceWeek : p.priceMonth;
}

/** WhatsApp instant-order link with URL-encoded pre-filled message. */
export function waLink(p: Product, plan: Plan): string {
  const price = priceFor(p, plan);
  const per = plan === "weekly" ? "week" : "month";
  const msg = `Hi Zenvego! I'd like to order the ${p.name} — ${plan} plan (₹${price}/${per}). My name is:`;
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/** Generic WhatsApp chat link (non-item CTAs / no-JS fallback). */
export function waChat(text?: string): string {
  const base = `https://wa.me/${brand.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** The four stops on the delivery route, in order. `icon` keys into RouteIcon. */
export const steps = [
  {
    n: "1",
    title: "Pick your bowl",
    text: "Choose the Zen bowl that fits your morning — light and fresh, protein-packed, or fully balanced.",
    kicker: "Takes a minute",
    icon: "bowl" as const,
  },
  {
    n: "2",
    title: "Subscribe on WhatsApp",
    text: "One quick chat sets up your weekly or monthly plan. Pay by UPI — no app, no account, no lock-in.",
    kicker: "One message",
    icon: "chat" as const,
  },
  {
    n: "3",
    title: "We prep it fresh at dawn",
    text: "Every bowl is washed, cut and packed the same morning it reaches you. Nothing sits overnight.",
    kicker: "5:30 AM daily",
    icon: "leaf" as const,
  },
  {
    n: "4",
    title: "Delivered to your door",
    text: "Chilled and sealed, at your doorstep across Gachibowli & nearby before you're out of bed.",
    kicker: "By 8:00 AM",
    icon: "home" as const,
  },
];

export const testimonials = [
  {
    quote:
      "My mornings finally feel calm. The Power Bowl keeps me full till lunch and I never have to think about breakfast.",
    name: "Ananya Rao",
    role: "Product Designer, Gachibowli",
  },
  {
    quote:
      "Fresh, generous, and always on time. The Signature Bowl surprise every day is the best part of my routine.",
    name: "Karthik Reddy",
    role: "Founder, Indiranagar",
  },
  {
    quote:
      "As a runner I care about clean fuel. zenvego is the real deal — no sugar, no fuss, just great food.",
    name: "Meera Nair",
    role: "Marathoner, Nanakramguda",
  },
];

export const faqs = [
  {
    q: "Which areas do you deliver to?",
    a: "We currently deliver across Gachibowli, Indiranagar and nearby neighbourhoods. Message us on WhatsApp with your location and we'll confirm your slot.",
  },
  {
    q: "What time will my breakfast arrive?",
    a: "Deliveries land fresh every morning within your chosen breakfast window. Exact timing is confirmed on WhatsApp when you subscribe (placeholder — client to finalise).",
  },
  {
    q: "Can I pause or skip days?",
    a: "Yes. You can pause or skip anytime — just let us know on WhatsApp before the morning cut-off and we'll adjust your plan, no charge for skipped days.",
  },
  {
    q: "What's the difference between weekly and monthly?",
    a: "Weekly gives you 6 mornings a week with the flexibility to pause anytime. Monthly is the best value — one payment for a full month of mornings.",
  },
  {
    q: "How do I pay?",
    a: "Payment is simple UPI, shared directly on WhatsApp once your plan is set up. No app sign-ups, no card details.",
  },
];
