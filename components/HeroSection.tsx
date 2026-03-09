"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !title || !subtitle) return;

    const ctx = gsap.context(() => {
      gsap.set(title, { willChange: "transform", scale: 3 });
      gsap.set(subtitle, { willChange: "opacity", opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "200% top",
        pin: true,
        scrub: 1,
        scroller: document.body,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(title, { scale: 3 - 2 * p });
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
      data-guide="HeroSection"
      className="relative flex h-screen w-full flex-col items-center justify-center bg-black"
    >
      <h1
        ref={titleRef}
        className="text-8xl font-bold tracking-tight md:text-9xl"
      >
        NOVA
      </h1>
      <p
        ref={subtitleRef}
        className="mt-6 text-xl font-medium tracking-wide text-white/90 md:text-2xl"
      >
        Pure Sound. Zero Limits.
      </p>
    </section>
  );
}
