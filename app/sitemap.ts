import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  ];
}
