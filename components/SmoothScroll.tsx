"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
if (typeof document !== "undefined") {
  ScrollTrigger.defaults({ scroller: document.body });
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const body = document.body;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      infinite: false,
      overscroll: false,
    });

    lenisRef.current = lenis;

    const getMaxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const scrollProxy = {
      scrollTop(value: number | undefined) {
        if (value !== undefined) {
          const maxScroll = getMaxScroll();
          const clamped = Math.max(0, Math.min(value, maxScroll));
          lenis.scrollTo(clamped, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      scrollHeight() {
        return document.documentElement.scrollHeight;
      },
    };

    ScrollTrigger.scrollerProxy(body, scrollProxy);

    let didRefreshOnScroll = false;
    const update = (time: number) => {
      lenis.raf(time * 1000);
      if (!didRefreshOnScroll && lenis.scroll > 10) {
        didRefreshOnScroll = true;
        ScrollTrigger.refresh();
      }
      ScrollTrigger.update();
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    setTimeout(refresh, 0);
    setTimeout(refresh, 100);
    const timeoutRefresh = setTimeout(refresh, 1500);
    window.addEventListener("resize", refresh);

    return () => {
      clearTimeout(timeoutRefresh);
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(update);
      ScrollTrigger.scrollerProxy(body, {});
      ScrollTrigger.defaults({ scroller: window });
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
