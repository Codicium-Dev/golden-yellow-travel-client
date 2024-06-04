import React, { useEffect } from "react";
import { addNews, selectNews } from "@/services/redux/reducer/newsSlugSlice";
import { createSlug, createSlugObject } from "@/helper/slugify";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import { PuffLoader } from "react-spinners";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const RecentNews = ({ readingNewsId }: { readingNewsId: number }) => {
  const { data: recentNewLists, isLoading: loadingRecentNews } = useQuery({
    queryKey: ["recentNewLists"],
    queryFn: () =>
      getRequest("/news/list?order=created_at&sort=DESC&page=1&per_page=6"),
  });

  if (loadingRecentNews) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="">
      {recentNewLists?.data?.data?.map((list: any, index: number) => {
        const slug = createSlug(list?.title);

        if (list.id === readingNewsId) {
          return;
        }
        return (
          <Link
            href={{
              pathname: `/news/news-detail/${slug.toString()}`,
            }}
            // as={`https://goldenyellowtravel.com/news/news-detail?newsDetail=${list?.id}`}
            className="pb-4"
          >
            <div
              key={list?.id}
              className="flex flex-col md:flex-row gap-4 min-h-[150px] border-b-2 border-b-[#D1D1D2/60] py-6 "
            >
              <div className="md:w-1/3">
                <Image
                  width={750}
                  height={500}
                  alt={list?.title}
                  src={list?.title_photo}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-2/3 flex flex-col justify-start gap-2">
                <h1 className="font-bold text-sm md:text-lg line-clamp-2">
                  {list?.title}
                </h1>
                <p
                  className="text-xs md:text-sm font-normal line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: list?.description }}
                ></p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentNews;
