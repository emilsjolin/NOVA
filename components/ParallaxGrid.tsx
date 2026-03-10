"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPEEDS = [0.15, -0.1, 0.2];

export default function ParallaxGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const boxes = container.querySelectorAll("[data-parallax-box]");
    if (!boxes.length) return;

    const ctx = gsap.context(() => {
      boxes.forEach((el, i) => {
        gsap.set(el, { willChange: "transform" });
        const speed = SPEEDS[i] ?? 0.1;
        const yMove = 80 * (speed >= 0 ? 1 : -1);

        gsap.fromTo(
          el,
          { y: -yMove, scale: 0.95 },
          {
            y: yMove,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              scroller: document.body,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}

      className="relative w-full bg-[#0a0a0a] py-12 md:py-16"
    >
      <div
        ref={containerRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3 md:gap-12"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            data-parallax-box
            className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900"
          />
        ))}
      </div>
    </section>
  );
}
