type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Plant Based — leaf */
export function LeafIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M4 20C3 12 8 4 20 4c0 12-8 17-16 16Z" />
      <path d="M4 20C7 15 11 11 17 8" />
    </svg>
  );
}

/** High Protein — dumbbell */
export function DumbbellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />
    </svg>
  );
}

/** Mindful Living — meditating figure */
export function MindfulIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="12" cy="5.5" r="2.5" />
      <path d="M12 9c-2.5 0-4.5 2-4.5 4.5 0 1.4.6 2.4 1.6 3.1" />
      <path d="M12 9c2.5 0 4.5 2 4.5 4.5 0 1.4-.6 2.4-1.6 3.1" />
      <path d="M4 19c2-2 4-2.6 8-2.6S18 17 20 19" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.3-1.4 1.5-1.4h1.3V5.5c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2.2H7.6V14h2.3v7h3.6Z"
      />
    </svg>
  );
}
