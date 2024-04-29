"use client";

import { FaStar, FaTrash } from "react-icons/fa";
import { delRequest, postRequest } from "@/services/api/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";

import Image from "next/image";
import React from "react";
import { getTimestamp } from "@/helper/utils";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

const UserReviewCard = ({
  refetchReviews,
  review,
}: {
  refetchReviews?: () => void;
  review: any;
}) => {
  const { userId } = useAuth();

  const deleteReviewMutation = useMutation({
    mutationFn: () => delRequest(`/review/delete/${review.id}`),
    onSuccess: () => {
      if (refetchReviews !== undefined) {
        refetchReviews();
      }
      toast.success("Review deleted Successfully");
    },
    onError: () => {
      toast.error("Failed to Create Review. Please try again later.");
    },
  });

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="lg:text-xl text-md font-semibold">{review?.name}</h2>
        {userId && userId === review.user_id ? (
          <FaTrash
            className="w-5 h-5 cursor-pointer hover:text-red-500"
            onClick={() => {
              deleteReviewMutation.mutateAsync();
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <p className="lg:text-base text-sm text-gray-400">
        {getTimestamp(new Date(review?.created_at))}
      </p>
      <div className="flex flex-row gap-x-1 text-yellow-400">
        {[...Array(review?.rating)].map((_, index) => (
          <FaStar key={index} className="w-5 h-5" />
        ))}
      </div>
      <p className="lg:text-lg text-base mt-2">{review?.review}</p>
    </div>
  );
};

export default UserReviewCard;
