import React, { useEffect, useState } from "react";
import {
  addTour,
  removeTour,
  selectTours,
} from "@/services/redux/reducer/tourSlugSlice";
import { createSlug, createSlugObject } from "@/helper/slugify";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import TourCardReviews from "./TourCardReviews";

const TourCard = ({ tour, reverse }: any) => {
  const [reviewIn, setReviewIn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const slug = createSlug(tour?.name);
  const tourObject = createSlugObject(slug, tour?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tour?.name && tour?.id) {
      dispatch(addTour(tourObject));
    }
  }, [tour?.name, tour?.id, dispatch]);

  const handleButtonClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (!reviewIn) {
        setTimeout(() => {
          setReviewIn(true);
          setTimeout(() => setIsAnimating(false), 800);
        }, 50);
      } else {
        setReviewIn(false);
        setTimeout(() => setIsAnimating(false), 800);
      }
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row w-full lg:h-[446px] bg-[#F2F2F2] mb-2 overflow-hidden ${
        reverse && "lg:flex-row-reverse "
      }`}
    >
      <div className="w-full lg:w-[40%] h-full ">
        <img
          src={`${tour?.tour_photo}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* reviews */}
      <div
        className={`w-full lg:w-[57%] h-[300px] lg:h-full pt-5 lg:pt-10 pb-4 px-6 flex-col gap-1 open-sans ${
          reviewIn
            ? `flex animate-slideReviewInMobile ${
                reverse
                  ? "lg:animate-slideReviewInReverse"
                  : "lg:animate-slideReviewIn"
              }`
            : `hidden animate-slideReviewOutMobile ${
                reverse
                  ? "lg:animate-slideReviewOutReverse"
                  : "lg:animate-slideReviewOut"
              }`
        } ${reverse ? "lg:pr-12 lg:pl-3" : "lg:pl-12 lg:pr-3"}`}
      >
        <TourCardReviews
          tourId={tour?.id}
          tourName={tour?.name}
          tourRating={Number(tour?.rating)}
        />
      </div>

      {/* content */}
      <div
        className={`w-full lg:w-[57%] min-h-[300px] lg:h-full pt-5 lg:pt-10 pb-4 px-6 flex-col justify-between open-sans ${
          reviewIn
            ? `hidden animate-slideContentOutMobile ${
                reverse
                  ? "lg:animate-slideContentOutReverse"
                  : "lg:animate-slideContentOut"
              }`
            : `flex animate-slideContentInMobile ${
                reverse
                  ? "lg:animate-slideContentInReverse"
                  : "lg:animate-slideContentIn"
              }`
        } ${reverse ? "lg:pr-12 lg:pl-3" : "lg:pl-12 lg:pr-3"}`}
      >
        <div className="">
          <h2 className="text-lg xl:text-[32px] lg:text-[26px] text-[#224466] font-bold leading-8">
            {tour?.name}
          </h2>

          <div className="flex flex-1 pt-5 pb-2">
            <p className="text-base lg:text-[22px] leading-[28px] text-[#010E3B] font-normal line-clamp-5">
              {tour?.overview}
            </p>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inter flex font-sm lg:font-medium items-center justify-start">
              <p className="text-lg xl:text-[32px] lg:text-[26px] text-[#224466]">
                <span className="mr-2">$</span>
                {tour?.sale_price}{" "}
                <span className="text-base xl:text-[26px] lg:text-[20px]">
                  per person
                </span>
              </p>
            </div>

            <Link
              href={{
                pathname: `/tour/tour-detail/${slug.toString()}`,
              }}
              // as={`https://localhost:3000/tour/tour-detail?tourDetail=${tour?.id}`}
              // as={`https://goldenyellowtravel.com/tour/tour-detail?tourDetail=${tour?.id}`}
              className="text-sm lg:text-[20px] open-sans bg-[#010E3B] hover:bg-[#010e3be3] text-white py-3 px-6 lg:px-14 transition-all"
            >
              View Tour
            </Link>
          </div>

          <div className="pt-4 lg:pt-5 lg:pb-10 hidden lg:block">
            {/* {tour?.price && (
              <p className="text-[32px] text-red-600 text-xl font-bold px-2 line-through">
                ${tour?.price}
              </p>
            )} */}
            {/* <p className="text-[#010E3B] text-lg line-clamp-1">
              Lorem ipsum dolor sit amet consectetur. Amet velit urna turpisrs
            </p> */}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button onClick={handleButtonClick}>
          <span className="cursor-pointer hover-color">
            {reviewIn !== reverse ? (
              <svg
                width="70"
                height="70"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="hidden lg:block"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="#9C9C9C"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                width="70"
                height="70"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="hidden lg:block"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="#9C9C9C"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}

            {!reviewIn ? (
              <svg
                width="40"
                height="40"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="block lg:hidden"
              >
                <path
                  d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
                  fill="#9C9C9C"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                width="40"
                height="40"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
                className="block lg:hidden"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="#9C9C9C"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TourCard;
