"use client";

import BlogCard from "@/components/BlogCard";
import HeroSection from "@/components/HeroSection";
import InfiniteScroll from "react-infinite-scroller";
import { PuffLoader } from "react-spinners";
import React from "react";
import { getRequest } from "@/services/api/apiService";
import { useInfiniteQuery } from "@tanstack/react-query";

const Page = () => {
  const {
    data: newLists,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam = 1 }) =>
      getRequest("/news/list", { page: pageParam, per_page: 4 }),
    getNextPageParam: (lastPage) => lastPage?.data?.next_page_url || undefined,
  });

  const allNews = newLists?.pages.flatMap((page) => page?.data?.data) ?? [];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection photo={"/news.png"} />
      <div className="px-[20px] md:px-[40px] lg:px-[70px] my-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-7 ">
          {allNews?.map((news, index) => (
            <React.Fragment key={news?.id}>
              <BlogCard news={news} />
              {/* {(index + 1) % 2 === 0 && <div className="w-full" />} */}
            </React.Fragment>
          ))}
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => {
            if (!isFetching) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
          loader={
            <div className="flex items-center justify-center">
              <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Page;
