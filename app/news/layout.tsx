import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golden Asia Expedition - News",
  description: "This is the news page of Golden Asia Expedition.",
  keywords: "Golden Asia Expedition, News",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
