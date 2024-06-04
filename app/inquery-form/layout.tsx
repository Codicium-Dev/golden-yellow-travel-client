import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry Form",
  description: "This is the inquiry page of Golden Asia Expedition.",
  keywords: "Golden Asia Expedition, Inquiry Form",
};

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
