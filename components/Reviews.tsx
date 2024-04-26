import CreateReview from "./CreateReview";
import { FaStar } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import React from "react";
import UserReviewCard from "./UserReviewCard";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const Reviews = () => {
  const params = useSearchParams();
  const {
    data: reviews,
    isLoading,
    refetch: refetchReviews,
    isFetching: isRefetching,
  } = useQuery({
    queryKey: ["reviews", params.get("tourDetail")],
    queryFn: () =>
      getRequest(
        `review/list?columns=tour_id&search=${params.get("tourDetail")}`
      ),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-y-4">
        <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex flex-col mt-4 gap-y-4">
        {isRefetching && (
          <div className="w-full flex flex-col gap-y-4">
            <PuffLoader color={"#010E3B"} aria-label="Loading Spinner" />
          </div>
        )}

        {!isRefetching &&
          reviews?.data?.data?.map((review: any) => (
            <div key={review?.id} className="bg-[#F9F9F9] p-4">
              <UserReviewCard review={review} />
            </div>
          ))}
      </div>
      <div className="mt-4">
        <CreateReview refetchReviews={refetchReviews} />
      </div>
    </div>
  );
};

export default Reviews;
