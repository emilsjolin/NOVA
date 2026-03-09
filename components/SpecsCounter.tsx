"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { value: 48, suffix: "h", label: "Battery" },
  { value: 3, suffix: "g", label: "Weight" },
  { value: 360, suffix: "°", label: "Audio" },
];

export default function SpecsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!section || items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        const spec = SPECS[i];
        if (!spec || !el) return;

        const valueEl = el.querySelector("[data-value]");
        if (!valueEl) return;

        gsap.fromTo(
          valueEl,
          { textContent: 0 },
          {
            textContent: spec.value,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 60%",
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
      data-guide="SpecsCounter"
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-16 bg-black py-12 md:flex-row md:gap-24"
    >
      {SPECS.map((spec, i) => (
        <div
          key={spec.label}
          ref={(el) => {
            itemsRef.current[i] = el;
          }}
          className="flex flex-col items-center text-center"
        >
          <span className="flex items-baseline justify-center gap-1">
            <span
              data-value
              className="text-7xl font-bold tracking-tight md:text-8xl"
            >
              0
            </span>
            <span className="text-7xl font-bold md:text-8xl">{spec.suffix}</span>
          </span>
          <span className="mt-2 text-lg text-white/70">{spec.label}</span>
        </div>
      ))}
    </section>
  );
}
