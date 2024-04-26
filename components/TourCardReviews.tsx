"use client";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import React from "react";
import UserReviewCard from "./UserReviewCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const TourCardReviews = ({
  tourId,
  tourName,
  tourRating,
}: {
  tourId: string;
  tourName: string;
  tourRating: number;
}) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", tourId],
    queryFn: () => getRequest(`review/list?columns=tour_id&search=${tourId}`),
  });

  let averageRating = 0;
  if (reviews?.data?.data?.length > 0) {
    const totalRating = reviews.data.data.reduce(
      (acc: number, review: any) => acc + review.rating,
      0
    );
    averageRating = totalRating / reviews.data.data.length;
  }

  // Round the average rating according to your logic
  if (averageRating > 4.5) {
    averageRating = 5;
  } else if (averageRating > 4.0) {
    averageRating = 4.5;
  } else {
    averageRating = Math.floor(averageRating);
  }

  let starComponents = [];
  if (!reviews || reviews?.data?.data?.length === 0) {
    const fullStars = Math.floor(tourRating);
    const hasHalfStar = tourRating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      starComponents.push(
        <FaStar className="text-yellow-400 w-6 h-6" key={i} />
      );
    }

    if (hasHalfStar) {
      starComponents.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-6 h-6" />
      );
    }

    const remainingStars = 5 - starComponents.length;

    for (let i = 0; i < remainingStars; i++) {
      starComponents.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-6 h-6" />
      );
    }
  } else {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      starComponents.push(
        <FaStar className="text-yellow-400 w-6 h-6" key={i} />
      );
    }

    if (hasHalfStar) {
      starComponents.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-6 h-6" />
      );
    }

    const remainingStars = 5 - starComponents.length;
    for (let i = 0; i < remainingStars; i++) {
      starComponents.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-6 h-6" />
      );
    }
  }

  return (
    <>
      <div className="">
        <h2 className="text-lg lg:text-[32px] xl:text-[26px] text-[#224466] font-bold leading-8">
          {tourName}
        </h2>

        <div className="flex flex-wrap gap-2 flex-row lg:gap-4 justify-start items-center pt-3">
          <span className="text-2xl lg:text-3xl text-[#224466] font-bold">
            {!reviews || reviews?.data?.data?.length === 0
              ? tourRating
              : averageRating.toFixed(1)}
          </span>
          <div className="flex items-center gap-x-[2px]">
            {starComponents.map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>
          <span className="text-[#706C6C] text-sm lg:text-base font-bold">
            {reviews?.data?.data?.length} reviews
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 mt-4 overflow-auto">
        {reviews?.data?.data?.length === 0 && (
          <p className="text-[#706C6C] text-sm lg:text-base font-bold">
            No reviews yet
          </p>
        )}
        {reviews?.data?.data?.map((review: any) => (
          <UserReviewCard key={review?.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default TourCardReviews;
