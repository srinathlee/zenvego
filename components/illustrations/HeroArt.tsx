/** Large custom hero illustration — steaming green bowl of fruit, seeds, leaves, sun arc. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 380"
      className={className}
      role="img"
      aria-label="A steaming green breakfast bowl filled with mango, kiwi, watermelon and grapes, with floating leaves under a morning sun"
    >
      {/* sun arc */}
      <circle cx="210" cy="150" r="120" fill="var(--color-sand)" opacity="0.55" />
      <path
        d="M120 92a90 90 0 0 1 180 0"
        fill="none"
        stroke="var(--color-marigold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2 14"
        opacity="0.7"
      />

      {/* floating leaves */}
      <g opacity="0.9">
        <path d="M70 70c-4 16 4 30 20 32-2-16-8-27-20-32Z" fill="var(--color-moss)" />
        <path d="M356 60c6 15 0 30-15 34 0-16 4-28 15-34Z" fill="var(--color-pine)" />
        <path d="M348 150c8 6 10 17 4 26-8-6-10-16-4-26Z" fill="var(--color-marigold)" />
      </g>

      {/* steam */}
      <g
        fill="none"
        stroke="var(--color-moss)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      >
        <path d="M170 150c-8-10 8-18 0-30" />
        <path d="M210 142c-8-10 8-18 0-30" />
        <path d="M250 150c-8-10 8-18 0-30" />
      </g>

      {/* bowl body */}
      <path
        d="M96 196h228c-6 62-56 104-114 104S102 258 96 196Z"
        fill="var(--color-forest)"
      />
      <path
        d="M96 196h228c-6 62-56 104-114 104S102 258 96 196Z"
        fill="none"
        stroke="var(--color-pine)"
        strokeWidth="3"
      />
      {/* bowl rim */}
      <rect x="80" y="182" width="260" height="22" rx="11" fill="var(--color-pine)" />
      <rect x="80" y="182" width="260" height="22" rx="11" fill="var(--color-moss)" opacity="0.25" />

      {/* fruit pile (above the rim) */}
      {/* mango cubes */}
      <rect x="150" y="150" width="26" height="26" rx="6" fill="var(--color-marigold)" transform="rotate(-12 163 163)" />
      <rect x="182" y="140" width="24" height="24" rx="6" fill="#F2A93B" transform="rotate(8 194 152)" />
      {/* watermelon triangle */}
      <path d="M232 168l30-14 6 26Z" fill="var(--color-chili)" />
      <path d="M232 168l30-14 3 12Z" fill="#E86A4B" />
      {/* kiwi slice */}
      <circle cx="220" cy="172" r="17" fill="#7FA650" />
      <circle cx="220" cy="172" r="11" fill="#C7E29A" />
      <circle cx="220" cy="172" r="4" fill="#FFFDF4" />
      {/* grapes */}
      <circle cx="270" cy="176" r="9" fill="var(--color-pine)" />
      <circle cx="284" cy="170" r="9" fill="var(--color-moss)" />
      <circle cx="140" cy="176" r="9" fill="var(--color-pine)" />
      {/* seeds scattered */}
      <g fill="#E9DCB4">
        <ellipse cx="200" cy="178" rx="3" ry="5" />
        <ellipse cx="250" cy="182" rx="3" ry="5" transform="rotate(20 250 182)" />
        <ellipse cx="176" cy="182" rx="3" ry="5" transform="rotate(-20 176 182)" />
      </g>
    </svg>
  );
}
