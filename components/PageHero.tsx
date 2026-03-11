"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageHeroProps {
  heading: string;
  subtitle?: string;
  height?: string;
}

export default function PageHero({ heading, subtitle, height = "h-[60vh]" }: PageHeroProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 });
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <section className={`relative flex ${height} w-full flex-col items-center justify-center bg-black px-6`}>
      <h1
        ref={headingRef}
        className="text-center text-5xl font-bold tracking-tight md:text-7xl"
        style={{ opacity: 0 }}
      >
        {heading}
      </h1>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="mt-4 text-center text-lg text-white/60 md:text-xl"
          style={{ opacity: 0 }}
        >
          {subtitle}
        </p>
      )}
    </section>
  );
}
