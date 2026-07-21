import type { Product } from "@/lib/site";

/**
 * Near-photoreal flat-3D product illustrations — ceramic bowls / bento tray /
 * bottle with gradients, soft ground shadows, rim light and glossy speculars.
 * Gradient ids are namespaced per `art` so multiple instances don't collide.
 */
export function ProductArt({
  art,
  className,
}: {
  art: Product["art"];
  className?: string;
}) {
  const uid = `pa-${art}`;
  return (
    <svg
      viewBox="0 0 220 160"
      className={className}
      role="img"
      aria-label={LABELS[art]}
    >
      <defs>
        {/* soft blur for shadows */}
        <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
        {/* ceramic bowl body */}
        <linearGradient id={`${uid}-bowl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3E6B32" />
          <stop offset="0.55" stopColor="#27461F" />
          <stop offset="1" stopColor="#1a3315" />
        </linearGradient>
        {/* bowl rim */}
        <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FB06E" />
          <stop offset="1" stopColor="#33582A" />
        </linearGradient>
        {/* inner shadow of bowl */}
        <radialGradient id={`${uid}-inner`} cx="0.5" cy="0.15" r="0.9">
          <stop offset="0" stopColor="#12240E" stopOpacity="0.65" />
          <stop offset="0.6" stopColor="#12240E" stopOpacity="0" />
        </radialGradient>
        {/* generic glossy sphere shading */}
        <radialGradient id={`${uid}-gloss`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse
        cx="110"
        cy="140"
        rx="76"
        ry="12"
        fill="#1a3315"
        opacity="0.18"
        filter={`url(#${uid}-soft)`}
      />

      {art === "ragi" ? (
        <RagiBottle uid={uid} />
      ) : art === "balance" || art === "signature" ? (
        <BentoTray uid={uid} signature={art === "signature"} />
      ) : (
        <Bowl uid={uid} power={art === "power"} />
      )}
    </svg>
  );
}

const LABELS: Record<Product["art"], string> = {
  fruit: "Fresh fruit bowl with mango, kiwi, watermelon and berries",
  power: "Protein power bowl with sprouts, seeds and veggies",
  balance: "Balance bento tray of fruit, sprouts and veggies",
  signature: "Signature bento tray with the Zenvego special of the day",
  ragi: "Bottle of Ragi Java millet malt drink",
};

/* ---- glossy round fruit helper ---- */
function Berry({
  uid,
  cx,
  cy,
  r,
  fill,
}: {
  uid: string;
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${uid}-gloss)`} />
      <ellipse cx={cx - r * 0.3} cy={cy - r * 0.4} rx={r * 0.28} ry={r * 0.18} fill="#fff" opacity="0.7" />
    </g>
  );
}

function Bowl({ uid, power }: { uid: string; power: boolean }) {
  return (
    <>
      {/* toppings mounded above the rim */}
      <g>
        {power ? (
          <>
            {/* sprouts */}
            <g stroke="#5f8b3f" strokeWidth="2.4" fill="none" strokeLinecap="round">
              <path d="M84 60c-2-12 4-20 14-22" />
              <path d="M100 58c0-13 7-21 17-22" />
              <path d="M118 60c2-12 10-18 20-18" />
            </g>
            <Berry uid={uid} cx={90} cy={64} r={11} fill="#CE4A26" />
            <Berry uid={uid} cx={116} cy={62} r={12} fill="#6D8A57" />
            <ellipse cx={136} cy={66} rx={13} ry={9} fill="#E8891D" />
            <ellipse cx={136} cy={66} rx={13} ry={9} fill={`url(#${uid}-gloss)`} />
            {/* seeds */}
            <g fill="#E9DCB4">
              <ellipse cx={104} cy={68} rx={2.6} ry={4.4} />
              <ellipse cx={124} cy={70} rx={2.6} ry={4.4} transform="rotate(24 124 70)" />
              <ellipse cx={78} cy={68} rx={2.6} ry={4.4} transform="rotate(-20 78 68)" />
            </g>
          </>
        ) : (
          <>
            {/* mango cube */}
            <g transform="rotate(-10 88 58)">
              <rect x="76" y="46" width="24" height="24" rx="5" fill="#F2A93B" />
              <rect x="76" y="46" width="24" height="24" rx="5" fill={`url(#${uid}-gloss)`} />
              <rect x="76" y="46" width="24" height="7" rx="3" fill="#FFC463" opacity="0.8" />
            </g>
            {/* kiwi slice */}
            <g>
              <circle cx={118} cy={58} r={15} fill="#5f7f38" />
              <circle cx={118} cy={58} r={12} fill="#8CB05A" />
              <circle cx={118} cy={58} r={7} fill="#EAF3D2" />
              {[...Array(8)].map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                return (
                  <circle
                    key={i}
                    cx={118 + Math.cos(a) * 9}
                    cy={58 + Math.sin(a) * 9}
                    r={0.9}
                    fill="#20301A"
                  />
                );
              })}
              <circle cx={118} cy={58} r={15} fill={`url(#${uid}-gloss)`} />
            </g>
            {/* watermelon wedge */}
            <g>
              <path d="M132 66l22-13 5 20Z" fill="#D8452A" />
              <path d="M132 66l22-13 3 12Z" fill="#EE6A4B" />
              <path d="M132 66l22-13" stroke="#7FA650" strokeWidth="3" strokeLinecap="round" />
            </g>
            {/* grapes / berries */}
            <Berry uid={uid} cx={82} cy={64} r={9} fill="#33582A" />
            <Berry uid={uid} cx={98} cy={66} r={7} fill="#7B3FA0" />
          </>
        )}
      </g>

      {/* bowl body */}
      <path d="M50 74h120c-4 34-28 54-60 54S54 108 50 74Z" fill={`url(#${uid}-bowl)`} />
      {/* inner shadow */}
      <path d="M50 74h120c-4 34-28 54-60 54S54 108 50 74Z" fill={`url(#${uid}-inner)`} />
      {/* specular sheen */}
      <path
        d="M66 92c6 14 20 24 34 25"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* rim */}
      <ellipse cx="110" cy="74" rx="62" ry="12" fill={`url(#${uid}-rim)`} />
      <ellipse cx="110" cy="73" rx="54" ry="8.5" fill="#1c3517" />
      <ellipse cx="96" cy="70" rx="20" ry="3.2" fill="#fff" opacity="0.18" />
    </>
  );
}

function BentoTray({ uid, signature }: { uid: string; signature: boolean }) {
  return (
    <>
      {/* tray base with depth */}
      <rect x="30" y="40" width="160" height="82" rx="14" fill="#d9cba6" />
      <rect x="30" y="40" width="160" height="82" rx="14" fill={`url(#${uid}-gloss)`} opacity="0.5" />
      <rect x="34" y="44" width="152" height="74" rx="11" fill="#FFFDF4" />
      {/* dividers */}
      <line x1="110" y1="47" x2="110" y2="115" stroke="#e2d6b4" strokeWidth="3" />
      <line x1="37" y1="81" x2="183" y2="81" stroke="#e2d6b4" strokeWidth="3" />

      {/* TL: mixed fruit */}
      <Berry uid={uid} cx={58} cy={62} r={9} fill="#E8891D" />
      <Berry uid={uid} cx={78} cy={65} r={8} fill="#CE4A26" />
      <Berry uid={uid} cx={68} cy={66} r={7} fill="#7FA650" />
      {/* TR: exotic fruit + special */}
      <g>
        <path d="M126 70l18-12 5 18Z" fill={signature ? "#C7548F" : "#D8452A"} />
        <path d="M126 70l18-12 3 11Z" fill={signature ? "#DD79AC" : "#EE6A4B"} />
      </g>
      <Berry uid={uid} cx={162} cy={62} r={10} fill={signature ? "#E8891D" : "#8CB05A"} />
      {signature && (
        <g>
          <path d="M146 54l4-7 4 7Z" fill="#E8891D" />
          <circle cx="150" cy="52" r="2" fill="#FFC463" />
        </g>
      )}
      {/* BL: sprouts */}
      <g stroke="#5f8b3f" strokeWidth="2.4" fill="none" strokeLinecap="round">
        <path d="M50 104c-1-9 6-14 14-13" />
        <path d="M62 104c0-11 4-16 4-16" />
        <path d="M72 104c1-9 8-13 16-12" />
      </g>
      {/* BR: veggies */}
      <Berry uid={uid} cx={132} cy={98} r={9} fill="#CE4A26" />
      <ellipse cx={158} cy={100} rx={12} ry={7} fill="#6D8A57" />
      <ellipse cx={158} cy={100} rx={12} ry={7} fill={`url(#${uid}-gloss)`} />
    </>
  );
}

function RagiBottle({ uid }: { uid: string }) {
  return (
    <>
      {/* steam */}
      <g fill="none" stroke="#9db98a" strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M100 26c-6-6 6-11 0-18" />
        <path d="M118 26c-6-6 6-11 0-18" />
      </g>
      {/* glass */}
      <path
        d="M94 36h32v10c0 5 2 7 6 11 7 6 10 14 10 24v34a11 11 0 0 1-11 11H89a11 11 0 0 1-11-11V81c0-10 3-18 10-24 4-4 6-6 6-11V36Z"
        fill="#FFFDF4"
        stroke="#cabf9d"
        strokeWidth="2"
      />
      {/* malt fill with gradient */}
      <defs>
        <linearGradient id={`${uid}-malt`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CBA25A" />
          <stop offset="1" stopColor="#9c7433" />
        </linearGradient>
      </defs>
      <path
        d="M81 84c0-8 2-14 7-18h44c5 4 7 10 7 18v29a8 8 0 0 1-8 8H89a8 8 0 0 1-8-8V84Z"
        fill={`url(#${uid}-malt)`}
      />
      <path d="M81 84c0-3 .4-6 1.2-8 16 6 33 6 50 0 .8 2 1 5 1 8H81Z" fill="#D8B876" />
      {/* glass shine */}
      <rect x="90" y="60" width="7" height="56" rx="3.5" fill="#fff" opacity="0.5" />
      {/* cap */}
      <rect x="92" y="24" width="36" height="15" rx="5" fill="#E8891D" />
      <rect x="92" y="24" width="36" height="6" rx="3" fill="#FFB458" opacity="0.8" />
    </>
  );
}
