"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";

export default function CartPanel() {
  const { items, updateQuantity, removeItem, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !backdropRef.current) return;
    if (isCartOpen) {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
      backdropRef.current.style.pointerEvents = "auto";
    } else {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(panelRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      backdropRef.current.style.pointerEvents = "none";
    }
  }, [isCartOpen]);

  return (
    <>
      <div
        ref={backdropRef}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 z-[80] bg-black/60"
        style={{ opacity: 0, pointerEvents: "none" }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-[#0a0a0a] border-l border-white/10"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="text-lg font-bold tracking-wide">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="text-white/60 transition-colors hover:text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="text-center text-white/40 mt-12">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-white/50">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm transition-colors hover:border-white"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm transition-colors hover:border-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="ml-2 text-white/30 transition-colors hover:text-white"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="mb-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <div className="rounded-full border-2 border-white/20 py-3 text-center text-sm font-medium text-white/50">
              Checkout Coming Soon
            </div>
          </div>
        )}
      </div>
    </>
  );
}
