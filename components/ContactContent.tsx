"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import PageHero from "@/components/PageHero";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.51a8.27 8.27 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.08z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactContent() {
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, delay: 0.6 }
      );
    }
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.3");
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <main>
      <PageHero heading="Get In Touch." height="h-[50vh]" />

      <section className="flex flex-col items-center px-6 pb-32">
        <div ref={contentRef} className="flex flex-col items-center gap-8">
          <p className="text-lg text-white/50" style={{ opacity: 0 }}>
            For partnerships, press, or just to say hi.
          </p>

          <a
            href="mailto:hello@drinkprotea.com"
            className="text-2xl font-bold tracking-tight transition-colors hover:text-white/70 md:text-3xl"
            style={{ opacity: 0 }}
          >
            hello@drinkprotea.com
          </a>

          <div className="flex gap-6" style={{ opacity: 0 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Closing logo */}
        <div ref={logoRef} className="mt-32 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <Image src="/Asset 3.png" alt="PROTEA" width={64} height={64} className="h-auto w-16" />
          <p className="text-sm text-white/30">Pure Protein. Zero Compromise.</p>
        </div>
      </section>
    </main>
  );
}
