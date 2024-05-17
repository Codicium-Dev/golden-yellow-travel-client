import { createSlug, createSlugObject } from "@/helper/slugify";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { addCityTour } from "@/services/redux/reducer/cityTourSlugSlice";
import { useDispatch } from "react-redux";

const MostPopularDestinations = ({ cityTour }: { cityTour: any }) => {
  return (
    <div className="bg-white mb-12">
      <h1 className="text-center text-3xl font-bold text-primary mt-14 mb-8">
        The Most Popular Destinations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {cityTour?.data?.data?.map((city: any, index: number) => {
          const slug = createSlug(city?.name);
          const tourObject = createSlugObject(slug, city?.id);
          const dispatch = useDispatch();

          dispatch(addCityTour(tourObject));

          return (
            <div key={city?.name} className="relative overflow-hidden">
              <Link
                href={{
                  pathname: `/city-tour/${slug.toString()}`,
                }}
                // as={`https://goldenyellowtravel.com/city-tour?city=${city?.id}&cityName=${city?.name}`}
              >
                <div className="cursor-pointer">
                  <Image
                    width={544}
                    height={306}
                    className="w-full h-60 md:h-96 object-cover rounded-sm hover:scale-105 transition-all duration-300"
                    src={city?.city_photo}
                    alt="city picture"
                  />
                  <div className="absolute bottom-0 w-full h-[50%] md:h-[100px] bg-[#4b85b28c] flex justify-center items-center">
                    <p className="text-lg md:text-xl text-[#010E3B] font-bold text-center py-2 px-4">
                      {city?.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostPopularDestinations;
