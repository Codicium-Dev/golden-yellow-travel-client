import { MetadataRoute } from "next";
import { createSlug } from "@/helper/slugify";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(
    `https://newapi.goldenyellowtravel.com/api/v1/tour/list`
  );
  const tours = await res.json();

  const toursEntries = tours?.data.map((tour: any) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tour/tour-detail/${createSlug(
      tour?.name
    )}`,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/country/thailand`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/country/vietnam`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/news`,
    },
    ...toursEntries,
  ];
}
