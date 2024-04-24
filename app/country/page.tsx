"use client";

import React, { useEffect } from "react";

import { BiSolidMap } from "react-icons/bi";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { PuffLoader } from "react-spinners";
import TourCard from "@/components/TourCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("countryName");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["countryName"],
    queryFn: () =>
      getRequest(
        `/tour/list?columns=name&search=${searchParams.get("countryName")}`
      ),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // console.log("data >>> ", data)

  useEffect(() => {
    if (searchParams.get("countryName")) {
      refetch();
    }
  }, [searchParams]);

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
      <div className="px-6 lg:px-16 my-20 gap-5 lg:gap-14 flex flex-col justify-center items-center">
        {data?.data?.data?.map((tour: any, index: number) => {
          return <TourCard key={index} tour={tour} reverse={index % 2 !== 0} />;
        })}
      </div>
    </>
  );
};

export default page;
