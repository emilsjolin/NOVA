"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import BlobMenu from "@/components/BlobMenu";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { keyword: "Clean", text: "Every ingredient earns its place. Nothing artificial, nothing unnecessary — just what your body needs." },
  { keyword: "Honest", text: "No hidden sugars, no proprietary blends. What you see on the label is exactly what you get." },
  { keyword: "Uncompromising", text: "We refused to sacrifice taste for nutrition or nutrition for taste. PROTEA delivers both, fully." },
];

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const deepDiveRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Story section fade in
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: storyRef.current, start: "top 80%", scroller: document.body },
          }
        );
      }

      // Values staggered fade
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll("[data-value]"),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%", scroller: document.body },
          }
        );
      }

      // Deep dive fade in
      if (deepDiveRef.current) {
        gsap.fromTo(
          deepDiveRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: deepDiveRef.current, start: "top 80%", scroller: document.body },
          }
        );
      }

      // Closing fade
      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: closingRef.current, start: "top 85%", scroller: document.body },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <BlobMenu />

      <PageHero heading="The Standard, Redefined." height="h-[70vh]" />

      {/* Brand Story */}
      <section className="px-6 py-24">
        <div ref={storyRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why PROTEA Exists</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              We started PROTEA because we were tired of choosing — between protein drinks that tasted like chalk and ones loaded with sugar and artificial ingredients.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Named after the protea flower — bold, resilient, and unmistakable — our mission is to prove that clean nutrition and exceptional taste aren&apos;t opposites. They&apos;re the standard.
            </p>
          </div>
          <div className="flex h-80 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950">
            <span className="text-sm text-white/40">[PHOTO: Lifestyle shot — someone active/outdoors with PROTEA]</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div ref={valuesRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.keyword} data-value style={{ opacity: 0 }}>
              <h3 className="text-2xl font-bold tracking-tight">{v.keyword}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/60">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Deep Dive */}
      <section className="px-6 py-24">
        <div ref={deepDiveRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="flex h-80 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950 md:order-first">
            <span className="text-sm text-white/40">[PHOTO: Ingredients flat-lay or can ingredient label close-up]</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What&apos;s Inside</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              20g of premium whey protein isolate. Natural flavors sourced from real fruit extracts. Zero sugar, zero artificial sweeteners, zero compromise.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              What you won&apos;t find: sucralose, aspartame, acesulfame potassium, or any ingredient you can&apos;t pronounce. Every can is a promise — clean fuel, nothing more.
            </p>
            {/* Inline specs */}
            <div className="mt-8 flex gap-8">
              <div>
                <span className="text-4xl font-bold">20g</span>
                <span className="block text-sm text-white/50">Protein</span>
              </div>
              <div>
                <span className="text-4xl font-bold">70</span>
                <span className="block text-sm text-white/50">Calories</span>
              </div>
              <div>
                <span className="text-4xl font-bold">0g</span>
                <span className="block text-sm text-white/50">Sugar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="px-6 py-32">
        <p
          ref={closingRef}
          className="mx-auto max-w-3xl text-center text-3xl font-bold leading-snug tracking-tight md:text-4xl"
          style={{ opacity: 0 }}
        >
          We don&apos;t make protein drinks. We set the standard for them.
        </p>
      </section>
    </main>
  );
}
