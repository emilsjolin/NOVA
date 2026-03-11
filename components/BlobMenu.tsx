"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Center of the 48px button at top-5 (20px) left-5 (20px) = 44px, 44px
const ORIGIN = "44px 44px";

export default function BlobMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const blobRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  const open = useCallback(() => {
    if (isAnimating.current || isOpen) return;
    isAnimating.current = true;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    tlRef.current = tl;

    tl.to(blobRef.current, {
      clipPath: `circle(5000px at ${ORIGIN})`,
      duration: 0.7,
      ease: "power3.inOut",
    });

    tl.fromTo(
      linksRef.current?.querySelectorAll("[data-menu-link]") ?? [],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: "power2.out" },
      "-=0.3"
    );
  }, [isOpen]);

  const close = useCallback(() => {
    if (isAnimating.current || !isOpen) return;
    isAnimating.current = true;

    // If cursor is still over the button, shrink to hover size instead of fully closing
    const closedSize = isHovered ? "28px" : "0px";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        isAnimating.current = false;
      },
    });

    tl.to(
      linksRef.current?.querySelectorAll("[data-menu-link]") ?? [],
      { y: -30, opacity: 0, stagger: 0.05, duration: 0.2, ease: "power2.in" },
      0
    );

    tl.to(
      blobRef.current,
      {
        clipPath: `circle(${closedSize} at ${ORIGIN})`,
        duration: 0.5,
        ease: "power3.inOut",
      },
      0
    );
  }, [isOpen, isHovered]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  // Icon color: black when open OR hovered (circle visible behind), white otherwise
  const iconColor = isOpen || isHovered ? "#000" : "#fff";

  return (
    <>
      {/* Hamburger / X button */}
      <button
        onClick={toggle}
        onMouseEnter={() => {
          setIsHovered(true);
          if (!isOpen && blobRef.current) {
            gsap.to(blobRef.current, {
              clipPath: `circle(28px at ${ORIGIN})`,
              duration: 0.3,
              ease: "power2.out",
              overwrite: true,
            });
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (!isOpen && blobRef.current) {
            gsap.to(blobRef.current, {
              clipPath: `circle(0px at ${ORIGIN})`,
              duration: 0.3,
              ease: "power2.in",
              overwrite: true,
            });
          }
        }}
        className="fixed top-5 left-5 z-[70] flex h-12 w-12 flex-col items-center justify-center gap-[6px] rounded-full"
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span
          className="block h-[2px] w-6 transition-all duration-300 origin-center"
          style={{
            backgroundColor: iconColor,
            transform: isOpen ? "translateY(8px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-[2px] w-6 transition-all duration-300"
          style={{
            backgroundColor: iconColor,
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          className="block h-[2px] w-6 transition-all duration-300 origin-center"
          style={{
            backgroundColor: iconColor,
            transform: isOpen ? "translateY(-8px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* White blob overlay */}
      <div
        ref={blobRef}
        role="navigation"
        aria-label="Main menu"
        className="fixed inset-0 z-[60] bg-white"
        style={{ clipPath: `circle(0px at ${ORIGIN})`, pointerEvents: isOpen ? "auto" : "none" }}
      >
        <div
          ref={linksRef}
          className="flex h-full w-full flex-col items-center justify-center gap-8"
        >
          {LINKS.map((link) => (
            <Link
              key={link.label}
              data-menu-link
              href={link.href}
              onClick={close}
              className="text-4xl font-bold text-black transition-colors hover:text-neutral-500 md:text-5xl"
              style={{ opacity: 0 }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
