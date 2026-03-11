import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact — PROTEA",
  description: "Get in touch with PROTEA. Partnerships, press, or just to say hi.",
};

export default function ContactPage() {
  return <ContactContent />;
}
