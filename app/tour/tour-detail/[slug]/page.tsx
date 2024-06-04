import { Metadata } from "next";
import React from "react";
import TourDetailSection from "@/components/TourDetailSection";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: params.slug
      .split("-")
      .join(" ")
      .split(" ")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" "),
  };
}

const page = ({ params }: { params: { slug: string } }) => {
  return <TourDetailSection params={params} />;
};

export default page;
