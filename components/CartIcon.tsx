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
