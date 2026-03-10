"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { color: "from-violet-900 to-indigo-950", text: "Taste" },
  { color: "from-amber-900 to-orange-950", text: "Ingredients" },
  { color: "from-emerald-900 to-teal-950", text: "Design" },
  { color: "from-rose-900 to-pink-950", text: "Nutrition" },
  { color: "from-slate-800 to-slate-950", text: "PROTEA" },
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

    // Remap linear scroll progress so panels slow down when centered.
    // Uses a sum-of-sines approach: each segment eases with smoothstep,
    // creating a plateau at each panel center.
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const remapProgress = (p: number) => {
      const transitions = count - 1;
      const seg = 1 / transitions;
      const idx = Math.min(Math.floor(p / seg), transitions - 1);
      const local = Math.min((p - idx * seg) / seg, 1);
      return (idx + smoothstep(local)) / transitions;
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${wrapper.offsetWidth * scrollDistanceMultiplier}`,
        pin: true,
        scrub: 2,
        scroller: document.body,
        onUpdate: (self) => {
          const eased = remapProgress(self.progress);
          const xPercent = -eased * 100 * (count - 1);
          gsap.set(panels, { xPercent });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}

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
