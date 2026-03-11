"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    const items = Array.from(
      headlines.querySelectorAll<HTMLElement>("[data-headline]")
    );
    if (!items.length) return;

    const n = items.length;
    // Each headline gets an exclusive zone with guard gaps between them.
    // Layout per segment: [gap][fadeIn][hold][fadeOut][gap]
    const gapRatio = 0.03;    // 3% gap between segments — no headline visible
    const fadeRatio = 0.12;   // 12% fade in / out within each segment
    const segmentSize = 1 / n;

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px)";
      el.style.visibility = "hidden";
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "400% top",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;

          if (video && video.duration && Number.isFinite(video.duration)) {
            video.currentTime = p * video.duration;
          }

          items.forEach((el, i) => {
            const segStart = i * segmentSize + gapRatio;
            const segEnd = (i + 1) * segmentSize - gapRatio;
            const segLen = segEnd - segStart;

            // Normalize progress within this headline's active zone
            const local = (p - segStart) / segLen;

            let opacity: number;
            let y: number;

            if (local <= 0 || local >= 1) {
              // Outside this headline's zone — fully hidden
              opacity = 0;
              y = local <= 0 ? 50 : -40;
            } else if (local <= fadeRatio) {
              // Fading in
              const t = local / fadeRatio;
              opacity = t;
              y = 50 - 50 * t;
            } else if (local >= 1 - fadeRatio) {
              // Fading out
              const t = (local - (1 - fadeRatio)) / fadeRatio;
              opacity = 1 - t;
              y = -40 * t;
            } else {
              // Fully visible
              opacity = 1;
              y = 0;
            }

            el.style.opacity = String(opacity);
            el.style.transform = `translateY(${y}px)`;
            el.style.visibility = opacity > 0.001 ? "visible" : "hidden";
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
            style={{ opacity: 0, visibility: "hidden" }}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
