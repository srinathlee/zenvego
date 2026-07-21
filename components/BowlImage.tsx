import Image from "next/image";
import type { Product } from "@/lib/site";
import { ProductArt } from "./illustrations/ProductArt";

/**
 * Menu-card visual: the real product photo when `product.image` is set,
 * otherwise the static SVG illustration (placeholder until the photo arrives).
 */
export function BowlImage({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return <ProductArt art={product.art} className={className} />;
}
