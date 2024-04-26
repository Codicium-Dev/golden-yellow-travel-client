"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BsCheck2All } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import TourCard from "@/components/TourCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cityId", searchParams.get("city")],
    queryFn: () =>
      getRequest(
        `/tour/list?columns=city_id&search=${searchParams.get("cityId")}`
      ),
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (data?.data?.data?.length === 0) {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  return (
    <div className=" min-h-screen">
      <div
        className="h-[400px] relative"
        style={{
          backgroundImage: `url(${"travel.jpeg"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className=" hero-section h-[400px]"></div>
        <h1 className="md:text-3xl text-2xl font-bold text-white absolute top-[50%] left-[50%] -translate-x-[50%] z-50">
          Discover {searchParams.get("cityName")} by your own way!
        </h1>
      </div>

      {data?.data?.data?.length === 0 && (
        <div className="flex mt-12 min-h-screen items-start justify-center">
          <h1 className="text-2xl font-bold">No Tour Available</h1>
        </div>
      )}
      <div className="mt-10 gap-8 flex flex-col px-6 md:px-16 justify-center items-center">
        {data?.data?.data?.length !== 0 &&
          data?.data?.data?.map((tour: any, index: number) => {
            return (
              <div className="mb-7" key={index}>
                <TourCard tour={tour} reverse={index % 2 !== 0} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
