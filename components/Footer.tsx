import { LogoLockup } from "./illustrations/Logo";
import { brand } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-forest/10 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col items-center gap-4 text-center">
        <LogoLockup className="h-24" />
        <p className="text-xs text-ink/45">
          Made fresh in Hyderabad · © 2026 {brand.name}
        </p>
      </div>
    </footer>
  );
}
