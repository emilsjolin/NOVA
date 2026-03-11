import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import BlobMenu from "@/components/BlobMenu";
import NavButtons from "@/components/NavButtons";
import CartPanel from "@/components/CartPanel";

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
          <BlobMenu />
          <NavButtons />
          <CartPanel />
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
