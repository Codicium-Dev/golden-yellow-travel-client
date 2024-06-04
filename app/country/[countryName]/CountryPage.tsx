"use client";

import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { BiSolidMap } from "react-icons/bi";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { PuffLoader } from "react-spinners";
import TourCard from "@/components/TourCard";
import { getRequest } from "@/services/api/apiService";
import { useSearchParams } from "next/navigation";

const CountryPage = ({ countryName }: { countryName: string }) => {
  let prefetchCountry = countryName === "vietnam" ? "thailand" : "vietnam";

  const { data, isLoading } = useQuery({
    queryKey: ["countryName", countryName],
    queryFn: () => getRequest(`/tour/list?columns=name&search=${countryName}`),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (countryName) {
      queryClient.prefetchQuery({
        queryKey: ["countryName", prefetchCountry],
        queryFn: () =>
          getRequest(`/tour/list?columns=name&search=${prefetchCountry}`),
      });
    }
  }, [countryName]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <>
      <HeroSection
        photo={countryName == "thailand" ? "/thailand.webp" : "/vietnam.jpg"}
        title={countryName}
      />
      <div className="px-6 md:px-16 mt-10 mb-20 gap-5 lg:gap-14 flex flex-col justify-center items-center">
        {isLoading && (
          <div className="flex min-h-screen items-center justify-center">
            <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
          </div>
        )}
        {data?.data?.map((tour: any, index: number) => {
          return <TourCard key={index} tour={tour} reverse={index % 2 !== 0} />;
        })}
      </div>
    </>
  );
};

export default CountryPage;
