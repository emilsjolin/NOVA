"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function NavButtons() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const isHome = pathname === "/";

  return (
    <div className="fixed top-6 right-6 z-[70] flex items-center gap-3">
      {totalItems > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems}
        </button>
      )}
      {isHome && (
        <Link
          href="/shop"
          className="rounded-full border-2 border-white bg-transparent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
        >
          Buy Now
        </Link>
      )}
    </div>
  );
}
