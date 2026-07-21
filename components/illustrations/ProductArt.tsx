import type { Product } from "@/lib/site";

/** Flat SVG illustration per product, drawn on the card's sand panel. */
export function ProductArt({
  art,
  className,
}: {
  art: Product["art"];
  className?: string;
}) {
  const common = {
    viewBox: "0 0 200 140",
    className,
    role: "img" as const,
  };

  if (art === "ragi") {
    return (
      <svg {...common} aria-label="Bottle of Ragi Java millet malt drink">
        <ellipse cx="100" cy="126" rx="46" ry="7" fill="var(--color-moss)" opacity="0.35" />
        {/* bottle */}
        <path
          d="M86 34h28v10c0 4 2 6 5 9 6 5 9 12 9 21v33a10 10 0 0 1-10 10H82a10 10 0 0 1-10-10V74c0-9 3-16 9-21 3-3 5-5 5-9V34Z"
          fill="var(--color-paper)"
          stroke="var(--color-forest)"
          strokeWidth="3.5"
        />
        {/* malt fill */}
        <path
          d="M75 84c0-8 2-14 6-18h38c4 4 6 10 6 18v29a7 7 0 0 1-7 7H82a7 7 0 0 1-7-7V84Z"
          fill="#B98A3C"
        />
        <path d="M75 84c0-3 .4-6 1.2-8 15 6 31 6 47 0 .6 2 .8 5 .8 8H75Z" fill="#CBA25A" />
        {/* cap */}
        <rect x="84" y="24" width="32" height="14" rx="4" fill="var(--color-marigold)" />
        {/* steam */}
        <g fill="none" stroke="var(--color-moss)" strokeWidth="3" strokeLinecap="round" opacity="0.6">
          <path d="M92 20c-5-5 5-9 0-15" />
          <path d="M108 20c-5-5 5-9 0-15" />
        </g>
      </svg>
    );
  }

  if (art === "balance" || art === "signature") {
    const special = art === "signature";
    return (
      <svg {...common} aria-label={`${special ? "Signature" : "Balance"} bento tray of fruit, sprouts and veggies`}>
        <ellipse cx="100" cy="128" rx="72" ry="7" fill="var(--color-moss)" opacity="0.3" />
        {/* tray */}
        <rect x="26" y="34" width="148" height="80" rx="12" fill="var(--color-paper)" stroke="var(--color-forest)" strokeWidth="3.5" />
        <line x1="100" y1="38" x2="100" y2="110" stroke="var(--color-forest)" strokeWidth="2.5" opacity="0.5" />
        <line x1="30" y1="74" x2="170" y2="74" stroke="var(--color-forest)" strokeWidth="2.5" opacity="0.5" />
        {/* top-left: fruit */}
        <circle cx="52" cy="55" r="9" fill="var(--color-marigold)" />
        <circle cx="72" cy="58" r="8" fill="var(--color-chili)" />
        <circle cx="62" cy="60" r="7" fill="#7FA650" />
        {/* top-right: exotic fruit + special */}
        <path d="M120 62l16-10 5 16Z" fill={special ? "#C7548F" : "var(--color-chili)"} />
        <circle cx="150" cy="55" r="9" fill={special ? "var(--color-marigold)" : "#7FA650"} />
        {special && <path d="M138 46l4-6 4 6Z" fill="var(--color-marigold)" />}
        {/* bottom-left: sprouts */}
        <g stroke="var(--color-pine)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M46 100c0-8 6-12 12-12" />
          <path d="M58 100c0-8 6-12 12-12" />
          <path d="M52 100c0-10 0-16 0-16" />
        </g>
        {/* bottom-right: veggies */}
        <circle cx="128" cy="94" r="8" fill="var(--color-chili)" />
        <ellipse cx="150" cy="96" rx="10" ry="6" fill="var(--color-moss)" />
      </svg>
    );
  }

  // fruit or power — a bowl
  const powered = art === "power";
  return (
    <svg {...common} aria-label={powered ? "Power bowl of sprouts, seeds and veggies" : "Fruit bowl of fresh seasonal fruit"}>
      <ellipse cx="100" cy="124" rx="60" ry="7" fill="var(--color-moss)" opacity="0.3" />
      {/* contents mounded above rim */}
      {powered ? (
        <>
          {/* sprouts + seeds + veggies */}
          <g stroke="var(--color-pine)" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M78 60c0-12 8-18 18-18" />
            <path d="M96 60c0-12 8-18 18-18" />
            <path d="M114 60c0-12 8-18 18-18" />
          </g>
          <circle cx="86" cy="66" r="10" fill="var(--color-chili)" />
          <circle cx="112" cy="64" r="11" fill="var(--color-moss)" />
          <ellipse cx="130" cy="68" rx="12" ry="8" fill="var(--color-marigold)" />
          <g fill="#E9DCB4">
            <ellipse cx="100" cy="70" rx="3" ry="5" />
            <ellipse cx="120" cy="72" rx="3" ry="5" transform="rotate(20 120 72)" />
          </g>
        </>
      ) : (
        <>
          {/* colorful fruit */}
          <rect x="78" y="50" width="20" height="20" rx="5" fill="var(--color-marigold)" transform="rotate(-10 88 60)" />
          <circle cx="112" cy="58" r="13" fill="#7FA650" />
          <circle cx="112" cy="58" r="7" fill="#C7E29A" />
          <path d="M126 66l18-12 5 18Z" fill="var(--color-chili)" />
          <circle cx="86" cy="66" r="9" fill="var(--color-pine)" />
          <circle cx="132" cy="52" r="7" fill="#C7548F" />
        </>
      )}
      {/* bowl */}
      <path d="M56 72h88c-3 30-24 46-44 46S59 102 56 72Z" fill="var(--color-forest)" />
      <rect x="48" y="64" width="104" height="14" rx="7" fill="var(--color-pine)" />
    </svg>
  );
}
