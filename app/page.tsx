import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Menu from "@/components/Menu";
import ZenStreak from "@/components/ZenStreak";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { WaveDivider } from "@/components/illustrations/WaveDivider";

const cream = "var(--color-cream)";
const forest = "var(--color-forest)";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        <WaveDivider from={cream} to={forest} />
        <Pillars />
        <Menu />
        <WaveDivider from={forest} to={cream} />

        <ZenStreak />
        <HowItWorks />
        <Testimonials />
        <Faq />

        <WaveDivider from={cream} to={forest} />
        <Contact />
        <WaveDivider from={forest} to={cream} />
      </main>
      <Footer />
    </>
  );
}
