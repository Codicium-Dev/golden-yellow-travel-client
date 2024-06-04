import React, { useEffect } from "react";
import { createSlug, createSlugObject } from "@/helper/slugify";

import Image from "next/image";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import { addNews } from "@/services/redux/reducer/newsSlugSlice";
import { useDispatch } from "react-redux";

const BlogCard = ({ news }: { news: any }) => {
  const slug = createSlug(news?.title);
  const newsObject = createSlugObject(slug, news?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (news?.title && news?.id) {
      dispatch(addNews(newsObject));
    }
  }, [news?.title, news?.id, dispatch]);

  return (
    <div className="open-sans w-full lg:w-[48.0%] h-[575px] shadow-lg border rounded-ss-[30px] rounded-ee-[30px] overflow-hidden">
      <div className="w-full h-1/2">
        <Image
          width={1200}
          height={675}
          alt={news?.title}
          src={`${news?.title_photo}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-[#010E3B] bg-[#E2F3FF] flex h-1/2 flex-col justify-between p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-6 items-center">
            <h1 className=" font-bold text-2xl line-clamp-2">{news?.title}</h1>
            <Image
              width={28}
              height={28}
              alt="location"
              src="/location.png"
              className="min-w-[28px] min-h-[28px] object-cover"
            />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: news?.description }}
            className="line-clamp-3 font-medium text-base md:text-lg"
          />
        </div>

        <Link
          href={{
            pathname: `news/news-detail/${slug.toString()}`,
          }}
          className="w-full h-auto md:w-[265px] md:h-[47px] text-sm md:text-base font-bold tracking-wider flex justify-center items-center mt-5 uppercase bg-transparent border-2 border-[#010E3B]  hover:bg-[#010E3B] hover:text-white transition-all"
        >
          <span className="py-3 md:py-4">Continue Reading</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
