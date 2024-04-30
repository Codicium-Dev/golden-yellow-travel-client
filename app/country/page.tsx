import type { Metadata, ResolvingMetadata } from "next";

import CountryPage from "./CountryPage";
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | TemplateString | null | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: searchParams?.countryName || "Golden Yellow Travel",
    description: "This website is provided from YoLo Digital Marketing.",
    keywords:
      searchParams?.countryName === "Thailand"
        ? "thailand holiday packages, thailand holiday, thailand holidays 2024, best time to visit thailand, best time to go to thailand, cheap tour packages, best month to visit thailand, travelling package, affordable trip packages, tajlandia holiday, holiday packages for japan, good time to visit thailand, good time to go to thailand"
        : "vietnam tour package, vietnam tour, vietnam travel package, vietnam holiday packages, trip to vietnam, vietnam holiday, vietnam vacation packages, vietnam vacation, vietnam itinerary, tour packages, vietnam itinerary 10 days, vietnam and cambodia holidays, travel vietnam, vietnam cambodia tour, vietnam travel agency, vietnam travel itinerary, vietnam itinerary 2 weeks, travel tour groups, vietnam tourist, best month to visit vietnam, cheapest family holiday packages, best holiday tour packages, best time to travel to vietnam and cambodia, vietnam to cambodia, two weeks in vietnam, solo travel package, best time of year to visit vietnam and cambodia, vietnam itinerary 3 weeks, holiday package booking, vietnam travel itinerary 10 days, vietnam travel package deals, solo travel tour packages, tours south east asia, 3 weeks in vietnam, south east asia trips, vietnam travel itinerary 2 weeks, holiday travels, vietnam in december, mekong delta vietnam, travel in group packages, holidaying in vietnam, vietnam cambodia and thailand, travel packages to asia, couples trip packages, vietnam travel tour packages, vietnam trips packages",
    openGraph: {
      images: [
        searchParams?.countryName === "Thailand"
          ? "/thailand.webp"
          : "/vietnam.jpg",
      ],
    },
  };
}

const page = () => {
  return <CountryPage />;
};

export default page;
