"use client";

import React from "react";
import UserReviewCard from "./UserReviewCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const UserReviews = ({ tourId }: { tourId: string }) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", tourId],
    queryFn: () => getRequest(`review/list?columns=tour_id&search=${tourId}`),
  });

  return (
    <div className="flex flex-col gap-y-6 mt-4 overflow-auto">
      {reviews?.data?.data?.map((review: any) => (
        <UserReviewCard key={review?.id} review={review} />
      ))}
    </div>
  );
};

export default UserReviews;
