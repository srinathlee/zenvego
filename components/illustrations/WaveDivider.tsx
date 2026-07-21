/**
 * Wavy organic divider between two colored bands.
 * `from` = the band above (fills the divider's background).
 * `to`   = the band below (the wave shape that rises into the band above).
 * Use CSS color tokens, e.g. from="var(--color-cream)" to="var(--color-forest)".
 */
export function WaveDivider({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full leading-0 ${className ?? ""}`}
      style={{ background: from }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block w-full h-11 md:h-17"
      >
        <path
          d="M0 46c130 34 300 42 520 14s440-48 640-12 250 30 280 24V90H0Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
