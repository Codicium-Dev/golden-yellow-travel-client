"use client";

import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { PuffLoader } from "react-spinners";
import React from "react";
import RecentNews from "@/components/RecentNews";
import { getRequest } from "@/services/api/apiService";
import { selectNews } from "@/services/redux/reducer/newsSlugSlice";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const Page = ({ params }: { params: { slug: string } }) => {
  const newsSlug = useSelector(selectNews);
  const dispatch = useDispatch();

  const newsId = newsSlug[params.slug.toString()];

  const { data: NewDetail, isLoading: detailLoading } = useQuery({
    queryKey: ["news", newsId],
    queryFn: () => getRequest(`/news/show/${newsId}`),
  });

  const { data: NewContentLists, isLoading: contentLoading } = useQuery({
    queryKey: ["NewContentLists", newsId],
    queryFn: () => getRequest(`/news-content/show/${newsId}`),
  });

  if (detailLoading || contentLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="pt-[90px] md:pt-[120px] bg-[#E2F3FF] open-sans">
      <div className="px-6 pb-8 lg:px-20 lg:pb-12">
        {/* as={`https://goldenyellowtravel.com/news.html`} */}
        <Link href="/news">
          <button className="flex items-center gap-2 px-6 py-2 rounded-md text-xs lg:text-base text-white bg-[#224466] hover:bg-[#224466]/90 cursor-pointer transition-all">
            <IoIosArrowBack />
            Go Back
          </button>
        </Link>
        <div className=" grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-5">
          <div className="bg-white rounded-md col-span-2 mt-5 px-6 py-8">
            <Image
              width={300}
              height={400}
              src={
                NewDetail?.data?.title_photo ? NewDetail?.data?.title_photo : ""
              }
              // layout="responsive"
              className=" rounded shadow-xl"
              style={{ width: "100%", height: "5 00px" }}
              alt="New Detail photo"
              priority
            />

            <h1 className="text-xl lg:text-3xl py-8 text-[#224466] font-bold">
              {NewDetail?.data?.title}
            </h1>

            <div
              className="text-[#010E3B] text-md lg:text-xl break-words leading-8"
              dangerouslySetInnerHTML={{ __html: NewDetail?.data?.description }}
            />

            {/* new content */}
            <div>
              {NewContentLists?.data?.data?.map((content: any) => {
                return (
                  <div key={content?.id} className="my-5">
                    <h1 className=" text-orange-500 text-base font-bold">
                      {content?.title}
                    </h1>
                    <p className=" text-gray-700 text-sm mt-2 my-5">
                      {content?.content}
                    </p>
                    <Image
                      width={300}
                      height={300}
                      src={content?.content_photo ? content?.content_photo : ""}
                      // layout="responsive"
                      className=" rounded"
                      style={{ width: "100%", height: "300px" }}
                      alt="New Content photo"
                      priority
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-md px-6 py-8 mt-5">
            <h1 className="text-[#000000] text-2xl open-sans border-b-2 border-[#D1D1D2/60] pb-4">
              Latest Article
            </h1>
            <RecentNews readingNewsId={NewDetail?.data?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
