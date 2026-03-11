"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const button = buttonRef.current;
    if (!section || !title || !button) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { scale: 0.5 },
        {
          scale: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "60% center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        button,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "40% center",
            end: "70% center",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-black"
    >
      <h2
        ref={titleRef}
        className="text-center text-5xl font-bold tracking-tight md:text-7xl"
      >
        Experience PROTEA
      </h2>
      <Link
        ref={buttonRef}
        href="/shop"
        className="rounded-full border-2 border-white bg-transparent px-10 py-4 text-lg font-medium text-white transition-colors hover:bg-white hover:text-black"
      >
        Order Now
      </Link>
    </section>
  );
}
