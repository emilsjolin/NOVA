import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — PROTEA",
  description: "The story behind PROTEA. Clean ingredients, honest nutrition, zero compromise.",
};

export default function AboutPage() {
  return <AboutContent />;
}
