import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golden Yellow Travel - News",
  description: "This is the news page of Golden Yellow Travel.",
  keywords: "Golden Yellow Travel, News",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
