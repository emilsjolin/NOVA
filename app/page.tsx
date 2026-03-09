import HeroSection from "@/components/HeroSection";
import FeatureReveal from "@/components/FeatureReveal";
import ParallaxGrid from "@/components/ParallaxGrid";
import SpecsCounter from "@/components/SpecsCounter";
import HorizontalGallery from "@/components/HorizontalGallery";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureReveal />
      <ParallaxGrid />
      <SpecsCounter />
      <HorizontalGallery />
      <section
        data-guide="After Gallery (Black Background)"
        className="relative min-h-[40vh] w-full bg-black"
      />
      <FinalCTA />
    </main>
  );
}
