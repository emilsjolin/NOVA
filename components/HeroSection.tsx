"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !logo || !subtitle) return;

    logo.style.transform = "scale(3)";
    subtitle.style.opacity = "0";

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "200% top",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          logo.style.transform = `scale(${3 - 2 * p})`;
          const subP = Math.max(0, Math.min(1, (p - 0.35) / 0.55));
          subtitle.style.opacity = String(subP);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center bg-black"
    >
      <div ref={logoRef}>
        <Image
          src="/Asset 3.png"
          alt="PROTEA"
          width={500}
          height={500}
          priority
          className="h-auto w-48 md:w-64"
        />
      </div>
      <p
        ref={subtitleRef}
        className="mt-6 text-xl font-medium tracking-wide text-white/90 md:text-2xl"
      >
        Pure Protein. Zero Compromise.
      </p>
    </section>
  );
}
