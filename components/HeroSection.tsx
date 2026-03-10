"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !logo || !subtitle) return;

    const ctx = gsap.context(() => {
      gsap.set(logo, { scale: 3 });
      gsap.set(subtitle, { opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "200% top",
        pin: true,
        scrub: 1,
        scroller: document.body,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(logo, { scale: 3 - 2 * p });
          const subP = Math.max(0, Math.min(1, (p - 0.35) / 0.55));
          gsap.set(subtitle, { opacity: subP });
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
