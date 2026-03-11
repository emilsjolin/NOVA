# Website Pages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Shop, About, and Contact pages to the PROTEA website with cart functionality, updated navigation, and consistent premium design.

**Architecture:** Next.js App Router pages with shared CartContext for state management. Each page uses GSAP fade-in animations matching the existing homepage style. BlobMenu links updated to use Next.js Link for client-side navigation.

**Tech Stack:** Next.js 14 (App Router), React 18, GSAP 3.12, Tailwind CSS 3.4, TypeScript 5

---

## File Structure

**New files:**
- `context/CartContext.tsx` — Cart state provider (items, add, remove, update quantity)
- `components/CartPanel.tsx` — Slide-out cart panel
- `components/CartIcon.tsx` — Cart icon button with item count badge
- `components/ProductModal.tsx` — Product detail modal with backdrop blur
- `components/PageHero.tsx` — Reusable page hero component (text + fade-in)
- `app/shop/page.tsx` — Shop page
- `app/about/page.tsx` — About page
- `app/contact/page.tsx` — Contact page
- `lib/products.ts` — Product data (flavors, prices, descriptions)

**Modified files:**
- `app/layout.tsx` — Wrap with CartProvider, fix metadata from NOVA to PROTEA
- `app/page.tsx` — Update "Buy Now" button href to `/shop`
- `components/BlobMenu.tsx` — Update links to real routes, use Next.js Link
- `components/FinalCTA.tsx` — Update "Order Now" href to `/shop`

---

## Chunk 1: Foundation (Cart Context, Product Data, Shared Components)

### Task 1: Product Data

**Files:**
- Create: `lib/products.ts`

- [ ] **Step 1: Create product data file**

```typescript
export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  accentFrom: string;
  accentTo: string;
  specs: { protein: string; calories: string; sugar: string };
}

export const PRODUCTS: Product[] = [
  {
    slug: "white-peach",
    name: "White Peach",
    tagline: "Soft. Sweet. Clean.",
    description:
      "A delicate white peach flavor with a smooth, clean finish. 20g of protein with zero sugar — crafted for those who refuse to compromise on taste.",
    price: 39,
    accentFrom: "from-amber-800",
    accentTo: "to-orange-950",
    specs: { protein: "20g", calories: "70", sugar: "0g" },
  },
  {
    slug: "cactus-lime",
    name: "Cactus / Lime",
    tagline: "Sharp. Fresh. Alive.",
    description:
      "Prickly pear cactus meets zesty lime in a refreshing blend that cuts through the ordinary. Bold flavor, clean energy, zero sugar.",
    price: 39,
    accentFrom: "from-emerald-800",
    accentTo: "to-teal-950",
    specs: { protein: "20g", calories: "70", sugar: "0g" },
  },
  {
    slug: "berry-oolong",
    name: "Berry Oolong",
    tagline: "Deep. Complex. Refined.",
    description:
      "Dark berries layered over smooth oolong tea — a rich, nuanced profile for those who demand depth. 20g protein, zero sugar, full sophistication.",
    price: 39,
    accentFrom: "from-rose-800",
    accentTo: "to-pink-950",
    specs: { protein: "20g", calories: "70", sugar: "0g" },
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add lib/products.ts
git commit -m "feat: add product data for three PROTEA flavors"
```

---

### Task 2: Cart Context

**Files:**
- Create: `context/CartContext.tsx`

- [ ] **Step 1: Create CartContext with provider**

```typescript
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (slug: string, name: string, price: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((slug: string, name: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { slug, name, price, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.slug !== slug));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, quantity } : item))
    );
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

- [ ] **Step 2: Wrap layout with CartProvider and fix metadata**

Modify `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "PROTEA — Pure Protein. Zero Compromise.",
  description: "Premium protein drink crafted from clean ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-black text-white font-sans">
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add context/CartContext.tsx app/layout.tsx
git commit -m "feat: add CartContext provider and fix PROTEA metadata"
```

---

### Task 3: Cart Panel & Cart Icon

**Files:**
- Create: `components/CartPanel.tsx`
- Create: `components/CartIcon.tsx`

- [ ] **Step 1: Create CartPanel**

```typescript
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
        className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-[#0a0a0a] border-l border-white/10"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="text-lg font-bold tracking-wide">Your Cart</h2>
          <button
            onClick={() => setIsCartOpen(false)}
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
```

- [ ] **Step 2: Create CartIcon**

```typescript
"use client";

import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalItems, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed top-6 right-6 z-[70] flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
      {totalItems}
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/CartPanel.tsx components/CartIcon.tsx
git commit -m "feat: add CartPanel slide-out and CartIcon with badge"
```

---

### Task 4: PageHero Reusable Component

**Files:**
- Create: `components/PageHero.tsx`

- [ ] **Step 1: Create PageHero component**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/PageHero.tsx
git commit -m "feat: add reusable PageHero component with GSAP fade-in"
```

---

### Task 5: Product Modal

**Files:**
- Create: `components/ProductModal.tsx`

- [ ] **Step 1: Create ProductModal**

```typescript
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
    for (let i = 0; i < quantity; i++) {
      addItem(product.slug, product.name, product.price);
    }
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
        className="relative w-full max-w-lg rounded-2xl bg-[#0a0a0a] border border-white/10 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleBackdropClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ProductModal.tsx
git commit -m "feat: add ProductModal with quantity selector and cart integration"
```

---

## Chunk 2: Pages

### Task 6: Shop Page

**Files:**
- Create: `app/shop/page.tsx`

- [ ] **Step 1: Create shop page**

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PRODUCTS, Product } from "@/lib/products";
import PageHero from "@/components/PageHero";
import ProductModal from "@/components/ProductModal";
import CartIcon from "@/components/CartIcon";
import CartPanel from "@/components/CartPanel";
import BlobMenu from "@/components/BlobMenu";

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-product-card]");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  return (
    <main>
      <BlobMenu />
      <CartIcon />
      <CartPanel />

      <PageHero heading="The Collection" />

      <section className="px-6 pb-24">
        <div ref={gridRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.slug}
              data-product-card
              className="group cursor-pointer"
              style={{ opacity: 0 }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image placeholder */}
              <div
                className={`mb-4 flex h-80 items-center justify-center rounded-2xl bg-gradient-to-br ${product.accentFrom} ${product.accentTo} transition-transform duration-500 group-hover:scale-[1.02]`}
              >
                <span className="text-sm font-medium text-white/50">
                  [PHOTO: {product.name} can on gradient]
                </span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-sm text-white/50">{product.tagline}</p>
                </div>
                <span className="text-lg font-medium text-white/70">${product.price}</span>
              </div>
              <button className="mt-4 w-full rounded-full border border-white/20 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white hover:text-white">
                Quick View
              </button>
            </div>
          ))}
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}
```

- [ ] **Step 2: Verify visually** — run `npm run dev` and visit `/shop`

- [ ] **Step 3: Commit**

```bash
git add app/shop/page.tsx
git commit -m "feat: add Shop page with product grid and modal"
```

---

### Task 7: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create about page**

```typescript
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
```

- [ ] **Step 2: Verify visually** — visit `/about`

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add About page with brand story, values, and product deep-dive"
```

---

### Task 8: Contact Page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create contact page**

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BlobMenu from "@/components/BlobMenu";

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

export default function ContactPage() {
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
      <BlobMenu />

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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Closing logo */}
        <div ref={logoRef} className="mt-32 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <Image src="/Asset 3.png" alt="PROTEA" width={500} height={500} className="h-auto w-16" />
          <p className="text-sm text-white/30">Pure Protein. Zero Compromise.</p>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify visually** — visit `/contact`

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: add Contact page with email and social links"
```

---

## Chunk 3: Navigation Updates

### Task 9: Update BlobMenu Links

**Files:**
- Modify: `components/BlobMenu.tsx:1-11`

- [ ] **Step 1: Update BlobMenu to use Next.js Link and real routes**

Replace the imports and LINKS array at the top of `components/BlobMenu.tsx`:

```typescript
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
```

Then replace the `<a>` tag inside the links map (line ~152-160) with `<Link>`:

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/BlobMenu.tsx
git commit -m "feat: update BlobMenu with real routes and Next.js Link"
```

---

### Task 10: Update Homepage Buttons

**Files:**
- Modify: `app/page.tsx:13-18`
- Modify: `components/FinalCTA.tsx:72-76`

- [ ] **Step 1: Update "Buy Now" button in page.tsx**

Change the `<a href="#">` on line 13 to:

```tsx
<a
  href="/shop"
  className="fixed top-6 right-6 z-50 rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
>
  Buy Now
</a>
```

- [ ] **Step 2: Update "Order Now" button in FinalCTA.tsx**

Change the `href="#"` on line 74 to `href="/shop"`:

```tsx
<a
  ref={buttonRef}
  href="/shop"
  className="rounded-full border-2 border-white bg-transparent px-10 py-4 text-lg font-medium text-white transition-colors hover:bg-white hover:text-black"
>
  Order Now
</a>
```

- [ ] **Step 3: Verify** — all nav links and buttons work, navigate between pages

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/FinalCTA.tsx
git commit -m "feat: update Buy Now and Order Now buttons to link to /shop"
```

---

## Summary

**10 tasks** across 3 chunks:
1. Foundation: Product data, Cart context, Cart UI, PageHero, ProductModal
2. Pages: Shop, About, Contact
3. Navigation: BlobMenu routes, homepage button links

**No new dependencies required.** All uses existing GSAP, Tailwind, and Next.js features.
