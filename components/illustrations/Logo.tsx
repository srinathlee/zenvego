import { brand } from "@/lib/site";

/** The zenvego mark: two leaves rising from a smiling bowl arc, with an orange seed. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="zenvego leaf-bowl logo"
    >
      {/* left leaf */}
      <path
        d="M32 30C26 30 20 25 20 16c0-2 .4-4 1-6 6 1 11 5 11 12 0 3-.5 6 0 8Z"
        fill="var(--color-forest)"
      />
      {/* right leaf */}
      <path
        d="M32 30c6 0 12-5 12-14 0-2-.4-4-1-6-6 1-11 5-11 12 0 3 .5 6 0 8Z"
        fill="var(--color-pine)"
      />
      {/* orange seed / sprout */}
      <path
        d="M32 31c-3-1-6-3-6-7 0-1 .2-2 .6-3 3 .6 5.4 2.6 5.4 6 0 1.6 0 3 0 4Z"
        fill="var(--color-marigold)"
      />
      {/* smiling bowl arc */}
      <path
        d="M14 34c2 9 9 15 18 15s16-6 18-15"
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* bowl rim / smile line */}
      <path
        d="M20 33h24"
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Lowercase wordmark: "zen" forest + "ve" marigold + "go" forest, with a sprout on the o. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-display font-extrabold lowercase tracking-tight leading-none ${className ?? ""}`}
    >
      <span className="text-forest">zen</span>
      <span className="text-marigold">ve</span>
      <span className="text-forest relative">
        go
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute top-[-0.34em] right-[-0.28em] w-[0.5em] h-[0.5em]"
        >
          <path
            d="M12 22c0-7 3-11 9-12-1 6-4 9-9 10Z"
            fill="var(--color-pine)"
          />
          <path
            d="M12 22c0-5-2-8-7-9 .7 4 3 7 7 8Z"
            fill="var(--color-marigold)"
          />
        </svg>
      </span>
    </span>
  );
}

/** Mark + wordmark lockup used in the nav and footer. */
export function LogoLockup({
  className,
  markClass = "w-8 h-8",
  wordClass = "text-2xl",
}: {
  className?: string;
  markClass?: string;
  wordClass?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark className={markClass} />
      <Wordmark className={wordClass} />
      <span className="sr-only">{brand.name}</span>
    </span>
  );
}
