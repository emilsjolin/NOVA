import HeroSection from "@/components/HeroSection";
import FeatureReveal from "@/components/FeatureReveal";
import ParallaxGrid from "@/components/ParallaxGrid";
import SpecsCounter from "@/components/SpecsCounter";
import HorizontalGallery from "@/components/HorizontalGallery";
import FinalCTA from "@/components/FinalCTA";
import BlobMenu from "@/components/BlobMenu";

export default function Home() {
  return (
    <main>
      <BlobMenu />
      <a
        href="#"
        className="fixed top-6 right-6 z-50 rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
      >
        Buy Now
      </a>
      <HeroSection />
      <FeatureReveal />
      <ParallaxGrid />
      <SpecsCounter />
      <HorizontalGallery />
      <FinalCTA />
    </main>
  );
}
