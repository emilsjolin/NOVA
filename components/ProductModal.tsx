"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    setQuantity(1);
    if (!product) return;
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(cardRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 });
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product.slug, product.name, product.price, quantity);
    onClose();
  };

  const handleBackdropClose = () => {
    gsap.to(cardRef.current, { y: 20, opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: onClose });
  };

  return (
    <div ref={backdropRef} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6" onClick={handleBackdropClose}>
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="relative w-full max-w-lg rounded-2xl bg-[#0a0a0a] border border-white/10 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleBackdropClose} aria-label="Close" className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Product image placeholder */}
        <div className={`mb-6 flex h-48 items-center justify-center rounded-xl bg-gradient-to-br ${product.accentFrom} ${product.accentTo}`}>
          <span className="text-sm font-medium text-white/60">[PHOTO: {product.name} product shot]</span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
        <p className="mt-1 text-sm text-white/50">{product.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/70">{product.description}</p>

        {/* Specs */}
        <div className="mt-6 flex gap-6">
          <div className="text-center">
            <span className="text-2xl font-bold">{product.specs.protein}</span>
            <span className="block text-xs text-white/50">Protein</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">{product.specs.calories}</span>
            <span className="block text-xs text-white/50">Calories</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">{product.specs.sugar}</span>
            <span className="block text-xs text-white/50">Sugar</span>
          </div>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 rounded-full border-2 border-white bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-transparent hover:text-white"
          >
            Add to Cart — ${product.price * quantity}
          </button>
        </div>
      </div>
    </div>
  );
}
