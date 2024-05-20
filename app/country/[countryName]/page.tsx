import type { Metadata, ResolvingMetadata } from "next";

import CountryPage from "./CountryPage";
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";

export async function generateMetadata(
  { params }: { params: { countryName: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title:
      params?.countryName.charAt(0).toUpperCase() +
      params?.countryName.slice(1),
    description: `Make your memorable trip at the best prices! Plan your dream to ${
      params?.countryName.charAt(0).toUpperCase() +
        params?.countryName.slice(1) || "South East Asia"
    } with us.`,
    keywords:
      params?.countryName === "thailand"
        ? "thailand holiday packages, thailand holiday, thailand holidays 2024, best time to visit thailand, best time to go to thailand, cheap tour packages, best month to visit thailand, travelling package, affordable trip packages, tajlandia holiday, holiday packages for japan, good time to visit thailand, good time to go to thailand"
        : "vietnam tour package, vietnam tour, vietnam travel package, vietnam holiday packages, trip to vietnam, vietnam holiday, vietnam vacation packages, vietnam vacation, vietnam itinerary, tour packages, vietnam itinerary 10 days, vietnam and cambodia holidays, travel vietnam, vietnam cambodia tour, vietnam travel agency, vietnam travel itinerary, vietnam itinerary 2 weeks, travel tour groups, vietnam tourist, best month to visit vietnam, cheapest family holiday packages, best holiday tour packages, best time to travel to vietnam and cambodia, vietnam to cambodia, two weeks in vietnam, solo travel package, best time of year to visit vietnam and cambodia, vietnam itinerary 3 weeks, holiday package booking, vietnam travel itinerary 10 days, vietnam travel package deals, solo travel tour packages, tours south east asia, 3 weeks in vietnam, south east asia trips, vietnam travel itinerary 2 weeks, holiday travels, vietnam in december, mekong delta vietnam, travel in group packages, holidaying in vietnam, vietnam cambodia and thailand, travel packages to asia, couples trip packages, vietnam travel tour packages, vietnam trips packages",
    openGraph: {
      images: [
        params?.countryName === "thailand" ? "/thailand.webp" : "/vietnam.jpg",
      ],
    },
  };
}

const page = ({ params }: { params: { countryName: string } }) => {
  return <CountryPage countryName={params?.countryName} />;
};

export default page;
