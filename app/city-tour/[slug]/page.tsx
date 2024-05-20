import CityTourSection from "@/components/CityTourSection";
import { Metadata } from "next";
import React from "react";

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
  return <CityTourSection params={params} />;
};

export default page;
