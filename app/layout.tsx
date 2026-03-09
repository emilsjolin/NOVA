import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "NOVA - Pure Sound. Zero Limits.",
  description: "Premium wireless headphone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-black text-white font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
