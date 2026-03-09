"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { color: "from-violet-900 to-indigo-950", text: "Design" },
  { color: "from-amber-900 to-orange-950", text: "Sound" },
  { color: "from-emerald-900 to-teal-950", text: "Comfort" },
  { color: "from-rose-900 to-pink-950", text: "Technology" },
  { color: "from-slate-800 to-slate-950", text: "NOVA" },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const panels = panelsRef.current;
    if (!section || !wrapper || !panels) return;

    const panelEls = panels.querySelectorAll("[data-panel]");
    const count = panelEls.length;
    if (count === 0) return;

    panelEls.forEach((el) => gsap.set(el, { willChange: "transform" }));

    // Scroll distance multiplier: higher = more vertical scroll needed = slower horizontal movement
    const scrollDistanceMultiplier = 4.5;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${wrapper.offsetWidth * scrollDistanceMultiplier}`,
        pin: true,
        scrub: 2,
        scroller: document.body,
      });

      gsap.to(panels, {
        xPercent: -100 * (count - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${wrapper.offsetWidth * scrollDistanceMultiplier}`,
          scrub: 2,
          scroller: document.body,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-guide="HorizontalGallery"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div ref={wrapperRef} className="absolute inset-0">
        <div
          ref={panelsRef}
          className="flex h-full w-max flex-row"
          style={{ width: `${PANELS.length * 100}vw` }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={i}
              data-panel
              data-guide={`Gallery card: ${panel.text}`}
              className={`flex h-full w-screen flex-shrink-0 items-center justify-center bg-gradient-to-br ${panel.color}`}
            >
              <span className="text-5xl font-bold text-white md:text-6xl">
                {panel.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
