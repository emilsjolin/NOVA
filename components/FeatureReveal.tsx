"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINES = [
  "Crafted from Clean Ingredients",
  "Zero Sugar. Full Flavor.",
  "Protein Redefined",
];

export default function FeatureReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlinesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headlines = headlinesRef.current;
    const video = videoRef.current;
    if (!section || !headlines) return;

    const items = headlines.querySelectorAll("[data-headline]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      const n = items.length;
      const segmentSize = 1 / n;
      const fadeInRatio = 0.15;
      const fadeOutRatio = 0.15;

      items.forEach((el) => {
        gsap.set(el, { willChange: "transform, opacity", opacity: 0, y: 50 });
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "400% top",
        pin: true,
        scrub: 1,
        scroller: document.body,
        onUpdate: (self) => {
          const p = self.progress;
          if (video && video.duration && Number.isFinite(video.duration)) {
            video.currentTime = p * video.duration;
          }
          items.forEach((el, i) => {
            const segStart = i * segmentSize;
            const local = (p - segStart) / segmentSize;
            if (local <= 0) {
              gsap.set(el, { opacity: 0, y: 50 });
            } else if (local >= 1) {
              gsap.set(el, { opacity: 0, y: -40 });
            } else if (local <= fadeInRatio) {
              const t = local / fadeInRatio;
              gsap.set(el, { opacity: t, y: 50 - 50 * t });
            } else if (local >= 1 - fadeOutRatio) {
              const t = (local - (1 - fadeOutRatio)) / fadeOutRatio;
              gsap.set(el, { opacity: 1 - t, y: -40 * t });
            } else {
              gsap.set(el, { opacity: 1, y: 0 });
            }
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}

      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/SpinningCan.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div
        ref={headlinesRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        {HEADLINES.map((text, i) => (
          <div
            key={i}
            data-headline
            className="absolute text-center text-6xl font-bold leading-tight text-white md:text-7xl"
            style={{ opacity: 0 }}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
