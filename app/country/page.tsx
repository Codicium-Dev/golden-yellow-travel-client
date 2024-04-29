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

const page = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("countryName");

  let prefetchCountry =
    searchParams.get("countryName") === "Vietnam" ? "Thailand" : "Vietnam";

  const { data, isLoading } = useQuery({
    queryKey: ["countryName", searchParams.get("countryName")],
    queryFn: () =>
      getRequest(
        `/tour/list?columns=name&search=${searchParams.get("countryName")}`
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (searchParams.get("countryName")) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["countryName", prefetchCountry],
  //       queryFn: () =>
  //         getRequest(`/tour/list?columns=name&search=${prefetchCountry}`),
  //     });
  //   }
  // }, [searchParams.get("countryName")]);

  useEffect(() => {
    if (searchParams.get("countryName")) {
      queryClient.prefetchQuery({
        queryKey: ["countryName", prefetchCountry],
        queryFn: () =>
          getRequest(`/tour/list?columns=name&search=${prefetchCountry}`),
      });
    }
  }, [searchParams.get("countryName")]);

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
        photo={country == "Thailand" ? "/thailand.webp" : "/vietnam.jpg"}
        title={country}
      />
      <div className="px-6 md:px-16 my-20 gap-5 lg:gap-14 flex flex-col justify-center items-center">
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

export default page;
