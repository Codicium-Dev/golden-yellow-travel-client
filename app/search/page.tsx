"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { PuffLoader } from "react-spinners";
import { RootState } from "@/services/lib/store";
import TourCard from "@/components/TourCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const dispatch = useDispatch();
  const mainSearch = useSelector((state: RootState) => state.mainSearch.search);

  const [clickSearched, setClickSearch] = useState("");

  const {
    data: search,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["search"],
    queryFn: () =>
      getRequest(
        `/tour/list?columns=name&search=${mainSearch ? mainSearch : ""}`
      ),
  });

  useEffect(() => {
    refetch();
  }, [mainSearch]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mx-auto px-[20px] md:px-[130px] mt-[20px] mb-[30px] ">
        <div className="mt-32 mb-7">
          {mainSearch ? (
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "xl",
              }}
            >
              Top tour result matching for
              <span className="text-orange-500 ms-1">{mainSearch}</span>
            </p>
          ) : (
            <p className="text-red-500 text-center font-semibold text-lg">
              ! Search something in the Search box.. Showing all tour packages..
            </p>
          )}
        </div>
      </div>
      <div className="my-10 gap-8 flex flex-col px-6 md:px-16 justify-center items-center">
        {search?.data?.data?.map((tour: any, index: number) => {
          return (
            <div className="mb-7" key={index}>
              <TourCard tour={tour} reverse={index % 2 !== 0} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default page;
