"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import { PuffLoader } from "react-spinners";
import TourCard from "@/components/TourCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const params = useSearchParams();
  const router = useRouter();

  // console.log(params.get("cityId"));
  // console.log(params.get("duration"));
  // console.log(params.get("startDate"));

  const { data, isLoading } = useQuery({
    queryKey: [
      "customTour",
      params.get("cityId"),
      params.get("duration"),
      params.get("startDate"),
    ],
    queryFn: () =>
      getRequest(
        `tour/filter?city_id=${params.get("cityId")}&duration=${params.get(
          "duration"
        )}$start_date=${params.get("startDate")}`
      ),
  });

  console.log("custom search data \n", data);

  const [clickSearched, setClickSearch] = useState("");

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
    <div className="flex flex-wrap justify-center mx-auto px-6 md:px-16 mt-[20px] mb-[30px] ">
      <div className="mt-32 mb-7">
        {data?.data?.data?.length === 0 && (
          <div className="flex min-h-screen items-start justify-center">
            <h1 className="text-2xl font-bold">No Tour Available</h1>
          </div>
        )}
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
