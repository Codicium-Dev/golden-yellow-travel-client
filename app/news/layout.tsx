import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golden Asia Expectations - News",
  description: "This is the news page of Golden Asia Expectations.",
  keywords: "Golden Asia Expectations, News",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
