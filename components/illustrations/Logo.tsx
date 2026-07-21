import Image from "next/image";
import { brand } from "@/lib/site";

/**
 * The zenvego logo, exactly as supplied by the brand: leaf-bowl mark, the
 * "zenvego" wordmark and the "stay zen · eat +ve · go far" tagline, all baked
 * into one transparent PNG. Nothing here is redrawn — the artwork is used as-is
 * so every placement on the site is pixel-identical to the original file.
 */
const LOGO_SRC = "/brand/zenvego-logo.png";
const LOGO_WIDTH = 1059;
const LOGO_HEIGHT = 645;

/**
 * The brand lockup. `className` sizes it — set a height (e.g. `h-12 w-auto`)
 * and the width follows the artwork's own aspect ratio.
 */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <Image
      src={LOGO_SRC}
      alt={brand.name}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      className={`w-auto object-contain ${className ?? ""}`}
    />
  );
}

export default LogoLockup;
