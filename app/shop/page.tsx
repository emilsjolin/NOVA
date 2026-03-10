"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { PRODUCTS, Product } from "@/lib/products";
import PageHero from "@/components/PageHero";
import ProductModal from "@/components/ProductModal";
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
