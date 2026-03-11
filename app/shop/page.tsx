import type { Metadata } from "next";
import ShopContent from "@/components/ShopContent";

export const metadata: Metadata = {
  title: "Shop — PROTEA",
  description: "Browse the PROTEA protein drink collection. Three premium flavors, zero compromise.",
};

export default function ShopPage() {
  return <ShopContent />;
}
